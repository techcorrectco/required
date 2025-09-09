---
description: Generate requirements from feature description or manage existing requirements
argument-hint: "[feature description]" | design [ID] | implement [ID]
---

Generate structured requirements from feature description, or manage existing requirements.

Usage:
- `/requires "Add user authentication with email/password"` - Generate requirements
- `/requires design USER-MGMT-1-2` - Analyze implementation approach  
- `/requires implement USER-MGMT-1-2` - Generate code implementation

Arguments: $ARGUMENTS