---
description: Generate requirements from feature description or manage existing requirements
argument-hint: "[feature description]" | design [ID] | implement [ID] | update [ID] "new text"
---

Generate structured requirements from feature description, or manage existing requirements.

Usage:
- `/requires "Add user authentication with email/password"` - Generate requirements
- `/requires design USER-MGMT-1-2` - Analyze implementation approach  
- `/requires implement USER-MGMT-1-2` - Generate code implementation
- `/requires update USER-MGMT-1-2 "new requirement text"` - Update existing requirement

Arguments: $ARGUMENTS

## Command Logic

If the arguments start with "design":
  Execute design analysis for the specified requirement ID using the Design Prompt below.

If the arguments start with "implement":
  Execute code implementation for the specified requirement ID using the Implement Prompt below.

If the arguments start with "update":
  Execute requirement update for the specified requirement ID using the Update Prompt below.

Otherwise, treat arguments as feature description and execute requirement generation using the Requirements Generation Prompt below.

## Requirements Generation Prompt

You are implementing a requirements management system that transforms natural language feature descriptions into structured markdown requirements.

### Your Task
Analyze the provided feature description and generate 1 or more atomic requirements following these specifications:

### Existing Requirements Analysis
- **Read all existing requirements** from the `requires/requirements/` directory
- **Identify the single top-level project requirement** (should be only one)
- **Analyze existing feature hierarchy** and requirement organization
- **Find appropriate parent** for new requirements by comparing:
  - Domain similarity (authentication, payments, data access, etc.)
  - Technical dependencies and relationships
  - Semantic similarity between feature descriptions
- **Ensure new requirements fit logically** into existing hierarchy

### Parent Assignment Strategy
- **Single top-level rule:** There should be only 1 top-level requirement for the entire project
- **Feature-level parents:** New features should typically be children of the top-level requirement
- **Requirement-level parents:** Individual requirements should be children of their feature
- **Smart placement:** Use semantic analysis to determine best fit within existing structure

### Language Standards
- Use RFC-2119 keywords (SHALL/SHOULD/MAY) - exactly one per requirement
- Follow ASD-STE100 language structure rules (active voice, present tense, one idea per sentence, under 25 words)
- Use consistent terminology throughout

### ID Generation
- **Read existing requirement IDs** to understand current hierarchy structure
- **Maintain single top-level project requirement** (e.g., REQ-MGMT for this project)
- **Create hierarchical IDs** using dash notation: FEATURE-1, FEATURE-1-1, FEATURE-1-2, etc.
- **Auto-increment appropriately** within the existing structure
- **Generate parent-child relationships** based on semantic analysis of existing and new requirements

### Requirement Structure
Generate markdown files using this exact template for each requirement:

```markdown
---
id: [GENERATED_ID]
title: "[GENERATED_TITLE]"
type: [functional|non-functional|constraint]
status: draft
parent: [PARENT_ID]
dependencies: []
conflicts: []
created: [CURRENT_DATE]
modified: [CURRENT_DATE]
author: [SYSTEM_USER]
version: 1.0.0
---

# [ID]: [TITLE]

## Requirement Statement
[RFC-2119 compliant statement]

## Business Rationale
[Why this requirement exists and business value]

## Acceptance Criteria
**Implementation Note: Build ONLY what is specified below. Do not add functionality beyond these criteria.**

### Input Requirements
- [ ] [Specific input handling requirements]

### Processing Requirements
- [ ] [Core business logic requirements]

### Output Requirements  
- [ ] [Expected outputs and responses]

### Error Handling
- [ ] [Required error conditions to handle]
- [ ] [Explicitly list what NOT to handle]

### Integration Requirements
- [ ] [How this integrates with existing systems]
- [ ] [Existing utilities/classes to use]
```

### Analysis Requirements
1. **Read existing requirements** from `requires/requirements/` directory to understand current structure
2. **Break down** the feature into atomic, testable requirements that fit existing hierarchy
3. **Identify appropriate parents** through semantic analysis of existing requirements
4. **Generate comprehensive acceptance criteria** that define exact implementation boundaries
5. **Include negative criteria** (what NOT to implement) to prevent scope creep
6. **Ensure each requirement** has exactly one RFC-2119 keyword and addresses one specific capability
7. **Maintain single top-level requirement** - all new requirements must be children of existing structure

