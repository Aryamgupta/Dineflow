# DineFlow — Complete Restaurant Owner Dashboard Design

## Project Objective

Design the complete restaurant owner dashboard for DineFlow, a premium restaurant operations and digital ordering SaaS platform.

Continue the existing DineFlow project. Reuse the established logo, brand identity, typography, spacing, component conventions, and light/dark theme system.

The restaurant owner is the primary administrator of their restaurant. They need a centralized workspace to manage employees, evaluate individual staff performance, monitor customer satisfaction, handle escalations, manage restaurant policies and public relations, review sales analytics, and obtain AI-assisted business insights.

This is a detailed product design task. Design the dashboard shell, main overview, navigation, and dedicated nested pages for every module described below. Do not create a collection of unrelated dashboard mockups. Every page must feel like part of one cohesive application.

The final result should resemble a mature, production-quality SaaS platform designed by an experienced product design team, not a generic AI-generated dashboard.

# 1. Visual Identity and Design Standards

Preserve DineFlow's established visual language.

### Color and theme

- Primary brand color: forest green or emerald.
- Light theme: warm neutral backgrounds, white or lightly tinted surfaces, dark readable typography, subtle borders.
- Dark theme: charcoal and deep-green-tinted surfaces, off-white typography, differentiated panels, restrained accent colors.
- Semantic colors: accessible green for success, amber for warnings, red for critical errors, and neutral tones for inactive states.
- Use color consistently for status, not decoration.

Every page, table, modal, chart, dropdown, and form must support both light and dark themes.

### Typography and components

- Clear typographic hierarchy.
- Consistent heading sizes and readable body text.
- Restrained border radii.
- Subtle shadows only when needed.
- Consistent field heights and button dimensions.
- A single recognizable line-icon family.
- Useful empty states, loading states, validation messages, and confirmation dialogs.
- Consistent spacing and alignment across all modules.

Avoid excessive rounded cards, excessive pills, decorative gradients, floating widgets, unnecessary charts, and repetitive card grids.

Use whitespace and layout composition to create hierarchy. Reserve prominent visual emphasis for genuinely important metrics and urgent actions.

# 2. Global Application Layout

Create a persistent owner dashboard shell.

## 2.1 Left Sidebar Navigation

The sidebar should include the DineFlow logo and the following navigation hierarchy.

**Overview**
- Owner Dashboard.

**People & Workforce**
- Staff Management.
- Staff Performance.
- Escalations.

**Customer Experience**
- Reviews & Ratings.
- Restaurant Policies.

**Brand & Reputation**
- Public Relations.

**Business Intelligence**
- AI Business Assistant.
- Top Performers.
- Sales Analytics.

**Administration**
- General Settings.

Staff Management must remain one primary module, with employee categories displayed as nested views. Do not create a separate top-level navigation item for every staff type.

The sidebar should support expanded and collapsed states. Clearly distinguish the active page, nested pages, and section headings.

## 2.2 Top Navigation Bar

Include:
- Current page title or breadcrumb.
- Restaurant selector only if multiple restaurant locations are supported.
- Global search for staff, reviews, and relevant records.
- Notification center with unread count.
- Help entry point.
- Light/dark theme toggle.
- Owner profile menu with account details, profile settings, and sign-out.

Use realistic dropdown and notification states.

## 2.3 Global Page Structure

Every module should have:
- A clear page title.
- A short contextual description.
- Primary actions positioned consistently.
- Relevant filters and search.
- Appropriate content tables, charts, forms, or detail panels.
- Useful empty, loading, success, and error states.
- Responsive layouts.

Do not force every module into the same card-grid template. Choose the layout appropriate to the data and task.

# 3. Module One — Owner Dashboard Overview

This is the first page after the owner enters the application.

Its purpose is to provide a quick, trustworthy overview of restaurant performance, staffing, reputation, and outstanding issues.

## 3.1 Welcome Header

