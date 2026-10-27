'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type CustomerReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: string;
  table: string;
  text: string;
  dishes: string[];
  server?: string;
  ownerReply?: string;
  replyStatus: 'Responded' | 'Unanswered';
};

const initialReviews: CustomerReview[] = [
  {
    id: 'REV-201',
    author: 'Camila Rodriguez',
    rating: 5,
    date: '2 hours ago',
    source: 'QR Table Checkout',
    table: 'Table 07',
    text: 'The Truffle Tagliatelle was sublime—silky sauce and wonderful aroma. Alex provided spot-on wine pairing recommendations. Will definitely be returning for anniversary dinners!',
    dishes: ['Truffle Tagliatelle', 'Barolo Reserve'],
    server: 'Alex Moreno',
    replyStatus: 'Unanswered',
  },
  {
    id: 'REV-202',
    author: 'Julian Thorne',
    rating: 4,
    date: 'Yesterday, 8:40 PM',
    source: 'QR Table Checkout',
    table: 'Table 04',
    text: 'Delicious wood-fired ribeye and great rustic cocktail menu. There was a bit of a delay on the entrees arriving during peak dinner rush, but management was very attentive.',
    dishes: ['Prime Ribeye', 'Smoked Bourbon Sour'],
    server: 'Priya Kapoor',
    ownerReply: 'Thank you for dining with us Julian! We appreciate your patience during our weekend rush and look forward to welcoming you back soon.',
    replyStatus: 'Responded',
  },
  {
    id: 'REV-203',
    author: 'Emily Watson',
    rating: 5,
    date: '2 days ago',
    source: 'Google Local Link',
    table: 'Table 12',
    text: 'A hidden culinary gem in downtown. The Burrata Caprese starter was so fresh and the dessert tiramisu melted in our mouths. Outstanding ambiance.',
    dishes: ['Burrata Caprese', 'Classic Tiramisu'],
    server: 'Alex Moreno',
    replyStatus: 'Unanswered',
  },
  {
    id: 'REV-204',
    author: 'Robert Lee',
    rating: 3,
    date: '3 days ago',
    source: 'QR Table Checkout',
    table: 'Table 02',
    text: 'Good food overall, though the acoustics in the main dining room can get quite loud on Friday nights. Service from the waitstaff was very friendly.',
    dishes: ['Crispy Calamari', 'San Pellegrino'],
    server: 'Priya Kapoor',
    ownerReply: 'Thank you for the candid feedback Robert. We are currently testing acoustic baffling panels in the dining alcove to improve conversation comfort.',
    replyStatus: 'Responded',
  },
];

