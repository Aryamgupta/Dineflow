'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon, type IconName } from '../landing/Icon';
import {
  initialKdsOrders,
  type KdsOrder,
  type KdsOrderStatus,
  type KitchenStation,
} from './fixtures';

const statusColumns: { id: KdsOrderStatus; title: string; icon: IconName; badgeVariant: string }[] = [
  { id: 'received', title: 'Received & Confirmed', icon: 'receipt_long', badgeVariant: 'manager-badge-neutral' },
  { id: 'in_prep', title: 'In Preparation', icon: 'skillet', badgeVariant: 'manager-badge-info' },
  { id: 'needs_expedite', title: 'Needs Expedite', icon: 'notification_important', badgeVariant: 'manager-badge-danger' },
  { id: 'plating', title: 'Plating & Handoff', icon: 'dinner_dining', badgeVariant: 'manager-badge-warning' },
  { id: 'ready', title: 'Ready to Serve / Pass', icon: 'check_circle', badgeVariant: 'manager-badge-success' },
];

const stations: KitchenStation[] = [
  'All',
  'Hearth & Grill',
  'Sauté & Fish',
  'Raw & Garde-Manger',
  'Pastry & Dessert',
  'Bar & Cellar',
];

export function OrdersKitchenModule() {
  const [orders, setOrders] = useState<KdsOrder[]>(initialKdsOrders);
  const [activeStation, setActiveStation] = useState<KitchenStation>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<KdsOrder | null>(null);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [filterDelayOnly, setFilterDelayOnly] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New order form state
  const [newOrderTable, setNewOrderTable] = useState('T1');
  const [newOrderServer, setNewOrderServer] = useState('Julian Rivera');
  const [newOrderItemName, setNewOrderItemName] = useState('');
  const [newOrderStation, setNewOrderStation] = useState<KitchenStation>('Hearth & Grill');
  const [newOrderGuests, setNewOrderGuests] = useState(2);
  const [newOrderNotes, setNewOrderNotes] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedOrder(null);
        setIsCreateModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status transitions
  const getNextStatus = (current: KdsOrderStatus): KdsOrderStatus | 'served' => {
    switch (current) {
      case 'received':
        return 'in_prep';
      case 'in_prep':
        return 'plating';
      case 'needs_expedite':
        return 'plating';
      case 'plating':
        return 'ready';
      case 'ready':
        return 'served';
      default:
        return 'served';
    }
  };

  const advanceOrderStatus = (orderId: string) => {
    setOrders((prev) => {
      const target = prev.find((o) => o.id === orderId);
      if (!target) return prev;
      const next = getNextStatus(target.status);
      if (next === 'served') {
        showToast(`[Simulated Action] Order ${target.orderNumber} served to Table ${target.table}. Removed from active board.`);
        return prev.filter((o) => o.id !== orderId);
      }
      showToast(`[Simulated Action] Order ${target.orderNumber} advanced to "${next.replace('_', ' ').toUpperCase()}".`);
      return prev.map((o) => (o.id === orderId ? { ...o, status: next, priority: next === 'needs_expedite' ? 'delayed' : o.priority } : o));
    });
    if (selectedOrder && selectedOrder.id === orderId) {
      const next = getNextStatus(selectedOrder.status);
      if (next === 'served') setSelectedOrder(null);
      else setSelectedOrder({ ...selectedOrder, status: next });
    }
  };

  const toggleExpedite = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const isDelayed = o.status === 'needs_expedite';
          const newStatus: KdsOrderStatus = isDelayed ? 'in_prep' : 'needs_expedite';
          showToast(`[Simulated Action] Order ${o.orderNumber} ${isDelayed ? 'returned to normal prep' : 'flagged for Manager Expedite'}.`);
          return {
            ...o,
            status: newStatus,
            priority: isDelayed ? 'normal' : 'delayed',
          };
        }
        return o;
      })
    );
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderItemName.trim()) {
      alert('Please enter an item description.');
      return;
    }
    const orderNum = `#DF-${Math.floor(9050 + Math.random() * 50)}`;
    const newOrder: KdsOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      table: newOrderTable,
      section: newOrderTable.startsWith('P') ? 'Patio Garden' : newOrderTable.startsWith('M') ? 'Mezzanine VIP' : 'Main Floor',
      serverName: newOrderServer,
      guestCount: newOrderGuests,
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      elapsedMinutes: 1,
      targetMinutes: 15,
      status: 'received',
      priority: 'rush',
      chefNotes: newOrderNotes || 'Manager authorized expedited ticket',
      specialRequests: 'Manager Override Injection',
      items: [
        {
          id: `item-${Date.now()}`,
          name: newOrderItemName,
          quantity: 1,
          station: newOrderStation === 'All' ? 'Hearth & Grill' : newOrderStation,
          course: 'Entrée',
          itemStatus: 'pending',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setIsCreateModalOpen(false);
    setNewOrderItemName('');
    setNewOrderNotes('');
    showToast(`[Simulated Action] Injected Authorized Rush Order ${orderNum} for Table ${newOrderTable}.`);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filterDelayOnly && order.priority !== 'delayed' && order.status !== 'needs_expedite') {
        return false;
      }
      if (activeStation !== 'All') {
        const hasStation = order.items.some((i) => i.station === activeStation);
        if (!hasStation) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesNum = order.orderNumber.toLowerCase().includes(query);
        const matchesTable = order.table.toLowerCase().includes(query);
        const matchesServer = order.serverName.toLowerCase().includes(query);
        const matchesItem = order.items.some((i) => i.name.toLowerCase().includes(query));
        if (!matchesNum && !matchesTable && !matchesServer && !matchesItem) {
          return false;
        }
      }
      return true;
    });
  }, [orders, activeStation, filterDelayOnly, searchQuery]);

  // Telemetry metrics
  const delayedCount = orders.filter((o) => o.priority === 'delayed' || o.status === 'needs_expedite').length;
  const inPrepCount = orders.filter((o) => o.status === 'in_prep' || o.status === 'needs_expedite').length;
  const readyCount = orders.filter((o) => o.status === 'ready').length;

  return (
    <div className="manager-kds-container">
      {/* Top Controls & Station Filter Bar */}
      <section className="manager-kds-header">
        <div className="manager-kds-header-top">
          <div>
            <div className="manager-breadcrumbs">
              <span>Operations</span>
              <span className="manager-sep">/</span>
              <span>Kitchen Display</span>
              <span className="manager-sep">/</span>
              <span className="manager-badge manager-badge-success">Live KDS Queue</span>
            </div>
            <div className="manager-kds-title-row">
              <h1 className="manager-kds-heading">Orders &amp; Kitchen Operations</h1>
              <span className="manager-telemetry-pill">
                <span className="manager-pulse-dot" />
                Simulated Live Kitchen Telemetry
              </span>
            </div>
            <p className="manager-kds-subtitle">
              The Rustic Oak — Downtown • Shift B: Dinner Rush • Real-time line expediting, ticket sequencing &amp; station routing.
            </p>
          </div>

          <div className="manager-kds-actions-cluster">
            <button
              className="manager-btn manager-btn-secondary"
              onClick={() => showToast('[Simulated Action] Exported shift kitchen performance log to CSV.')}
              type="button"
            >
              <Icon name="file_download" />
              <span>Export Log</span>
            </button>
            <button
              className="manager-btn manager-btn-primary"
              onClick={() => setIsCreateModalOpen(true)}
              type="button"
            >
              <Icon name="add" />
              <span>Create Authorized Ticket</span>
            </button>
          </div>
        </div>

        {/* Station Tabs & Search */}
        <div className="manager-kds-toolbar">
          <div className="manager-station-tabs" role="tablist" aria-label="Kitchen Station Filter">
            {stations.map((st) => (
              <button
                key={st}
                className={`manager-station-tab${activeStation === st ? ' is-active' : ''}`}
                onClick={() => setActiveStation(st)}
                type="button"
                role="tab"
                aria-selected={activeStation === st}
              >
                {st === 'All' ? 'All Stations' : st}
              </button>
            ))}
          </div>

          <div className="manager-kds-filter-tools">
            <label className="manager-kds-search">
              <Icon name="search" />
              <input
                aria-label="Search active orders"
                placeholder="Search ticket #, table, item, server..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>

            <button
              className={`manager-btn manager-btn-sm ${filterDelayOnly ? 'manager-btn-danger' : 'manager-btn-secondary'}`}
              onClick={() => setFilterDelayOnly(!filterDelayOnly)}
              type="button"
            >
              <Icon name="timer" />
              <span>Delayed Only ({delayedCount})</span>
            </button>

            <div className="manager-view-toggle">
              <button
                className={`manager-toggle-btn${viewMode === 'board' ? ' is-active' : ''}`}
                onClick={() => setViewMode('board')}
                title="Kanban Board View"
                type="button"
              >
                <Icon name="grid_view" />
              </button>
              <button
                className={`manager-toggle-btn${viewMode === 'list' ? ' is-active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Linear Table List View"
                type="button"
              >
                <Icon name="receipt_long" />
              </button>
            </div>
          </div>
        </div>

        {/* Operational Status Metric Pills */}
        <div className="manager-kds-metrics-bar">
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Active Queue:</span>
            <strong>{orders.length} Tickets</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">In Preparation:</span>
            <strong className="text-info">{inPrepCount}</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Delayed Tickets:</span>
            <strong className={delayedCount > 0 ? 'text-danger' : 'text-success'}>{delayedCount} Tickets</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Ready at Pass:</span>
            <strong className="text-success">{readyCount} Plated</strong>
          </div>
          <div className="manager-metric-pill">
            <span className="manager-metric-label">Target Ticket SLA:</span>
            <strong>18.0 min</strong>
          </div>
        </div>
      </section>

      {/* KDS Board View */}
      {viewMode === 'board' ? (
        <div className="manager-kds-board">
          {statusColumns.map((col) => {
            const colOrders = filteredOrders.filter((o) => o.status === col.id);
            return (
              <div key={col.id} className="manager-kds-column">
                <div className="manager-kds-column-header">
                  <div className="manager-col-title-group">
                    <Icon name={col.icon} />
                    <h3>{col.title}</h3>
                  </div>
                  <span className={`manager-badge ${col.badgeVariant}`}>
                    {colOrders.length}
                  </span>
                </div>

                <div className="manager-kds-column-body">
                  {colOrders.length === 0 ? (
                    <div className="manager-empty-column">
                      <Icon name="check" />
                      <p>Queue clear</p>
                    </div>
                  ) : (
                    colOrders.map((order) => {
                      const isDelayed = order.priority === 'delayed' || order.status === 'needs_expedite';
                      return (
                        <div
                          key={order.id}
                          className={`manager-kds-card${isDelayed ? ' is-delayed' : ''}`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <div className="manager-kds-card-top">
                            <div className="manager-card-id-group">
                              <strong>{order.orderNumber}</strong>
                              <span className="manager-card-table">{order.table} ({order.section})</span>
                            </div>
                            <span className={`manager-time-badge${isDelayed ? ' is-late' : ''}`}>
                              <Icon name="timer" /> {order.elapsedMinutes}m
                            </span>
                          </div>

                          {order.specialRequests && (
                            <div className="manager-card-special-tag">
                              <Icon name="star" />
                              <span>{order.specialRequests}</span>
                            </div>
                          )}

                          <div className="manager-card-items-list">
                            {order.items.map((item) => (
                              <div key={item.id} className="manager-card-item-row">
                                <span className="manager-item-qty">{item.quantity}x</span>
                                <span className="manager-item-name">{item.name}</span>
                                {item.allergenAlert && (
                                  <span className="manager-allergen-tag">
                                    <Icon name="notification_important" />
                                    {item.allergenAlert}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          {order.chefNotes && (
                            <div className="manager-card-chef-note">
                              <Icon name="soup_kitchen" />
                              <span>{order.chefNotes}</span>
                            </div>
                          )}

                          <div className="manager-kds-card-footer">
                            <div className="manager-server-meta">
                              <Icon name="person" />
                              <span>{order.serverName}</span>
                            </div>

                            <div className="manager-card-btn-group" onClick={(e) => e.stopPropagation()}>
                              <button
                                className="manager-card-btn manager-card-btn-secondary"
                                onClick={() => toggleExpedite(order.id)}
                                title={isDelayed ? 'Clear Expedite Flag' : 'Mark Expedite Priority'}
                                type="button"
                              >
                                <Icon name="bolt" />
                                <span>{isDelayed ? 'De-escalate' : 'Expedite'}</span>
                              </button>
                              <button
                                className="manager-card-btn manager-card-btn-primary"
                                onClick={() => advanceOrderStatus(order.id)}
                                title="Advance to Next Stage"
                                type="button"
                              >
                                <span>Advance</span>
                                <Icon name="arrow_forward" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Linear Table View */
        <div className="manager-kds-list-container">
          <table className="manager-table">
            <thead>
              <tr>
                <th>Ticket &amp; Table</th>
                <th>Time &amp; Delay</th>
                <th>Status Stage</th>
                <th>Items Ordered</th>
                <th>Server</th>
                <th>Chef Note / Special Alert</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
                    No orders match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isDelayed = order.priority === 'delayed' || order.status === 'needs_expedite';
                  return (
                    <tr
                      key={order.id}
                      className={isDelayed ? 'manager-tr-delayed' : ''}
                      onClick={() => setSelectedOrder(order)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <strong>{order.orderNumber}</strong>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                          Table {order.table} • {order.section} ({order.guestCount} guests)
                        </div>
                      </td>
                      <td>
                        <span className={`manager-badge ${isDelayed ? 'manager-badge-danger' : 'manager-badge-neutral'}`}>
                          {order.elapsedMinutes}m elapsed (Target: {order.targetMinutes}m)
                        </span>
                      </td>
                      <td>
                        <span className="manager-badge manager-badge-info">
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div style={{ maxWidth: '18rem', fontSize: '0.8125rem' }}>
                          {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                        </div>
                      </td>
                      <td>{order.serverName}</td>
                      <td>
                        {order.chefNotes || order.specialRequests ? (
                          <div style={{ fontSize: '0.75rem', color: isDelayed ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>
                            {order.specialRequests ? `VIP: ${order.specialRequests}` : ''}
                            {order.chefNotes ? ` [Chef: ${order.chefNotes}]` : ''}
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                          <button
                            className="manager-btn manager-btn-sm manager-btn-secondary"
                            onClick={() => toggleExpedite(order.id)}
                            type="button"
                          >
                            <Icon name="bolt" />
                            {isDelayed ? 'Normal' : 'Expedite'}
                          </button>
                          <button
                            className="manager-btn manager-btn-sm manager-btn-primary"
                            onClick={() => advanceOrderStatus(order.id)}
                            type="button"
                          >
                            Advance <Icon name="arrow_forward" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-over Ticket Detail Drawer */}
      {selectedOrder && (
        <div
          className="manager-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedOrder(null);
          }}
        >
          <div className="manager-modal manager-modal-lg">
            <div className="manager-modal-header">
              <div className="manager-modal-title-wrap">
                <span className="manager-badge manager-badge-primary">
                  Order Ticket {selectedOrder.orderNumber}
                </span>
                <h3>Table {selectedOrder.table} — {selectedOrder.section}</h3>
              </div>
              <button
                className="manager-modal-close-btn"
                onClick={() => setSelectedOrder(null)}
                type="button"
                aria-label="Close ticket drawer"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="manager-modal-body">
              <div className="manager-drawer-meta-grid">
                <div>
                  <small>Ordered At</small>
                  <strong>{selectedOrder.orderTime} ({selectedOrder.elapsedMinutes}m ago)</strong>
                </div>
                <div>
                  <small>Target Turnaround</small>
                  <strong>{selectedOrder.targetMinutes} minutes SLA</strong>
                </div>
                <div>
                  <small>Server on Duty</small>
                  <strong>{selectedOrder.serverName}</strong>
                </div>
                <div>
                  <small>Current Queue Stage</small>
                  <strong className="text-primary">{selectedOrder.status.replace('_', ' ').toUpperCase()}</strong>
                </div>
              </div>

              {selectedOrder.specialRequests && (
                <div className="manager-banner manager-banner-warning" style={{ marginTop: '1rem' }}>
                  <Icon name="star" />
                  <div>
                    <strong>Guest Special Occasion / Requirement:</strong>
                    <div>{selectedOrder.specialRequests}</div>
                  </div>
                </div>
              )}

              {selectedOrder.chefNotes && (
                <div className="manager-banner manager-banner-info" style={{ marginTop: '0.5rem' }}>
                  <Icon name="soup_kitchen" />
                  <div>
                    <strong>Kitchen Line Chef Notes:</strong>
                    <div>{selectedOrder.chefNotes}</div>
                  </div>
                </div>
              )}

              <h4 style={{ margin: '1.25rem 0 0.5rem', fontFamily: 'var(--font-heading)' }}>
                Ticket Item Breakdown &amp; Prep Stations
              </h4>
              <div className="manager-ticket-breakdown">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="manager-ticket-item-card">
                    <div className="manager-ticket-item-header">
                      <div>
                        <strong>{item.quantity}x {item.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          Station: <strong>{item.station}</strong> • Course: {item.course}
                        </div>
                      </div>
                      <span className={`manager-badge ${item.itemStatus === 'ready' ? 'manager-badge-success' : 'manager-badge-neutral'}`}>
                        {item.itemStatus.toUpperCase()}
                      </span>
                    </div>

                    {item.modifiers && item.modifiers.length > 0 && (
                      <div className="manager-item-modifiers">
                        {item.modifiers.map((m, mIdx) => (
                          <span key={mIdx} className="manager-modifier-chip">
                            + {m}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.allergenAlert && (
                      <div className="manager-allergen-alert-strip">
                        <Icon name="notification_important" />
                        <strong>CRITICAL: {item.allergenAlert}</strong> — Verify dedicated sanitized preparation area
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="manager-modal-footer">
              <button
                className="manager-btn manager-btn-secondary"
                onClick={() => {
                  showToast(`[Simulated Action] Triggered Kitchen Expeditor Runner Ping for ${selectedOrder.orderNumber}`);
                }}
                type="button"
              >
                <Icon name="notifications" /> Ping Runner to Table
              </button>
              <button
                className="manager-btn manager-btn-secondary"
                onClick={() => toggleExpedite(selectedOrder.id)}
                type="button"
              >
                <Icon name="bolt" /> {selectedOrder.priority === 'delayed' ? 'Remove Expedite' : 'Mark Expedite'}
              </button>
              <button
                className="manager-btn manager-btn-primary"
                onClick={() => advanceOrderStatus(selectedOrder.id)}
                type="button"
              >
                Advance to Next Stage <Icon name="arrow_forward" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Authorized Order Simulation Modal */}
      {isCreateModalOpen && (
        <div
          className="manager-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCreateModalOpen(false);
          }}
        >
          <div className="manager-modal">
            <div className="manager-modal-header">
              <h3>Create Authorized Kitchen Order</h3>
              <button
                className="manager-modal-close-btn"
                onClick={() => setIsCreateModalOpen(false)}
                type="button"
                aria-label="Close modal"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder}>
              <div className="manager-modal-body">
                <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  Manager authorization injects a direct rush ticket into the kitchen line (e.g. VIP comp, remake or replacement dish).
                </p>

                <div className="manager-form-grid">
                  <div className="manager-field">
                    <label>Target Table</label>
                    <select
                      value={newOrderTable}
                      onChange={(e) => setNewOrderTable(e.target.value)}
                    >
                      <option value="T1">Table 1 (Main Floor)</option>
                      <option value="T4">Table 4 (Main Floor)</option>
                      <option value="T7">Table 7 (Main Floor)</option>
                      <option value="T12">Table 12 (Main Floor)</option>
                      <option value="M1">Mezzanine M1 (VIP)</option>
                      <option value="M2">Mezzanine M2 (VIP)</option>
                      <option value="P1">Patio P1 (Garden)</option>
                      <option value="P2">Patio P2 (Garden)</option>
                    </select>
                  </div>

                  <div className="manager-field">
                    <label>Server Assignment</label>
                    <select
                      value={newOrderServer}
                      onChange={(e) => setNewOrderServer(e.target.value)}
                    >
                      <option value="Julian Rivera">Julian Rivera (Head Server)</option>
                      <option value="Elena Vance">Elena Vance (Senior Server)</option>
                      <option value="Anthony Perez">Anthony Perez (Floor Server)</option>
                      <option value="Marcus Vance">Marcus Vance (VIP Captain)</option>
                    </select>
                  </div>

                  <div className="manager-field manager-col-span-2">
                    <label>Dish Description &amp; Specifications *</label>
                    <input
                      placeholder="e.g. 1x Truffle Risotto (Rush Remake)"
                      required
                      type="text"
                      value={newOrderItemName}
                      onChange={(e) => setNewOrderItemName(e.target.value)}
                    />
                  </div>

                  <div className="manager-field">
                    <label>Kitchen Routing Station</label>
                    <select
                      value={newOrderStation}
                      onChange={(e) => setNewOrderStation(e.target.value as KitchenStation)}
                    >
                      <option value="Hearth & Grill">Hearth &amp; Grill</option>
                      <option value="Sauté & Fish">Sauté &amp; Fish</option>
                      <option value="Raw & Garde-Manger">Raw &amp; Garde-Manger</option>
                      <option value="Pastry & Dessert">Pastry &amp; Dessert</option>
                      <option value="Bar & Cellar">Bar &amp; Cellar</option>
                    </select>
                  </div>

                  <div className="manager-field">
                    <label>Guest Count</label>
                    <input
                      max={12}
                      min={1}
                      type="number"
                      value={newOrderGuests}
                      onChange={(e) => setNewOrderGuests(parseInt(e.target.value, 10) || 1)}
                    />
                  </div>

                  <div className="manager-field manager-col-span-2">
                    <label>Manager Note / Expedite Justification</label>
                    <input
                      placeholder="e.g. Overcooked steak replacement — authorized by Manager"
                      type="text"
                      value={newOrderNotes}
                      onChange={(e) => setNewOrderNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="manager-modal-footer">
                <button
                  className="manager-btn manager-btn-secondary"
                  onClick={() => setIsCreateModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button className="manager-btn manager-btn-primary" type="submit">
                  <Icon name="check" /> Inject Authorized Ticket
                </button>
              </div>
            </form>
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