Display:
- Greeting such as “Good evening”.
- Restaurant name.
- Current date and selected reporting period.
- A short contextual summary.
- A date-range selector.

Do not invent live business results or present sample figures as real data. Use clearly illustrative sample data in the design.

## 3.2 Key Business Metrics

Create a compact summary area containing:

1. **Total Sales** — Revenue for the selected period.
2. **Orders** — Total orders in the selected period.
3. **Average Order Value** — Sales divided by applicable order count.
4. **Customer Rating** — Average restaurant rating and review count.
5. **Active Staff** — Staff accounts currently active.
6. **Pending Escalations** — Outstanding issues requiring attention.

Show comparison with the previous equivalent period where applicable. Include clear labels, units, and restrained trend indicators.

Do not mix sales revenue with profit. Profit should not be displayed unless relevant cost data is available.

## 3.3 Sales Snapshot

Include a compact time-series chart for sales over the selected period.

Provide:
- Day, week, and month views where appropriate.
- Revenue and order-volume summaries.
- Clear axes and tooltips.
- An action to open Sales Analytics.

## 3.4 Customer Reputation Snapshot

Show:
- Current average restaurant rating.
- Rating distribution from one to five stars.
- Recent reviews.
- Unanswered reviews.
- An action to open Reviews & Ratings.

## 3.5 Workforce Snapshot

Show:
- Employee count by role.
- Managers currently assigned versus the maximum of two.
- Pending staff invitations or credential-delivery issues.
- Attendance or working-hours summary, if attendance data exists.
- An action to open Staff Management.

## 3.6 Escalation Center

Display a prioritized list of recent staff escalations.

Each item should show:
- Escalation title.
- Related employee.
- Category.
- Severity.
- Submission time.
- Current status.
- Assigned reviewer, if applicable.

Highlight urgent unresolved issues without making the whole page visually alarming.

## 3.7 Performance Highlights

Show compact highlights for:
- Highest-rated staff members.
- Best-rated food items, based on available item-level feedback.
- Recent positive customer feedback.
- Meaningful sales trends.

Include links to the corresponding detailed modules.

## 3.8 AI Business Summary

Add a restrained summary panel with:
- A sample business insight.
- The reporting period.
- Supporting metric references.
- A button labelled “Ask DineFlow AI”.

Example illustrative insight:

“Customer ratings improved during the selected period, while weekend sales contributed a larger share of total revenue.”

Clearly label this as an illustrative insight in the prototype. The real system will generate insights later.

# 4. Module Two — Staff Management

Staff Management is the central module for all employees working at the restaurant.

The owner must be able to create, view, update, deactivate, and manage staff records from one unified workspace.

## 4.1 Staff Management Landing Page

Create a dedicated staff overview containing:
- Total staff.
- Active staff.
- Inactive staff.
- Pending invitations or account setup.
- Staff by role.
- Managers assigned out of a maximum of two.
- An Add Employee button.
- Search, filtering, sorting, and pagination.

Provide role-based tabs or nested navigation:

- All Staff.
- Managers.
- Waiters.
- Cleaners.
- Kitchen Staff.

Kitchen Staff must support subcategories such as:
- Head Chef.
- Sous Chef.
- Line Cook.
- Prep Cook.
- Kitchen Helper.
- Dishwasher.
- Other Kitchen Staff.

These are configurable staff classifications, not separate primary modules.

## 4.2 Staff Directory

Display a professional table with:
- Employee name and avatar.
- Employee ID.
- Username.
- Role.
- Kitchen category, if applicable.
- Contact number.
- Employment status.
- Joining date.
- Working-hours summary.
- Rating.
- Account status.
- Row actions.

Include filters for role, category, employment status, rating, and date range.

Provide a responsive list layout on mobile.

## 4.3 Add Employee

Open a dedicated form or well-designed modal.

