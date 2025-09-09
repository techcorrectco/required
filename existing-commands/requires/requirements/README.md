# Requirements Directory

This directory contains structured requirements for your project, organized as part of the requires/ directory structure.

## Directory Structure

```
requires/
├── requirements/     # This directory - structured requirement markdown files
└── designs/          # Implementation design plans and analysis
```

## Getting Started

1. Use `/requires "your feature description"` to generate requirements
2. Requirements will be created as markdown files with structured metadata in this directory
3. Use `/requires design [ID]` to plan implementation (saved to ../designs/)
4. Use `/requires implement [ID]` to generate code

## File Structure

Requirements follow a hierarchical structure:
- `FEATURE.md` - Top-level feature
- `FEATURE-1.md` - First requirement under feature
- `FEATURE-1-1.md` - Sub-requirement
- `FEATURE-1-2.md` - Another sub-requirement

## Example

After running `/requires "Add user authentication"`, you might see:
- `requires/requirements/USER-AUTH.md` - Main feature
- `requires/requirements/USER-AUTH-1.md` - User registration
- `requires/requirements/USER-AUTH-2.md` - User login
- `requires/requirements/USER-AUTH-2-1.md` - Credential validation

After running `/requires design USER-AUTH-1`:
- `requires/designs/USER-AUTH-1-design.md` - Implementation plan for user registration