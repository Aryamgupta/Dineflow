# DineFlow UI Design Blueprint

This document defines the basic user-facing design of the application so the implementation can follow a consistent product flow.

## 1. Product UX principles

- Mobile-first customer experience
- Fast table ordering without app installation
- Minimal friction for restaurant staff
- Clear status flows for kitchen and waiters
- Professional SaaS dashboard for owners and admins
- Visual hierarchy based on restaurant branding and action intensity

## 2. Core design system

### Visual language

- Primary color: warm orange / coral for food ordering energy
- Secondary color: dark charcoal for product UI and analytics
- Backgrounds: cream / light neutral
- Accent: yellow for highlights, badges, or metrics
- Card radius: medium-rounded cards for a modern SaaS feel
- Component style: soft shadows, subtle borders, clean whitespace

### Typography

- Headings: bold and large for table numbers, menu items, analytics titles
- Body: clean sans-serif for menu descriptions and admin content
- Small text: labels, metadata, status pills, timestamps

## 3. Primary screen set

### A. Public landing page

Purpose: convert restaurant owners into SaaS users.

Sections:

1. Hero section
   - headline: "Power every table with smarter ordering"
   - CTA: "Get started", "Book demo"
   - hero mockup: restaurant dashboard preview
2. Features grid
   - QR ordering
   - menu management
   - kitchen flow
   - analytics and insights
3. Pricing cards
   - Free, Growth, Pro
4. Why DineFlow
   - multi-tenancy, real-time updates, AI recommendations
5. Final CTA
   - Start free trial

### B. Owner onboarding flow

Visual flow:

- Create account
- Create restaurant
- Add branding
- Setup tables
- Add categories and menu items
- Add staff
- Generate QR codes
- Launch restaurant

Each step appears as a card with a progress indicator on top.

### C. Owner dashboard

Top section:

- revenue today
- total orders
- active tables
- average order value

Main sections:

- recent orders panel
- top selling items panel
- live dining tables panel
- operational alerts panel
- AI assistant card

### D. Menu management screen

Layout:

- left sidebar: categories
- center pane: list of menu items
- right panel: selected item details

Fields:

- name
- description
- price
- category
- image
- veg / non-veg
- spice level
- prep time
- ingredients
- allergens
- availability
- options and add-ons

### E. Table and QR management

Displaying:

- table map or list
- table number
- status: available / occupied / reserved
- QR code preview
- table link such as: /r/royal-spice/t/T12

### F. Customer ordering page

Mobile-first layout.

Top bar:

- restaurant name
- table number
- cart badge

Content:

- category tabs
- menu cards with image, name, price, rating
- item details bottom sheet or modal for addons and comments

Checkout panel:

- items
- quantity controls
- subtotal
- tax
- service charge
- total
- pay button

### G. Kitchen dashboard

Columns:

- New Orders
- Preparing
- Ready
- Completed

Each card contains:

- order number
- table number
- short list of menu items
- ETA
- accept/mark ready controls

### H. Waiter dashboard

Layout:

- left panel: assigned tables
- center: active orders
- right: delivery status

Actions:

- accept assignment
- pick up order
- mark served
- complete table

### I. Platform admin dashboard

Analytics cards:

- total restaurants
- active subscriptions
- revenue
- support issues

Panels:

- restaurant health overview
- payment status
- plan usage
- AI evaluation summary

## 4. Example screen layouts

### Customer menu card layout

```text
+--------------------------------------------------+
| Royal Spice                 Table T12   [Cart 3] |
|--------------------------------------------------|
| Starters | Main Course | Breads | Desserts       |
|--------------------------------------------------|
| [image] Paneer Tikka        ₹280         +        |
| Lightly spiced, grilled cottage cheese          |
|--------------------------------------------------|
| [image] Butter Naan         ₹80          +        |
| Soft Indian bread                               |
|--------------------------------------------------|
| [image] Paneer Butter Masala ₹320            +   |
| Rich creamy curry                               |
+--------------------------------------------------+
```

### Owner dashboard layout

```text
+------------------------------------------------------------------+
| DineFlow                    Search     + New Order   Profile      |
|------------------------------------------------------------------|
| Revenue Today ₹18,420   Orders 148   Active Tables 12   AOV ₹124 |
|------------------------------------------------------------------|
| Recent Orders       | Top Selling        | Live Tables         |
| #108 T12 2 items   | Paneer Tikka       | T1 occupied         |
| #109 T5 4 items     | Butter Naan        | T2 available         |
| #110 T7 1 item      | Raita              | T3 occupied         |
|--------------------|--------------------|----------------------|
| AI Assistant: "Promote combo dishes this evening"               |
+------------------------------------------------------------------+
```

### Kitchen board layout

```text
+--------------------------------------------------------------+
| New Orders      | Preparing       | Ready            |
| #104 T12        | #101 T5         | #97 T9           |
| Paneer Tikka    | Paneer Tikka    | Biryani          |
| Butter Naan      | Dal Makhani     | Raita            |
| [Accept]        | [Ready]         | [Serve]          |
+--------------------------------------------------------------+
```

## 5. Implementation guidance

- Build the customer ordering screens first in mobile style.
- Use a tablet-friendly layout for kitchen and waiter views.
- Keep restaurant owner/admin views desktop-first.
- Use real restaurant branding tokens for every screen: name, colors, logo.
- Keep the same status model everywhere: created → payment → confirmed → preparing → ready → served → completed.

## 6. Design priorities for the first release

1. Owner onboarding and config
2. Restaurant menu editing
3. Customer QR ordering flow
4. Kitchen order queue
5. Waiter delivery lifecycle
6. Payment flow and order tracking
7. Analytics and AI assistant

These screens should be designed first because they cover the MVP and validate the core product value.
