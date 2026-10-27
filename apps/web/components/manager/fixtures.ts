/**
 * DineFlow Manager Dashboard Development Fixtures
 *
 * NOTICE: All data below represents simulated operational demo fixtures
 * for visual development and testing. These are NOT live production metrics.
 */

export interface ManagerKpiMetric {
  id: string;
  label: string;
  value: string;
  subValue?: string;
  caption: string;
  statusBadge: {
    label: string;
    variant: 'neutral' | 'success' | 'warning' | 'danger';
    pulse?: boolean;
  };
  icon: string;
}

export interface NeedsAttentionItem {
  id: string;
  level: 'critical' | 'warning' | 'info';
  levelLabel: string;
  title: string;
  elapsed: string;
  summary: string;
  meta: string;
  metaIcon: string;
  primaryAction: string;
  secondaryAction: string;
}

export interface ManagerOrderTicket {
  id: string;
  tableLabel: string;
  statusLabel: string;
  statusVariant: 'danger' | 'success' | 'neutral';
  elapsedTime: string;
  tag?: string;
  server: string;
  station: string;
  itemsSummary: string;
  courseStep: string;
  progressPercent: number;
  chefNote?: string;
  canExpedite?: boolean;
  canComp?: boolean;
}

export type TableNodeStatus = 'seated' | 'available' | 'needs_clean' | 'alert';

export interface TableNode {
  id: string;
  label: string;
  section: 'Main Floor' | 'Mezzanine VIP' | 'Patio Garden';
  capacity: number;
  status: TableNodeStatus;
  server?: string;
  partyName?: string;
  elapsedTime?: string;
  details?: string;
}

export interface UpcomingArrival {
  time: string;
  name: string;
  partySize: number;
  isVip?: boolean;
  table: string;
  statusTag: string;
}

export interface CleaningTask {
  id: string;
  table: string;
  cleanerName: string;
  elapsed: string;
  priority: 'Urgent' | 'Standard';
  status: 'assigned' | 'queued';
  availableCleaners?: string;
}

export interface StaffStationLoad {
  id: string;
  name: string;
  role: string;
  loadLabel: string;
  statusVariant: 'success' | 'warning' | 'primary';
  tablesActive?: number;
  avgTime?: string;
}

export interface OperationalBenchmark {
  label: string;
  metric: string;
  target: string;
  statusVariant: 'success' | 'primary';
}

