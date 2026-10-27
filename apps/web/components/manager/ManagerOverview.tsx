'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';
import {
  managerOverviewFixtures,
  type NeedsAttentionItem,
  type TableNode,
  type ManagerOrderTicket,
} from './fixtures';

export function ManagerOverview() {
  const [stationFilter, setStationFilter] = useState<'All' | 'Delayed' | 'Mains' | 'Bar'>('All');
  const [selectedTable, setSelectedTable] = useState<TableNode | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [exceptions, setExceptions] = useState<NeedsAttentionItem[]>(managerOverviewFixtures.exceptions);
  const [tableNodes, setTableNodes] = useState<TableNode[]>(managerOverviewFixtures.tableNodes);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleResolveException = (id: string, title: string) => {
    setExceptions((prev) => prev.filter((item) => item.id !== id));
    showToast(`[Simulated Action] Exception dismissed from local queue: ${title}`);
  };

  const filteredTickets = managerOverviewFixtures.orderTickets.filter((ticket) => {
    if (stationFilter === 'All') return true;
    if (stationFilter === 'Delayed') return ticket.statusVariant === 'danger';
    if (stationFilter === 'Mains') return ticket.station.includes('Hearth') || ticket.station.includes('Sauté') || ticket.station.includes('Pasta') || ticket.station.includes('Manger');
    if (stationFilter === 'Bar') return ticket.station.includes('Raw Bar') || ticket.station.includes('Wine') || ticket.station.includes('Banquet');
    return true;
  });

  return (
    <div className="manager-overview-container">
      {/* SECTION 1: Shift Context & Operational Sub-bar */}
      <section aria-label="Shift command context" className="manager-shift-bar">
        <div className="manager-shift-bar-content">
          <div className="manager-shift-info">
            <div className="manager-shift-tags">
              <span className="manager-badge manager-badge-primary">
                {managerOverviewFixtures.venue.shiftName}
              </span>
              <span className="manager-shift-eyebrow">
                Floor Command Center • {managerOverviewFixtures.venue.shiftPhase}
              </span>
              <span className="manager-badge manager-badge-warning" style={{ fontSize: '0.625rem' }}>
                Local Development Fixtures — No Backend Connection
              </span>
            </div>

            <div className="manager-shift-headline-row">
              <h1 className="manager-shift-title">Dinner Service Command Center</h1>
              <span
                className="manager-telemetry-pill"
                title="Visual simulation of telemetry from floor and kitchen"
              >
                <span className="manager-live-dot" />
                Simulated Telemetry Preview
              </span>
            </div>

            <div className="manager-shift-meta-row">
              <span>
                <Icon name="badge" style={{ fontSize: '0.9375rem', color: 'var(--color-primary)' }} />
                GM: <strong>{managerOverviewFixtures.venue.generalManager}</strong>
              </span>
              <span className="manager-meta-dot">•</span>
              <span>
                Shift Window: <strong>{managerOverviewFixtures.venue.shiftWindow}</strong>
              </span>
              <span className="manager-meta-dot">•</span>
              <span>
                <Icon name="trending_up" style={{ fontSize: '0.9375rem', color: 'var(--color-secondary)' }} />
                Seating Pace: <strong>{managerOverviewFixtures.venue.capacityRate}</strong>
              </span>
              <span className="manager-meta-dot">•</span>
              <span>
                <Icon name="check_circle" style={{ fontSize: '0.9375rem', color: 'var(--color-secondary)' }} />
                Kitchen Delay: <strong className="text-secondary">{managerOverviewFixtures.venue.ticketDelay}</strong>
              </span>
            </div>
          </div>

          {/* Quick Actions & Handover Controls */}
          <div className="manager-shift-controls">
            <div
              className="manager-sync-indicator"
              title="Local snapshot loaded from static fixtures. Not a live database connection."
            >
              <Icon name="sync" style={{ fontSize: '0.8125rem' }} />
              <span>Demo Snapshot Loaded</span>
              <button
                aria-label="Reload demo snapshot"
                className="manager-btn-icon-subtle"
                onClick={() => {
                  setRefreshKey((k) => k + 1);
                  setExceptions(managerOverviewFixtures.exceptions);
                  showToast('[Demo Mode] Reset simulated shift fixtures to baseline state.');
                }}
                title="Reset Simulated Shift Fixtures"
                type="button"
              >
                <Icon name="refresh" />
              </button>
            </div>

            <button
              className="manager-btn manager-btn-secondary"
              onClick={() => setActiveModal('handover')}
              type="button"
            >
              <Icon name="edit_note" />
              <span>Shift Handover Notes</span>
            </button>

            {/* Quick Action Dropdown */}
            <div className="manager-topbar-relative">
              <button
                aria-expanded={quickActionOpen}
                aria-haspopup="true"
                className="manager-btn manager-btn-primary"
                onClick={() => setQuickActionOpen(!quickActionOpen)}
                type="button"
              >
                <Icon name="bolt" />
                <span>+ Quick Action</span>
                <Icon name="expand_more" />
              </button>

              {quickActionOpen && (
                <div className="manager-topbar-dropdown" style={{ right: 0, width: '14.5rem' }}>
                  <button
                    className="manager-dropdown-item"
                    onClick={() => {
                      setQuickActionOpen(false);
                      setActiveModal('assign-table');
                    }}
                    type="button"
                  >
                    <Icon name="table_restaurant" style={{ color: 'var(--color-primary)' }} />
                    <span>Assign Table (Demo)</span>
                  </button>

                  <button
                    className="manager-dropdown-item"
                    onClick={() => {
                      setQuickActionOpen(false);
                      setActiveModal('manual-clean');
                    }}
                    type="button"
                  >
                    <Icon name="cleaning_services" style={{ color: 'var(--color-primary)' }} />
                    <span>Cleaner Dispatch (Demo)</span>
                  </button>

                  <button
                    className="manager-dropdown-item"
                    onClick={() => {
                      setQuickActionOpen(false);
                      setActiveModal('eighty-six');
                    }}
                    type="button"
                  >
                    <Icon name="block" style={{ color: 'var(--color-danger)' }} />
                    <span>86 Menu Item (Demo)</span>
                  </button>

                  <div className="manager-dropdown-divider" />

                  <button
                    className="manager-dropdown-item manager-dropdown-item-danger"
                    onClick={() => {
                      setQuickActionOpen(false);
                      setActiveModal('incident');
                    }}
                    type="button"
                  >
                    <Icon name="report_problem" />
                    <span>Log Floor Incident (Demo)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 6-KPI Operational Metric Grid */}
      <section aria-label="Operational Key Metrics" className="manager-kpi-grid">
        {managerOverviewFixtures.kpis.map((kpi) => (
          <div
            className="manager-kpi-card"
            key={kpi.id}
            onClick={() => showToast(`[Demo Fixture] Drill-down preview for: ${kpi.label}`)}
            role="button"
            tabIndex={0}
          >
            <div className="manager-kpi-header">
              <span className="manager-kpi-label">{kpi.label}</span>
              <span className="manager-kpi-icon-pill">
                <Icon name={kpi.icon as any} />
              </span>
            </div>

            <div className="manager-kpi-body">
              <div className="manager-kpi-value-row">
                <span className="manager-kpi-value">{kpi.value}</span>
                {kpi.subValue && <span className="manager-kpi-subvalue">{kpi.subValue}</span>}
              </div>
              <div className="manager-kpi-caption">{kpi.caption}</div>
            </div>

            <div className="manager-kpi-footer">
              <span
                className={`manager-badge manager-badge-${kpi.statusBadge.variant}${kpi.statusBadge.pulse ? ' manager-badge-pulse' : ''}`}
              >
                {kpi.statusBadge.pulse && <span className="manager-badge-dot" />}
                {kpi.statusBadge.label}
              </span>
              <Icon name="arrow_forward" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }} />
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 3: Two-Column Operational Core */}
      <div className="manager-two-col-layout">
        {/* LEFT COLUMN: Exception Queue & Live Orders Velocity */}
        <div className="manager-col-main">
          {/* MODULE 1: Prioritized Exception Queue */}
          <div className="manager-card">
            <div className="manager-card-header">
              <div className="manager-card-title-group">
                <span className="manager-badge-pulse-indicator" />
                <h2>Prioritized &ldquo;Needs Attention&rdquo; Exception Queue</h2>
              </div>
              <span className="manager-badge manager-badge-danger">
                {exceptions.length} Active Blockers
              </span>
            </div>

            <div className="manager-exception-list">
              {exceptions.length === 0 ? (
                <div className="manager-empty-state">
                  <Icon name="check_circle" style={{ fontSize: '2rem', color: 'var(--color-secondary)' }} />
                  <p>All high-priority operational exceptions have been acknowledged in this demo session.</p>
                </div>
              ) : (
                exceptions.map((exc) => (
                  <div className={`manager-exception-item manager-exception-${exc.level}`} key={exc.id}>
                    <div className="manager-exception-header">
                      <div className="manager-exception-title-row">
                        <span className={`manager-badge manager-badge-${exc.level === 'critical' ? 'danger' : exc.level === 'warning' ? 'warning' : 'primary'}`}>
                          {exc.levelLabel}
                        </span>
                        <strong>{exc.title}</strong>
                      </div>
                      <span className="manager-exception-elapsed">{exc.elapsed}</span>
                    </div>

                    <p className="manager-exception-summary">{exc.summary}</p>

                    <div className="manager-exception-footer">
                      <div className="manager-exception-meta">
                        <Icon name={exc.metaIcon as any} />
                        <span>{exc.meta}</span>
                      </div>

                      <div className="manager-exception-actions">
                        <button
                          className="manager-btn manager-btn-sm manager-btn-secondary"
                          onClick={() => {
                            if (exc.id === 'exc-1') {
                              setActiveModal('allergen-review');
                            } else {
                              showToast(`[Demo Inspection] Ticket details preview for: ${exc.title}`);
                            }
                          }}
                          type="button"
                        >
                          {exc.secondaryAction}
                        </button>

                        <button
                          className="manager-btn manager-btn-sm manager-btn-primary"
                          onClick={() => {
                            if (exc.id === 'exc-1') {
                              setActiveModal('allergen-review');
                            } else {
                              handleResolveException(exc.id, exc.title);
                            }
                          }}
                          type="button"
                        >
                          {exc.primaryAction}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* MODULE 2: Live Orders & Kitchen Station Velocity Rail */}
          <div className="manager-card">
            <div className="manager-card-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2>Live Orders &amp; Kitchen Station Velocity</h2>
                <small style={{ color: 'var(--color-text-muted)' }}>
                  Real-time ticket progression against target cook windows (Simulated Demo Stream)
                </small>
              </div>

              {/* Station Filter Chips */}
              <div className="manager-filter-group" role="tablist">
                {(['All', 'Delayed', 'Mains', 'Bar'] as const).map((filter) => (
                  <button
                    aria-selected={stationFilter === filter}
                    className={`manager-filter-tab${stationFilter === filter ? ' is-active' : ''}`}
                    key={filter}
                    onClick={() => setStationFilter(filter)}
                    role="tab"
                    type="button"
                  >
                    {filter} {filter === 'All' ? '(38)' : filter === 'Delayed' ? '(3)' : filter === 'Mains' ? '(18)' : '(7)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="manager-orders-list">
              {filteredTickets.map((ticket) => (
                <div className="manager-order-ticket-card" key={ticket.id}>
                  <div className="manager-order-ticket-top">
                    <div className="manager-order-ticket-identifiers">
                      <strong className="manager-order-id">{ticket.id}</strong>
                      <span className="manager-badge manager-badge-neutral">{ticket.tableLabel}</span>
                      <span className={`manager-badge manager-badge-${ticket.statusVariant}`}>
                        {ticket.statusVariant === 'danger' && <Icon name="timer" style={{ fontSize: '0.75rem' }} />}
                        {ticket.statusLabel}
                      </span>
                      {ticket.tag && <span className="manager-badge manager-badge-primary">{ticket.tag}</span>}
                    </div>
                    <span className={`manager-order-timer${ticket.statusVariant === 'danger' ? ' text-danger font-bold' : ''}`}>
                      {ticket.elapsedTime}
                    </span>
                  </div>

                  <div className="manager-order-ticket-details">
                    <div>
                      Server: <strong>{ticket.server}</strong>
                    </div>
                    <div>
                      Station: <strong>{ticket.station}</strong>
                    </div>
                    <div>
                      Items: <strong>{ticket.itemsSummary}</strong>
                    </div>
                  </div>

                  {/* Course Progress Bar */}
                  <div className="manager-progress-container">
                    <div className="manager-progress-labels">
                      <span>{ticket.courseStep}</span>
                      <span className={ticket.statusVariant === 'danger' ? 'text-danger font-bold' : 'text-secondary font-semibold'}>
                        {ticket.progressPercent}% elapsed
                      </span>
                    </div>
                    <div className="manager-progress-track">
                      <div
                        className={`manager-progress-fill${ticket.statusVariant === 'danger' ? ' is-delayed' : ''}`}
                        style={{ width: `${ticket.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions / Chef Note */}
                  <div className="manager-order-ticket-actions-row">
                    <span className="manager-order-chef-note">
                      {ticket.chefNote ?? 'Order pacing on normal trajectory'}
                    </span>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                      {ticket.canExpedite && (
                        <button
                          className="manager-btn manager-btn-sm manager-btn-secondary"
                          onClick={() => showToast(`[Demo Action] Simulated expedite call sent to ${ticket.station} for ticket ${ticket.id}.`)}
                          type="button"
                        >
                          Simulate Expedite
                        </button>
                      )}
                      {ticket.canComp && (
                        <button
                          className="manager-btn manager-btn-sm manager-btn-primary"
                          onClick={() => showToast(`[Demo Action] Simulated complimentary beverage voucher previewed for ${ticket.tableLabel}.`)}
                          type="button"
                        >
                          Simulate Comp
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {stationFilter === 'All' && (
                <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                  Showing 6 representative tickets from 38 active orders on floor (Simulated Demo Stream).
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Floor Status, Cleaning Dispatch & Staff Load */}
        <div className="manager-col-sidebar">
          {/* MODULE 3: Floor Status & Mini Layout Map */}
          <div className="manager-card">
            <div className="manager-card-header">
              <div>
                <h2>Floor Status &amp; Occupancy</h2>
                <small style={{ color: 'var(--color-text-muted)' }}>Live sector density &amp; table turns</small>
              </div>
              <span className="manager-badge manager-badge-success">24 / 28 Seated</span>
            </div>

            {/* Sector Summary Chips (Sum: 14 + 4 + 6 = 24 Seated, 16 + 4 + 8 = 28 Total) */}
            <div className="manager-sector-grid">
              <div className="manager-sector-box">
                <span className="manager-sector-label">Main Floor</span>
                <strong>14 / 16</strong>
                <span className="text-secondary">88% Occ.</span>
              </div>
              <div className="manager-sector-box">
                <span className="manager-sector-label">Mezzanine VIP</span>
                <strong className="text-danger">4 / 4</strong>
                <span className="text-danger">100% Full</span>
              </div>
              <div className="manager-sector-box">
                <span className="manager-sector-label">Patio Garden</span>
                <strong>6 / 8</strong>
                <span className="text-secondary">75% Occ.</span>
              </div>
            </div>

            {/* Interactive Table Nodes Mosaic (Exactly 28 Table Tiles) */}
            <div className="manager-table-nodes-panel">
              <div className="manager-table-legend">
                <span>Interactive Table Nodes (28 Total)</span>
                <div className="manager-legend-items">
                  <span><span className="manager-dot dot-seated" /> Seated (21)</span>
                  <span><span className="manager-dot dot-clean" /> Needs Clean (3)</span>
                  <span><span className="manager-dot dot-open" /> Open (4)</span>
                </div>
              </div>

              <div className="manager-table-grid">
                {tableNodes.map((t) => (
                  <button
                    className={`manager-table-tile tile-${t.status}`}
                    key={t.id}
                    onClick={() => setSelectedTable(t)}
                    title={`${t.id}: ${t.status.toUpperCase()} (${t.capacity} seats) — ${t.section}`}
                    type="button"
                  >
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Seating Arrivals */}
            <div className="manager-arrivals-list">
              <span className="manager-subheading">Upcoming Seating Arrivals (Next 45m)</span>
              {managerOverviewFixtures.upcomingArrivals.map((arrival) => (
                <div className="manager-arrival-row" key={arrival.time + arrival.name}>
                  <div className="manager-arrival-party">
                    <strong>{arrival.time}</strong>
                    <span>{arrival.name}</span>
                    {arrival.isVip && <span className="manager-badge manager-badge-warning">VIP</span>}
                    <small>(Party {arrival.partySize})</small>
                  </div>
                  <div className="manager-arrival-meta">
                    <span className="manager-badge manager-badge-neutral">{arrival.table}</span>
                    <span className="manager-badge manager-badge-primary">{arrival.statusTag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MODULE 4: Cleaning & Reset Dispatch (3 Tasks matching Queue = 3 and 3 Active Cleaners) */}
          <div className="manager-card">
            <div className="manager-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="manager-icon-square">
                  <Icon name="mop" />
                </span>
                <div>
                  <h2>Cleaning &amp; Reset Dispatch</h2>
                  <small className="text-secondary font-semibold">Autopilot Dispatch Active • Avg 4.8m</small>
                </div>
              </div>

              <button
                className="manager-btn manager-btn-sm manager-btn-secondary"
                onClick={() => setActiveModal('manual-clean')}
                type="button"
              >
                Manual Dispatch
              </button>
            </div>

            <div className="manager-cleaning-task-list">
              {managerOverviewFixtures.cleaningTasks.map((task) => (
                <div
                  className={`manager-clean-task-row${task.priority === 'Urgent' ? ' is-urgent' : ''}`}
                  key={task.id}
                >
                  <div className="manager-clean-task-info">
                    <div className="manager-table-circle">{task.table}</div>
                    <div>
                      <strong>
                        {task.status === 'assigned' ? `Assigned: ${task.cleanerName}` : 'Queued for Reset'}
                      </strong>
                      <div className="manager-clean-task-meta">
                        Elapsed: {task.elapsed} • {task.availableCleaners ?? 'Standard Priority'}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`manager-btn manager-btn-sm ${task.priority === 'Urgent' ? 'manager-btn-secondary' : 'manager-btn-primary'}`}
                    onClick={() => {
                      showToast(`[Simulated Action] Dispatcher command simulated for table ${task.table}.`);
                    }}
                    type="button"
                  >
                    {task.status === 'assigned' ? 'Simulate Ping' : 'Simulate Dispatch'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* MODULE 5: Staff Stations & Workload (17 on Duty matching FOH 8 + KTH 6 + CLN 3) */}
          <div className="manager-card">
            <div className="manager-card-header">
              <h2>Staff Stations &amp; Workload</h2>
              <span className="manager-badge manager-badge-neutral">17 Active on Shift</span>
            </div>

            <div className="manager-staff-load-list">
              {managerOverviewFixtures.staffStationLoads.map((station) => (
                <div className="manager-staff-load-row" key={station.id}>
                  <div className="manager-staff-station-title">
                    <span className="manager-live-dot" />
                    <strong>{station.name}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {station.tablesActive && (
                      <span className="manager-staff-tables-count">{station.tablesActive} Tables Active</span>
                    )}
                    {station.avgTime && (
                      <span className="text-secondary font-semibold" style={{ fontSize: '0.75rem' }}>
                        {station.avgTime}
                      </span>
                    )}
                    <span className={`manager-badge manager-badge-${station.statusVariant}`}>
                      {station.loadLabel}
                    </span>
                  </div>
                </div>
              ))}

              {/* Overtime Hazard Alert Banner */}
              <div className="manager-alert-banner">
                <Icon name="alarm_on" />
                <div>
                  <strong>Overtime Threshold Warning:</strong> Julian Rivera reaches 8h limit at 22:30. Shift lock requires GM sign-off.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Operational Telemetry & Service SLA Bar */}
      <section aria-label="Operational Benchmarks" className="manager-sla-bar">
        <div className="manager-sla-bar-header">
          <div className="manager-sla-icon">
            <Icon name="speed" />
          </div>
          <div>
            <h3>Daily Operational Benchmarks &amp; Real-time SLA</h3>
            <small style={{ color: 'var(--color-text-muted)' }}>
              Telemetry calculated across 142 total seatings today (Simulated Demo Metrics)
            </small>
          </div>
        </div>

        <div className="manager-sla-metrics-grid">
          {managerOverviewFixtures.benchmarks.map((bench) => (
            <div className="manager-sla-metric-box" key={bench.label}>
              <span className="manager-sla-metric-label">{bench.label}</span>
              <div className="manager-sla-metric-val">
                <strong>{bench.metric}</strong>
                <small className="text-secondary">{bench.target}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE MODAL: Table Node Inspector */}
      {selectedTable && (
        <div className="manager-modal-backdrop" role="dialog" aria-modal="true">
          <div className="manager-modal">
            <div className="manager-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`manager-badge manager-badge-${selectedTable.status === 'seated' ? 'primary' : selectedTable.status === 'needs_clean' ? 'warning' : selectedTable.status === 'alert' ? 'danger' : 'success'}`}>
                  Table {selectedTable.label}
                </span>
                <h3 style={{ margin: 0 }}>Table Inspection — {selectedTable.section}</h3>
              </div>
              <button
                className="manager-btn-icon-subtle"
                onClick={() => setSelectedTable(null)}
                type="button"
                aria-label="Close dialog"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="manager-modal-body">
              <div className="manager-meta-grid">
                <div>
                  <small>Table ID &amp; Capacity</small>
                  <strong>{selectedTable.id} ({selectedTable.capacity} Seats)</strong>
                </div>
                <div>
                  <small>Current Status</small>
                  <strong className="capitalize">{selectedTable.status.replace('_', ' ')}</strong>
                </div>
                <div>
                  <small>Assigned Server</small>
                  <strong>{selectedTable.server ?? 'Unassigned'}</strong>
                </div>
                <div>
                  <small>Elapsed Duration</small>
                  <strong>{selectedTable.elapsedTime ?? 'None'}</strong>
                </div>
              </div>

              {selectedTable.details && (
                <div className="manager-banner manager-banner-info" style={{ marginTop: '1rem' }}>
                  <Icon name="info" />
                  <div><strong>Inspection Notes:</strong> {selectedTable.details}</div>
                </div>
              )}
            </div>

            <div className="manager-modal-footer">
              <button
                className="manager-btn manager-btn-secondary"
                onClick={() => {
                  showToast(`[Simulated Action] Printed guest check for Table ${selectedTable.id}.`);
                  setSelectedTable(null);
                }}
                type="button"
              >
                Print Guest Bill (Demo)
              </button>
              <button
                className="manager-btn manager-btn-primary"
                onClick={() => {
                  showToast(`[Simulated Action] Marked Table ${selectedTable.id} as Clean & Available in local preview.`);
                  setSelectedTable(null);
                }}
                type="button"
              >
                Mark Table Ready (Demo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL: Allergen Protocol Review (Task 4) */}
      {activeModal === 'allergen-review' && (
        <div className="manager-modal-backdrop" role="dialog" aria-modal="true">
          <div className="manager-modal">
            <div className="manager-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="manager-badge manager-badge-danger">Allergen Safety</span>
                <h3 style={{ margin: 0 }}>Allergen Protocol Review — Table 14 [SIMULATION]</h3>
              </div>
              <button
                className="manager-btn-icon-subtle"
                onClick={() => setActiveModal(null)}
                type="button"
                aria-label="Close dialog"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="manager-modal-body">
              <div className="manager-banner manager-banner-warning">
                <Icon name="warning" />
                <div>
                  <strong>DEMO ENVIRONMENT NOTICE:</strong> This is an interactive visual simulation of kitchen cross-contamination verification. In live operations, medical/allergen overrides require chef confirmation on the Kitchen Display Station (Phase 3) and cannot be bypassed from this overview.
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }}>
                  <strong>Guest Profile &amp; Incident Context:</strong>
                </div>
                <div className="manager-meta-grid" style={{ marginBottom: '1rem' }}>
                  <div>
                    <small>Guest Allergen</small>
                    <strong className="text-danger">Severe Celiac Disease</strong>
                  </div>
                  <div>
                    <small>Held Ticket</small>
                    <strong>#DF-9031 • Pan-Seared Halibut</strong>
                  </div>
                  <div>
                    <small>Kitchen Expeditor</small>
                    <strong>Chef Marcella Blanc</strong>
                  </div>
                  <div>
                    <small>Assigned Server</small>
                    <strong>Julian Rivera</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.8125rem', marginBottom: '0.5rem' }}>
                  <strong>Manager Protocol Verification Checklist:</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', background: 'var(--color-surface-low)', padding: '0.75rem', borderRadius: 'var(--radius-control)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Dedicated sanitized sauté pan confirmed with Chef Marcella</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Gluten-free vegetable stock reduction verified for puree</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Separate plating utensils tagged for Table 14 delivery</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="manager-modal-footer">
              <button
                className="manager-btn manager-btn-secondary"
                onClick={() => setActiveModal(null)}
                type="button"
              >
                Close Without Action
              </button>
              <button
                className="manager-btn manager-btn-primary"
                onClick={() => {
                  handleResolveException('exc-1', 'Table 14 Gluten Allergen Review');
                  showToast('[Simulated Action] Allergen protocol checklist signed in local preview. Real authorization requires Phase 3 Kitchen Display.');
                  setActiveModal(null);
                }}
                type="button"
              >
                Simulate Manager Sign-off (Demo Only)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE MODAL: Quick Action Demo Shell */}
      {activeModal && activeModal !== 'allergen-review' && (
        <div className="manager-modal-backdrop" role="dialog" aria-modal="true">
          <div className="manager-modal">
            <div className="manager-modal-header">
              <h3 style={{ margin: 0 }}>
                {activeModal === 'assign-table' && 'Manual Table Seating Assignment'}
                {activeModal === 'manual-clean' && 'Manual Cleaner Dispatch Override'}
                {activeModal === 'eighty-six' && 'Instant 86 Stockout Control'}
                {activeModal === 'incident' && 'Log Floor Operational Incident'}
                {activeModal === 'handover' && 'Shift Handover Notes Preview'}
              </h3>
              <button
                className="manager-btn-icon-subtle"
                onClick={() => setActiveModal(null)}
                type="button"
                aria-label="Close dialog"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="manager-modal-body">
              <div className="manager-banner manager-banner-info">
                <Icon name="info" />
                <div>
                  <strong>Development Fixture Scope Notice:</strong> In this Phase 2.1 release, this dialog provides a visual confirmation of the trigger. Live database writes and WebSocket pushes for this action will be wired during subsequent operational module phases.
                </div>
              </div>

              <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
                {activeModal === 'assign-table' && 'Select party size, host greeting channel, and target section to immediately seat walk-in dining patrons.'}
                {activeModal === 'manual-clean' && 'Assign an emergency sanitization sweep to Maria R., Carlos M., or Jamal K. with priority override.'}
                {activeModal === 'eighty-six' && 'Immediately flag out-of-stock items to lock ordering across POS stations, waitstaff tablets, and customer QR menus.'}
                {activeModal === 'incident' && 'Record an incident log entry with shift timestamp, witness notes, server involved, and escalation rating.'}
                {activeModal === 'handover' && 'Review shift registers, closing drawer tally, maintenance alerts, and 86 directives for Morning Shift A.'}
              </p>
            </div>

            <div className="manager-modal-footer">
              <button
                className="manager-btn manager-btn-secondary"
                onClick={() => setActiveModal(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="manager-btn manager-btn-primary"
                onClick={() => {
                  showToast(`[Simulated Action] Confirmed demo trigger for ${activeModal} (Local state preview updated).`);
                  setActiveModal(null);
                }}
                type="button"
              >
                Confirm Action (Demo Only)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Toast Notification */}
      {toastMessage && (
        <div className="manager-toast" role="status">
          <Icon name="check_circle" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
