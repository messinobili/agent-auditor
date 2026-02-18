/**
 * Agent Auditor - Install Command
 *
 * Installs the Reviewer agent and configuration into the current project.
 * Supports Claude Code, Gemini CLI, or both platforms.
 */

import { select, text, confirm, intro, outro, spinner, isCancel } from '@clack/prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function dirname(p) {
  return path.dirname(p);
}

export async function install(options) {
  intro(chalk.cyan.bold('Agent Auditor'));

  console.log(chalk.dim('Research agent that audits AI agent packages against best practices\n'));

  // Check if already installed
  if (await fs.pathExists('.auditor-config.yaml')) {
    const existing = yaml.parse(await fs.readFile('.auditor-config.yaml', 'utf-8'));
    console.log(chalk.yellow(`Agent Auditor is already installed (${existing.platform} platform).`));
    const shouldReinstall = await confirm({
      message: 'Do you want to reinstall?'
    });
    if (isCancel(shouldReinstall) || !shouldReinstall) {
      outro('Installation cancelled.');
      return;
    }
  }

  // Collect configuration
  const config = await collectConfig(options);

  if (!config) {
    outro('Installation cancelled.');
    return;
  }

  // Show summary
  console.log('\n' + chalk.cyan('Installation Summary:'));
  console.log(`  ${chalk.dim('Platform:')} ${formatPlatform(config.platform)}`);
  console.log(`  ${chalk.dim('Default Depth:')} ${formatDepth(config.default_depth)}`);
  console.log(`  ${chalk.dim('Reports Path:')} ./${config.reports_path}/\n`);

  // Confirm installation
  if (!options.yes) {
    const confirmed = await confirm({
      message: 'Proceed with installation?'
    });
    if (isCancel(confirmed) || !confirmed) {
      outro('Installation cancelled.');
      return;
    }
  }

  // Run installation
  const s = spinner();

  try {
    s.start('Creating directories...');
    await createDirectories(config);
    s.stop(chalk.green('✓') + ' Directories created');

    s.start('Installing Reviewer agent...');
    const installResult = await copySkillsSafe(config);
    config.installed_files = installResult.manifest;
    s.stop(chalk.green('✓') + ' Reviewer agent installed');
    if (installResult.suffixed.length > 0) {
      console.log(chalk.yellow(`  ${installResult.suffixed.length} existing file(s) preserved — package versions installed with suffix:`));
      for (const item of installResult.suffixed) {
        console.log(chalk.dim(`    ${item.original} → ${item.suffixed}`));
      }
    }

    s.start('Generating context files...');
    await generateContextFiles(config);
    s.stop(chalk.green('✓') + ' Context files generated');

    s.start('Saving configuration...');
    await saveConfig(config);
    s.stop(chalk.green('✓') + ' Configuration saved');

  } catch (error) {
    s.stop(chalk.red('✗') + ' Installation failed');
    console.error(chalk.red('\nError:'), error.message);
    if (options.debug) {
      console.error(error.stack);
    }
    process.exit(1);
  }

  outro(chalk.green.bold('Agent Auditor installed successfully!'));

  // Show next steps
  console.log('\n' + chalk.cyan('Next Steps:'));
  if (config.platform === 'claude' || config.platform === 'both') {
    console.log('  1. Open your project in Claude Code');
  }
  if (config.platform === 'gemini' || config.platform === 'both') {
    console.log('  1. Open your project in Gemini CLI');
  }
  console.log('  2. Try: /audit-agent [package-path] [agent-name]');
  console.log('  3. Or: /research-topic "[topic]"');
  console.log('');

  // Show available workflows
  console.log(chalk.cyan('Available Workflows:'));
  console.log('  /audit-agent     - Audit an entire agent against best practices');
  console.log('  /audit-workflow  - Deep-dive audit of a single workflow');
  console.log('  /research-topic  - Pure research on a topic (no audit)');
  console.log('');

  // Show scoring info
  console.log(chalk.cyan('Scoring:'));
  console.log('  90-100: World-class    80-89: Strong');
  console.log('  70-79:  Good           60-69: Adequate');
  console.log('  <60:    Needs work');
  console.log('');
}