export function ReviewsRatingsModule() {
  const [reviews, setReviews] = useState<CustomerReview[]>(initialReviews);
  const [ratingFilter, setRatingFilter] = useState<'All' | '5' | '4' | '3' | '1-2'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Unanswered' | 'Responded'>('All');
  const [replyModalTarget, setReplyModalTarget] = useState<CustomerReview | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredReviews = reviews.filter((r) => {
    if (ratingFilter === '5' && r.rating !== 5) return false;
    if (ratingFilter === '4' && r.rating !== 4) return false;
    if (ratingFilter === '3' && r.rating !== 3) return false;
    if (ratingFilter === '1-2' && r.rating > 2) return false;
    if (statusFilter !== 'All' && r.replyStatus !== statusFilter) return false;
    return true;
  });

  const handlePublishReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModalTarget || !replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyModalTarget.id
          ? { ...r, ownerReply: replyText, replyStatus: 'Responded' }
          : r
      )
    );

    const author = replyModalTarget.author;
    setReplyModalTarget(null);
    setReplyText('');
    showToast(`Response sent to ${author}'s feedback.`);
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Customer Experience &amp; Feedback</p>
          <h1>Guest Reviews &amp; Ratings</h1>
          <p className="owner-page-subtitle">
            Verified table feedback, sentiment scoring, and direct customer communication portal.
          </p>
        </div>

        <div className="owner-header-actions">
          <button
            className="owner-btn owner-btn-secondary"
            onClick={() => showToast('Reviews exported to CSV')}
            type="button"
          >
            <Icon name="download" /> Export Feedback
          </button>
        </div>
      </div>

      {/* Ratings Overview Card */}
      <div className="owner-card-section" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                4.82
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.15rem', color: '#f59e0b' }}>
                <Icon name="star" />
                <Icon name="star" />
                <Icon name="star" />
                <Icon name="star" />
                <Icon name="star" />
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                348 Verified Reviews
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {[
                { stars: 5, pct: '84%', count: 292 },
                { stars: 4, pct: '11%', count: 38 },
                { stars: 3, pct: '4%', count: 14 },
                { stars: 2, pct: '1%', count: 3 },
                { stars: 1, pct: '<1%', count: 1 },
              ].map((tier) => (
                <div key={tier.stars} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6875rem' }}>
                  <span style={{ width: '1.5rem', textAlign: 'right', fontWeight: 600 }}>{tier.stars}★</span>
                  <div style={{ flex: 1, height: '0.5rem', background: 'var(--color-surface-low)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: tier.pct, height: '100%', background: 'var(--color-primary)' }} />
                  </div>
                  <span style={{ width: '2.5rem', color: 'var(--color-text-muted)' }}>{tier.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="owner-kpi-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="owner-kpi-card" style={{ padding: '0.75rem 1rem' }}>
              <span className="owner-kpi-label">Food Quality</span>
              <span className="owner-kpi-value" style={{ fontSize: '1.25rem' }}>4.9 / 5</span>
              <span className="owner-kpi-footer">Top rated: Truffle Tagliatelle</span>
            </div>
            <div className="owner-kpi-card" style={{ padding: '0.75rem 1rem' }}>
              <span className="owner-kpi-label">Service Speed</span>
              <span className="owner-kpi-value" style={{ fontSize: '1.25rem' }}>4.7 / 5</span>
              <span className="owner-kpi-footer">Avg wait time: 14m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="owner-tabs-bar">
        <div className="owner-tabs-group" role="tablist">
          {(['All', '5', '4', '3', '1-2'] as const).map((star) => (
            <button
              key={star}
              className={`owner-tab-btn ${ratingFilter === star ? 'is-active' : ''}`}
              onClick={() => setRatingFilter(star)}
              type="button"
            >
              {star === 'All' ? 'All Ratings' : `${star} Star`}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['All', 'Unanswered', 'Responded'] as const).map((status) => (
            <button
              key={status}
              className={`owner-btn owner-btn-sm ${statusFilter === status ? 'owner-btn-primary' : 'owner-btn-secondary'}`}
              onClick={() => setStatusFilter(status)}
              type="button"
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Review Feed Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredReviews.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--color-surface)', borderRadius: 'var(--radius-card)', color: 'var(--color-text-muted)' }}>
            No reviews match the selected filter.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="owner-card-section"
              style={{ padding: '1.25rem 1.5rem', gap: '0.85rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', color: '#f59e0b', fontSize: '0.875rem' }}>
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Icon key={i} name="star" />
                      ))}
                    </div>
                    <strong style={{ fontSize: '0.875rem' }}>{rev.author}</strong>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                      • {rev.table} ({rev.source})
                    </span>
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    Submitted {rev.date} {rev.server ? `• Served by ${rev.server}` : ''}
                  </div>
                </div>

                <span
                  className={`owner-badge ${
                    rev.replyStatus === 'Responded' ? 'owner-badge-success' : 'owner-badge-warning'
                  }`}
                >
                  {rev.replyStatus === 'Responded' ? 'Responded' : 'Needs Response'}
                </span>
              </div>

              <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
                &ldquo;{rev.text}&rdquo;
              </p>

              {rev.dishes.length > 0 && (
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {rev.dishes.map((dish) => (
                    <span
                      key={dish}
                      className="owner-badge owner-badge-neutral"
                      style={{ fontSize: '0.6875rem' }}
                    >
                      <Icon name="restaurant_menu" style={{ fontSize: '0.75rem' }} /> {dish}
                    </span>
                  ))}
                </div>
              )}

              {rev.ownerReply && (
                <div
                  style={{
                    marginTop: '0.25rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--color-surface-low)',
                    borderLeft: '3px solid var(--color-primary)',
                    borderRadius: '0 var(--radius-control) var(--radius-control) 0',
                    fontSize: '0.75rem',
                  }}
                >
                  <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '0.2rem' }}>
                    Owner Response:
                  </strong>
                  <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {rev.ownerReply}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.25rem' }}>
                <button
                  className="owner-btn owner-btn-sm owner-btn-secondary"
                  onClick={() => {
                    setReplyModalTarget(rev);
                    setReplyText(rev.ownerReply || '');
                  }}
                  type="button"
                >
                  <Icon name="chat" /> {rev.ownerReply ? 'Edit Response' : 'Reply to Guest'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RESPONSE COMPOSER MODAL */}
      {replyModalTarget && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal">
            <div className="owner-modal-header">
              <h3>Respond to {replyModalTarget.author}&apos;s Review</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setReplyModalTarget(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handlePublishReply}>
              <div className="owner-modal-body">
                <div style={{ padding: '0.85rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', fontSize: '0.75rem' }}>
                  <strong>Guest Review ({replyModalTarget.rating}★):</strong>
                  <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    &ldquo;{replyModalTarget.text}&rdquo;
                  </p>
                </div>

                <div className="owner-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label htmlFor="reply-input">Your Response *</label>
                    <small style={{ color: replyText.length > 450 ? 'var(--color-warning)' : 'var(--color-text-muted)' }}>
                      {replyText.length} / 500 characters
                    </small>
                  </div>
                  <textarea
                    id="reply-input"
                    className="owner-form-textarea"
                    placeholder="Write a personalized, professional thank you or resolution message..."
                    required
                    maxLength={500}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                </div>

                {/* Quick Templates */}
                <div>
                  <small style={{ display: 'block', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Quick response snippets:
                  </small>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="owner-btn owner-btn-sm owner-btn-secondary"
                      onClick={() =>
                        setReplyText('Thank you for dining with us! We are thrilled you enjoyed the dishes and service.')
                      }
                    >
                      Gratitude
                    </button>
                    <button
                      type="button"
                      className="owner-btn owner-btn-sm owner-btn-secondary"
                      onClick={() =>
                        setReplyText('Thank you for the candid feedback. We have addressed this with our kitchen team and look forward to impressing you on your next visit.')
                      }
                    >
                      Service Recovery
                    </button>
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isInternalNote}
                    onChange={(e) => setIsInternalNote(e.target.checked)}
                  />
                  <span>Mark as internal management note only (do not publish publicly)</span>
                </label>
              </div>

              <div className="owner-modal-footer">
                <button
                  type="button"
                  className="owner-btn owner-btn-secondary"
                  onClick={() => setReplyModalTarget(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="owner-btn owner-btn-primary">
                  <Icon name="send" /> {isInternalNote ? 'Save Internal Note' : 'Publish Response'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

