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

You are implementing a requirements management system that transforms natural language feature descriptions into structured markdown requirements with atomic, reviewable implementations.

### Your Task
Analyze the provided feature description and generate a hierarchical set of requirements optimized for small, focused implementations and code reviews.

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

### Requirement Decomposition Strategy
Break down features into two-level hierarchical requirements optimized for reviewable implementations:

#### Parent Requirements (Orchestration Level)
- **Purpose:** Provide feature overview and coordinate child requirements
- **Scope:** Business objectives and high-level functional overview
- **Implementation:** Not directly implemented - fulfilled through child requirements

#### Child Requirements (Implementation Level)  
- **Purpose:** Single-responsibility, atomic requirements that can be implemented independently
- **Scope:** One focused area of functionality (input validation, data processing, error handling, etc.)
- **Implementation:** Direct 1:1 mapping to implementation work and pull requests
- **Size Target:** 5-10 acceptance criteria maximum for manageable code reviews

### Parent Requirement Template
Generate parent requirements using this template:

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
[RFC-2119 compliant statement describing overall feature capability]

## Business Rationale
[Why this feature exists and business value provided]

## Acceptance Criteria
**Implementation Note: This requirement is implemented through its child requirements below.**

### Functional Overview
- [ ] [High-level capability 1]
- [ ] [High-level capability 2]
- [ ] [High-level capability 3]

### Child Requirements
- [CHILD-ID-1]: [Brief description of child responsibility]
- [CHILD-ID-2]: [Brief description of child responsibility]
- [CHILD-ID-3]: [Brief description of child responsibility]

### Success Criteria
[How to know the overall feature is complete and working]
```

### Child Requirement Template
Generate child requirements using this template:

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
[RFC-2119 compliant statement for specific, focused functionality]

## Business Rationale
[Why this specific aspect is needed and how it contributes to parent requirement]

## Acceptance Criteria
**Implementation Note: Build ONLY what is specified below. Do not add functionality beyond these criteria.**

### [Focused Area] Requirements
- [ ] [Specific requirement 1]
- [ ] [Specific requirement 2]
- [ ] [Specific requirement 3]
- [ ] [Specific requirement 4]
- [ ] [Specific requirement 5]

### Integration Requirements
- [ ] [How this integrates with existing systems]
- [ ] [Existing utilities/classes to use]
- [ ] [Interface contracts to maintain]

### Success Criteria
[How to verify this specific functionality is complete]
```

### Analysis Requirements
1. **Read existing requirements** from `requires/requirements/` directory to understand current structure
2. **Break down** the feature into parent (orchestration) and child (implementation) requirements
3. **Ensure child requirements are atomic** - each should be implementable in a single, focused pull request
4. **Apply decomposition rule:** If a child requirement has 8-12+ acceptance criteria, break it into sub-requirements
5. **Target 5-8 acceptance criteria per atomic requirement** for optimal code review size
6. **Limit hierarchy depth** to maximum 3-4 levels to avoid over-engineering
7. **Identify appropriate parents** through semantic analysis of existing requirements
8. **Generate comprehensive but focused acceptance criteria** that define exact implementation boundaries
9. **Include integration requirements** that specify how child implementations coordinate
10. **Ensure each requirement** has exactly one RFC-2119 keyword and addresses one specific capability
11. **Maintain single top-level requirement** - all new requirements must be children of existing structure

### Output Format
Create temporary requirement files for user review. Present them using standard file preview format showing:
- File path: `requires/requirements/[FEATURE-ID].md` for parent requirements, `requires/requirements/[CHILD-ID].md` for child requirements
- Full markdown content for each file
- Clear indication these are new files for review
- Parent-child relationships clearly documented in both directions

## Design Prompt

You are analyzing a requirement to create a comprehensive implementation plan that distills hierarchical context and prepares for focused code generation.

### Your Task
Read the specified requirement and its full hierarchical context to create a detailed implementation plan that captures all necessary context for successful, focused implementation.

### Analysis Steps