export const managerOverviewFixtures = {
  venue: {
    name: 'The Rustic Oak — Downtown',
    address: 'Flagship Venue • Main Floor & Mezzanine',
    generalManager: 'Mark Santos',
    shiftName: 'Shift B Service',
    shiftPhase: 'Dinner Rush',
    shiftWindow: '16:30 – 23:30',
    capacityRate: '86% Capacity (24/28 Occupied)',
    ticketDelay: '0m nominal',
    lastSyncTime: 'Local Snapshot Loaded',
  },

  kpis: [
    {
      id: 'active-orders',
      label: 'Active Orders',
      value: '38',
      subValue: 'in-flight',
      caption: '$2,840.00 volume',
      statusBadge: { label: '3 Delayed (>18m)', variant: 'danger', pulse: true },
      icon: 'skillet',
    },
    {
      id: 'table-occupancy',
      label: 'Table Occupancy',
      value: '24/28',
      subValue: '86% Cap',
      caption: '4 Available • 6 Turns',
      statusBadge: { label: 'Steady Inflow', variant: 'success' },
      icon: 'chair',
    },
    {
      id: 'reservations',
      label: 'Reservations',
      value: '14',
      subValue: 'parties (90m)',
      caption: '2 VIP arrivals imminent',
      statusBadge: { label: '1 Conflict', variant: 'warning' },
      icon: 'event_seat',
    },
    {
      id: 'cleaning-queue',
      label: 'Cleaning Queue',
      value: '3',
      subValue: 'pending reset',
      caption: '3 active cleaners',
      statusBadge: { label: '1 Overdue (>6m)', variant: 'warning' },
      icon: 'cleaning_services',
    },
    {
      id: 'guest-queries',
      label: 'Guest Queries',
      value: '2',
      subValue: 'urgent flags',
      caption: 'T14 Allergen • T9 Delay',
      statusBadge: { label: 'Action Req.', variant: 'danger', pulse: true },
      icon: 'support_agent',
    },
    {
      id: 'staff-on-duty',
      label: 'Staff on Duty',
      value: '17',
      subValue: 'on floor',
      caption: 'FOH: 8 • KTH: 6 • CLN: 3',
      statusBadge: { label: '100% Stationed', variant: 'success' },
      icon: 'groups',
    },
  ] as ManagerKpiMetric[],

  exceptions: [
    {
      id: 'exc-1',
      level: 'critical',
      levelLabel: 'Critical Allergen',
      title: 'Table 14 — Gluten Allergen Clarification Flagged by POS',
      elapsed: 'Elapsed: 4.2m',
      summary: 'Order #DF-9031 • Table 14 • Chef Marcella Blanc holds ticket pending manager verification of Kitchen Cross-Contamination protocol on Pan-Seared Halibut puree.',
      meta: 'Guest notes: Severe Celiac disease. Server: Julian Rivera',
      metaIcon: 'notification_important',
      primaryAction: 'Open Protocol Checklist (Demo)',
      secondaryAction: 'Inspect Ticket Details',
    },
    {
      id: 'exc-2',
      level: 'warning',
      levelLabel: 'Turnover Alert',
      title: 'Table 7 — Cleaning Turnaround Overdue (8.4m since departure)',
      elapsed: 'Overdue: +3.4m',
      summary: 'Party of 4 (The Miller Party) is waiting at vestibule. Cleaner auto-dispatch sent to Carlos Mendez 6 minutes ago; pending acknowledgement.',
      meta: 'Target reset SLA: 5.0m • Hostess notified',
      metaIcon: 'nest_clock_farsight_analog',
      primaryAction: 'Simulate Cleaner Reassignment (Demo)',
      secondaryAction: 'Simulate Force Ready (Demo)',
    },
    {
      id: 'exc-3',
      level: 'info',
      levelLabel: 'AI Optimization',
      title: 'Reservation Conflict — Booth 4 (19:45 vs 20:00 Party of 6)',
      elapsed: 'Pacing Delta: +15m',
      summary: 'Current table dining pacing indicates occupants are lingering for dessert. DineFlow AI suggests re-seating incoming 20:00 party to Mezzanine M-2 (ready in 6m).',
      meta: '99.2% probability of zero wait time if reassigned',
      metaIcon: 'psychology',
      primaryAction: 'Simulate AI Reassignment (Demo)',
      secondaryAction: 'View Floor Map',
    },
  ] as NeedsAttentionItem[],

  orderTickets: [
    {
      id: '#DF-9038',
      tableLabel: 'Table 12 (Main)',
      statusLabel: 'DELAYED (+6m)',
      statusVariant: 'danger',
      elapsedTime: '24m',
      tag: 'VIP 25th Anniversary',
      server: 'Julian Rivera',
      station: 'Hearth Meats (Station 1)',
      itemsSummary: '2x Dry Aged Ribeye, 1x Duck Breast',
      courseStep: 'Course 2: Finishing & Sauce Glaze',
      progressPercent: 92,
      chefNote: 'Chef note: Resting beef prior to carving',
      canExpedite: true,
      canComp: true,
    },
    {
      id: '#DF-9031',
      tableLabel: 'Table 14 (Main)',
      statusLabel: 'DELAYED (+3m)',
      statusVariant: 'danger',
      elapsedTime: '21m',
      tag: 'Allergen Hold: Celiac',
      server: 'Julian Rivera',
      station: 'Sauté & Fish Station',
      itemsSummary: 'Pan-Seared Halibut with Celiac Puree',
      courseStep: 'Course 1: Allergen Verification Check',
      progressPercent: 85,
      chefNote: 'Ticket held pending manager protocol check',
      canExpedite: true,
      canComp: false,
    },
    {
      id: '#DF-9029',
      tableLabel: 'Table 9 (Main)',
      statusLabel: 'DELAYED (+2m)',
      statusVariant: 'danger',
      elapsedTime: '20m',
      tag: 'Birthday Party (6)',
      server: 'Elena Vance',
      station: 'Pasta & Entrée Station',
      itemsSummary: '3x Truffle Tagliatelle, 2x Osso Buco',
      courseStep: 'Course 2: Plating & Garnish',
      progressPercent: 90,
      chefNote: 'Fresh pasta drop completed; plating final course',
      canExpedite: true,
      canComp: true,
    },
    {
      id: '#DF-9041',
      tableLabel: 'Table 4 (Patio)',
      statusLabel: 'In Window',
      statusVariant: 'success',
      elapsedTime: '14m',
      server: 'Elena Vance',
      station: 'Garde Manger & Raw Bar',
      itemsSummary: 'Hamachi Crudo, Burrata, House Focaccia',
      courseStep: 'Appetizers Plated • Ready for Runner',
      progressPercent: 80,
    },
    {
      id: '#DF-9045',
      tableLabel: 'Booth 2 (Main)',
      statusLabel: 'Firing Course 1',
      statusVariant: 'neutral',
      elapsedTime: '8m',
      server: 'Anthony Perez',
      station: 'Raw Bar Prep',
      itemsSummary: 'Oysters Rockefeller (12), Tuna Tartare',
      courseStep: 'Raw Bar Shucking',
      progressPercent: 35,
    },
    {
      id: '#CAT-102',
      tableLabel: 'Private Dining Suite',
      statusLabel: 'Course 1 Staged',
      statusVariant: 'success',
      elapsedTime: '18m',
      tag: '12 Guests • Promised: 20:15',
      server: 'Marcus Vance',
      station: 'Banquet & Wine Pairing Station',
      itemsSummary: 'Seasonal 5-Course Pairing Menu',
      courseStep: 'Course 1: Amuse-Bouche & Champagne Pour',
      progressPercent: 95,
      chefNote: 'Tasting menu wine pairing sequence underway',
    },
  ] as ManagerOrderTicket[],

  // Exactly 28 Table Nodes matching the 28 capacity: 16 Main Floor, 4 Mezzanine VIP, 8 Patio Garden
  tableNodes: [
    // Main Floor (16 Tables: 13 Seated, 1 Needs Clean T7, 2 Available T3, T6 = 14 Occupied/Turning, 2 Available)
    { id: 'T1', label: 'T1', section: 'Main Floor', capacity: 2, status: 'seated', server: 'Julian Rivera', partyName: 'Dine-in (2)', elapsedTime: '38m' },
    { id: 'T2', label: 'T2', section: 'Main Floor', capacity: 4, status: 'seated', server: 'Julian Rivera', partyName: 'Miller (4)', elapsedTime: '52m' },
    { id: 'T3', label: 'T3', section: 'Main Floor', capacity: 2, status: 'available', details: 'Clean & Sanitized (Walk-in ready)' },
    { id: 'T4', label: 'T4', section: 'Main Floor', capacity: 4, status: 'seated', server: 'Elena Vance', partyName: 'Chen (4)', elapsedTime: '14m' },
    { id: 'T5', label: 'T5', section: 'Main Floor', capacity: 2, status: 'seated', server: 'Julian Rivera', partyName: 'Dine-in (2)', elapsedTime: '26m' },
    { id: 'T6', label: 'T6', section: 'Main Floor', capacity: 2, status: 'available', details: 'Clean & Sanitized (Walk-in ready)' },
    { id: 'T7', label: 'T7', section: 'Main Floor', capacity: 4, status: 'needs_clean', details: 'Turnaround Overdue (+3.4m) • Assigned Carlos M.', server: 'Carlos Mendez assigned' },
    { id: 'T8', label: 'T8', section: 'Main Floor', capacity: 4, status: 'seated', server: 'Elena Vance', partyName: 'Hastings (4)', elapsedTime: '45m' },
    { id: 'T9', label: 'T9', section: 'Main Floor', capacity: 6, status: 'seated', server: 'Elena Vance', partyName: 'Birthday (6)', elapsedTime: '68m' },
    { id: 'T10', label: 'T10', section: 'Main Floor', capacity: 2, status: 'seated', server: 'Anthony Perez', partyName: 'Dine-in (2)', elapsedTime: '19m' },
    { id: 'T11', label: 'T11', section: 'Main Floor', capacity: 4, status: 'seated', server: 'Anthony Perez', partyName: 'Dine-in (3)', elapsedTime: '32m' },
    { id: 'T12', label: 'T12', section: 'Main Floor', capacity: 4, status: 'seated', server: 'Julian Rivera', partyName: 'VIP 25th Anniv (2)', elapsedTime: '24m' },
    { id: 'T14', label: 'T14', section: 'Main Floor', capacity: 4, status: 'alert', server: 'Julian Rivera', partyName: 'Allergen Hold (4)', elapsedTime: '21m', details: 'Severe Celiac - Cross-contamination check' },
    { id: 'B1', label: 'B1', section: 'Main Floor', capacity: 6, status: 'seated', server: 'Elena Vance', partyName: 'Dine-in (5)', elapsedTime: '62m' },
    { id: 'B2', label: 'B2', section: 'Main Floor', capacity: 6, status: 'seated', server: 'Anthony Perez', partyName: 'Corporate (6)', elapsedTime: '44m' },
    { id: 'B3', label: 'B3', section: 'Main Floor', capacity: 4, status: 'seated', server: 'Anthony Perez', partyName: 'Dine-in (4)', elapsedTime: '36m' },

    // Mezzanine VIP (4 Tables: 3 Seated, 1 Needs Clean M2 = 4 Occupied / 100% Full)
    { id: 'M1', label: 'M1', section: 'Mezzanine VIP', capacity: 4, status: 'seated', server: 'Marcus Vance', partyName: 'VIP Table (4)', elapsedTime: '55m' },
    { id: 'M2', label: 'M2', section: 'Mezzanine VIP', capacity: 6, status: 'needs_clean', details: 'Reset staged for 20:00 VIP Arrival • Maria R.', partyName: 'Staging for Sophia Chen' },
    { id: 'M3', label: 'M3', section: 'Mezzanine VIP', capacity: 4, status: 'seated', server: 'Marcus Vance', partyName: 'Wine Tasting (4)', elapsedTime: '80m' },
    { id: 'M4', label: 'M4', section: 'Mezzanine VIP', capacity: 6, status: 'seated', server: 'Marcus Vance', partyName: 'Executive Dinner (6)', elapsedTime: '40m' },

    // Patio Garden (8 Tables: 5 Seated, 1 Needs Clean P2, 2 Available P4, P8 = 6 Occupied, 2 Available)
    { id: 'P1', label: 'P1', section: 'Patio Garden', capacity: 4, status: 'seated', server: 'Elena Vance', partyName: 'Dine-in (4)', elapsedTime: '28m' },
    { id: 'P2', label: 'P2', section: 'Patio Garden', capacity: 4, status: 'needs_clean', details: 'Queued for reset (2.5m) • Maria R. available', server: 'Queued' },
    { id: 'P3', label: 'P3', section: 'Patio Garden', capacity: 2, status: 'seated', server: 'Anthony Perez', partyName: 'Dine-in (2)', elapsedTime: '15m' },
    { id: 'P4', label: 'P4', section: 'Patio Garden', capacity: 4, status: 'available', details: 'Open patio seating (Walk-in ready)' },
    { id: 'P5', label: 'P5', section: 'Patio Garden', capacity: 4, status: 'seated', server: 'Elena Vance', partyName: 'Dine-in (4)', elapsedTime: '34m' },
    { id: 'P6', label: 'P6', section: 'Patio Garden', capacity: 2, status: 'seated', server: 'Anthony Perez', partyName: 'Dine-in (2)', elapsedTime: '22m' },
    { id: 'P7', label: 'P7', section: 'Patio Garden', capacity: 4, status: 'seated', server: 'Anthony Perez', partyName: 'Dine-in (3)', elapsedTime: '50m' },
    { id: 'P8', label: 'P8', section: 'Patio Garden', capacity: 4, status: 'available', details: 'Open patio seating (Walk-in ready)' },
  ] as TableNode[],

  upcomingArrivals: [
    { time: '19:30', name: 'Mr. Hastings', partySize: 4, table: 'Table 8', statusTag: 'Confirmed SMS' },
    { time: '19:45', name: 'Sophia Chen', partySize: 6, isVip: true, table: 'Mezz M-2', statusTag: 'Bar Pre-Drink' },
    { time: '20:00', name: 'Dr. Aris', partySize: 2, table: 'Booth 1', statusTag: 'Turn Pending' },
  ] as UpcomingArrival[],

  // Exactly 3 cleaning tasks matching Cleaning Queue = 3 and 3 active cleaners
  cleaningTasks: [
    {
      id: 'cln-1',
      table: 'T7',
      cleanerName: 'Carlos Mendez',
      elapsed: '8.4m',
      priority: 'Urgent',
      status: 'assigned',
      availableCleaners: 'Overdue by +3.4m (Miller party waiting)',
    },
    {
      id: 'cln-2',
      table: 'P2',
      cleanerName: 'Unassigned',
      elapsed: '2.5m',
      priority: 'Standard',
      status: 'queued',
      availableCleaners: 'Maria R. (Idle), Jamal K. (Station B)',
    },
    {
      id: 'cln-3',
      table: 'M2',
      cleanerName: 'Maria R.',
      elapsed: '1.2m',
      priority: 'Standard',
      status: 'assigned',
      availableCleaners: 'Staging for Sophia Chen VIP (19:45)',
    },
  ] as CleaningTask[],

  // Staff on duty matching 17 total (FOH: 8, Kitchen: 6, Cleaning: 3)
  staffStationLoads: [
    {
      id: 'st-1',
      name: 'Station 1 — Julian Rivera',
      role: 'Head Server (FOH)',
      loadLabel: 'Peak Load',
      statusVariant: 'warning',
      tablesActive: 4,
    },
    {
      id: 'st-2',
      name: 'Station 2 — Elena Vance',
      role: 'Senior Server (FOH)',
      loadLabel: 'Optimal',
      statusVariant: 'success',
      tablesActive: 4,
    },
    {
      id: 'st-3',
      name: 'Station 3 — Anthony Perez',
      role: 'Floor Server (FOH)',
      loadLabel: 'Optimal',
      statusVariant: 'success',
      tablesActive: 4,
    },
    {
      id: 'st-4',
      name: 'Mezzanine & Private — Marcus Vance',
      role: 'VIP Captain (FOH)',
      loadLabel: 'Optimal',
      statusVariant: 'success',
      tablesActive: 4,
    },
    {
      id: 'st-5',
      name: 'Kitchen Expeditor — Marcella Blanc',
      role: 'Sous Chef / Expeditor (KTH)',
      loadLabel: 'Nominal Pace',
      statusVariant: 'primary',
      avgTime: '11.4m Ticket Avg',
    },
  ] as StaffStationLoad[],

  benchmarks: [
    { label: 'Table Turn Pace', metric: '44m avg', target: '(Target: 45m)', statusVariant: 'success' },
    { label: 'Kitchen Ticket-to-Pass', metric: '15.2m avg', target: '(On SLA)', statusVariant: 'success' },
    { label: 'Turnaround SLA', metric: '4.8m', target: '(Target <5m)', statusVariant: 'success' },
    { label: 'Recovery Rate', metric: '100%', target: '(2/2 within 10m)', statusVariant: 'success' },
  ] as OperationalBenchmark[],
};

