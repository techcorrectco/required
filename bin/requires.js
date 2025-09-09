#!/usr/bin/env node

const { program } = require('commander')
const { version } = require('../package.json')

program
  .name('requires')
  .description('Claude Code /command for requirements-driven development')
  .version(version)

program
  .command('init')
  .description('Initialize a new "requires" project')
  .action(() => {
    console.log('Initializing "requires"...')
    // TODO: Implement init functionality
  })

program.parse()
