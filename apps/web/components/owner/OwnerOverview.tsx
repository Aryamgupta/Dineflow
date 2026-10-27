'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '../landing/Icon';

export function OwnerOverview() {
  const [timeRange, setTimeRange] = useState<'today' | 'yesterday' | 'week' | 'month'>('today');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="owner-page-container">
      {/* Welcome & Overview Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Executive Restaurant Operations</p>
          <h1>Good evening, Laurent.</h1>
          <p className="owner-page-subtitle">
            The Rustic Oak — Downtown | Service is active across 18 dining tables.
          </p>
        </div>

        <div className="owner-header-actions">
          <div className="owner-tabs-group" role="tablist" aria-label="Reporting time range">
            <button
              className={`owner-tab-btn ${timeRange === 'today' ? 'is-active' : ''}`}
              onClick={() => setTimeRange('today')}
              type="button"
            >
              Today
            </button>
            <button
              className={`owner-tab-btn ${timeRange === 'yesterday' ? 'is-active' : ''}`}
              onClick={() => setTimeRange('yesterday')}
              type="button"
            >
              Yesterday
            </button>
            <button
              className={`owner-tab-btn ${timeRange === 'week' ? 'is-active' : ''}`}
              onClick={() => setTimeRange('week')}
              type="button"
            >
              7 Days
            </button>
            <button
              className={`owner-tab-btn ${timeRange === 'month' ? 'is-active' : ''}`}
              onClick={() => setTimeRange('month')}
              type="button"
            >
              30 Days
            </button>
          </div>

          <Link href="/owner/staff-management" className="owner-btn owner-btn-primary">
            <Icon name="person" />
            <span>Manage Staff</span>
          </Link>

          <Link href="/owner/menu" className="owner-btn owner-btn-secondary">
            <Icon name="restaurant_menu" />
            <span>Menu Catalog</span>
          </Link>
        </div>
      </div>

      {/* Urgent Operational Alert Banner */}
      <div className="owner-banner owner-banner-warning">
        <div className="owner-banner-content">
          <Icon name="priority_high" />
          <div>
            <strong>Operational Attention Required:</strong> Table 4 order is exceeding target prep time (24m in kitchen). 1 staff escalation open.
          </div>
        </div>
        <Link href="/owner/escalations" className="owner-btn owner-btn-sm owner-btn-secondary">
          View Escalations
        </Link>
      </div>

      {/* 6 Key Business Metrics (KPIs) */}
      <div className="owner-kpi-grid">
        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Gross Revenue</span>
            <span className="owner-kpi-icon"><Icon name="receipt_long" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">$4,820.50</span>
            <span className="owner-kpi-delta owner-delta-up">
              <Icon name="trending_up" /> +12.4%
            </span>
          </div>
          <span className="owner-kpi-footer">vs. previous period ($4,288.00)</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Total Orders</span>
            <span className="owner-kpi-icon"><Icon name="room_service" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">142</span>
            <span className="owner-kpi-delta owner-delta-up">
              <Icon name="trending_up" /> +8.2%
            </span>
          </div>
          <span className="owner-kpi-footer">118 Dine-in, 24 Takeaway</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Average Check</span>
            <span className="owner-kpi-icon"><Icon name="insights" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">$33.95</span>
            <span className="owner-kpi-delta owner-delta-up">
              <Icon name="trending_up" /> +4.1%
            </span>
          </div>
          <span className="owner-kpi-footer">Average spend per covers</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Guest Rating</span>
            <span className="owner-kpi-icon"><Icon name="star" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">4.82 ★</span>
            <span className="owner-kpi-delta owner-delta-up">
              <Icon name="trending_up" /> 348 reviews
            </span>
          </div>
          <span className="owner-kpi-footer">92% positive sentiment</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Workforce on Duty</span>
            <span className="owner-kpi-icon"><Icon name="badge" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">14 / 18</span>
            <span className="owner-badge owner-badge-neutral">
              2/2 Managers
            </span>
          </div>
          <span className="owner-kpi-footer">6 Waiters, 5 Kitchen, 1 Cleaner, 2 GMs</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Active Escalations</span>
            <span className="owner-kpi-icon"><Icon name="priority_high" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">2</span>
            <span className="owner-badge owner-badge-warning">
              1 Urgent
            </span>
          </div>
          <span className="owner-kpi-footer">Kitchen delay &amp; Bar refill note</span>
        </div>
      </div>

      {/* Grid: Sales Trend & Live Operational Rail */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(24rem, 1fr))', gap: '1.25rem' }}>
        {/* Sales Snapshot Bar Chart Simulation */}
        <section className="owner-card-section" aria-label="Sales Volume Trend">
          <div className="owner-card-header">
            <div>
              <h2>Hourly Sales &amp; Order Volume</h2>
              <p>Peak service window: 7:00 PM – 9:30 PM</p>
            </div>
            <Link href="/owner/sales-analytics" className="owner-btn owner-btn-sm owner-btn-secondary">
              Detailed Analytics <Icon name="chevron_right" />
            </Link>
          </div>

          <div className="owner-chart-container" aria-label="Hourly sales bars">
            {[
              { time: '12 PM', val: '45%', amount: '$420' },
              { time: '1 PM', val: '75%', amount: '$710' },
              { time: '2 PM', val: '50%', amount: '$480' },
              { time: '5 PM', val: '40%', amount: '$390' },
              { time: '6 PM', val: '65%', amount: '$620' },
              { time: '7 PM', val: '95%', amount: '$980' },
              { time: '8 PM', val: '100%', amount: '$1,050' },
              { time: '9 PM', val: '80%', amount: '$820' },
            ].map((col) => (
              <div key={col.time} className="owner-chart-col" title={`${col.time}: ${col.amount}`}>
                <div className="owner-chart-bar-wrap">
                  <div className="owner-chart-bar-fill" style={{ height: col.val }} />
                </div>
                <span className="owner-chart-label">{col.time}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <span>Lunch Service: $1,610 (33%)</span>
            <span>Dinner Service: $3,210.50 (67%)</span>
          </div>
        </section>

        {/* Live Active Dining Floor & Operations Rail */}
        <section className="owner-card-section" aria-label="Live Operations Rail">
          <div className="owner-card-header">
            <div>
              <h2>Live Dining Floor (Active Tables)</h2>
              <p>18 occupied of 24 total dining tables</p>
            </div>
            <span className="owner-badge owner-badge-success">
              <Icon name="check_circle" /> Service Active
            </span>
          </div>

          <div className="owner-operations-rail">
            <div className="owner-op-card">
              <div className="owner-op-header">
                <span className="owner-op-table-title">Table 02</span>
                <span className="owner-badge owner-badge-primary">Dining (Course 2)</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <span>4 Guests | Server: Alex M.</span>
                <p style={{ margin: '0.25rem 0 0', fontWeight: 600, color: 'var(--color-text)' }}>$142.00 (Ordered 28m ago)</p>
              </div>
            </div>

            <div className="owner-op-card">
              <div className="owner-op-header">
                <span className="owner-op-table-title">Table 04</span>
                <span className="owner-badge owner-badge-warning">In Kitchen (Delayed)</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <span>2 Guests | Server: Priya K.</span>
                <p style={{ margin: '0.25rem 0 0', fontWeight: 600, color: 'var(--color-warning)' }}>$88.50 (Ordered 24m ago)</p>
              </div>
            </div>

            <div className="owner-op-card">
              <div className="owner-op-header">
                <span className="owner-op-table-title">Table 07</span>
                <span className="owner-badge owner-badge-success">Ready for Service</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <span>6 Guests | Server: Jordan T.</span>
                <p style={{ margin: '0.25rem 0 0', fontWeight: 600, color: 'var(--color-text)' }}>$210.00 (Kitchen bumped)</p>
              </div>
            </div>

            <div className="owner-op-card">
              <div className="owner-op-header">
                <span className="owner-op-table-title">Table 11</span>
                <span className="owner-badge owner-badge-neutral">Bill Requested</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <span>2 Guests | Server: Alex M.</span>
                <p style={{ margin: '0.25rem 0 0', fontWeight: 600, color: 'var(--color-text)' }}>$64.00 (Payment pending)</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Grid: Escalation Center & AI Assistant Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(24rem, 1fr))', gap: '1.25rem' }}>
        {/* Escalation Center */}
        <section className="owner-card-section" aria-label="Escalation Center">
          <div className="owner-card-header">
            <div>
              <h2>Escalations &amp; Incident Center</h2>
              <p>Staff and floor operational reports</p>
            </div>
            <Link href="/owner/escalations" className="owner-btn owner-btn-sm owner-btn-secondary">
              All Tickets <Icon name="chevron_right" />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.85rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', border: '1px solid var(--color-border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="owner-badge owner-badge-danger">High Priority</span>
                  <strong style={{ fontSize: '0.8125rem' }}>Table 4 Entrée Delay</strong>
                </div>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Reported by Priya K. (Waiter) • Kitchen station backlog at grill
                </p>
              </div>
              <button
                className="owner-btn owner-btn-sm owner-btn-secondary"
                onClick={() => showToast('Escalation marked under review')}
                type="button"
              >
                Review
              </button>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', border: '1px solid var(--color-border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="owner-badge owner-badge-neutral">Medium</span>
                  <strong style={{ fontSize: '0.8125rem' }}>POS Terminal 2 Paper Jam</strong>
                </div>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Reported by Elena R. (GM) • Secondary terminal in service bar
                </p>
              </div>
              <button
                className="owner-btn owner-btn-sm owner-btn-secondary"
                onClick={() => showToast('Escalation marked resolved')}
                type="button"
              >
                Resolve
              </button>
            </div>
          </div>
        </section>

        {/* AI Business Assistant Summary Panel */}
        <section className="owner-card-section" aria-label="DineFlow AI Insights">
          <div className="owner-card-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Icon name="auto_awesome" className="text-primary" />
                <h2>DineFlow AI Business Insight</h2>
              </div>
              <p>Automated intelligence grounded in restaurant sales &amp; guest trends</p>
            </div>
            <Link href="/owner/ai-assistant" className="owner-btn owner-btn-sm owner-btn-primary">
              Ask Assistant
            </Link>
          </div>

          <div style={{ padding: '1rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', border: '1px solid var(--color-border-soft)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
              &ldquo;Customer ratings reached <strong>4.82 ★</strong> this week. Weekend dinner covers generated <strong>67%</strong> of gross revenue. 
              Top selling pairing is <em>Truffle Tagliatelle</em> with <em>Barolo Reserve</em> (42 orders). Dessert attachment increased by 14% after the digital menu redesign.&rdquo;
            </p>

            <div className="owner-ai-references">
              <span className="owner-ai-ref-item">
                <span>Source 1:</span> Sales Analytics (Hourly &amp; Category data)
              </span>
              <span className="owner-ai-ref-item">
                <span>Source 2:</span> Reviews &amp; Ratings (348 verified table submissions)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              className="owner-btn owner-btn-sm owner-btn-secondary"
              onClick={() => showToast('Insight saved to executive notebook')}
              type="button"
            >
              <Icon name="save" /> Save Insight
            </button>
          </div>
        </section>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="owner-toast" role="status">
          <Icon name="check_circle" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

