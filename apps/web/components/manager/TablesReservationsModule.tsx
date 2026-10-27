'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../landing/Icon';
import {
  initialReservations,
  managerOverviewFixtures,
  type DetailedReservation,
  type TableNode,
  type TableNodeStatus,
} from './fixtures';

export function TablesReservationsModule() {
  const [tables, setTables] = useState<TableNode[]>(managerOverviewFixtures.tableNodes);
  const [reservations, setReservations] = useState<DetailedReservation[]>(initialReservations);
  const [viewTab, setViewTab] = useState<'floor' | 'reservations'>('floor');
  const [sectorFilter, setSectorFilter] = useState<'All' | 'Main Floor' | 'Mezzanine VIP' | 'Patio Garden'>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'seated' | 'available' | 'needs_clean'>('all');
  const [selectedTable, setSelectedTable] = useState<TableNode | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<DetailedReservation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTable(null);
        setSelectedReservation(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Occupancy calculations
  const totalTables = tables.length;
  const occupiedCount = tables.filter((t) => t.status === 'seated' || t.status === 'alert').length;
  const availableCount = tables.filter((t) => t.status === 'available').length;
  const needsCleanCount = tables.filter((t) => t.status === 'needs_clean').length;
  const occupancyPercent = Math.round((occupiedCount / totalTables) * 100);

  // Table status transition handlers
  const updateTableStatus = (tableId: string, newStatus: TableNodeStatus, details?: string, partyName?: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status: newStatus,
              details: details !== undefined ? details : t.details,
              partyName: partyName !== undefined ? partyName : t.partyName,
            }
          : t
      )
    );
    if (selectedTable && selectedTable.id === tableId) {
      setSelectedTable((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              details: details !== undefined ? details : prev.details,
              partyName: partyName !== undefined ? partyName : prev.partyName,
            }
          : null
      );
    }
  };

  const handleSeatParty = (reservation: DetailedReservation) => {
    const targetTableId = reservation.tableId;
    updateTableStatus(
      targetTableId,
      'seated',
      `Seated: ${reservation.guestName} (${reservation.partySize} guests)`,
      `${reservation.guestName} (${reservation.partySize})`
    );
    setReservations((prev) =>
      prev.map((r) => (r.id === reservation.id ? { ...r, status: 'seated' } : r))
    );
    if (selectedReservation && selectedReservation.id === reservation.id) {
      setSelectedReservation({ ...selectedReservation, status: 'seated' });
    }
    showToast(`[Simulated Action] Seated ${reservation.guestName} (Party of ${reservation.partySize}) at Table ${targetTableId}.`);
  };

  const handleMarkNeedClean = (tableId: string) => {
    updateTableStatus(tableId, 'needs_clean', 'Turnaround requested — cleaning queued');
    showToast(`[Simulated Action] Table ${tableId} marked as Needs Cleaning. Auto-dispatch alert sent to cleaning staff.`);
  };

  const handleMarkAvailable = (tableId: string) => {
    updateTableStatus(tableId, 'available', 'Cleaned & Sanitized — Walk-in ready', '');
    showToast(`[Simulated Action] Table ${tableId} verified clean and marked Available for dining.`);
  };

  // Filtered tables
  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      if (sectorFilter !== 'All' && table.section !== sectorFilter) return false;
      if (statusFilter !== 'all') {
        if (statusFilter === 'seated' && table.status !== 'seated' && table.status !== 'alert') return false;
        if (statusFilter === 'available' && table.status !== 'available') return false;
        if (statusFilter === 'needs_clean' && table.status !== 'needs_clean') return false;
      }
      return true;
    });
  }, [tables, sectorFilter, statusFilter]);

  return (
    <div className="manager-tables-container">
      {/* Top Header & Telemetry Strip */}
      <section className="manager-kds-header">
        <div className="manager-kds-header-top">
          <div>
            <div className="manager-breadcrumbs">
              <span>Operations</span>
              <span className="manager-sep">/</span>
              <span>Floor Management</span>
              <span className="manager-sep">/</span>
              <span className="manager-badge manager-badge-success">Live Floor Plan</span>
            </div>
            <div className="manager-kds-title-row">
              <h1 className="manager-kds-heading">Tables &amp; Reservations Control</h1>
              <span className="manager-telemetry-pill">
                <span className="manager-pulse-dot" />
                Floor Sensor Telemetry Active
              </span>
            </div>
            <p className="manager-kds-subtitle">
              The Rustic Oak — Downtown • Shift B: Dinner Rush • 28 Table Capacity ({occupancyPercent}% Occupied, {availableCount} Available).
            </p>
          </div>

          <div className="manager-kds-actions-cluster">
            <button
              className="manager-btn manager-btn-secondary"
              onClick={() => showToast('[Simulated Action] Triggered Floor Pacing Optimization. All reservations synced with host desk.')}
              type="button"
            >
              <Icon name="psychology" />
              <span>AI Pacing Check</span>
            </button>
            <button
              className="manager-btn manager-btn-primary"
              onClick={() => setViewTab('reservations')}
              type="button"
            >
              <Icon name="calendar_today" />
              <span>View Reservations ({reservations.length})</span>
            </button>
          </div>
        </div>

        {/* View Switcher & Filter Controls */}
        <div className="manager-kds-toolbar">
          <div className="manager-station-tabs" role="tablist">
            <button
              className={`manager-station-tab${viewTab === 'floor' ? ' is-active' : ''}`}
              onClick={() => setViewTab('floor')}
              type="button"
            >
              <Icon name="grid_view" />
              <span>Interactive Floor Plan</span>
            </button>
            <button
              className={`manager-station-tab${viewTab === 'reservations' ? ' is-active' : ''}`}
              onClick={() => setViewTab('reservations')}
              type="button"
            >
              <Icon name="event_seat" />
              <span>Reservations Timeline ({reservations.length})</span>
            </button>
          </div>

          {viewTab === 'floor' && (
            <div className="manager-kds-filter-tools">
              <select
                aria-label="Filter by Sector"
                className="manager-select-filter"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value as any)}
              >
                <option value="All">All Sectors (28 Tables)</option>
                <option value="Main Floor">Main Floor (16 Tables)</option>
                <option value="Mezzanine VIP">Mezzanine VIP (4 Tables)</option>
                <option value="Patio Garden">Patio Garden (8 Tables)</option>
              </select>

              <div className="manager-pill-filters">
                <button
                  className={`manager-pill-filter${statusFilter === 'all' ? ' is-active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                  type="button"
                >
                  All ({tables.length})
                </button>
                <button
                  className={`manager-pill-filter${statusFilter === 'seated' ? ' is-active' : ''}`}
                  onClick={() => setStatusFilter('seated')}
                  type="button"
                >
                  Seated ({occupiedCount})
                </button>
                <button
                  className={`manager-pill-filter${statusFilter === 'available' ? ' is-active' : ''}`}
                  onClick={() => setStatusFilter('available')}
                  type="button"
                >
                  Available ({availableCount})
                </button>
                <button
                  className={`manager-pill-filter${statusFilter === 'needs_clean' ? ' is-active' : ''}`}
                  onClick={() => setStatusFilter('needs_clean')}
                  type="button"
                >
                  Needs Clean ({needsCleanCount})
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Telemetry Metric KPI Cards */}
        <div className="manager-kds-metrics-bar">
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Occupancy Rate:</span>
            <strong className="text-primary">{occupancyPercent}%</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Seated Dining:</span>
            <strong>{occupiedCount} / 28 Tables</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Available Walk-in:</span>
            <strong className="text-success">{availableCount} Tables</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Turnover Backlog:</span>
            <strong className={needsCleanCount > 0 ? 'text-warning' : 'text-success'}>
              {needsCleanCount} Tables
            </strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Avg Table Duration:</span>
            <strong>44.2 minutes</strong>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      {viewTab === 'floor' ? (
        <div className="manager-floor-layout">
          {/* Section A: Main Dining Room */}
          {(sectorFilter === 'All' || sectorFilter === 'Main Floor') && (
            <div className="manager-sector-group">
              <div className="manager-sector-header">
                <div className="manager-sector-title">
                  <Icon name="storefront" />
                  <h2>Section A: Main Dining Room</h2>
                </div>
                <span className="manager-badge manager-badge-neutral">
                  16 Tables Capacity • 14 Seated • 2 Available
                </span>
              </div>

              <div className="manager-table-grid">
                {filteredTables
                  .filter((t) => t.section === 'Main Floor')
                  .map((table) => {
                    const isSeated = table.status === 'seated';
                    const isAlert = table.status === 'alert';
                    const isClean = table.status === 'needs_clean';
                    const isAvail = table.status === 'available';

                    return (
                      <div
                        key={table.id}
                        className={`manager-table-card ${table.status}`}
                        onClick={() => setSelectedTable(table)}
                      >
                        <div className="manager-table-card-top">
                          <span className="manager-table-id">{table.label}</span>
                          <span className="manager-table-capacity">{table.capacity} Seats</span>
                        </div>

                        <div className="manager-table-card-status">
                          {isAlert && <span className="manager-status-text alert">ALLERGEN HOLD</span>}
                          {isSeated && <span className="manager-status-text seated">OCCUPIED</span>}
                          {isClean && <span className="manager-status-text cleaning">RESET OVERDUE</span>}
                          {isAvail && <span className="manager-status-text available">AVAILABLE</span>}
                        </div>

                        {table.partyName && (
                          <div className="manager-table-party">
                            <Icon name="groups" />
                            <span>{table.partyName}</span>
                          </div>
                        )}

                        {table.elapsedTime && (
                          <div className="manager-table-timer">
                            <Icon name="timer" />
                            <span>{table.elapsedTime} elapsed</span>
                          </div>
                        )}

                        {table.server && (
                          <div className="manager-table-server">
                            <small>{table.server}</small>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Section B: Mezzanine VIP Suite */}
          {(sectorFilter === 'All' || sectorFilter === 'Mezzanine VIP') && (
            <div className="manager-sector-group">
              <div className="manager-sector-header">
                <div className="manager-sector-title">
                  <Icon name="military_tech" />
                  <h2>Section B: Mezzanine VIP Suite</h2>
                </div>
                <span className="manager-badge manager-badge-primary">
                  4 VIP Tables • 100% Reserved &amp; Dining
                </span>
              </div>

              <div className="manager-table-grid">
                {filteredTables
                  .filter((t) => t.section === 'Mezzanine VIP')
                  .map((table) => (
                    <div
                      key={table.id}
                      className={`manager-table-card ${table.status}`}
                      onClick={() => setSelectedTable(table)}
                    >
                      <div className="manager-table-card-top">
                        <span className="manager-table-id">{table.label}</span>
                        <span className="manager-table-capacity">{table.capacity} Seats (VIP)</span>
                      </div>

                      <div className="manager-table-card-status">
                        {table.status === 'needs_clean' ? (
                          <span className="manager-status-text cleaning">STAGING VIP</span>
                        ) : (
                          <span className="manager-status-text seated">VIP SEATED</span>
                        )}
                      </div>

                      {table.partyName && (
                        <div className="manager-table-party">
                          <Icon name="star" />
                          <span>{table.partyName}</span>
                        </div>
                      )}

                      {table.elapsedTime && (
                        <div className="manager-table-timer">
                          <Icon name="timer" />
                          <span>{table.elapsedTime}</span>
                        </div>
                      )}

                      <div className="manager-table-server">
                        <small>{table.server || 'Marcus Vance (Captain)'}</small>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Section C: Patio Garden */}
          {(sectorFilter === 'All' || sectorFilter === 'Patio Garden') && (
            <div className="manager-sector-group">
              <div className="manager-sector-header">
                <div className="manager-sector-title">
                  <Icon name="explore" />
                  <h2>Section C: Patio Garden</h2>
                </div>
                <span className="manager-badge manager-badge-neutral">
                  8 Patio Tables • 6 Seated • 2 Open
                </span>
              </div>

              <div className="manager-table-grid">
                {filteredTables
                  .filter((t) => t.section === 'Patio Garden')
                  .map((table) => (
                    <div
                      key={table.id}
                      className={`manager-table-card ${table.status}`}
                      onClick={() => setSelectedTable(table)}
                    >
                      <div className="manager-table-card-top">
                        <span className="manager-table-id">{table.label}</span>
                        <span className="manager-table-capacity">{table.capacity} Seats</span>
                      </div>

                      <div className="manager-table-card-status">
                        <span className={`manager-status-text ${table.status}`}>
                          {table.status === 'available' ? 'AVAILABLE' : table.status === 'needs_clean' ? 'CLEANING' : 'OCCUPIED'}
                        </span>
                      </div>

                      {table.partyName && (
                        <div className="manager-table-party">
                          <Icon name="groups" />
                          <span>{table.partyName}</span>
                        </div>
                      )}

                      {table.elapsedTime && (
                        <div className="manager-table-timer">
                          <Icon name="timer" />
                          <span>{table.elapsedTime}</span>
                        </div>
                      )}

                      <div className="manager-table-server">
                        <small>{table.server || 'Outdoor Server'}</small>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Reservations Timeline & Management List */
        <div className="manager-reservations-container">
          <div className="manager-reservations-card">
            <div className="manager-reservations-header">
              <div>
                <h3>Evening Reservations Schedule (Dinner Shift B)</h3>
                <p>Showing 6 booked parties matching floor table staging</p>
              </div>
              <button
                className="manager-btn manager-btn-sm manager-btn-secondary"
                onClick={() => showToast('[Simulated Action] Refreshed reservation roster from DineFlow reservation engine.')}
                type="button"
              >
                <Icon name="refresh" /> Refresh Bookings
              </button>
            </div>

            <table className="manager-table">
              <thead>
                <tr>
                  <th>Guest Name &amp; VIP Status</th>
                  <th>Scheduled Time</th>
                  <th>Party Size</th>
                  <th>Table Assignment</th>
                  <th>Section</th>
                  <th>Occasion &amp; Special Requests</th>
                  <th>Reservation Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr
                    key={res.id}
                    onClick={() => setSelectedReservation(res)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong>{res.guestName}</strong>
                        {res.isVip && (
                          <span className="manager-badge manager-badge-primary">
                            <Icon name="star" /> VIP
                          </span>
                        )}
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {res.phone} • Est: {res.spendEstimate}
                      </div>
                    </td>
                    <td>
                      <strong>{res.scheduledTime}</strong>
                    </td>
                    <td>{res.partySize} Guests</td>
                    <td>
                      <span className="manager-badge manager-badge-neutral">
                        Table {res.tableId}
                      </span>
                    </td>
                    <td>{res.section}</td>
                    <td>
                      <div style={{ maxWidth: '16rem', fontSize: '0.8125rem' }}>
                        {res.occasion && <span className="text-primary font-semibold">{res.occasion}: </span>}
                        {res.specialRequests || '—'}
                      </div>
                    </td>
                    <td>
                      <span className={`manager-badge ${res.status === 'seated' ? 'manager-badge-success' : res.status === 'late' ? 'manager-badge-danger' : 'manager-badge-info'}`}>
                        {res.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      {res.status !== 'seated' ? (
                        <button
                          className="manager-btn manager-btn-sm manager-btn-primary"
                          onClick={() => handleSeatParty(res)}
                          type="button"
                        >
                          <Icon name="event_seat" /> Seat Party
                        </button>
                      ) : (
                        <span className="text-success font-semibold" style={{ fontSize: '0.8125rem' }}>
                          <Icon name="check" /> Seated
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Table Detail Drawer */}
      {selectedTable && (
        <div
          className="manager-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTable(null);
          }}
        >
          <div className="manager-modal">
            <div className="manager-modal-header">
              <div className="manager-modal-title-wrap">
                <span className={`manager-badge ${selectedTable.status === 'available' ? 'manager-badge-success' : selectedTable.status === 'needs_clean' ? 'manager-badge-warning' : 'manager-badge-primary'}`}>
                  {selectedTable.status.toUpperCase()}
                </span>
                <h3>Table {selectedTable.label} — {selectedTable.section}</h3>
              </div>
              <button
                className="manager-modal-close-btn"
                onClick={() => setSelectedTable(null)}
                type="button"
                aria-label="Close table drawer"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="manager-modal-body">
              <div className="manager-drawer-meta-grid">
                <div>
                  <small>Capacity</small>
                  <strong>{selectedTable.capacity} Dining Seats</strong>
                </div>
                <div>
                  <small>Sector Location</small>
                  <strong>{selectedTable.section}</strong>
                </div>
                <div>
                  <small>Assigned Server</small>
                  <strong>{selectedTable.server || 'Floor Pool'}</strong>
                </div>
                <div>
                  <small>Current Duration</small>
                  <strong>{selectedTable.elapsedTime || 'Available (0m)'}</strong>
                </div>
              </div>

              {selectedTable.partyName && (
                <div className="manager-banner manager-banner-info" style={{ marginTop: '1rem' }}>
                  <Icon name="groups" />
                  <div>
                    <strong>Active Party:</strong> {selectedTable.partyName}
                    <div style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                      Pacing telemetry: Finishing course 2; bill generation anticipated in 12m.
                    </div>
                  </div>
                </div>
              )}

              {selectedTable.details && (
                <div className="manager-banner manager-banner-warning" style={{ marginTop: '0.5rem' }}>
                  <Icon name="info" />
                  <div>
                    <strong>Operational Status Note:</strong>
                    <div>{selectedTable.details}</div>
                  </div>
                </div>
              )}

              <h4 style={{ margin: '1.25rem 0 0.5rem', fontFamily: 'var(--font-heading)' }}>
                Manager Table State Actions
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                Manually control the table state to keep floor hostesses, kitchen expeditor, and cleaning dispatch in sync.
              </p>

              <div className="manager-table-action-buttons">
                <button
                  className="manager-btn manager-btn-secondary"
                  onClick={() => {
                    handleMarkNeedClean(selectedTable.id);
                  }}
                  type="button"
                >
                  <Icon name="mop" /> Request Cleaning / Turnover
                </button>
                <button
                  className="manager-btn manager-btn-secondary"
                  onClick={() => {
                    handleMarkAvailable(selectedTable.id);
                  }}
                  type="button"
                >
                  <Icon name="check_circle" /> Mark Clean &amp; Available
                </button>
                <button
                  className="manager-btn manager-btn-secondary"
                  onClick={() => {
                    showToast(`[Simulated Action] Printed guest check for Table ${selectedTable.label}. POS settle staged.`);
                  }}
                  type="button"
                >
                  <Icon name="receipt_long" /> Print Guest Check
                </button>
              </div>
            </div>

            <div className="manager-modal-footer">
              <button
                className="manager-btn manager-btn-primary"
                onClick={() => setSelectedTable(null)}
                type="button"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="manager-toast" role="status">
          <Icon name="check_circle" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

