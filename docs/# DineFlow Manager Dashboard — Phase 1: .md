# DineFlow Manager Dashboard — Phase 1: Codebase Audit and Implementation Plan

You are working on my existing DineFlow restaurant operations application. The Manager Dashboard design is complete in Google Stitch. Your task in this phase is to inspect the current project and prepare a safe, implementation-ready plan.

## Critical rules

1. **Do not write, edit, move, rename, or delete any code or files in this phase.**
2. Do not redesign the application or regenerate the Stitch screens.
3. Preserve the existing Owner Dashboard, its routes, authentication, styling, components, and functionality.
4. Do not assume the framework, folder structure, database, API architecture, or installed packages. Discover them by inspecting the actual repository.
5. Inspect the actual Manager Dashboard Stitch exports, screenshots, and relevant design assets available in this project. Do not rely only on written descriptions.
6. If the Stitch exports are unavailable, identify exactly what is missing and ask me to provide the relevant files or connect the design source. Do not invent the design.

## Audit tasks

### A. Understand the existing application
- Identify the frontend and backend frameworks, language, package manager, and current project structure.
- Inspect package scripts, dependencies, environment-variable examples, routing, authentication, and authorization.
- Identify the current database, ORM, schema, migrations, API patterns, and data-fetching approach.
- Locate the Owner Dashboard and identify shared layouts, design tokens, UI components, forms, tables, dialogs, icons, and navigation.
- Identify existing tests, linting, formatting, and build commands.
- Check for unfinished implementations, mock data, placeholders, or existing features that can be reused.

### B. Inspect the approved Manager Dashboard design
Compare the actual Stitch designs with the existing application.

Identify the designed screens and their relationships, including:
- Manager Overview and navigation shell
- Orders and Kitchen
- Tables and Reservations
- Staff and Shifts
- Cleaning Operations
- Menu Management
- Guest Services and Complaints
- Reviews and Ratings
- Analytics and Reports
- AI Assistant
- Notifications, Activity and Shift Handover

For each screen, record its visible layout, important components, interactions, forms, navigation destinations, and responsive behavior. Only include screens actually present in the supplied design; flag any missing screens.

### C. Identify role and permission boundaries
The Owner remains responsible for privileged business-level settings. The Manager operates the restaurant within delegated permissions.

Determine how the existing authentication and authorization system can support this distinction. Identify which actions need permission checks, owner approval, confirmation, or audit records. Permissions must ultimately be enforced by the backend, not only by hiding buttons.

### D. Prepare an implementation plan
Produce a report with:

1. Verified technology stack and repository structure.
2. Existing functionality that must be preserved.
3. A screen-by-screen comparison of the Stitch designs and current implementation.
4. Reusable components and existing APIs/database models.
5. Missing APIs, data models, permissions, integrations, and design assets.
6. A recommended route structure that fits the existing application.
7. An incremental implementation sequence, starting with the Manager Dashboard shell and Overview.
8. A list of files likely to be created or modified for each phase.
9. Risks, dependencies, and questions requiring my decision.
10. A testing and regression plan for protecting the Owner Dashboard.

## Data integrity requirements

Do not present fabricated values as live restaurant data. Clearly distinguish real backend data from temporary development fixtures. Identify where loading, empty, error, success, and permission-denied states will be needed.

Do not invent working integrations for AI, WhatsApp, notifications, reservations, or external review platforms. Report what already exists and what would need to be implemented.

## Final instruction

Return the audit report and a proposed phased plan only. Do not start implementation, install packages, change configuration, or modify files. Wait for my approval before proceeding to Phase 2: Manager Dashboard shell and Overview.