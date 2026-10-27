'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type PerformanceRecord = {
  id: string;
  name: string;
  role: string;
  category?: string;
  rating: number;
  reviews: number;
  hours: number;
  attendanceRate: number;
  tablesOrTickets: number;
  complaintsCount: number;
  trend: 'up' | 'down' | 'steady';
  summary: string;
};

const performanceData: PerformanceRecord[] = [
  {
    id: 'EMP-004',
    name: 'Alex Moreno',
    role: 'Waiter',
    rating: 4.90,
    reviews: 114,
    hours: 140,
    attendanceRate: 99.2,
    tablesOrTickets: 320,
    complaintsCount: 0,
    trend: 'up',
    summary: 'Exceptional guest rapport, highest tip rate on floor, zero table escalations.',
  },
  {
    id: 'EMP-003',
    name: 'Marco Bellini',
    role: 'Kitchen Staff',
    category: 'Head Chef',
    rating: 4.92,
    reviews: 88,
    hours: 172,
    attendanceRate: 100.0,
    tablesOrTickets: 1240,
    complaintsCount: 1,
    trend: 'up',
    summary: 'Kitchen ticket turnaround under 14m average. High dish consistency ratings.',
  },
  {
    id: 'EMP-005',
    name: 'Priya Kapoor',
    role: 'Waiter',
    rating: 4.82,
    reviews: 96,
    hours: 144,
    attendanceRate: 97.5,
    tablesOrTickets: 290,
    complaintsCount: 1,
    trend: 'steady',
    summary: 'Consistent upseller of wine pairings. Handled rush shifts effectively.',
  },
  {
    id: 'EMP-006',
    name: 'Kenji Sato',
    role: 'Kitchen Staff',
    category: 'Sous Chef',
    rating: 4.85,
    reviews: 52,
    hours: 165,
    attendanceRate: 98.0,
    tablesOrTickets: 980,
    complaintsCount: 0,
    trend: 'up',
    summary: 'Flawless seafood prep station cleanliness and waste reduction metrics.',
  },
  {
    id: 'EMP-007',
    name: 'Sophia Martinez',
    role: 'Cleaner',
    rating: 4.90,
    reviews: 18,
    hours: 80,
    attendanceRate: 100.0,
    tablesOrTickets: 420,
    complaintsCount: 0,
    trend: 'up',
    summary: 'Rapid table turnover sanitization. 100% adherence to hygiene protocols.',
  },
  {
    id: 'EMP-008',
    name: 'David Chen',
    role: 'Kitchen Staff',
    category: 'Line Cook',
    rating: 4.75,
    reviews: 24,
    hours: 155,
    attendanceRate: 94.2,
    tablesOrTickets: 840,
    complaintsCount: 2,
    trend: 'down',
    summary: 'Occasional delay during Friday dinner grill backup. Needs prep station support.',
  },
];

