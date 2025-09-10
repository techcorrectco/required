# requires

Claude Code /command for requirements-driven development.

## Overview

Requires is a CLI tool that sets up a structured requirements-driven development workflow in your projects. It creates organized directories for requirements and design documents, and provides Claude Code slash commands for generating requirements, planning implementations, and creating code.

## Installation

Use directly with npx (no installation required):

```bash
npx @technicallycorrect/requires init
```

## Usage

### Initialize a Project

Run the `init` command in your project directory:

```bash
npx @technicallycorrect/requires init
```

This will create the following structure:

```
your-project/
├── requires/
│   ├── requirements/     # Structured requirement markdown files
│   └── designs/          # Implementation design plans and analysis
└── .claude/
    └── commands/
        └── requires.md   # Claude Code slash commands
```

### Available Claude Code Commands

After initialization, you can use these slash commands in Claude Code:

#### Generate Requirements
```
/requires "your feature description"
```
Creates structured requirements from natural language descriptions. Requirements are saved as markdown files with hierarchical IDs.

#### Plan Implementation  
```
/requires design REQUIREMENT-ID
```
Analyzes a requirement and creates an implementation plan. Design documents are saved in the `requires/designs/` directory.

#### Generate Code
```
/requires implement REQUIREMENT-ID
```
Generates code implementation based on the requirement and its design plan.

## Example Workflow

1. **Initialize the project:**
   ```bash
   npx @technicallycorrect/requires init
   ```

2. **Generate requirements:**
   ```
   /requires "Add user authentication with email and password"
   ```
   
   This creates files like:
   - `requires/requirements/USER-AUTH.md` - Main feature
   - `requires/requirements/USER-AUTH-1.md` - User registration  
   - `requires/requirements/USER-AUTH-2.md` - User login
   - `requires/requirements/USER-AUTH-2-1.md` - Credential validation

3. **Plan implementation:**
   ```
   /requires design USER-AUTH-1
   ```
   
   Creates `requires/designs/USER-AUTH-1-design.md` with implementation approach.

4. **Generate code:**
   ```
   /requires implement USER-AUTH-1
   ```
   
   Generates the actual code implementation.

## License

MIT