### Output Format
Create temporary requirement files for user review. Present them using standard file preview format showing:
- File path: `requires/requirements/[FEATURE-ID].md` for feature-level, `requires/requirements/[REQUIREMENT-ID].md` for specific requirements
- Full markdown content for each file
- Clear indication these are new files for review

## Design Prompt

You are analyzing a requirement to create a comprehensive implementation plan before code generation.

### Your Task
Read the specified requirement markdown file and create a detailed implementation plan that prepares for successful code generation.

### Analysis Steps

#### 1. Requirement Analysis
- Read the requirement markdown file from `requires/requirements/[REQUIREMENT-ID].md`
- Parse the acceptance criteria to understand exact functionality needed
- Identify the RFC-2119 keyword level (SHALL/SHOULD/MAY) for priority context
- Extract business rationale and integration requirements

#### 2. Codebase Analysis
- Examine existing code structure and patterns
- Read relevant CLAUDE.md files for technical context
- Identify existing utilities, classes, and patterns to leverage
- Analyze current architecture and conventions

#### 3. Technical Design
- Determine implementation approach and architecture patterns
- Specify which design patterns to follow
- Identify data structures and algorithms needed
- Plan error handling strategy
- Design integration points with existing systems

#### 4. File Impact Assessment
- List all files that need creation or modification
- Specify the purpose of each file change
- Identify potential breaking changes
- Plan for backward compatibility if needed

#### 5. Implementation Strategy
- Create ordered list of development tasks
- Identify dependencies between implementation steps
- Suggest implementation sequence for best results
- Estimate complexity and potential challenges

#### 6. Integration Planning
- Specify how this integrates with existing systems
- List existing utilities/classes that should be used
- Define interfaces and contracts needed
- Plan for testing integration points

#### 7. Risk Assessment
- Identify potential technical challenges
- Note dependencies on external systems or libraries
- Flag any assumptions that need validation
- Suggest mitigation strategies for identified risks

#### 8. Documentation Analysis
- Review existing CLAUDE.md files for completeness
- Identify missing technical documentation needed for implementation
- Note outdated information that contradicts current code
- Flag gaps in architectural or integration documentation

### Output Format
Present a structured implementation plan and save it to the designs directory:

**File:** `requires/designs/[REQUIREMENT-ID].md`

```markdown
# Implementation Plan: [REQUIREMENT-ID]

## Requirement Summary
- **ID:** [REQUIREMENT-ID]
- **Title:** [Requirement Title]
- **Priority:** [RFC-2119 keyword level]
- **Business Value:** [Brief rationale summary]

## Technical Approach
### Architecture Pattern
[Specific pattern to follow]

### Core Components
- [Component 1]: [Purpose and responsibility]
- [Component 2]: [Purpose and responsibility]

### Data Flow
[High-level description of how data moves through the system]

## File Changes
### New Files
- `path/to/new/file.js`: [Purpose and contents overview]

### Modified Files
- `path/to/existing/file.js`: [What changes and why]

## Implementation Steps
1. [Step 1]: [Specific task with clear outcome]
2. [Step 2]: [Specific task with clear outcome]
3. [Step 3]: [Specific task with clear outcome]

## Integration Points
### Existing Components to Use
- [Utility/Class Name]: [How it will be used]
- [Service Name]: [Integration method]

### New Interfaces Needed
- [Interface Name]: [Purpose and methods]

## Testing Strategy
### Unit Tests
[What needs unit test coverage]

### Integration Tests
[What integration scenarios to test]

## Risk Assessment
### Technical Risks
- [Risk 1]: [Mitigation strategy]
- [Risk 2]: [Mitigation strategy]

### Dependencies
- [External dependency]: [Impact and alternatives]

## Success Criteria
[How to know the implementation is complete and correct]

## Documentation Feedback
### Missing Documentation
- [File/Section]: [What documentation is needed and why]

### Recommended CLAUDE.md Updates
1. Add to [CLAUDE.md file]:
   ```markdown
   [Specific content to add]
   ```

2. Update [CLAUDE.md file]:
   ```markdown
   [Specific content to change]
   ```

### Outdated Information
- [File/Location]: [What needs updating and why]
```

### Guidelines
- **Be specific** - Avoid vague statements like "update the auth system"
- **Reference existing code** - Point to specific files, classes, and patterns to follow
- **Consider edge cases** - Plan for error conditions and boundary cases
- **Validate feasibility** - Ensure the plan is technically achievable with current codebase
- **Focus on acceptance criteria** - Ensure plan addresses every point in the requirement's acceptance criteria