// ============================================================================
// Phase 3: Detailed Floor & Kitchen Operational Models
// ============================================================================

export type KitchenStation = 'All' | 'Hearth & Grill' | 'Sauté & Fish' | 'Raw & Garde-Manger' | 'Pastry & Dessert' | 'Bar & Cellar';
export type KdsOrderStatus = 'received' | 'in_prep' | 'needs_expedite' | 'plating' | 'ready' | 'served';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  station: KitchenStation;
  course: 'Beverage' | 'Appetizer' | 'Entrée' | 'Dessert';
  modifiers?: string[];
  allergenAlert?: string;
  itemStatus: 'pending' | 'cooking' | 'ready';
}

export interface KdsOrder {
  id: string;
  orderNumber: string;
  table: string;
  section: string;
  serverName: string;
  guestCount: number;
  orderTime: string;
  elapsedMinutes: number;
  targetMinutes: number;
  status: KdsOrderStatus;
  items: OrderItem[];
  priority: 'normal' | 'rush' | 'delayed';
  chefNotes?: string;
  specialRequests?: string;
}

export interface DetailedReservation {
  id: string;
  guestName: string;
  partySize: number;
  scheduledTime: string;
  tableId: string;
  section: 'Main Floor' | 'Mezzanine VIP' | 'Patio Garden';
  status: 'confirmed' | 'seated' | 'late' | 'cancelled';
  isVip?: boolean;
  phone: string;
  occasion?: string;
  specialRequests?: string;
  spendEstimate?: string;
}