async function collectConfig(options) {
  const config = {
    version: '1.0.0',
    installed_at: new Date().toISOString()
  };

  // Platform selection
  if (options.platform) {
    config.platform = options.platform;
  } else {
    const platform = await select({
      message: 'Which AI assistant are you using?',
      options: [
        { value: 'claude', label: 'Claude Code', hint: 'Anthropic\'s CLI assistant' },
        { value: 'gemini', label: 'Gemini CLI', hint: 'Google\'s CLI assistant' },
        { value: 'both', label: 'Both', hint: 'Install for both platforms' }
      ]
    });
    if (isCancel(platform)) return null;
    config.platform = platform;
  }

  // Default research depth
  if (options.depth) {
    config.default_depth = options.depth;
  } else {
    const depth = await select({
      message: 'What is your default research depth preference?',
      options: [
        { value: 'standard', label: 'Standard (10-15 sources)', hint: 'Faster, Tier 1-2 sources' },
        { value: 'deep', label: 'Deep-dive (20+ sources)', hint: 'Thorough, includes academic' }
      ],
      initialValue: 'standard'
    });
    if (isCancel(depth)) return null;
    config.default_depth = depth;
  }

  // Reports path
  if (options.reports) {
    config.reports_path = options.reports;
  } else {
    const reports = await text({
      message: 'Where should audit reports be saved?',
      initialValue: 'audits',
      placeholder: 'audits'
    });
    if (isCancel(reports)) return null;
    config.reports_path = reports || 'audits';
  }

  return config;
}

async function createDirectories(config) {
  const dirs = [
    `${config.reports_path}/agents`,
    `${config.reports_path}/workflows`,
    `${config.reports_path}/research`
  ];

  // Platform-specific directories
  if (config.platform === 'claude' || config.platform === 'both') {
    dirs.push('.claude/skills/auditor');
  }
  if (config.platform === 'gemini' || config.platform === 'both') {
    dirs.push('.gemini/skills');
    dirs.push('.gemini/commands');
  }

  for (const dir of dirs) {
    await fs.ensureDir(dir);
  }
}

async function copySkillsSafe(config) {
  const packageRoot = path.resolve(__dirname, '../../../');
  const skillsSource = path.join(packageRoot, 'src/skills');
  const commandsSource = path.join(packageRoot, 'src/commands');
  const suffix = 'agent-auditor';

  if (!await fs.pathExists(skillsSource)) {
    throw new Error(`Skills source not found at ${skillsSource}`);
  }

  // Load manifest from previous install (if reinstalling)
  const previousManifest = config.installed_files || [];
  const newManifest = [];
  const suffixedItems = [];

  // Copy a source item to the right destination, respecting existing files
  async function copyWithCollisionCheck(srcPath, destPath, suffixedPath) {
    const destExists = await fs.pathExists(destPath);
    const ownedByUs = previousManifest.includes(destPath);

    if (!destExists) {
      // No conflict — install normally
      await fs.copy(srcPath, destPath);
      newManifest.push(destPath);
    } else if (ownedByUs) {
      // We installed this previously — safe to update
      await fs.copy(srcPath, destPath);
      newManifest.push(destPath);
    } else {
      // Existing file/dir NOT ours — install with suffix to coexist
      await fs.copy(srcPath, suffixedPath);
      newManifest.push(suffixedPath);
      suffixedItems.push({ original: destPath, suffixed: suffixedPath });
    }
  }

  // --- Skills (directories) ---
  const skillEntries = await fs.readdir(skillsSource);

  if (config.platform === 'claude' || config.platform === 'both') {
    for (const entry of skillEntries) {
      const srcPath = path.join(skillsSource, entry);
      if (!(await fs.stat(srcPath)).isDirectory()) continue;

      const destPath = `.claude/skills/auditor/${entry}`;
      const suffixedPath = `.claude/skills/auditor/${entry}-${suffix}`;
      await copyWithCollisionCheck(srcPath, destPath, suffixedPath);
    }
  }

  if (config.platform === 'gemini' || config.platform === 'both') {
    for (const entry of skillEntries) {
      const srcPath = path.join(skillsSource, entry);
      if (!(await fs.stat(srcPath)).isDirectory()) continue;

      const destPath = `.gemini/skills/${entry}`;
      const suffixedPath = `.gemini/skills/${entry}-${suffix}`;
      await copyWithCollisionCheck(srcPath, destPath, suffixedPath);
    }

    // --- Commands (files) ---
    if (await fs.pathExists(commandsSource)) {
      const commandEntries = await fs.readdir(commandsSource);
      for (const entry of commandEntries) {
        const srcPath = path.join(commandsSource, entry);
        if (!(await fs.stat(srcPath)).isFile()) continue;

        const ext = path.extname(entry);
        const baseName = path.basename(entry, ext);
        const destPath = `.gemini/commands/${entry}`;
        const suffixedPath = `.gemini/commands/${baseName}-${suffix}${ext}`;
        await copyWithCollisionCheck(srcPath, destPath, suffixedPath);
      }
    }
  }

  return { manifest: newManifest, suffixed: suffixedItems };
}

