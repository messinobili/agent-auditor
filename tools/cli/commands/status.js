/**
 * Agent Auditor - Status Command
 *
 * Checks the installation status of Agent Auditor in the current project.
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import yaml from 'yaml';

export async function status() {
  console.log(chalk.cyan.bold('\nAgent Auditor Status\n'));

  // Check for config file
  if (!await fs.pathExists('.auditor-config.yaml')) {
    console.log(chalk.yellow('Agent Auditor is not installed in this directory.'));
    console.log(chalk.dim('Run `npx agent-auditor install` to install.'));
    return;
  }

  // Read config
  const config = yaml.parse(await fs.readFile('.auditor-config.yaml', 'utf-8'));

  console.log(chalk.green('✓') + ' Agent Auditor is installed\n');

  // Show configuration
  console.log(chalk.dim('Configuration:'));
  console.log(`  Version:       ${config.version}`);
  console.log(`  Platform:      ${formatPlatform(config.platform)}`);
  console.log(`  Default Depth: ${formatDepth(config.default_depth)}`);
  console.log(`  Reports Path:  ./${config.reports_path}/`);
  console.log(`  Installed:     ${new Date(config.installed_at).toLocaleDateString()}`);
  console.log('');

  // Check installation integrity
  console.log(chalk.dim('Installation Check:'));

  const checks = [];

  // Check Claude installation
  if (config.platform === 'claude' || config.platform === 'both') {
    const claudeSkillsExist = await fs.pathExists('.claude/skills/auditor/reviewer/SKILL.md');
    checks.push({
      name: 'Claude Code skills',
      status: claudeSkillsExist
    });
  }

  // Check Gemini installation
  if (config.platform === 'gemini' || config.platform === 'both') {
    const geminiSkillsExist = await fs.pathExists('.gemini/skills/reviewer/SKILL.md');
    const geminiCommandsExist = await fs.pathExists('.gemini/commands/audit-agent.toml');
    checks.push({
      name: 'Gemini CLI skills',
      status: geminiSkillsExist
    });
    checks.push({
      name: 'Gemini CLI commands',
      status: geminiCommandsExist
    });
  }

  // Check reports directories
  const reportsExist = await fs.pathExists(config.reports_path);
  checks.push({
    name: 'Reports directory',
    status: reportsExist
  });

  // Display checks
  let allPassed = true;
  for (const check of checks) {
    if (check.status) {
      console.log(`  ${chalk.green('✓')} ${check.name}`);
    } else {
      console.log(`  ${chalk.red('✗')} ${check.name}`);
      allPassed = false;
    }
  }

  console.log('');

  // Check for existing audit reports
  const agentReports = await countFiles(`${config.reports_path}/agents`);
  const workflowReports = await countFiles(`${config.reports_path}/workflows`);
  const researchBriefs = await countFiles(`${config.reports_path}/research`);

  if (agentReports + workflowReports + researchBriefs > 0) {
    console.log(chalk.dim('Audit Reports:'));
    console.log(`  Agent audits:     ${agentReports}`);
    console.log(`  Workflow audits:  ${workflowReports}`);
    console.log(`  Research briefs:  ${researchBriefs}`);
    console.log('');
  }

  if (!allPassed) {
    console.log(chalk.yellow('Some components are missing. Run `npx agent-auditor install` to repair.'));
  }
}

async function countFiles(dir) {
  try {
    if (!await fs.pathExists(dir)) return 0;
    const files = await fs.readdir(dir);
    return files.filter(f => f.endsWith('.md')).length;
  } catch {
    return 0;
  }
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
