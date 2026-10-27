'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

export function SalesAnalyticsModule() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Financial &amp; Revenue Intelligence</p>
          <h1>Sales &amp; Revenue Analytics</h1>
          <p className="owner-page-subtitle">
            Comprehensive audit of restaurant gross receipts, check averages, channel distribution, and menu profitability.
          </p>
        </div>

        <div className="owner-header-actions">
          <div className="owner-tabs-group" role="tablist">
            {(['7d', '30d', '90d', '1y'] as const).map((t) => (
              <button
                key={t}
                className={`owner-tab-btn ${timeframe === t ? 'is-active' : ''}`}
                onClick={() => setTimeframe(t)}
                type="button"
              >
                {t === '7d' ? 'Last 7 Days' : t === '30d' ? 'Last 30 Days' : t === '90d' ? '90 Days' : 'Full Year'}
              </button>
            ))}
          </div>

          <button
            className="owner-btn owner-btn-primary"
            onClick={() => showToast('Generating comprehensive executive PDF financial report...')}
            type="button"
          >
            <Icon name="download" /> Export Financial Report
          </button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="owner-kpi-grid">
        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Gross Sales</span>
            <span className="owner-kpi-icon"><Icon name="receipt_long" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">$42,850</span>
            <span className="owner-kpi-delta owner-delta-up">
              <Icon name="trending_up" /> +14.6%
            </span>
          </div>
          <span className="owner-kpi-footer">vs. previous 30 days ($37,390)</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Net Revenue</span>
            <span className="owner-kpi-icon"><Icon name="insights" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">$39,422</span>
            <span className="owner-kpi-delta owner-delta-up">
              <Icon name="trending_up" /> +13.8%
            </span>
          </div>
          <span className="owner-kpi-footer">Net of discounts &amp; comps</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Orders Completed</span>
            <span className="owner-kpi-icon"><Icon name="room_service" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">1,248</span>
            <span className="owner-kpi-delta owner-delta-up">
              <Icon name="trending_up" /> +9.2%
            </span>
          </div>
          <span className="owner-kpi-footer">Average 41.6 orders per day</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Average Check (AOV)</span>
            <span className="owner-kpi-icon"><Icon name="bar_chart" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">$34.33</span>
            <span className="owner-kpi-delta owner-delta-up">
              <Icon name="trending_up" /> +4.9%
            </span>
          </div>
          <span className="owner-kpi-footer">Per closed dining table</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Daily Average Sales</span>
            <span className="owner-kpi-icon"><Icon name="trending_up" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">$1,428</span>
            <span className="owner-kpi-delta owner-delta-up">
              Peak: $2,840 (Sat)
            </span>
          </div>
          <span className="owner-kpi-footer">Fri-Sat accounts for 48%</span>
        </div>

        <div className="owner-kpi-card">
          <div className="owner-kpi-top">
            <span className="owner-kpi-label">Refunds &amp; Comps</span>
            <span className="owner-kpi-icon"><Icon name="priority_high" /></span>
          </div>
          <div className="owner-kpi-value-wrap">
            <span className="owner-kpi-value">$340</span>
            <span className="owner-badge owner-badge-success">
              0.79% rate
            </span>
          </div>
          <span className="owner-kpi-footer">Target threshold is &lt; 1.5%</span>
        </div>
      </div>

      {/* Primary Sales Trend Bar Chart Simulation */}
      <section className="owner-card-section">
        <div className="owner-card-header">
          <div>
            <h2>Daily Revenue Progression (Last 30 Days)</h2>
            <p>Weekend surges and dinner service performance</p>
          </div>
        </div>

        <div className="owner-chart-container" style={{ height: '14rem' }}>
          {[
            { label: 'Wk 1', height: '65%', val: '$9,200' },
            { label: 'Wk 2', height: '78%', val: '$10,450' },
            { label: 'Wk 3', height: '88%', val: '$11,100' },
            { label: 'Wk 4', height: '98%', val: '$12,100' },
          ].map((bar) => (
            <div key={bar.label} className="owner-chart-col" title={`${bar.label}: ${bar.val}`}>
              <div className="owner-chart-bar-wrap">
                <div className="owner-chart-bar-fill" style={{ height: bar.height }} />
              </div>
              <span className="owner-chart-label">
                <strong>{bar.label}</strong> ({bar.val})
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Service Type & Category Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(22rem, 1fr))', gap: '1.25rem' }}>
        {/* Service Type Distribution */}
        <section className="owner-card-section">
          <div className="owner-card-header">
            <div>
              <h2>Sales by Service Channel</h2>
              <p>Breakdown across dine-in, bar, and takeout</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { type: 'Dine-in Floor Dining', pct: 68, amount: '$29,138' },
              { type: 'Bar & Lounge Service', pct: 22, amount: '$9,427' },
              { type: 'Direct QR Takeaway', pct: 10, amount: '$4,285' },
            ].map((channel) => (
              <div key={channel.type} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <strong>{channel.type}</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>{channel.amount} ({channel.pct}%)</span>
                </div>
                <div style={{ height: '0.5rem', background: 'var(--color-surface-low)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${channel.pct}%`, height: '100%', background: 'var(--color-primary)' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Menu Category Contribution */}
        <section className="owner-card-section">
          <div className="owner-card-header">
            <div>
              <h2>Menu Category Share</h2>
              <p>Contribution to total food &amp; beverage volume</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { category: 'Main Entrées & Steaks', pct: 52, amount: '$22,282' },
              { category: 'Wine & Handcrafted Cocktails', pct: 24, amount: '$10,284' },
              { category: 'Starters & Antipasti', pct: 14, amount: '$5,999' },
              { category: 'Dolci & Desserts', pct: 10, amount: '$4,285' },
            ].map((cat) => (
              <div key={cat.category} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <strong>{cat.category}</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>{cat.amount} ({cat.pct}%)</span>
                </div>
                <div style={{ height: '0.5rem', background: 'var(--color-surface-low)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${cat.pct}%`, height: '100%', background: 'var(--color-secondary)' }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="owner-toast" role="status">
          <Icon name="check_circle" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