Fields:
- Full name — required.
- Employee ID — generated automatically or entered according to the product's configuration.
- Mobile number with country calling code — required.
- Email — optional unless needed for account recovery.
- Role — required.
- Kitchen category — required for kitchen staff.
- Employment type — full-time, part-time, or contract.
- Joining date — required.
- Salary amount — required according to the selected employment arrangement.
- Salary frequency — monthly, weekly, or hourly.
- Assigned manager — optional, restricted to existing managers.
- Emergency contact — optional.
- Notes — optional.
- Employment status — active or inactive.

If the selected role is Manager, check the restaurant's manager limit before permitting creation.

**Business rule: a restaurant can have a maximum of two managers.** If two managers are already assigned, disable the option to add another manager and show a clear explanation. Do not silently change the employee's role.

If Kitchen Staff is selected, reveal the kitchen-category field.

Keep salary and emergency-contact information visually separated from general employee details.

## 4.4 Employee Account Credentials

After employee creation, show a dedicated account-setup section.

Include:
- Generated username.
- Temporary password or secure credential-setup mechanism.
- WhatsApp phone number.
- WhatsApp delivery status.
- Send Credentials action.
- Regenerate Temporary Password action.
- Copy Username action.
- Retry Delivery action.

Use a confirmation dialog before sending credentials.

Show delivery states:
- Not Sent.
- Sending.
- Sent.
- Failed.
- Account Setup Pending.

Display the destination phone number in masked form where appropriate.

Design this flow with security in mind:
- Never display permanent passwords in the directory.
- Prefer temporary credentials or a secure account-setup link.
- Require a password change at first login if temporary passwords are used.
- Allow temporary credentials to be regenerated securely.
- Do not expose credentials in employee analytics or audit summaries.
- Never indicate WhatsApp delivery succeeded until the integration reports success.

WhatsApp integration can be represented as a visual prototype. Do not build the integration itself.

## 4.5 Employee Detail and Profile

Every employee must have a dedicated detail page.

Header:
- Name.
- Employee ID.
- Role and kitchen category.
- Employment status.
- Contact information.
- Joining date.
- Edit Employee action.

Use nested tabs:

**Overview**
- Employee summary.
- Current role.
- Employment status.
- Performance snapshot.
- Recent activity.

**Work Hours & Attendance**
- Hours worked.
- Attendance records, if available.
- Shift history, if available.
- Late arrivals or absences, if recorded.
- Date-range filter.
- Hours trend.

**Salary & Compensation**
- Salary amount and frequency.
- Compensation history.
- Payment records.
- Pending, paid, or overdue status where payment records exist.
- Relevant payroll-period filter.

Only show financial statuses supported by recorded data. Do not fabricate payroll transactions or infer payment completion from salary configuration.

**Ratings & Reviews**
- Average employee rating.
- Number of ratings.
- Rating distribution.
- Written feedback.
- Recent review history.
- Date filters.

**Performance**
- Relevant role-specific performance indicators.
- Customer feedback.
- Recorded incidents or escalations.
- Trend over time.
- Supporting evidence for any performance assessment.

**Account & Access**
- Username.
- Account activation status.
- Credential setup status.
- Last login, if recorded.
- Reset or regenerate temporary credentials.
- Deactivate account.

**Activity History**
- Relevant changes to the employee record.
- Role changes.
- Status changes.
- Credential delivery events.
- Authorized actions and timestamps.

Use appropriate access controls for sensitive salary, contact, and account information.

## 4.6 Edit, Deactivate, and Delete Employee

Provide clear actions for:
- Editing employee details.
- Changing a role.
- Changing kitchen category.
- Updating compensation.
- Deactivating an employee.
- Reactivating an employee.
- Removing an employee record when permitted.

Use confirmation dialogs for consequential actions.

Explain the implications of deactivation, including preventing future sign-in while preserving historical work, rating, and payroll records.

Prefer deactivation or archival over permanently deleting employees with associated business records.

## 4.7 Staff Performance Overview

