#!/usr/bin/env node

const { program } = require('commander')
const { version } = require('../package.json')
const fs = require('fs-extra')
const path = require('path')

program
  .name('requires')
  .description('Claude Code /command for requirements-driven development')
  .version(version)

// Initialize requirements project
async function initializeProject () {
  try {
    const cwd = process.cwd()
    const templatesDir = path.join(__dirname, '..', 'templates')

    console.log('! Initializing requirements-driven development...')

    // Create requirements directory
    const reqDir = path.join(cwd, 'requirements')
    await fs.ensureDir(reqDir)
    console.log('✓ Created requirements/ directory')

    // Create .claude/commands directory
    const claudeDir = path.join(cwd, '.claude', 'commands')
    await fs.ensureDir(claudeDir)
    console.log('✓ Created .claude/commands/ directory')

    // Copy slash commands from templates
    await copyTemplate(templatesDir, 'requires.md', claudeDir, 'requires.md')
    console.log('✓ Created Claude Code slash commands')

    // Copy README template to requirements directory
    await copyTemplate(templatesDir, 'README.md', reqDir, 'README.md')
    console.log('✓ Created requirements README')

    console.log('\n! Requirements project initialized!')
    console.log('\nAvailable commands:')
    console.log('  /requires "feature description"  - Generate requirements from feature text')
    console.log('  /requires design REQUIREMENT-ID  - Analyze implementation approach')
    console.log('  /requires implement REQUIREMENT-ID - Generate code implementation')
    console.log('\nNext steps:')
    console.log('  1. Use /requires "your feature description" to generate requirements')
    console.log('  2. Review generated requirements in requirements/ directory')
    console.log('  3. Use /requires design [ID] to plan implementation')
  } catch (error) {
    console.error('✗ Error initializing project:', error.message)
    process.exit(1)
  }
}

// Copy template file to destination
async function copyTemplate (templatesDir, templateName, destDir, destName) {
  const templatePath = path.join(templatesDir, templateName)
  const destPath = path.join(destDir, destName)

  try {
    await fs.copy(templatePath, destPath)
  } catch (error) {
    throw new Error(`Failed to copy template ${templateName}: ${error.message}`)
  }
}

program
  .command('init')
  .description('Initialize a new "requires" project with Claude Code slash commands')
  .action(initializeProject)

program.parse()
