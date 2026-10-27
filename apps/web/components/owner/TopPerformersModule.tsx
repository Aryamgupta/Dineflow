'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type StaffLeader = {
  rank: number;
  id: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  tables: number;
  compliment: string;
};

type DishLeader = {
  rank: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  orders: number;
  revenue: number;
  margin: string;
};

const staffLeaders: StaffLeader[] = [
  {
    rank: 1,
    id: 'EMP-004',
    name: 'Alex Moreno',
    role: 'Waiter',
    rating: 4.90,
    reviews: 114,
    tables: 320,
    compliment: 'Frequently cited by diners for outstanding wine pairing advice.',
  },
  {
    rank: 2,
    id: 'EMP-003',
    name: 'Marco Bellini',
    role: 'Head Chef',
    rating: 4.92,
    reviews: 88,
    tables: 1240,
    compliment: 'Consistently praised for handmade pasta perfection and plating.',
  },
  {
    rank: 3,
    id: 'EMP-007',
    name: 'Sophia Martinez',
    role: 'Cleaner',
    rating: 4.90,
    reviews: 18,
    tables: 420,
    compliment: 'Recognized for impeccable dining room cleanliness and rapid turnover.',
  },
  {
    rank: 4,
    id: 'EMP-006',
    name: 'Kenji Sato',
    role: 'Sous Chef',
    rating: 4.85,
    reviews: 52,
    tables: 980,
    compliment: 'Zero station errors across all seafood and raw bar tickets.',
  },
];

const dishLeaders: DishLeader[] = [
  {
    rank: 1,
    name: 'Truffle Tagliatelle',
    category: 'Handmade Pasta',
    rating: 4.94,
    reviews: 184,
    orders: 412,
    revenue: 11536,
    margin: '68%',
  },
  {
    rank: 2,
    name: 'Dry-Aged Prime Ribeye',
    category: 'Mains & Steaks',
    rating: 4.88,
    reviews: 128,
    orders: 286,
    revenue: 16588,
    margin: '62%',
  },
  {
    rank: 3,
    name: 'Burrata Caprese Artigiana',
    category: 'Starters',
    rating: 4.91,
    reviews: 94,
    orders: 340,
    revenue: 6120,
    margin: '74%',
  },
  {
    rank: 4,
    name: 'Classic Espresso Tiramisu',
    category: 'Dolci / Desserts',
    rating: 4.95,
    reviews: 156,
    orders: 390,
    revenue: 4680,
    margin: '78%',
  },
];

