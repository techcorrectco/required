#!/usr/bin/env node

const { program } = require('commander')
const { version } = require('../package.json')
const fs = require('fs-extra')
const path = require('path')
const os = require('os')

program
  .name('requires')
  .description('Claude Code /command for requirements-driven development')
  .version(version)

// Initialize requirements project
async function initializeProject (options) {
  try {
    const cwd = process.cwd()
    const templatesDir = path.join(__dirname, '..', 'templates')
    const isGlobal = options.global

    // Determine claude commands directory
    let claudeDir
    if (isGlobal) {
      claudeDir = path.join(os.homedir(), '.claude', 'commands')
    } else {
      claudeDir = path.join(cwd, '.claude', 'commands')

      // Create parent requires directory
      const requiresDir = path.join(cwd, 'requires')
      await fs.ensureDir(requiresDir)

      // Create requirements subdirectory
      const requirementsDir = path.join(requiresDir, 'requirements')
      await fs.ensureDir(requirementsDir)

      // Create designs subdirectory
      const designsDir = path.join(requiresDir, 'designs')
      await fs.ensureDir(designsDir)
    }

    // Ensure claude commands directory exists
    await fs.ensureDir(claudeDir)

    // Copy slash commands from templates
    await copyTemplate(templatesDir, 'requires.md', claudeDir, 'requires.md')

    // Copy README template to requirements directory (only for local projects)
    if (!isGlobal) {
      const requirementsDir = path.join(cwd, 'requires', 'requirements')
      await copyTemplate(templatesDir, 'README.md', requirementsDir, 'README.md')
    }

    console.log('project directories created')
    if (isGlobal) {
      console.log('command installed in home .claude directory')
    } else {
      console.log('command installed in project .claude directory')
    }
    console.log('\nStar the project at https://github.com/techcorrectco/requires')
  } catch (error) {
    console.error('error initializing project: ', error.message)
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
  .description('Initialize a new "requires" project')
  .option('-g, --global', 'Install commands globally')
  .action(initializeProject)

program.parse()
