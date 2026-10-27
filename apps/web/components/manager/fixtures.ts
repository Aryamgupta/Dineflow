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
