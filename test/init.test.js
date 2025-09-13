const test = require('ava')
const fs = require('fs-extra')
const path = require('path')
const { execSync } = require('child_process')
const os = require('os')

// Helper to create a temporary test directory
async function createTempDir () {
  const tempDir = path.join(os.tmpdir(), 'requires-test-' + Math.random().toString(36).substr(2, 9))
  await fs.ensureDir(tempDir)
  return tempDir
}

// Helper to safely remove a temporary directory
async function removeTempDir (tempDir) {
  try {
    if (await fs.pathExists(tempDir)) {
      await fs.remove(tempDir)
    }
  } catch (error) {
    console.warn(`Warning: Failed to clean up test directory ${tempDir}:`, error.message)
  }
}

// Helper to run the requires command
function runRequires (args, cwd, env = {}) {
  const binPath = path.join(__dirname, '..', 'bin', 'requires.js')
  return execSync(`node "${binPath}" ${args}`, {
    cwd,
    encoding: 'utf8',
    stdio: 'pipe',
    env: { ...process.env, ...env }
  })
}

test('init command creates directory structure', async t => {
  const tempDir = await createTempDir()

  try {
    // Run the init command
    const output = runRequires('init', tempDir)

    // Check that the command ran successfully
    t.true(output.includes('project directories created'))

    // Check that directories were created
    t.true(await fs.pathExists(path.join(tempDir, 'requires')))
    t.true(await fs.pathExists(path.join(tempDir, 'requires', 'requirements')))
    t.true(await fs.pathExists(path.join(tempDir, 'requires', 'designs')))
    t.true(await fs.pathExists(path.join(tempDir, '.claude')))
    t.true(await fs.pathExists(path.join(tempDir, '.claude', 'commands')))

    // Check that files were created
    t.true(await fs.pathExists(path.join(tempDir, 'requires', 'requirements', 'README.md')))
    t.true(await fs.pathExists(path.join(tempDir, '.claude', 'commands', 'requires.md')))
  } finally {
    // Clean up
    await removeTempDir(tempDir)
  }
})

test('init command creates correct slash command content', async t => {
  const tempDir = await createTempDir()

  try {
    // Run the init command
    runRequires('init', tempDir)

    // Read the slash command file
    const commandPath = path.join(tempDir, '.claude', 'commands', 'requires.md')
    const commandContent = await fs.readFile(commandPath, 'utf8')

    // Check that it contains expected content
    t.true(commandContent.includes('description: Generate requirements from feature description'))
    t.true(commandContent.includes('Arguments: $ARGUMENTS'))
    t.true(commandContent.includes('/requires "Add user authentication with email/password"'))
  } finally {
    // Clean up
    await removeTempDir(tempDir)
  }
})

test('init command creates correct requirements README', async t => {
  const tempDir = await createTempDir()

  try {
    // Run the init command
    runRequires('init', tempDir)

    // Read the requirements README file
    const readmePath = path.join(tempDir, 'requires', 'requirements', 'README.md')
    const readmeContent = await fs.readFile(readmePath, 'utf8')

    // Check that it contains expected content
    t.true(readmeContent.includes('# Requires Directory'))
    t.true(readmeContent.includes('This directory contains structured requirements'))
    t.true(readmeContent.includes('FEATURE-1.md'))
    t.true(readmeContent.includes('/requires "your feature description"'))
    t.true(readmeContent.includes('designs/          # Implementation design plans'))
  } finally {
    // Clean up
    await removeTempDir(tempDir)
  }
})

test.serial('init command handles missing templates gracefully', async t => {
  const tempDir = await createTempDir()

  // Temporarily rename templates directory to test error handling
  const templatesDir = path.join(__dirname, '..', 'templates')
  const backupDir = templatesDir + '.backup'

  try {
    await fs.move(templatesDir, backupDir)

    // Run the init command - should fail gracefully
    const error = await t.throwsAsync(async () => {
      runRequires('init', tempDir)
    })

    t.true(error.message.includes('Command failed'))
  } finally {
    // Restore templates directory
    if (await fs.pathExists(backupDir)) {
      await fs.move(backupDir, templatesDir)
    }
    await removeTempDir(tempDir)
  }
})

test('init command handles existing .claude directory', async t => {
  const tempDir = await createTempDir()

  try {
    // Pre-create .claude directory
    const claudeDir = path.join(tempDir, '.claude')
    await fs.ensureDir(claudeDir)

    // Run the init command
    const output = runRequires('init', tempDir)

    // Check that it created the commands directory and added commands
    t.true(output.includes('project directories created'))
    t.true(output.includes('command installed in project .claude directory'))

    // Verify structure was created correctly
    t.true(await fs.pathExists(path.join(tempDir, '.claude', 'commands')))
    t.true(await fs.pathExists(path.join(tempDir, '.claude', 'commands', 'requires.md')))
  } finally {
    await fs.remove(tempDir)
  }
})

