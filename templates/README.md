# Requirements Template

This directory contains structured requirements for your project.

## Getting Started

1. Use `/requires "your feature description"` to generate requirements
2. Requirements will be created as markdown files with structured metadata
3. Use `/requires design [ID]` to plan implementation
4. Use `/requires implement [ID]` to generate code

## File Structure

Requirements follow a hierarchical structure:
- `FEATURE.md` - Top-level feature
- `FEATURE-1.md` - First requirement under feature
- `FEATURE-1-1.md` - Sub-requirement
- `FEATURE-1-2.md` - Another sub-requirement

## Example

After running `/requires "Add user authentication"`, you might see:
- `requirements/USER-AUTH.md` - Main feature
- `requirements/USER-AUTH-1.md` - User registration
- `requirements/USER-AUTH-2.md` - User login
- `requirements/USER-AUTH-2-1.md` - Credential validation