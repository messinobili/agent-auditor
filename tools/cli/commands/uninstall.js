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
