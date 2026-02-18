#!/usr/bin/env node

/**
 * Agent Auditor - Main CLI Entry Point
 *
 * Commands:
 *   install   - Install Agent Auditor into your project
 *   status    - Check installation status
 *   uninstall - Remove Agent Auditor from your project
 */

import { Command } from 'commander';
import { install } from './commands/install.js';
import { status } from './commands/status.js';
import { uninstall } from './commands/uninstall.js';

const program = new Command();

program
  .name('agent-auditor')
  .description('Agent Auditor - Research agent that audits AI agent packages against best practices')
  .version('1.0.0');

program
  .command('install')
  .description('Install Agent Auditor into your project')
  .option('--platform <platform>', 'Platform: claude, gemini, or both')
  .option('--depth <depth>', 'Default research depth: standard or deep')
  .option('--reports <path>', 'Reports output path')
  .option('--yes', 'Skip prompts, use defaults')
  .option('--debug', 'Show debug output')
  .action(install);

program
  .command('status')
  .description('Check Agent Auditor installation status')
  .action(status);

program
  .command('uninstall')
  .description('Remove Agent Auditor from your project')
  .option('--yes', 'Skip confirmation')
  .action(uninstall);

// Default to install if no command specified
if (process.argv.length === 2) {
  process.argv.push('install');
}

program.parse();