## Implement Prompt

You are generating code implementation based on a requirement's acceptance criteria and implementation plan.

### Your Task
Generate code that implements the specified requirement following these principles:

### Implementation Principles
1. **Read requirement file** - Parse the markdown for exact acceptance criteria
2. **Follow implementation plan** - Use the design created by `/requires design` if available
3. **Analyze existing codebase** - Follow established patterns and conventions
4. **Build ONLY specified functionality** - Do not add features beyond acceptance criteria
5. **Maintain integration requirements** - Use specified existing utilities and patterns
6. **Generate documentation feedback** - Identify CLAUDE.md improvements needed

### Implementation Steps

#### 1. Context Analysis
- Read the requirement markdown file from `requires/requirements/[REQUIREMENT-ID].md`
- Review the implementation plan from `requires/designs/[REQUIREMENT-ID].md`
- Analyze existing codebase structure and patterns
- Use CLAUDE.md files as technical reference (assume they are complete and current)

#### 2. Code Generation
- Generate code that meets EVERY item in the acceptance criteria
- Follow the implementation plan and technical approach specified in design phase
- Use specified existing utilities and classes
- Implement ONLY what is explicitly required (no feature creep)
- Include appropriate error handling as specified
- Add necessary tests following project testing patterns
- **Commit implementation** with descriptive commit message referencing requirement ID

#### 3. Status Update
- Update the requirement status to `implemented ([commit-hash])` 
- Include all commit hashes if implementation spans multiple commits
- Update the requirement markdown file with new status and modification timestamp
- Ensure traceability between requirement and actual code changes

#### 4. Test Implementation
- Create tests that validate each acceptance criteria item
- Reference the requirement ID in test descriptions and comments
- Use test names that map directly to acceptance criteria
- Include requirement traceability in test documentation
- Follow existing test structure and naming conventions
- Ensure tests verify ONLY the specified functionality (no additional test coverage beyond acceptance criteria)

#### 5. Integration Compliance
- Follow the integration plan established in design phase
- Use existing interfaces and contracts as specified
- Maintain backward compatibility unless explicitly allowed to break
- Ensure code matches the technical approach from implementation plan

### Output Format
Provide the generated code implementation:

```
[Generated code files with full implementation following the design plan]
```

### Optional Documentation Feedback
If you encounter any missing or unclear documentation during implementation, provide targeted feedback:

```markdown
## Implementation Notes: [REQUIREMENT-ID]

### Documentation Gaps Encountered
- [Specific gap]: [How it impacted implementation and suggested fix]

### Recommended Additions
- [CLAUDE.md file]: [Specific content that would have prevented implementation delays]

### Clarifications Needed
- [Unclear documentation]: [What was ambiguous and how to clarify]
```

### Verification Checklist
After implementation, verify:
- [ ] All acceptance criteria implemented exactly as specified
- [ ] Implementation follows the design plan approach
- [ ] All tests reference the requirement ID and map to acceptance criteria
- [ ] Test names clearly indicate which acceptance criteria they validate
- [ ] Existing tests pass
- [ ] Code follows project conventions established in CLAUDE.md
- [ ] Integration points working as planned in design phase
- [ ] Requirement status updated to `implemented ([commit-hash])`
- [ ] Commit messages reference requirement ID for traceability

### Quality Guidelines
- **Exact implementation** - Code must satisfy every acceptance criteria item
- **No assumptions** - Don't implement "obvious" features not specified
- **Consistent patterns** - Follow existing codebase style and architecture
- **Error boundaries** - Handle only the errors specified in acceptance criteria
- **Integration respect** - Use existing utilities rather than creating new ones

## Update Prompt

You are updating an existing requirement with new text while maintaining consistency and relationships.

### Your Task
Update the specified requirement with new content while preserving the requirement structure and relationships.

### Update Process

#### 1. Read Current Requirement
- Load the existing requirement markdown file from `requires/requirements/[REQUIREMENT-ID].md`
- Parse current content, metadata, and relationships
- Understand current position in requirement hierarchy
- Note existing dependencies and conflicts

#### 2. Analyze New Requirement Text
- Parse the new requirement text following RFC-2119 and ASD-STE100 standards
- Identify changes in scope, functionality, or business rationale
- Determine if requirement type or relationships should change
- Assess impact on existing acceptance criteria