test('init command handles existing .claude/commands directory', async t => {
  const tempDir = await createTempDir()

  try {
    // Pre-create .claude/commands directory
    const commandsDir = path.join(tempDir, '.claude', 'commands')
    await fs.ensureDir(commandsDir)

    // Run the init command
    const output = runRequires('init', tempDir)

    // Check that it created the commands directory and added commands
    t.true(output.includes('project directories created'))
    t.true(output.includes('command installed in project .claude directory'))

    // Verify our command was added
    t.true(await fs.pathExists(path.join(tempDir, '.claude', 'commands', 'requires.md')))
  } finally {
    await fs.remove(tempDir)
  }
})

test.serial('init command with --force overwrites existing requires.md command', async t => {
  const tempDir = await createTempDir()

  try {
    // Pre-create .claude/commands directory with existing requires.md
    const commandsDir = path.join(tempDir, '.claude', 'commands')
    await fs.ensureDir(commandsDir)
    await fs.writeFile(path.join(commandsDir, 'requires.md'), 'existing content')

    // Run the init command with --force
    const output = runRequires('init --force', tempDir)

    // Check that it still ran successfully
    t.true(output.includes('project directories created'))
    t.true(output.includes('command installed in project .claude directory'))

    // Verify our command replaced the existing one
    const commandContent = await fs.readFile(path.join(commandsDir, 'requires.md'), 'utf8')
    t.true(commandContent.includes('Generate requirements from feature description'))
    t.false(commandContent.includes('existing content'))
  } finally {
    await fs.remove(tempDir)
  }
})

test.serial('init command with -f overwrites existing requires.md command', async t => {
  const tempDir = await createTempDir()

  try {
    // Pre-create .claude/commands directory with existing requires.md
    const commandsDir = path.join(tempDir, '.claude', 'commands')
    await fs.ensureDir(commandsDir)
    await fs.writeFile(path.join(commandsDir, 'requires.md'), 'existing content')

    // Run the init command with -f
    const output = runRequires('init -f', tempDir)

    // Check that it still ran successfully
    t.true(output.includes('project directories created'))
    t.true(output.includes('command installed in project .claude directory'))

    // Verify our command replaced the existing one
    const commandContent = await fs.readFile(path.join(commandsDir, 'requires.md'), 'utf8')
    t.true(commandContent.includes('Generate requirements from feature description'))
    t.false(commandContent.includes('existing content'))
  } finally {
    await fs.remove(tempDir)
  }
})

test('init --global installs commands to global directory', async t => {
  const tempProjectDir = await createTempDir()
  const tempHomeDir = await createTempDir()

  try {
    // Run the global init command
    const output = runRequires('init --global', tempProjectDir, { HOME: tempHomeDir })

    // Check that the command ran successfully
    t.true(output.includes('project directories created'))
    t.true(output.includes('command installed in home .claude directory'))

    // Check that global commands directory was created
    const globalCommandsDir = path.join(tempHomeDir, '.claude', 'commands')
    t.true(await fs.pathExists(globalCommandsDir))
    t.true(await fs.pathExists(path.join(globalCommandsDir, 'requires.md')))

    // Check that local project directories were NOT created
    t.false(await fs.pathExists(path.join(tempProjectDir, 'requires')))
    t.false(await fs.pathExists(path.join(tempProjectDir, '.claude')))
  } finally {
    await removeTempDir(tempProjectDir)
    await removeTempDir(tempHomeDir)
  }
})

test('init -g installs commands to global directory', async t => {
  const tempProjectDir = await createTempDir()
  const tempHomeDir = await createTempDir()

  try {
    // Run the global init command with short flag
    const output = runRequires('init -g', tempProjectDir, { HOME: tempHomeDir })

    // Check that the command ran successfully
    t.true(output.includes('project directories created'))
    t.true(output.includes('command installed in home .claude directory'))

    // Check that global commands directory was created
    const globalCommandsDir = path.join(tempHomeDir, '.claude', 'commands')
    t.true(await fs.pathExists(globalCommandsDir))
    t.true(await fs.pathExists(path.join(globalCommandsDir, 'requires.md')))

    // Check that local project directories were NOT created
    t.false(await fs.pathExists(path.join(tempProjectDir, 'requires')))
    t.false(await fs.pathExists(path.join(tempProjectDir, '.claude')))
  } finally {
    await removeTempDir(tempProjectDir)
    await removeTempDir(tempHomeDir)
  }
})

test('init --global does not create README in requirements directory', async t => {
  const tempProjectDir = await createTempDir()
  const tempHomeDir = await createTempDir()

  try {
    // Run the global init command
    runRequires('init --global', tempProjectDir, { HOME: tempHomeDir })

    // Check that no README was created (since no requirements directory was made)
    t.false(await fs.pathExists(path.join(tempProjectDir, 'requires', 'requirements', 'README.md')))
    t.false(await fs.pathExists(path.join(tempHomeDir, '.claude', 'commands', 'README.md')))
  } finally {
    await removeTempDir(tempProjectDir)
    await removeTempDir(tempHomeDir)
  }
})