export interface DetailedCleaningTask {
  id: string;
  tableId: string;
  section: 'Main Floor' | 'Mezzanine VIP' | 'Patio Garden';
  priority: 'Critical' | 'Urgent' | 'Standard';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  cleanerName: string;
  cleanerId: string;
  assignedAt: string;
  elapsedMinutes: number;
  targetMinutes: number;
  turnaroundTarget: string;
  checklist: { id: string; label: string; done: boolean }[];
  sensorTrigger: string;
}

export const initialKdsOrders: KdsOrder[] = [
  {
    id: 'ord-9038',
    orderNumber: '#DF-9038',
    table: 'T12',
    section: 'Main Floor',
    serverName: 'Julian Rivera',
    guestCount: 2,
    orderTime: '19:18',
    elapsedMinutes: 24,
    targetMinutes: 18,
    status: 'needs_expedite',
    priority: 'delayed',
    chefNotes: 'Resting beef prior to carving; sauce reduction delayed on station 1',
    specialRequests: 'VIP 25th Anniversary — Complimentary Truffle Butter pairing',
    items: [
      { id: 'i1', name: '45-Day Dry Aged Bone-In Ribeye (18oz)', quantity: 2, station: 'Hearth & Grill', course: 'Entrée', modifiers: ['Medium-Rare', 'Bone Marrow Crust'], itemStatus: 'cooking' },
      { id: 'i2', name: 'Pan-Roasted Duck Breast with Cherry Jus', quantity: 1, station: 'Hearth & Grill', course: 'Entrée', modifiers: ['Crispy Skin', 'Parsnip Mousseline'], itemStatus: 'ready' },
      { id: 'i3', name: 'Charred Broccolini with Smoked Sea Salt', quantity: 1, station: 'Sauté & Fish', course: 'Entrée', itemStatus: 'ready' },
    ],
  },
  {
    id: 'ord-9031',
    orderNumber: '#DF-9031',
    table: 'T14',
    section: 'Main Floor',
    serverName: 'Julian Rivera',
    guestCount: 4,
    orderTime: '19:21',
    elapsedMinutes: 21,
    targetMinutes: 18,
    status: 'needs_expedite',
    priority: 'delayed',
    chefNotes: 'Ticket held pending manager allergen protocol check for cross-contact',
    specialRequests: 'Severe Celiac Disease (Guest 2) — Dedicated cookware used',
    items: [
      { id: 'i4', name: 'Pan-Seared Alaskan Halibut', quantity: 2, station: 'Sauté & Fish', course: 'Entrée', allergenAlert: 'CELIAC ALLERGEN', modifiers: ['Gluten-Free Puree', 'Clean Pan Protocol'], itemStatus: 'cooking' },
      { id: 'i5', name: 'Hand-Cut Prime Beef Tartare', quantity: 2, station: 'Raw & Garde-Manger', course: 'Appetizer', itemStatus: 'ready' },
      { id: 'i6', name: 'Heirloom Tomato & Burrata Salad', quantity: 2, station: 'Raw & Garde-Manger', course: 'Appetizer', itemStatus: 'ready' },
    ],
  },
  {
    id: 'ord-9029',
    orderNumber: '#DF-9029',
    table: 'T9',
    section: 'Main Floor',
    serverName: 'Elena Vance',
    guestCount: 6,
    orderTime: '19:22',
    elapsedMinutes: 20,
    targetMinutes: 18,
    status: 'needs_expedite',
    priority: 'delayed',
    chefNotes: 'Fresh pasta drop completed; plating final course now',
    specialRequests: 'Birthday Party — Sparkler on Chocolate Fondant at conclusion',
    items: [
      { id: 'i7', name: 'Truffle Tagliatelle with Parmigiano-Reggiano', quantity: 3, station: 'Sauté & Fish', course: 'Entrée', modifiers: ['Extra Truffle Shavings'], itemStatus: 'ready' },
      { id: 'i8', name: 'Braised Veal Osso Buco with Saffron Risotto', quantity: 2, station: 'Hearth & Grill', course: 'Entrée', itemStatus: 'cooking' },
      { id: 'i9', name: 'Rosemary Roasted Baby Carrots', quantity: 2, station: 'Sauté & Fish', course: 'Entrée', itemStatus: 'ready' },
    ],
  },
  {
    id: 'ord-9041',
    orderNumber: '#DF-9041',
    table: 'T4',
    section: 'Main Floor',
    serverName: 'Elena Vance',
    guestCount: 4,
    orderTime: '19:28',
    elapsedMinutes: 14,
    targetMinutes: 18,
    status: 'plating',
    priority: 'normal',
    chefNotes: 'Garnish station finishing herb drops',
    items: [
      { id: 'i10', name: 'Hamachi Crudo with Yuzu Dressing', quantity: 2, station: 'Raw & Garde-Manger', course: 'Appetizer', itemStatus: 'ready' },
      { id: 'i11', name: 'Wood-Fired Garlic Focaccia & Whipped Lardo', quantity: 1, station: 'Raw & Garde-Manger', course: 'Appetizer', itemStatus: 'ready' },
      { id: 'i12', name: 'Pan-Seared Sea Scallops with Cauliflower Puree', quantity: 2, station: 'Sauté & Fish', course: 'Entrée', itemStatus: 'cooking' },
    ],
  },
  {
    id: 'ord-9045',
    orderNumber: '#DF-9045',
    table: 'B2',
    section: 'Main Floor',
    serverName: 'Anthony Perez',
    guestCount: 6,
    orderTime: '19:34',
    elapsedMinutes: 8,
    targetMinutes: 20,
    status: 'in_prep',
    priority: 'normal',
    chefNotes: 'Raw bar shucking live oysters',
    items: [
      { id: 'i13', name: 'Cold-Water Oysters on Half Shell (12pc)', quantity: 2, station: 'Raw & Garde-Manger', course: 'Appetizer', modifiers: ['Mignonette', 'Horseradish'], itemStatus: 'cooking' },
      { id: 'i14', name: 'Ahi Tuna Tartare with Avocado & Sesame Crisp', quantity: 2, station: 'Raw & Garde-Manger', course: 'Appetizer', itemStatus: 'cooking' },
      { id: 'i15', name: 'Wagyu Burger with Truffle Fries', quantity: 2, station: 'Hearth & Grill', course: 'Entrée', itemStatus: 'pending' },
    ],
  },
  {
    id: 'ord-9048',
    orderNumber: '#DF-9048',
    table: 'P1',
    section: 'Patio Garden',
    serverName: 'Elena Vance',
    guestCount: 4,
    orderTime: '19:39',
    elapsedMinutes: 3,
    targetMinutes: 15,
    status: 'received',
    priority: 'rush',
    specialRequests: 'Patio table requested quick app service',
    items: [
      { id: 'i16', name: 'Whipped Ricotta with Lavender Honey & Crostini', quantity: 2, station: 'Raw & Garde-Manger', course: 'Appetizer', itemStatus: 'pending' },
      { id: 'i17', name: 'Crispy Calamari with Calabrian Chili Aioli', quantity: 2, station: 'Sauté & Fish', course: 'Appetizer', itemStatus: 'pending' },
    ],
  },
  {
    id: 'ord-9050',
    orderNumber: '#DF-9050',
    table: 'M1',
    section: 'Mezzanine VIP',
    serverName: 'Marcus Vance',
    guestCount: 4,
    orderTime: '19:10',
    elapsedMinutes: 32,
    targetMinutes: 30,
    status: 'ready',
    priority: 'normal',
    chefNotes: 'Dessert course ready at pass; call food runner',
    items: [
      { id: 'i18', name: 'Warm Valrhona Chocolate Fondant', quantity: 2, station: 'Pastry & Dessert', course: 'Dessert', modifiers: ['Madagascar Vanilla Bean Gelato'], itemStatus: 'ready' },
      { id: 'i19', name: 'Meyer Lemon Meringue Tartlet', quantity: 2, station: 'Pastry & Dessert', course: 'Dessert', itemStatus: 'ready' },
      { id: 'i20', name: 'Digestif: 20-Year Tawny Port (Glasses)', quantity: 4, station: 'Bar & Cellar', course: 'Beverage', itemStatus: 'ready' },
    ],
  },
];