#### 1. Hierarchical Context Analysis
- Read the requirement markdown file from `requires/requirements/[REQUIREMENT-ID].md`
- **Start with current requirement** to understand specific implementation needs
- **Walk up the hierarchy** (parent → grandparent → top-level) to gather relevant context
- **For each parent level:** Extract only context that impacts current requirement implementation
- **Analyze sibling requirements** (same parent) for consistency requirements and shared interfaces
- **Stop traversal** when additional parent context becomes irrelevant to implementation
- **Identify coordination points** with related requirements at same level

#### 2. Requirement Analysis
- Parse the acceptance criteria to understand exact functionality needed
- Identify the RFC-2119 keyword level (SHALL/SHOULD/MAY) for priority context
- Extract business rationale and integration requirements
- **Distill hierarchical context** into implementation-relevant constraints and decisions

#### 3. Codebase Analysis
- Examine existing code structure and patterns
- Read relevant CLAUDE.md files for technical context
- Identify existing utilities, classes, and patterns to leverage
- Analyze current architecture and conventions
- **Apply architectural constraints** derived from hierarchical analysis

#### 4. Technical Design
- Determine implementation approach and architecture patterns consistent with hierarchy
- Specify which design patterns to follow based on parent requirement decisions
- Identify data structures and algorithms needed
- Plan error handling strategy aligned with feature-level approaches
- Design integration points with existing systems and sibling implementations

#### 5. File Impact Assessment
- List all files that need creation or modification
- Specify the purpose of each file change
- Identify potential breaking changes
- Plan for backward compatibility if needed
- **Consider impact on sibling requirement implementations**

#### 6. Implementation Strategy
- Create ordered list of development tasks
- Identify dependencies between implementation steps
- Suggest implementation sequence for best results
- Estimate complexity and potential challenges
- **Ensure approach aligns with parent requirement strategy**

#### 7. Integration Planning
- Specify how this integrates with existing systems
- List existing utilities/classes that should be used
- Define interfaces and contracts needed (especially for sibling coordination)
- Plan for testing integration points
- **Document coordination requirements** with related implementations

#### 8. Risk Assessment
- Identify potential technical challenges
- Note dependencies on external systems or libraries
- Flag any assumptions that need validation
- Suggest mitigation strategies for identified risks
- **Highlight hierarchical conflicts** or inconsistencies

#### 9. Documentation Analysis
- Review existing CLAUDE.md files for completeness
- Identify missing technical documentation needed for implementation
- Note outdated information that contradicts current code
- Flag gaps in architectural or integration documentation
- **Document hierarchical context** that should be preserved for future implementations

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

## Hierarchical Context
### Top-Level Requirement Context
- **Business Objectives:** [Relevant objectives from top-level requirement]
- **Architectural Constraints:** [Key constraints that impact this implementation]

### Parent Requirement Context
- **Feature Scope:** [How this fits into the broader feature]
- **Integration Patterns:** [Established patterns this must follow]
- **Design Decisions:** [Parent-level decisions that constrain this implementation]

### Sibling Coordination
- **Related Requirements:** [List of sibling requirements and their responsibilities]
- **Shared Interfaces:** [Interfaces or contracts that must be maintained]
- **Consistency Requirements:** [Patterns that must be consistent across siblings]

## Technical Approach
### Architecture Pattern
[Specific pattern to follow, justified by hierarchical context]

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
1. [Specific task with clear outcome]
2. [Specific task with clear outcome]
3. [Specific task with clear outcome]

## Integration Points
### Existing Components to Use
- [Utility/Class Name]: [How it will be used]
- [Service Name]: [Integration method]

### New Interfaces Needed
- [Interface Name]: [Purpose and methods]

### Sibling Coordination Points
- [Sibling Requirement]: [How implementations must coordinate]

## Testing Strategy
### Unit Tests
[What needs unit test coverage]

### Integration Tests
[What integration scenarios to test, including sibling coordination]

## Risk Assessment
### Technical Risks
- [Risk 1]: [Mitigation strategy]
- [Risk 2]: [Mitigation strategy]

### Hierarchical Risks
- [Risk related to parent/sibling coordination]: [Mitigation strategy]

### Dependencies
- [External dependency]: [Impact and alternatives]

## Success Criteria
[How to know the implementation is complete and correct]

## Documentation Feedback
### Missing Documentation
- [File/Section]: [What documentation is needed and why]