#### 3. Dependency Analysis
- **Downstream Impact:** Requirements that depend on this one and how they're affected
- **Upstream Impact:** Requirements this depends on and whether those relationships are still valid
- **New Dependencies:** Whether updated acceptance criteria create new dependency needs
- **Broken Dependencies:** Whether changes invalidate existing dependency relationships
- **Dependency Chain:** How changes ripple through the entire dependency network

#### 4. Hierarchical Validation
- **Parent Consistency:** Ensure updated requirement still aligns with parent's scope and acceptance criteria
- **Children Validity:** Verify all child requirements are still achievable and relevant
- **Scope Boundaries:** Check if updated requirement scope still fits within parent boundaries
- **AC Alignment:** Ensure acceptance criteria changes don't conflict with parent or children requirements

#### 5. Update Generation
- **Preserve:** ID, creation date, version history, existing relationships where appropriate
- **Update:** Requirement statement, business rationale, acceptance criteria
- **Version Increment:** Follow semantic versioning (MAJOR.MINOR.PATCH) based on change impact:
  - **MAJOR:** Breaking changes to acceptance criteria that affect dependent requirements
  - **MINOR:** New acceptance criteria or scope expansion that maintains backward compatibility
  - **PATCH:** Bug fixes, clarifications, or minor wording improvements without scope changes
- **Timestamp Update:** Update modification timestamp
- **Maintain:** Consistent formatting and structure

#### 6. Relationship Validation
- Ensure updated requirement still fits logically under its parent
- Verify dependencies are still valid and necessary
- Check for new conflicts with sibling requirements
- Suggest relationship changes if hierarchy no longer makes sense

### Output Format
Present the updated requirement file with impact analysis and change recommendations:

```markdown
# Updated Requirement: [REQUIREMENT-ID]

## Changes Summary
- **Requirement Statement:** [What changed and why]
- **Business Rationale:** [Updates to rationale]
- **Acceptance Criteria:** [New, modified, or removed criteria]
- **Relationships:** [Dependency or conflict changes]

## Impact Analysis
### Requirements Needing Updates
#### Parent Requirements
- **[PARENT-ID]:** [Specific changes needed to acceptance criteria/scope]
  - *Impact:* [Why this requirement needs updating]
  - *Recommended Changes:* [Specific updates needed]

#### Child Requirements  
- **[CHILD-ID-1]:** [How this child is affected]
  - *Impact:* [Why this requirement may no longer be valid/achievable]
  - *Recommended Changes:* [Updates needed or removal recommendation]

#### Dependent Requirements
- **[DEPENDENT-ID]:** [How this requirement that depends on the updated one is affected]
  - *Impact:* [Why this dependency relationship needs attention]
  - *Recommended Changes:* [Specific updates to maintain consistency]

#### Sibling Requirements
- **[SIBLING-ID]:** [How other requirements under same parent are affected]
  - *Impact:* [Conflicts or inconsistencies created]
  - *Recommended Changes:* [Updates needed for consistency]

### Requirements NOT Affected
- [LIST OF REQUIREMENTS]: [Brief explanation why no changes needed]

## Cascade Update Recommendation
**The following requirements need updates due to this change:**
- **[PARENT-ID]**: [Brief description of why it needs updating]
- **[CHILD-ID-1]**: [Brief description of impact]
- **[DEPENDENT-ID-1]**: [Brief description of dependency impact]
- **[SIBLING-ID-1]**: [Brief description of sibling conflict/inconsistency]

Would you like me to recommend specific changes to these affected requirements?
- Type "yes" to receive detailed update recommendations for each affected requirement
- Type "no" to proceed with just this requirement update

## Updated Requirement File
[Full updated markdown file content saved to requires/requirements/[REQUIREMENT-ID].md]

## Design Plan File  
[If design plan exists, save updated design plan to requires/designs/[REQUIREMENT-ID].md]
```

### Update Guidelines
- **Preserve context** - Don't lose important historical information
- **Hierarchical consistency** - Ensure changes align with parent and don't break children
- **Cascading analysis** - Check impact on parent, children, siblings, and dependencies
- **Semantic versioning** - Use appropriate version increment based on change impact
- **Scope boundaries** - Verify updated requirement still fits within parent scope
- **AC alignment** - Ensure acceptance criteria changes maintain hierarchical consistency