async function generateContextFiles(config) {
  const packageRoot = path.resolve(__dirname, '../../../');

  const templateVars = {
    reports_path: config.reports_path,
    default_depth: formatDepth(config.default_depth)
  };

  // Generate CLAUDE.md (append or create)
  if (config.platform === 'claude' || config.platform === 'both') {
    const claudeTemplatePath = path.join(packageRoot, 'src/templates/CLAUDE.md.hbs');
    if (await fs.pathExists(claudeTemplatePath)) {
      let template = await fs.readFile(claudeTemplatePath, 'utf-8');
      template = replaceTemplateVars(template, templateVars);

      // Check if CLAUDE.md exists and append, otherwise create
      const claudeMdPath = 'CLAUDE.md';
      if (await fs.pathExists(claudeMdPath)) {
        const existing = await fs.readFile(claudeMdPath, 'utf-8');
        if (!existing.includes('<!-- BEGIN AGENT AUDITOR -->')) {
          await fs.appendFile(claudeMdPath, '\n\n' + template);
        }
      } else {
        await fs.writeFile(claudeMdPath, template);
      }
    }
  }

  // Generate GEMINI.md (append or create)
  if (config.platform === 'gemini' || config.platform === 'both') {
    const geminiTemplatePath = path.join(packageRoot, 'src/templates/GEMINI.md.hbs');
    if (await fs.pathExists(geminiTemplatePath)) {
      let template = await fs.readFile(geminiTemplatePath, 'utf-8');
      template = replaceTemplateVars(template, templateVars);

      // Check if GEMINI.md exists and append, otherwise create
      const geminiMdPath = 'GEMINI.md';
      if (await fs.pathExists(geminiMdPath)) {
        const existing = await fs.readFile(geminiMdPath, 'utf-8');
        if (!existing.includes('<!-- BEGIN AGENT AUDITOR -->')) {
          await fs.appendFile(geminiMdPath, '\n\n' + template);
        }
      } else {
        await fs.writeFile(geminiMdPath, template);
      }
    }
  }
}

function replaceTemplateVars(template, vars) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }
  return result;
}

async function saveConfig(config) {
  await fs.writeFile('.auditor-config.yaml', yaml.stringify(config));
}

function formatPlatform(platform) {
  const map = {
    'claude': 'Claude Code',
    'gemini': 'Gemini CLI',
    'both': 'Both (Claude Code + Gemini CLI)'
  };
  return map[platform] || platform;
}

function formatDepth(depth) {
  const map = {
    'standard': 'Standard (10-15 sources)',
    'deep': 'Deep-dive (20+ sources)'
  };
  return map[depth] || depth;
}