Include a detailed performance comparison view with:
- Employee name and role.
- Average rating.
- Review count.
- Hours worked.
- Attendance metrics, if available.
- Relevant role-specific performance indicators.
- Escalation count.
- Trend over the selected period.

Allow filtering by role and date range.

Do not compare kitchen staff and waiters using the same metrics without accounting for their different responsibilities.

# 5. Module Three — Reviews & Ratings

Create a dedicated module for managing the restaurant's reputation and customer feedback.

## 5.1 Reviews Overview

Display:
- Average restaurant rating.
- Total review count.
- Rating distribution.
- Reviews received during the selected period.
- Unanswered reviews.
- Recent rating trend.

Use a five-star distribution chart and a restrained time-series chart.

## 5.2 Reviews Directory

Each review row should include:
- Customer display name, where available.
- Rating.
- Review text.
- Review date.
- Related order or visit reference, if available.
- Related food item, if available.
- Related employee, if available.
- Response status.
- Action to view details.

Filters:
- Rating.
- Date range.
- Response status.
- Food item.
- Employee.
- Review source, if applicable.

## 5.3 Review Details

Create a detail panel containing:
- Full review.
- Rating.
- Customer information available to the restaurant.
- Related order reference.
- Relevant employee or item association.
- Previous owner responses.
- Internal notes, if supported.

Include an owner response composer with:
- Text input.
- Character count.
- Preview.
- Submit Response button.
- Edit Response action where supported.

Make it clear whether a response is public or internal.

## 5.4 Review Management States

Include:
- New review.
- Response pending.
- Responded.
- Flagged for investigation.
- No reviews yet.
- Failed response submission.

Do not imply that reviews from third-party platforms can be edited or answered directly unless an integration supports it.

# 6. Module Four — Restaurant Policies & Rules

Create a central module for the restaurant's rules, policies, and guidelines.

This module must distinguish customer-facing policies from internal employee policies.

## 6.1 Policy Overview

Display separate sections:

**Customer Policies**
- Cancellation and refund policy.
- Reservation policy, if relevant.
- Ordering and payment rules.
- Customer conduct.
- Privacy and data-use notice.
- Terms of service for the restaurant's ordering experience.

**Staff Policies**
- Workplace conduct.
- Attendance and punctuality.
- Hygiene and food-safety procedures.
- Customer-service standards.
- Workplace safety.
- Escalation and incident reporting.
- Compensation and leave policy references.

These are policy-management categories, not prewritten legal advice.

## 6.2 Policy Directory

Display:
- Policy title.
- Policy category.
- Audience.
- Version.
- Last updated.
- Publication status.
- Last edited by.
- Actions.

Provide search and category filters.

## 6.3 Create or Edit Policy

Fields:
- Policy title.
- Category.
- Intended audience.
- Policy content using a structured rich-text editor.
- Effective date.
- Version information.
- Status: Draft, Published, or Archived.
- Optional internal notes.

Include:
- Save Draft.
- Preview.
- Publish.
- Archive.

Before publishing a customer-facing policy, show a preview of how it will appear to customers.

Before publishing a staff policy, show the intended audience and whether acknowledgement is required.

## 6.4 Policy Acknowledgements

For staff policies that require acknowledgement, show:
- Policy name.
- Employees required to acknowledge.
- Acknowledged count.
- Pending count.
- Individual acknowledgement status.
- A reminder action.

Do not imply that employees have read a policy unless an acknowledgement record exists.

Include empty states for restaurants that have not created any policies.

# 7. Module Five — Public Relations & Brand Presence

Create a dedicated PR workspace for maintaining the restaurant's public-facing brand information and social-media presence.

This module is for restaurant reputation and public communication, not for customer reviews, which belong in the Reviews & Ratings module.

## 7.1 PR Overview

Display:
- Restaurant public profile status.
- Connected social accounts, if supported.
- Recent published updates.
- Draft content.
- Pending posts.
- Profile completeness.
- Recent public communication activity.

Do not invent social engagement statistics or imply that a social account is connected when it is not.