export function TopPerformersModule() {
  const [activeTab, setActiveTab] = useState<'Staff' | 'Dishes'>('Staff');
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Excellence &amp; Recognition</p>
          <h1>Top Performers Leaderboard</h1>
          <p className="owner-page-subtitle">
            Transparent rankings celebrating top-rated culinary creations and exemplary restaurant staff members.
          </p>
        </div>

        <div className="owner-header-actions">
          <div className="owner-tabs-group" role="tablist">
            <button
              className={`owner-tab-btn ${period === 'week' ? 'is-active' : ''}`}
              onClick={() => setPeriod('week')}
              type="button"
            >
              This Week
            </button>
            <button
              className={`owner-tab-btn ${period === 'month' ? 'is-active' : ''}`}
              onClick={() => setPeriod('month')}
              type="button"
            >
              This Month
            </button>
            <button
              className={`owner-tab-btn ${period === 'quarter' ? 'is-active' : ''}`}
              onClick={() => setPeriod('quarter')}
              type="button"
            >
              Quarter
            </button>
          </div>
        </div>
      </div>

      {/* Segmented View Switch */}
      <div className="owner-tabs-bar">
        <div className="owner-tabs-group">
          <button
            className={`owner-tab-btn ${activeTab === 'Staff' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('Staff')}
            type="button"
          >
            <Icon name="badge" /> Staff Leaderboard
          </button>
          <button
            className={`owner-tab-btn ${activeTab === 'Dishes' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('Dishes')}
            type="button"
          >
            <Icon name="restaurant_menu" /> Culinary Dish Leaderboard
          </button>
        </div>
      </div>

      {/* Staff Leaderboard View */}
      {activeTab === 'Staff' && (
        <div className="owner-table-wrapper">
          <table className="owner-table">
            <thead>
              <tr>
                <th style={{ width: '4rem' }}>Rank</th>
                <th>Staff Member</th>
                <th>Role Context</th>
                <th>Verified Rating</th>
                <th>Volume (Covers / Tickets)</th>
                <th>Customer Recognition Highlight</th>
              </tr>
            </thead>
            <tbody>
              {staffLeaders.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span
                      style={{
                        display: 'inline-grid',
                        placeItems: 'center',
                        width: '1.75rem',
                        height: '1.75rem',
                        borderRadius: '50%',
                        background:
                          s.rank === 1
                            ? '#fef3c7'
                            : s.rank === 2
                            ? '#f1f5f9'
                            : s.rank === 3
                            ? '#ffedd5'
                            : 'var(--color-surface-low)',
                        color:
                          s.rank === 1
                            ? '#b45309'
                            : s.rank === 2
                            ? '#475569'
                            : s.rank === 3
                            ? '#c2410c'
                            : 'var(--color-text-muted)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      #{s.rank}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div className="owner-avatar" style={{ width: '2rem', height: '2rem' }}>
                        {s.name.charAt(0)}
                      </div>
                      <strong>{s.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{s.role}</span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700 }}>
                      <Icon name="star" className="text-warning" />
                      {s.rating.toFixed(2)}
                      <small style={{ color: 'var(--color-text-muted)' }}>({s.reviews} reviews)</small>
                    </span>
                  </td>
                  <td>
                    <strong>{s.tables}</strong>{' '}
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                      {s.role === 'Waiter' ? 'tables served' : 'tickets handled'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    &ldquo;{s.compliment}&rdquo;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Culinary Dish Leaderboard View */}
      {activeTab === 'Dishes' && (
        <div className="owner-table-wrapper">
          <table className="owner-table">
            <thead>
              <tr>
                <th style={{ width: '4rem' }}>Rank</th>
                <th>Dish Name</th>
                <th>Menu Category</th>
                <th>Guest Score</th>
                <th>Units Ordered</th>
                <th>Gross Sales</th>
                <th>Food Margin</th>
              </tr>
            </thead>
            <tbody>
              {dishLeaders.map((d) => (
                <tr key={d.name}>
                  <td>
                    <span
                      style={{
                        display: 'inline-grid',
                        placeItems: 'center',
                        width: '1.75rem',
                        height: '1.75rem',
                        borderRadius: '50%',
                        background:
                          d.rank === 1
                            ? '#fef3c7'
                            : d.rank === 2
                            ? '#f1f5f9'
                            : d.rank === 3
                            ? '#ffedd5'
                            : 'var(--color-surface-low)',
                        color:
                          d.rank === 1
                            ? '#b45309'
                            : d.rank === 2
                            ? '#475569'
                            : d.rank === 3
                            ? '#c2410c'
                            : 'var(--color-text-muted)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      #{d.rank}
                    </span>
                  </td>
                  <td>
                    <strong>{d.name}</strong>
                  </td>
                  <td>
                    <span className="owner-badge owner-badge-neutral">{d.category}</span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700 }}>
                      <Icon name="star" className="text-warning" />
                      {d.rating.toFixed(2)}
                      <small style={{ color: 'var(--color-text-muted)' }}>({d.reviews})</small>
                    </span>
                  </td>
                  <td>
                    <strong>{d.orders}</strong> units
                  </td>
                  <td>
                    <strong>${d.revenue.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className="owner-badge owner-badge-success">{d.margin}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

