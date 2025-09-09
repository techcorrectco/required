#!/usr/bin/env node

const { program } = require('commander')
const { version } = require('../package.json')

program
  .name('required')
  .description('Claude Code /command for requirements-driven development')
  .version(version)

program
  .command('init')
  .description('Initialize a new "required" project')
  .action(() => {
    console.log('Initializing "required"...')
    // TODO: Implement init functionality
  })

program.parse()