## 7.2 Restaurant Profile

Allow the owner to manage:
- Public restaurant name.
- Short description.
- Restaurant logo.
- Cover image.
- Contact information intended for public display.
- Public website.
- Social-media links.
- Brand colors where supported.

Include a preview of the public restaurant profile.

## 7.3 Social-Media Attachments

Create a social-profile management section supporting illustrative entries for:
- Instagram.
- Facebook.
- YouTube.
- LinkedIn.
- Other website or social links.

For each entry, include:
- Platform.
- Profile URL.
- Display label.
- Connection status.
- Add, edit, and remove actions.

Distinguish a saved profile link from an authenticated account integration. Do not present a simple URL attachment as a connected publishing account.

## 7.4 Announcements and Content

Include a lightweight content workspace for:
- Restaurant announcements.
- Special-event updates.
- General public communications.
- Promotional content drafts.

Fields:
- Content title.
- Message.
- Optional image attachment.
- Destination channel.
- Draft or published status.
- Publication date, where supported.

Include a content preview and a Save Draft action.

If actual social publishing is not integrated, label the publishing control as unavailable or as a future integration. Do not fabricate successful publication.

# 8. Module Six — Staff Escalations

Create a dedicated escalation-management module for workplace concerns, operational incidents, complaints, and other issues raised by staff.

## 8.1 Escalation Overview

Show:
- Total escalations.
- Open cases.
- High-priority cases.
- Cases under review.
- Resolved cases.
- Average resolution time, if recorded.

Use neutral status indicators and emphasize only urgent unresolved issues.

## 8.2 Escalation Directory

Each record should contain:
- Escalation ID.
- Title.
- Reporting employee.
- Employee role.
- Category.
- Priority.
- Submission date.
- Assigned reviewer.
- Current status.
- Last updated.

Provide filters for:
- Status.
- Priority.
- Category.
- Reporting employee.
- Assigned reviewer.
- Date range.

## 8.3 Escalation Categories

Include:
- Workplace conflict.
- Harassment or misconduct.
- Safety concern.
- Customer incident.
- Payroll or compensation concern.
- Attendance or scheduling concern.
- Equipment or operational issue.
- Other.

## 8.4 Escalation Details

Create a dedicated case detail page containing:
- Escalation title and ID.
- Reporting employee.
- Description.
- Category and priority.
- Submission timestamp.
- Attachments, if provided.
- Assigned reviewer.
- Case status.
- Internal notes.
- Timeline of status changes and actions.

Provide actions:
- Assign Reviewer.
- Change Priority.
- Add Internal Note.
- Request More Information.
- Mark Under Review.
- Resolve Case.
- Reopen Case, where permitted.

For resolution, include a resolution summary and timestamp.

## 8.5 Confidentiality

Treat sensitive escalations as restricted records.

Include clear visibility indicators and a discreet detail layout. Avoid exposing sensitive allegations or personal information in dashboard summaries and notifications.

Include an empty state and examples of open, under-review, and resolved cases.

# 9. Module Seven — AI Business Assistant

Create a dedicated AI assistant workspace for restaurant owners.

The purpose is to let the owner ask questions about restaurant performance and eventually receive insights grounded in the restaurant's data.

**This is a UI prototype only. The AI pipeline will be implemented later.**

## 9.1 Assistant Layout

Create a conversational workspace with:
- Page title: “DineFlow AI Assistant”.
- Short description explaining its intended role.
- Conversation history sidebar or drawer.
- Main chat conversation area.
- Message input.
- Send button.
- New Conversation action.
- Clear loading and error states.

Use a professional interface, not a playful consumer chatbot.

## 9.2 Suggested Questions

Display suggested prompts such as:
- “How is my restaurant performing this month?”
- “Which staff members have the highest ratings?”
- “What are my recent sales trends?”
- “Which food items receive the best ratings?”
- “What issues require my attention?”
- “How has customer satisfaction changed?”

These should be clickable prompt suggestions in the prototype.

