# DineFlow End-to-End User Flows

This document defines the main user journeys for every role in the application.

## 1. Customer flow

```mermaid
flowchart TD
    A[Customer scans QR code] --> B[Open restaurant menu]
    B --> C[Browse categories]
    C --> D[Select food item]
    D --> E[Customize options/add-ons]
    E --> F[Add to cart]
    F --> G{More items?}
    G -- Yes --> D
    G -- No --> H[Checkout]
    H --> I[Enter table/customer session info]
    I --> J{Payment required?}
    J -- Yes --> K[Pay via Razorpay]
    K --> L[Order created]
    J -- No --> L
    L --> M[Kitchen receives order]
    M --> N[Preparing]
    N --> O[Ready]
    O --> P[Waiter serves food]
    P --> Q[Order completed]
    Q --> R[Review and rating]
```

## 2. Restaurant owner flow

```mermaid
flowchart TD
    A[Visit marketing site] --> B[Create account]
    B --> C[Create restaurant]
    C --> D[Set branding and theme]
    D --> E[Add tables]
    E --> F[Create categories and menu]
    F --> G[Add staff]
    G --> H[Generate QR codes]
    H --> I[Launch restaurant]
    I --> J[Owner dashboard]
    J --> K[Monitor orders]
    K --> L[Review sales and analytics]
    L --> M[Adjust menu or promotions]
```

## 3. Restaurant manager flow

```mermaid
flowchart TD
    A[Login as manager] --> B[Open dashboard]
    B --> C[Review daily sales]
    C --> D[Check active tables]
    D --> E[Review orders by status]
    E --> F[Assign waiters]
    F --> G[Monitor kitchen load]
    G --> H[Resolve delays or cancellations]
    H --> I[Update staff schedule or menu availability]
```

## 4. Kitchen staff flow

```mermaid
flowchart TD
    A[Login as kitchen staff] --> B[Open kitchen queue]
    B --> C[View new orders]
    C --> D{Accept order?}
    D -- Yes --> E[Mark as preparing]
    E --> F[Cook food]
    F --> G[Mark as ready]
    G --> H[Notify waiter]
    D -- No --> I[Queue remains pending]
```

## 5. Waiter flow

```mermaid
flowchart TD
    A[Login as waiter] --> B[See assigned tables]
    B --> C[Receive ready order alert]
    C --> D[Pick up order]
    D --> E[Deliver to table]
    E --> F[Mark order served]
    F --> G[Update table status]
    G --> H[Complete service for the table]
```

## 6. Platform admin flow

```mermaid
flowchart TD
    A[Login as platform admin] --> B[View all tenants]
    B --> C[Review restaurant health]
    C --> D[Check subscriptions and billing]
    D --> E[Monitor system performance]
    E --> F[Review AI safety and evaluation logs]
    F --> G[Manage support issues]
    G --> H[Take corrective action]
```

## 7. End-to-end order lifecycle

```mermaid
flowchart LR
    A[Order created] --> B[Payment pending]
    B --> C[Confirmed]
    C --> D[Accepted by kitchen]
    D --> E[Preparing]
    E --> F[Ready]
    F --> G[Assigned to waiter]
    G --> H[Served]
    H --> I[Completed]

    B --> X[Cancelled]
    B --> Y[Failed]
    I --> Z[Review left]
```

## 8. System event flow

```mermaid
flowchart LR
    A[Customer order event] --> B[Order Service]
    B --> C[Kafka event bus]
    C --> D[Kitchen service]
    C --> E[Notification service]
    C --> F[Analytics service]
    C --> G[AI recommendation service]
```

This event model is the backbone for real-time UI updates and operational visibility.