export const initialReservations: DetailedReservation[] = [
  {
    id: 'res-1',
    guestName: 'Sophia Chen',
    partySize: 6,
    scheduledTime: '19:45',
    tableId: 'M2',
    section: 'Mezzanine VIP',
    status: 'confirmed',
    isVip: true,
    phone: '+1 (555) 234-8901',
    occasion: 'Executive Board Dinner',
    specialRequests: 'Sommelier cellar pairing requested. Pacing conflict staged to M2.',
    spendEstimate: '$720',
  },
  {
    id: 'res-2',
    guestName: 'Mr. Hastings',
    partySize: 4,
    scheduledTime: '19:30',
    tableId: 'T8',
    section: 'Main Floor',
    status: 'seated',
    isVip: false,
    phone: '+1 (555) 892-1204',
    occasion: 'Anniversary',
    specialRequests: 'Quiet corner table preferred.',
    spendEstimate: '$340',
  },
  {
    id: 'res-3',
    guestName: 'Dr. Marcus Vance',
    partySize: 6,
    scheduledTime: '20:00',
    tableId: 'B1',
    section: 'Main Floor',
    status: 'confirmed',
    isVip: true,
    phone: '+1 (555) 304-9988',
    occasion: 'Medical Faculty Celebration',
    specialRequests: 'Prefers booth seating; 2 bottles vintage Chianti pre-decanted.',
    spendEstimate: '$580',
  },
  {
    id: 'res-4',
    guestName: 'Camila Rodriguez',
    partySize: 2,
    scheduledTime: '20:15',
    tableId: 'T3',
    section: 'Main Floor',
    status: 'confirmed',
    isVip: false,
    phone: '+1 (555) 441-7722',
    specialRequests: 'Window seat if available.',
    spendEstimate: '$190',
  },
  {
    id: 'res-5',
    guestName: 'The Miller Party',
    partySize: 4,
    scheduledTime: '19:30',
    tableId: 'T7',
    section: 'Main Floor',
    status: 'late',
    isVip: false,
    phone: '+1 (555) 671-3310',
    specialRequests: 'Currently waiting in vestibule while T7 is reset.',
    spendEstimate: '$280',
  },
  {
    id: 'res-6',
    guestName: 'Oliver Sterling',
    partySize: 4,
    scheduledTime: '20:30',
    tableId: 'P4',
    section: 'Patio Garden',
    status: 'confirmed',
    isVip: false,
    phone: '+1 (555) 902-4512',
    specialRequests: 'Outdoor heaters on near patio table 4.',
    spendEstimate: '$260',
  },
];