## 9.3 Chat Messages

Support visual representations of:
- Owner messages.
- AI responses.
- Thinking/loading indicator.
- Failed response with Retry.
- Empty conversation.
- Conversation history.

AI responses should use readable paragraphs, concise summaries, and structured sections.

## 9.4 AI Response Structure

Design a sample response containing:

**Summary**

A concise answer to the owner's question.

**Supporting Insights**

A small number of relevant observations, such as sales movement, review trends, or workforce ratings.

**Data References**

A dedicated reference area below the response showing where each insight originated.

Examples:
- Sales Analytics — Selected monthly period.
- Reviews & Ratings — Recent customer reviews.
- Staff Performance — Selected reporting period.
- Escalations — Open cases.

Each reference should include:
- Source module.
- Relevant date range, where applicable.
- A clickable-looking View Source action.
- A short explanation of what supports the response.

Keep source references visually distinct from the AI's natural-language answer.

**Recommended Actions**

Optional, clearly labelled suggestions based on the sample response.

Do not display unsupported facts as verified findings. Mark prototype data and illustrative AI responses appropriately.

## 9.5 Contextual AI Components

Support future visualization patterns such as:
- Small trend charts.
- Metric summaries.
- Review summaries.
- Staff performance comparisons.
- Escalation summaries.

Keep these as optional components within a conversation. Do not turn every response into a dashboard.

## 9.6 AI Safety and Transparency

Include a restrained notice that business insights depend on available restaurant data.

Design for:
- No data available.
- Insufficient information.
- Failed generation.
- Loading.
- Successful response.
- Source references unavailable.

Do not invent live AI functionality. No backend, model configuration, or pipeline implementation is required in Stitch.

# 10. Module Eight — Top Performers

Create a dedicated performance leaderboard for identifying highly rated employees and food items.

Keep employee performance and food-item performance in separate tabs within the same module.

## 10.1 Staff Leaderboard

Display:
- Employee name.
- Role.
- Kitchen category, where relevant.
- Average rating.
- Number of reviews.
- Rating trend.
- Relevant role-specific performance indicator.
- Reporting period.

Allow filtering by role, employee, and date range.

Provide an employee-detail entry point that opens the corresponding staff profile.

Use a transparent ranking method. Do not treat an employee with one five-star review as definitively better than an employee with many consistently positive reviews.

Display review count alongside the average rating.

## 10.2 Food Item Leaderboard

Display:
- Food item name.
- Associated category.
- Average customer rating.
- Number of ratings.
- Rating trend.
- Menu price, if available.
- Sales volume, if available.
- Review highlights.

Allow sorting by:
- Highest average rating.
- Most reviews.
- Most ordered.
- Largest rating improvement.

Keep rating, popularity, and sales performance distinct. An item with the highest rating is not necessarily the best-selling item.

## 10.3 Leaderboard Filters

Include:
- Reporting period.
- Role or kitchen category.
- Rating threshold.
- Minimum review count.

Show an informative empty state if insufficient data exists to create a reliable ranking.

# 11. Module Nine — Sales Analytics

Create a dedicated business intelligence workspace for understanding restaurant revenue, order volume, and sales trends.

The interface must be analytical and information-dense enough for business use without becoming cluttered.

## 11.1 Analytics Header

Include:
- Page title: Sales Analytics.
- Date-range selector.
- Comparison period.
- Refresh action.
- Export action, shown as a prototype control.

## 11.2 Key Metrics

Display:
- Total Sales.
- Order Count.
- Average Order Value.
- Average Sales per Day.
- Refund Amount, if recorded.
- Discounts, if recorded.

Clearly define whether a metric represents gross sales, net sales, or another measure.

Do not label revenue as profit unless costs are available and profit is calculated appropriately.

## 11.3 Sales Trend

Create a primary time-series chart with:
- Sales over time.
- Optional comparison with the previous period.
- Day, week, and month grouping.
- Hover details.
- Clearly labelled axes.

