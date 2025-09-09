# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains "requires" - a Claude Code /command for requirements-driven development. The project is currently in its initial stages.

## Current Status

This repository contains:
- CLI tool for initializing requirements-driven development projects
- NPM package configuration with `@technicallycorrect/requires` scope
- Commander.js-based CLI with `init` command
- Template generation for `requirements.md` files

## Development Setup

### Installation
```bash
npm install
```

### CLI Usage
The package provides a CLI tool accessible via:
```bash
npx @technicallycorrect/requires init
```

This creates a `requirements.md` template file for requirements-driven development.

### Development Commands
```bash
# Linting and formatting
npm run lint:fix       # Auto-fix linting issues

# Other commands
# No build process currently required (Node.js CLI tool)
# Testing framework not yet configured
```

## Commit Guidelines

ALL commits made by Claude Code must follow Conventional Commits specification (https://www.conventionalcommits.org/en/v1.0.0/):

**Format:**
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Required types:**
- `feat:` - new features
- `fix:` - bug fixes
- `docs:` - documentation changes
- `style:` - code style changes (formatting, etc.)
- `refactor:` - code restructuring without feature/bug changes
- `test:` - adding or modifying tests
- `chore:` - maintenance tasks
- `ci:` - CI/CD changes
- `build:` - build system changes
- `perf:` - performance improvements

**Breaking changes:** Use `BREAKING CHANGE:` in footer or `!` after type/scope.

**Commit message style:**
- Use clear, direct language without unnecessary adjectives
- Avoid words like "intelligent", "comprehensive", "robust", "elegant"
- Focus on what was done, not how well it was done

**Examples:**
- `feat: add requirements parser`
- `fix(parser): handle empty requirement lists`
- `docs: update README with usage examples`

**Pre-commit checklist:**
1. **Run linter**: `npm run lint`
2. **Run tests**: `npm test` 
3. **Update version in package.json** according to semantic versioning rules
4. **Write clear commit message** without unnecessary adjectives

**Post-commit workflow:**
After making a commit, run `/clear` to clear context.

## Versioning Guidelines

When making commits, update the version in package.json according to Semantic Versioning (https://semver.org/):

- **Patch (x.y.Z)**: Bug fixes, documentation updates, code style changes
- **Minor (x.Y.z)**: New features, enhancements (backward compatible)
- **Major (X.y.z)**: Breaking changes, API changes (not backward compatible)

**Examples:**
- `fix: resolve CLI parsing issue` → patch version bump
- `feat: add new command option` → minor version bump  
- `feat!: change CLI interface` → major version bump

## Architecture

### Project Structure
```
├── bin/
│   └── requires.js          # CLI entry point with commander.js
├── package.json             # NPM package configuration
├── CLAUDE.md               # Development guidelines
└── README.md               # Project documentation
```

### CLI Architecture
- **Entry Point**: `bin/requires.js` - executable CLI script
- **Command Framework**: Commander.js for argument parsing and command handling  
- **Init Command**: Creates `requirements.md` template in target directory
- **Template System**: String-based template generation for requirements files

### Integration Points
- Designed as NPM package for `npx` execution
- Template output integrates with requirements-driven development workflow
- Future Claude Code /command integration planned