### Recommended CLAUDE.md Updates
1. Add to [CLAUDE.md file]:
   
   [Specific content to add]

2. Update [CLAUDE.md file]:
   
   [Specific content to change]

### Outdated Information
- [File/Location]: [What needs updating and why]

### Context Preservation
- [Hierarchical context that should be documented]: [Why it's important for future implementations]
```

### Guidelines
- **Walk up the hierarchy** - Start with current requirement and analyze parents only for relevant context
- **Distill relevant context** - Extract only the constraints and decisions that impact this implementation
- **Be specific** - Avoid vague statements like "update the auth system"
- **Reference existing code** - Point to specific files, classes, and patterns to follow
- **Consider sibling coordination** - Plan for consistency and integration with related requirements
- **Document context preservation** - Capture hierarchical insights for future reference
- **Validate feasibility** - Ensure the plan is technically achievable with current codebase
- **Focus on acceptance criteria** - Ensure plan addresses every point in the requirement's acceptance criteria

## Implement Prompt

You are generating focused code implementation based on a requirement's acceptance criteria and comprehensive implementation plan that contains all necessary hierarchical context.

### Your Task
Generate code that implements the specified requirement following these principles, optimized for human code review:

### Implementation Principles
1. **Read requirement file** - Parse the markdown for exact acceptance criteria
2. **Follow implementation plan** - Use the design created by `/requires design` which contains distilled hierarchical context
3. **Analyze existing codebase** - Follow established patterns and conventions
4. **Build ONLY specified functionality** - Do not add features beyond acceptance criteria
5. **Maintain integration requirements** - Use specified existing utilities and patterns
6. **Optimize for code review** - Create focused, reviewable changes that match the requirement's atomic scope

### Implementation Steps

#### 1. Context Analysis
- Read the requirement markdown file from `requires/requirements/[REQUIREMENT-ID].md`
- Review the comprehensive implementation plan from `requires/designs/[REQUIREMENT-ID].md`
- **Use design plan as authoritative context** - All hierarchical context has been pre-analyzed and distilled
- Analyze existing codebase structure and patterns
- Use CLAUDE.md files as technical reference (assume they are complete and current)

#### 2. Branch Creation
- **For parent requirements:** Create new parent branch: `[REQUIREMENT-ID]` from main/master
- **For child requirements:** Create new child branch: `[CHILD-REQUIREMENT-ID]` from parent branch `[PARENT-REQUIREMENT-ID]`
- Switch to the appropriate branch for all implementation work
- Branch hierarchy mirrors requirement hierarchy for coordinated development

#### 3. Code Generation
- Generate code that meets EVERY item in the acceptance criteria
- Follow the implementation plan and technical approach specified in design phase
- **Create commits that map to Implementation Steps** from the design document
- **Commit message format:** `[REQUIREMENT-ID].[N]: [Step description from design plan]`
- **Example:** `USER-AUTH-1-2.1: Set up input validation framework`
- **Respect hierarchical constraints** captured in the design plan
- **Maintain sibling coordination** as specified in design plan
- Use specified existing utilities and classes
- Implement ONLY what is explicitly required (no feature creep)
- Include appropriate error handling as specified
- Add necessary tests following project testing patterns

#### 4. Status Update
- Update the requirement status to `implemented (branch: [REQUIREMENT-ID], commits: [commit-hash-list])` 
- Include all commit hashes if implementation spans multiple commits
- Update the requirement markdown file with new status and modification timestamp
- Ensure traceability between requirement and actual code changes

#### 5. Test Implementation
- Create tests that validate each acceptance criteria item
- Reference the requirement ID in test descriptions and comments
- Use test names that map directly to acceptance criteria
- Include requirement traceability in test documentation
- Follow existing test structure and naming conventions
- Ensure tests verify ONLY the specified functionality (no additional test coverage beyond acceptance criteria)

#### 6. Integration Compliance
- Follow the integration plan established in design phase
- Use existing interfaces and contracts as specified
- **Implement sibling coordination points** as documented in design plan
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
- [ ] **Each commit maps to an Implementation Step** from design document
- [ ] **Commit messages follow format:** `[REQUIREMENT-ID].[N]: [Description]`
- [ ] **Hierarchical constraints respected** as documented in design plan
- [ ] **Sibling coordination implemented** according to design specifications
- [ ] All tests reference the requirement ID and map to acceptance criteria
- [ ] Test names clearly indicate which acceptance criteria they validate
- [ ] Existing tests pass
- [ ] Code follows project conventions established in CLAUDE.md
- [ ] Integration points working as planned in design phase
- [ ] **Implementation creates focused, reviewable pull request**
- [ ] Requirement status updated to `implemented (branch: [REQUIREMENT-ID], commits: [hashes])`
- [ ] Commit messages reference requirement ID for traceability

### Quality Guidelines
- **Exact implementation** - Code must satisfy every acceptance criteria item
- **No assumptions** - Don't implement "obvious" features not specified
- **Consistent patterns** - Follow existing codebase style and architecture
- **Error boundaries** - Handle only the errors specified in acceptance criteria
- **Integration respect** - Use existing utilities rather than creating new ones
- **Human reviewability** - Create focused changes that can be thoroughly reviewed in one session
- **Trust the design plan** - All hierarchical context analysis has been completed, focus on execution

## Update Prompt

You are updating an existing requirement with new text while maintaining consistency across the hierarchical structure and coordinating with any existing implementations.

### Your Task
Update the specified requirement with new content while preserving the requirement structure, relationships, and coordinating with existing branch-based implementations.

### Update Process

#### 1. Read Current Requirement and Context
- Load the existing requirement markdown file from `requires/requirements/[REQUIREMENT-ID].md`
- Parse current content, metadata, and relationships
- **Check implementation status** - identify if requirement has been implemented (has branch/commits)
- **Read existing design plan** from `requires/designs/[REQUIREMENT-ID].md` if it exists
- Understand current position in requirement hierarchy
- Note existing dependencies and conflicts

#### 2. Analyze New Requirement Text
- Parse the new requirement text following RFC-2119 and ASD-STE100 standards
- Identify changes in scope, functionality, or business rationale
- Determine if requirement type or relationships should change
- **Assess if changes require decomposition** - apply 8-12+ acceptance criteria rule
- Assess impact on existing acceptance criteria

#### 3. Hierarchical Impact Analysis
- **Parent Impact Analysis:** 
  - If updating child: Does change affect parent requirement scope?
  - If updating parent: How do changes cascade to all child requirements?
- **Child Impact Analysis:**
  - If updating parent: Which children become invalid/need updates?
  - If updating child: Do sibling relationships need adjustment?
- **Sibling Coordination:**
  - How do changes affect other requirements at the same level?
  - Are there shared interfaces or contracts that need updating?

#### 4. Implementation Coordination
- **Branch Status Check:**
  - Is requirement currently implemented in a branch?
  - Are there child requirement branches that depend on this?
  - What's the status of any related pull requests?
- **Implementation Impact:**
  - Do changes invalidate existing implementation work?
  - Can existing implementation be updated, or does it need reimplementation?
  - How do changes affect integration with sibling implementations?

#### 5. Dependency Analysis
- **Downstream Impact:** Requirements that depend on this one and how they're affected
- **Upstream Impact:** Requirements this depends on and whether those relationships are still valid
- **New Dependencies:** Whether updated acceptance criteria create new dependency needs
- **Broken Dependencies:** Whether changes invalidate existing dependency relationships
- **Dependency Chain:** How changes ripple through the entire dependency network

#### 6. Design Plan Impact
- **Existing Design Analysis:** How do changes affect current design plan?
- **Design Invalidation:** Does update require complete design plan regeneration?
- **Implementation Step Impact:** Which implementation steps need modification?

#### 7. Update Generation
- **Preserve:** ID, creation date, version history, existing relationships where appropriate
- **Update:** Requirement statement, business rationale, acceptance criteria
- **Version Increment:** Follow semantic versioning (MAJOR.MINOR.PATCH) based on change impact:
  - **MAJOR:** Breaking changes to acceptance criteria that affect dependent requirements or invalidate implementations
  - **MINOR:** New acceptance criteria or scope expansion that maintains backward compatibility
  - **PATCH:** Bug fixes, clarifications, or minor wording improvements without scope changes
- **Timestamp Update:** Update modification timestamp
- **Maintain:** Consistent formatting and structure

#### 8. Branch and Implementation Strategy
- **For implemented requirements:** Provide strategy for updating existing branches/implementations
- **For parent requirements with implemented children:** Coordinate update strategy across child branches
- **For changes requiring reimplementation:** Recommend branch cleanup and recreation strategy

### Output Format
Present the updated requirement file with comprehensive impact analysis and coordination strategy:

```markdown
# Updated Requirement: [REQUIREMENT-ID]

## Changes Summary
- **Requirement Statement:** [What changed and why]
- **Business Rationale:** [Updates to rationale]
- **Acceptance Criteria:** [New, modified, or removed criteria]
- **Relationships:** [Dependency or conflict changes]
- **Version Change:** [Previous version] → [New version] ([MAJOR/MINOR/PATCH])

## Hierarchical Impact Analysis
### Parent Requirement Impact
- **[PARENT-ID]:** [How parent requirement is affected]
  - *Impact:* [Why parent needs attention]
  - *Recommended Changes:* [Specific updates needed]

### Child Requirements Impact  
- **[CHILD-ID-1]:** [How this child is affected]
  - *Impact:* [Why this child may no longer be valid/achievable]
  - *Recommended Changes:* [Updates needed or removal recommendation]
  - *Implementation Status:* [Current branch/implementation status]

### Sibling Requirements Impact
- **[SIBLING-ID]:** [How siblings are affected]
  - *Impact:* [Coordination or consistency issues]
  - *Recommended Changes:* [Updates needed for consistency]

### Dependency Impact
- **Dependent Requirements:** [Requirements that depend on this one]
- **Dependency Requirements:** [Requirements this one depends on]
- **New Dependencies:** [New dependencies created by changes]
- **Broken Dependencies:** [Dependencies invalidated by changes]

## Implementation Coordination Strategy
### Current Implementation Status
- **Branch Status:** [Current branch and implementation status]
- **Related Branches:** [Child/parent branches that may be affected]
- **PR Status:** [Any existing pull requests and their status]

### Update Strategy
- **Implementation Approach:** [How to handle existing implementations]
  - If MAJOR change: [Strategy for reimplementation]
  - If MINOR change: [Strategy for incremental updates]  
  - If PATCH change: [Strategy for minimal updates]
- **Branch Coordination:** [How to coordinate across related branches]
- **Timeline Recommendations:** [Suggested order of updates]

## Design Plan Impact
- **Current Design Status:** [Status of existing design plan]
- **Design Update Required:** [Whether design plan needs regeneration]
- **Implementation Steps Affected:** [Which steps need modification]

## Cascade Update Recommendations
**The following requirements need updates due to this change:**
- **[PARENT-ID]**: [Brief description of why it needs updating]
- **[CHILD-ID-1]**: [Brief description of impact]
- **[DEPENDENT-ID-1]**: [Brief description of dependency impact]
- **[SIBLING-ID-1]**: [Brief description of sibling conflict/inconsistency]

### Implementation Coordination Required
- **[REQUIREMENT-ID]**: [Implementation coordination needed]
- **[RELATED-ID]**: [Branch/implementation coordination required]

Would you like me to recommend specific changes to these affected requirements and provide implementation coordination guidance?
- Type "yes" to receive detailed update recommendations and implementation coordination strategy
- Type "no" to proceed with just this requirement update

## Updated Requirement File
[Full updated markdown file content saved to requires/requirements/[REQUIREMENT-ID].md]

## Updated Design Plan File  
[If design plan exists and needs updates, save updated design plan to requires/designs/[REQUIREMENT-ID].md]
```

### Update Guidelines
- **Preserve context** - Don't lose important historical information
- **Hierarchical consistency** - Ensure changes align with parent and don't break children
- **Implementation awareness** - Consider existing branch-based implementations
- **Cascading analysis** - Check impact on parent, children, siblings, and dependencies
- **Semantic versioning** - Use appropriate version increment based on change impact
- **Branch coordination** - Provide clear strategy for managing implementation updates
- **Design plan maintenance** - Keep design plans current with requirement changes
- **Human reviewability** - Ensure updated requirements still optimize for reviewable implementations