Use a line chart for trends and a restrained bar chart for period comparisons.

## 11.4 Order Analysis

Include:
- Order volume by day.
- Average order value.
- Order distribution by available service type.
- Peak ordering periods, if timestamps exist.

Do not include unsupported operational metrics.

## 11.5 Revenue Breakdown

Create a breakdown by:
- Day or week.
- Available service type.
- Menu category, if the required data exists.
- Food item, if item-level sales records exist.

Use a table when exact figures matter and charts when patterns matter.

## 11.6 Top-Selling Items

Include:
- Item name.
- Units sold.
- Sales value.
- Average rating, if available.
- Comparison with the previous period.

Keep sales ranking separate from the Top Performers module's rating ranking.

## 11.7 Data Quality and Empty States

Support:
- No sales data.
- Incomplete reporting period.
- Failed data refresh.
- Missing item-level information.
- Empty comparison period.

Show the selected date range and relevant metric definitions.

Do not fabricate real-time sales or imply that sample values are actual business records.

# 12. Module Ten — General Settings

Create a structured settings workspace for restaurant-wide configuration.

Use nested navigation inside the module rather than placing every setting on one long page.

## 12.1 Restaurant Profile

Fields:
- Restaurant name.
- Restaurant type.
- Description.
- Contact person.
- Contact number.
- Business email.
- Country.
- State or region.
- City.
- Street address.
- Postal code.
- Time zone.

Include Edit, Save Changes, and Cancel actions.

## 12.2 Account & Security

Include:
- Owner name.
- Owner email.
- Owner contact number.
- Change password.
- Active session information, if supported.
- Sign-out action.

Show confirmation states for security-sensitive actions.

## 12.3 Staff and Role Settings

Include:
- Role definitions.
- Kitchen staff categories.
- Default employment classifications.
- Staff account activation defaults.
- Manager allocation indicator with the maximum of two managers.
- Staff access and credential policy summary.

Do not allow the manager limit to be bypassed through settings.

## 12.4 Notifications

Create preferences for:
- New customer reviews.
- Low ratings.
- Staff escalations.
- Critical unresolved cases.
- Staff account and credential-delivery issues.
- Sales summaries.
- AI insight notifications, when available.

Provide channel preferences such as in-app, email, and WhatsApp only where the relevant channel is supported.

Include save confirmation and disabled-channel states.

## 12.5 Business Preferences

Include:
- Reporting currency.
- Time zone.
- Date format.
- Number format.
- Default analytics reporting period.

Changing a reporting preference should not imply that historical transaction records have been rewritten.

## 12.6 Public Profile Preferences

Include:
- Public restaurant name.
- Public description.
- Contact visibility.
- Social-profile links.
- Public profile visibility, where supported.

Do not include menu editing or table configuration in this settings page.

## 12.7 General Preferences

Include:
- Light, dark, and system theme selection.
- Language preference, if supported.
- Default landing page after sign-in.
- Confirmation preferences for destructive actions.

## 12.8 Audit and Activity History

Create a read-only activity table showing important owner-level actions:
- Employee creation and updates.
- Role changes.
- Employee deactivation.
- Policy publication.
- Restaurant profile changes.
- Escalation status changes.
- Settings updates.

Include actor, action, affected record, timestamp, and relevant details.

Do not include passwords, temporary credentials, or sensitive escalation contents in the audit table.

## 12.9 Account and Restaurant Administration

Include clearly separated actions for:
- Sign out.
- Request account support.
- Request restaurant deactivation or closure.

Show appropriate confirmation dialogs for consequential actions. Do not implement destructive workflows in the prototype.

# 13. Global Search, Notifications, and Shared Interaction Patterns

## Global Search

Design a searchable overlay that can locate:
- Employees.
- Employee IDs.
- Restaurant reviews.
- Escalation records.
- Policies.
- Relevant settings.

Group results by module and show a clear empty state.

Only expose records the owner is authorized to view.

