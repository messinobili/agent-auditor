/**
 * Agent Auditor - Uninstall Command
 *
 * Removes Agent Auditor from the current project.
 */

import { confirm, isCancel, outro, spinner } from '@clack/prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import yaml from 'yaml';

export async function uninstall(options) {
  console.log(chalk.cyan.bold('\nAgent Auditor Uninstall\n'));

  // Check if installed
  if (!await fs.pathExists('.auditor-config.yaml')) {
    console.log(chalk.yellow('Agent Auditor is not installed in this directory.'));
    return;
  }

  // Read config
  const config = yaml.parse(await fs.readFile('.auditor-config.yaml', 'utf-8'));

  // Show what will be removed
  console.log(chalk.dim('The following will be removed:'));

  if (config.platform === 'claude' || config.platform === 'both') {
    console.log('  - .claude/skills/auditor/');
  }
  if (config.platform === 'gemini' || config.platform === 'both') {
    console.log('  - .gemini/skills/reviewer/');
    console.log('  - .gemini/commands/audit-*.toml');
    console.log('  - .gemini/commands/research-*.toml');
  }
  console.log('  - .auditor-config.yaml');
  console.log('');

  console.log(chalk.yellow('Note: Audit reports in ' + config.reports_path + '/ will NOT be deleted.'));
  console.log('');

  // Confirm
  if (!options.yes) {
    const confirmed = await confirm({
      message: 'Are you sure you want to uninstall Agent Auditor?'
    });
    if (isCancel(confirmed) || !confirmed) {
      outro('Uninstall cancelled.');
      return;
    }
  }

  const s = spinner();

  try {
    s.start('Removing Agent Auditor...');

    // Remove Claude skills
    if (config.platform === 'claude' || config.platform === 'both') {
      await fs.remove('.claude/skills/auditor');
    }

    // Remove Gemini skills and commands
    if (config.platform === 'gemini' || config.platform === 'both') {
      await fs.remove('.gemini/skills/reviewer');

      // Remove specific command files
      const commandFiles = [
        '.gemini/commands/audit-agent.toml',
        '.gemini/commands/audit-workflow.toml',
        '.gemini/commands/research-topic.toml'
      ];
      for (const file of commandFiles) {
        if (await fs.pathExists(file)) {
          await fs.remove(file);
        }
      }
    }

    // Remove Agent Auditor sections from context files
    if (config.platform === 'claude' || config.platform === 'both') {
      await removeAuditorSection('CLAUDE.md');
    }
    if (config.platform === 'gemini' || config.platform === 'both') {
      await removeAuditorSection('GEMINI.md');
    }

    // Remove config file
    await fs.remove('.auditor-config.yaml');

    s.stop(chalk.green('✓') + ' Agent Auditor removed');

  } catch (error) {
    s.stop(chalk.red('✗') + ' Uninstall failed');
    console.error(chalk.red('\nError:'), error.message);
    process.exit(1);
  }

  console.log('');
  console.log(chalk.green('Agent Auditor has been uninstalled.'));
  console.log(chalk.dim(`Your audit reports in ${config.reports_path}/ have been preserved.`));
  console.log('');
}

/**
 * Remove the Agent Auditor section from a context file.
 * If the file contains only the Auditor section, delete it entirely.
 * If the file contains other content, strip only the Auditor section.
 */
async function removeAuditorSection(filePath) {
  if (!await fs.pathExists(filePath)) return;

  const content = await fs.readFile(filePath, 'utf-8');
  const beginMarker = '<!-- BEGIN AGENT AUDITOR -->';
  const endMarker = '<!-- END AGENT AUDITOR -->';

  const beginIndex = content.indexOf(beginMarker);
  const endIndex = content.indexOf(endMarker);

  if (beginIndex === -1) {
    // No markers found — check for legacy installs (pre-marker)
    if (content.includes('Agent Auditor')) {
      if (content.trimStart().startsWith('# Agent Auditor')) {
        await fs.remove(filePath);
      }
    }
    return;
  }

  const before = content.substring(0, beginIndex);
  const after = endIndex !== -1
    ? content.substring(endIndex + endMarker.length)
    : '';

  const remaining = (before + after).replace(/\n{3,}/g, '\n\n').trim();

  if (remaining.length === 0) {
    await fs.remove(filePath);
  } else {
    await fs.writeFile(filePath, remaining + '\n');
  }
}