export function StaffPerformanceModule() {
  const [roleFilter, setRoleFilter] = useState<'All' | 'Waiter' | 'Kitchen Staff' | 'Cleaner'>('All');
  const [selectedRecord, setSelectedRecord] = useState<PerformanceRecord | null>(null);

  const filtered = performanceData.filter((r) => {
    if (roleFilter !== 'All' && r.role !== roleFilter) return false;
    return true;
  });

  return (
    <div className="owner-page-container">
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Workforce Analytics</p>
          <h1>Staff Performance &amp; Evaluation</h1>
          <p className="owner-page-subtitle">
            Objective role-specific evaluation comparing table turns, attendance, customer ratings, and incident counts.
          </p>
        </div>

        <div className="owner-header-actions">
          <div className="owner-tabs-group">
            {(['All', 'Waiter', 'Kitchen Staff', 'Cleaner'] as const).map((r) => (
              <button
                key={r}
                className={`owner-tab-btn ${roleFilter === r ? 'is-active' : ''}`}
                onClick={() => setRoleFilter(r)}
                type="button"
              >
                {r === 'All' ? 'All Roles' : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="owner-kpi-grid">
        <div className="owner-kpi-card">
          <span className="owner-kpi-label">Team Avg Rating</span>
          <span className="owner-kpi-value">4.86 ★</span>
          <span className="owner-kpi-footer">Based on 352 verified customer mentions</span>
        </div>
        <div className="owner-kpi-card">
          <span className="owner-kpi-label">On-Time Attendance</span>
          <span className="owner-kpi-value">98.1%</span>
          <span className="owner-kpi-footer">912 total logged shifts this month</span>
        </div>
        <div className="owner-kpi-card">
          <span className="owner-kpi-label">Avg Table Turnaround</span>
          <span className="owner-kpi-value">46 mins</span>
          <span className="owner-kpi-delta owner-delta-up">-4m vs target</span>
        </div>
        <div className="owner-kpi-card">
          <span className="owner-kpi-label">Resolved Issues</span>
          <span className="owner-kpi-value">4 / 4</span>
          <span className="owner-badge owner-badge-success">100% resolution</span>
        </div>
      </div>

      {/* Performance Scorecard Table */}
      <div className="owner-table-wrapper">
        <table className="owner-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role Context</th>
              <th>Guest Rating</th>
              <th>Tables / Tickets Served</th>
              <th>Attendance Score</th>
              <th>Escalations</th>
              <th>Trend</th>
              <th style={{ textAlign: 'right' }}>Evaluation</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div className="owner-avatar" style={{ width: '2rem', height: '2rem' }}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{item.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{item.role}</span>
                  {item.category && (
                    <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--color-secondary)' }}>
                      {item.category}
                    </span>
                  )}
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                    <Icon name="star" className="text-warning" />
                    {item.rating.toFixed(2)}
                    <small style={{ color: 'var(--color-text-muted)' }}>({item.reviews})</small>
                  </span>
                </td>
                <td>
                  <strong>{item.tablesOrTickets}</strong>{' '}
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                    {item.role === 'Kitchen Staff' ? 'tickets cooked' : 'tables served'}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: item.attendanceRate > 97 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                    {item.attendanceRate}%
                  </span>
                </td>
                <td>
                  {item.complaintsCount === 0 ? (
                    <span className="owner-badge owner-badge-success">0 incidents</span>
                  ) : (
                    <span className="owner-badge owner-badge-warning">{item.complaintsCount} incident</span>
                  )}
                </td>
                <td>
                  {item.trend === 'up' && (
                    <span className="owner-badge owner-badge-success"><Icon name="trending_up" /> Improving</span>
                  )}
                  {item.trend === 'steady' && (
                    <span className="owner-badge owner-badge-neutral">Consistent</span>
                  )}
                  {item.trend === 'down' && (
                    <span className="owner-badge owner-badge-danger">Coaching</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="owner-btn owner-btn-sm owner-btn-secondary"
                    onClick={() => setSelectedRecord(item)}
                    type="button"
                  >
                    View Scorecard
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drill-down Scorecard Modal */}
      {selectedRecord && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal">
            <div className="owner-modal-header">
              <h3>Performance Scorecard: {selectedRecord.name}</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setSelectedRecord(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="owner-modal-body">
              <div className="owner-banner owner-banner-info">
                <Icon name="insights" />
                <div>
                  <strong>Role Evaluation:</strong> {selectedRecord.summary}
                </div>
              </div>

              <div className="owner-kpi-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="owner-kpi-card" style={{ padding: '0.85rem' }}>
                  <span className="owner-kpi-label">Customer Satisfaction</span>
                  <span className="owner-kpi-value">{selectedRecord.rating} ★</span>
                  <span className="owner-kpi-footer">{selectedRecord.reviews} reviews referencing service</span>
                </div>
                <div className="owner-kpi-card" style={{ padding: '0.85rem' }}>
                  <span className="owner-kpi-label">Punctuality Score</span>
                  <span className="owner-kpi-value">{selectedRecord.attendanceRate}%</span>
                  <span className="owner-kpi-footer">{selectedRecord.hours} hours logged</span>
                </div>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Supervisory Notes &amp; Coaching Plan:</label>
                <textarea
                  className="owner-form-textarea"
                  defaultValue="Exemplary dedication during Friday dinner shifts. Recommend for lead trainer role during upcoming quarter."
                />
              </div>
            </div>

            <div className="owner-modal-footer">
              <button
                className="owner-btn owner-btn-secondary"
                onClick={() => setSelectedRecord(null)}
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