## Notification Center

Include:
- Unread count.
- Notification title.
- Short description.
- Timestamp.
- Related module.
- Read/unread state.
- Mark as Read.
- Mark All as Read.

Examples may include a new one-star review, an unresolved escalation, or a failed WhatsApp credential delivery.

Use realistic sample notifications and distinguish urgent issues from ordinary updates.

## Shared Tables

All relevant directory tables should support:
- Search.
- Filtering.
- Sorting.
- Pagination.
- Clear empty states.
- Row actions.
- Responsive presentation.

Avoid cramming every possible field into the main table. Use detail pages for secondary information.

## Shared Forms and Dialogs

Design consistent patterns for:
- Add and edit forms.
- Confirmation dialogs.
- Validation errors.
- Success feedback.
- Loading states.
- Failed submissions.
- Empty states.
- Permission or availability restrictions.

All interactive-looking controls must have a coherent purpose and a visually represented state.

# 14. Data and Business Rules

Apply these rules consistently across the entire owner experience:

1. A restaurant can have no more than two managers.
2. Managers, waiters, cleaners, and kitchen staff belong to one Staff Management module.
3. Kitchen staff have their own categories.
4. The owner can view individual employee performance, ratings, work hours, salary information, and available activity history.
5. Staff credentials are managed through a dedicated, security-conscious account setup flow with WhatsApp delivery status.
6. Customer reviews and employee ratings must be distinguishable.
7. Employee performance metrics must be relevant to the employee's role.
8. Staff leaderboard rankings should account for review volume.
9. Food-item ratings and food-item sales rankings must remain separate.
10. Sales figures must distinguish revenue from profit.
11. Escalations require a clear status, priority, and resolution history.
12. Policies must distinguish customer-facing rules from internal staff policies.
13. PR profile links must be distinguished from authenticated social integrations.
14. AI-generated business insights should include traceable data references when available.
15. Missing data must be shown as unavailable or not yet recorded, never fabricated.
16. Sensitive employee, salary, credential, and escalation information must be handled discreetly.
17. Empty, loading, error, and success states must be designed for every relevant module.

# 15. Prototype Scope and Deliverables

Create a cohesive owner application containing:

- Owner dashboard overview.
- Staff Management with employee categories, CRUD forms, employee details, credentials, and performance.
- Reviews & Ratings.
- Restaurant Policies & Rules.
- Public Relations & Brand Presence.
- Staff Escalations.
- AI Business Assistant with chat, responses, and source references.
- Top Performers with staff and food-item leaderboards.
- Sales Analytics.
- General Settings with nested settings pages.

For each module, design its main page and the important nested pages, forms, dialogs, and relevant states described in this prompt.

The pages must share the same navigation shell and design system.

Use realistic illustrative data to demonstrate tables, charts, ratings, staff records, and analytics. Clearly treat it as prototype content.

Do not design:
- Customer-facing ordering application.
- Waiter dashboard.
- Kitchen staff dashboard.
- Manager dashboard.
- Full menu-management module.
- Live kitchen display system.
- Table floor-plan management.
- Production payment integration.
- Backend services, database schemas, or API architecture.

These can be designed independently in subsequent iterations.

# 16. Quality Acceptance Criteria

The final design must:
- Feel like a premium, credible restaurant SaaS application.
- Maintain consistent DineFlow branding.
- Support both light and dark themes across every module.
- Include detailed nested views, not just high-level landing pages.
- Represent all specified business rules and staff categories.
- Use appropriate tables, charts, forms, detail pages, and confirmation dialogs.
- Provide realistic empty, loading, error, and success states.
- Be responsive across desktop, tablet, and mobile.
- Keep the navigation understandable despite the large number of capabilities.
- Avoid visual clutter and generic AI-generated component repetition.

**Prioritize a coherent, deeply designed owner workspace over creating many shallow screens. Every module should have a clear purpose, a useful main view, and the detailed subpages needed to perform its intended tasks.**