export const initialDetailedCleaningTasks: DetailedCleaningTask[] = [
  {
    id: 'cln-1',
    tableId: 'T7',
    section: 'Main Floor',
    priority: 'Critical',
    status: 'in_progress',
    cleanerName: 'Carlos Mendez',
    cleanerId: 'cln-staff-1',
    assignedAt: '19:34',
    elapsedMinutes: 8.4,
    targetMinutes: 5.0,
    turnaroundTarget: 'Overdue by +3.4m • The Miller Party (4) waiting in vestibule',
    sensorTrigger: 'IoT Pressure Mat: Vacated 19:33',
    checklist: [
      { id: 'c1', label: 'Clear glassware, plates, and cloth napkins', done: true },
      { id: 'c2', label: 'Sanitize table surface and chair armrests (EPA Hospital Grade)', done: true },
      { id: 'c3', label: 'Replace custom linen tablecloth', done: false },
      { id: 'c4', label: 'Reset polished silverware, water carafes, and fresh QR coaster', done: false },
      { id: 'c5', label: 'Inspect floor around table for debris', done: false },
    ],
  },
  {
    id: 'cln-2',
    tableId: 'P2',
    section: 'Patio Garden',
    priority: 'Standard',
    status: 'pending',
    cleanerName: 'Unassigned',
    cleanerId: '',
    assignedAt: '19:40',
    elapsedMinutes: 2.5,
    targetMinutes: 6.0,
    turnaroundTarget: 'Queued for reset • Next reservation: 20:15',
    sensorTrigger: 'POS Final Checkout Settled: 19:39',
    checklist: [
      { id: 'c6', label: 'Clear outdoor tableware & bar glasses', done: false },
      { id: 'c7', label: 'Wipe teak wood table and bistro seating', done: false },
      { id: 'c8', label: 'Reset weatherproof menus & QR coaster', done: false },
      { id: 'c9', label: 'Check patio heater safety clearance', done: false },
    ],
  },
  {
    id: 'cln-3',
    tableId: 'M2',
    section: 'Mezzanine VIP',
    priority: 'Urgent',
    status: 'assigned',
    cleanerName: 'Maria R.',
    cleanerId: 'cln-staff-2',
    assignedAt: '19:41',
    elapsedMinutes: 1.2,
    targetMinutes: 5.0,
    turnaroundTarget: 'VIP Staging for Sophia Chen Executive Dinner (19:45)',
    sensorTrigger: 'Hostess Fast-Track Dispatch: 19:41',
    checklist: [
      { id: 'c10', label: 'Deep sanitize mahogany executive table & leather armchairs', done: true },
      { id: 'c11', label: 'Set Riedel crystal glassware & linen runners', done: false },
      { id: 'c12', label: 'Place sommelier reserve wine list & table marker', done: false },
    ],
  },
];

export const availableCleanersList = [
  { id: 'cln-staff-1', name: 'Carlos Mendez', activeStation: 'Main Floor (T1–T14)', status: 'Active (T7 in progress)' },
  { id: 'cln-staff-2', name: 'Maria R.', activeStation: 'Mezzanine VIP Suite', status: 'Active (M2 assigned)' },
  { id: 'cln-staff-3', name: 'Jamal K.', activeStation: 'Patio Garden & Bar', status: 'Available (Idle)' },
];
