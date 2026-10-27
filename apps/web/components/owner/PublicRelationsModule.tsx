'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type Announcement = {
  id: string;
  title: string;
  channel: 'Website Banner' | 'QR Menu Banner' | 'Social Channels';
  date: string;
  status: 'Published' | 'Draft';
  message: string;
};

const initialAnnouncements: Announcement[] = [
  {
    id: 'ANN-01',
    title: 'Autumn Harvest Truffle & Wine Tasting Weekend',
    channel: 'QR Menu Banner',
    date: 'Oct 15, 2024',
    status: 'Published',
    message: 'Join us this Friday through Sunday for our exclusive 5-course Alba White Truffle tasting menu curated by Chef Marco Bellini.',
  },
  {
    id: 'ANN-02',
    title: 'Holiday Season Private Dining Reservations Now Open',
    channel: 'Website Banner',
    date: 'Oct 01, 2024',
    status: 'Published',
    message: 'Book our Mezzanine Dining Room for company celebrations and family holiday gatherings. Custom tasting menus available.',
  },
];

export function PublicRelationsModule() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState<Announcement['channel']>('QR Menu Banner');
  const [message, setMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const created: Announcement = {
      id: `ANN-0${announcements.length + 1}`,
      title,
      channel,
      date: 'Just now',
      status: 'Published',
      message,
    };

    setAnnouncements([created, ...announcements]);
    setIsModalOpen(false);
    setTitle('');
    setMessage('');
    showToast(`Announcement "${created.title}" published.`);
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Marketing &amp; Reputation</p>
          <h1>Public Relations &amp; Brand Presence</h1>
          <p className="owner-page-subtitle">
            Manage your restaurant&apos;s public brand assets, promotional announcements, and verified social media links.
          </p>
        </div>

        <div className="owner-header-actions">
          <button
            className="owner-btn owner-btn-primary"
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            <Icon name="campaign" />
            <span>Create Announcement</span>
          </button>
        </div>
      </div>

      {/* Brand Identity & Social Links Card */}
      <div className="owner-card-section">
        <div className="owner-card-header">
          <div>
            <h2>Verified Public Social Channels</h2>
            <p>Direct links displayed on customer digital menus and receipts</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1rem' }}>
          {[
            { platform: 'Instagram', handle: '@therusticoak.dining', status: 'Connected', icon: 'camera_alt' },
            { platform: 'Facebook', handle: 'facebook.com/therusticoak', status: 'Connected', icon: 'share' },
            { platform: 'LinkedIn', handle: 'linkedin.com/company/rustic-oak', status: 'Connected', icon: 'badge' },
            { platform: 'Official Website', handle: 'https://therusticoak.com', status: 'Active Link', icon: 'explore' },
          ].map((item) => (
            <div
              key={item.platform}
              style={{
                padding: '1rem',
                background: 'var(--color-surface-low)',
                borderRadius: 'var(--radius-control)',
                border: '1px solid var(--color-border-soft)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.8125rem' }}>{item.platform}</strong>
                <span className="owner-badge owner-badge-success">{item.status}</span>
              </div>
              <code style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>{item.handle}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Active Public Announcements */}
      <div className="owner-card-section">
        <div className="owner-card-header">
          <div>
            <h2>Published Public Announcements</h2>
            <p>Active notification cards broadcasted to guests across online touchpoints</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {announcements.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '1rem 1.25rem',
                background: 'var(--color-surface-low)',
                borderRadius: 'var(--radius-control)',
                border: '1px solid var(--color-border-soft)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="owner-badge owner-badge-primary">{item.channel}</span>
                  <strong style={{ fontSize: '0.875rem' }}>{item.title}</strong>
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                  Published {item.date}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE ANNOUNCEMENT MODAL */}
      {isModalOpen && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal">
            <div className="owner-modal-header">
              <h3>Create Public Brand Announcement</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement}>
              <div className="owner-modal-body">
                <div className="owner-form-group">
                  <label htmlFor="ann-title">Announcement Headline *</label>
                  <input
                    id="ann-title"
                    className="owner-form-input"
                    placeholder="e.g. Wine Tasting Weekend or Holiday Closures"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="owner-form-group">
                  <label htmlFor="ann-channel">Broadcast Destination *</label>
                  <select
                    id="ann-channel"
                    className="owner-form-select"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as any)}
                  >
                    <option value="QR Menu Banner">QR Digital Menu Banner (Guest Mobile)</option>
                    <option value="Website Banner">Public Website Alert Banner</option>
                    <option value="Social Channels">Social Media Attachment</option>
                  </select>
                </div>

                <div className="owner-form-group">
                  <label htmlFor="ann-msg">Message Content *</label>
                  <textarea
                    id="ann-msg"
                    className="owner-form-textarea"
                    placeholder="Enter copy to display to patrons..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              <div className="owner-modal-footer">
                <button
                  type="button"
                  className="owner-btn owner-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="owner-btn owner-btn-primary">
                  Publish Announcement
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

