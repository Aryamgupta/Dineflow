'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type RestaurantPolicy = {
  id: string;
  title: string;
  audience: 'Customer' | 'Staff';
  category: string;
  version: string;
  lastUpdated: string;
  status: 'Published' | 'Draft' | 'Archived';
  requiresAcknowledgement: boolean;
  acknowledgedCount?: number;
  totalRequired?: number;
  content: string;
};

const initialPolicies: RestaurantPolicy[] = [
  {
    id: 'POL-01',
    title: 'Table Reservation & 15-Minute Grace Period Policy',
    audience: 'Customer',
    category: 'Reservations & Seating',
    version: 'v2.1',
    lastUpdated: 'Oct 12, 2024',
    status: 'Published',
    requiresAcknowledgement: false,
    content: 'Tables are held for a maximum of 15 minutes past reservation time. After 15 minutes, unseated tables will be released to walk-in dining guests.',
  },
  {
    id: 'POL-02',
    title: 'Kitchen Food Safety, Allergen Cross-Contact & Hygiene',
    audience: 'Staff',
    category: 'Food Safety & Hygiene',
    version: 'v3.0',
    lastUpdated: 'Sep 28, 2024',
    status: 'Published',
    requiresAcknowledgement: true,
    acknowledgedCount: 17,
    totalRequired: 18,
    content: 'All culinary staff must wash hands between handling raw proteins and allergen-free orders. Gluten-free pasta must be boiled in designated water baths.',
  },
  {
    id: 'POL-03',
    title: 'Cancellation & Order Refund Guidelines',
    audience: 'Customer',
    category: 'Billing & Refunds',
    version: 'v1.4',
    lastUpdated: 'Aug 15, 2024',
    status: 'Published',
    requiresAcknowledgement: false,
    content: 'Dine-in orders prepared by kitchen are non-refundable unless food quality does not meet our culinary standards. General Managers may authorize item comps.',
  },
  {
    id: 'POL-04',
    title: 'Staff Shift Attendance, Punctuality & Call-out Notice',
    audience: 'Staff',
    category: 'Workplace Conduct',
    version: 'v2.0',
    lastUpdated: 'Jul 10, 2024',
    status: 'Published',
    requiresAcknowledgement: true,
    acknowledgedCount: 18,
    totalRequired: 18,
    content: 'Staff must notify managing supervisor at least 3 hours prior to scheduled shift in case of medical emergency or absence.',
  },
];

export function RestaurantPoliciesModule() {
  const [policies, setPolicies] = useState<RestaurantPolicy[]>(initialPolicies);
  const [audienceFilter, setAudienceFilter] = useState<'All' | 'Customer' | 'Staff'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ackModalTarget, setAckModalTarget] = useState<RestaurantPolicy | null>(null);
  const [previewTarget, setPreviewTarget] = useState<RestaurantPolicy | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formAudience, setFormAudience] = useState<'Customer' | 'Staff'>('Customer');
  const [formCategory, setFormCategory] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formRequireAck, setFormRequireAck] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = policies.filter((p) => {
    if (audienceFilter !== 'All' && p.audience !== audienceFilter) return false;
    return true;
  });

  const handleCreatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      alert('Please fill out the policy title and policy text.');
      return;
    }

    const created: RestaurantPolicy = {
      id: `POL-0${policies.length + 1}`,
      title: formTitle,
      audience: formAudience,
      category: formCategory || 'General Rules',
      version: 'v1.0',
      lastUpdated: 'Just now',
      status: 'Published',
      requiresAcknowledgement: formAudience === 'Staff' ? formRequireAck : false,
      acknowledgedCount: formAudience === 'Staff' && formRequireAck ? 0 : undefined,
      totalRequired: formAudience === 'Staff' && formRequireAck ? 18 : undefined,
      content: formContent,
    };

    setPolicies((prev) => [created, ...prev]);
    setIsModalOpen(false);
    setFormTitle('');
    setFormCategory('');
    setFormContent('');
    setFormRequireAck(false);
    showToast(`Policy "${created.title}" published successfully.`);
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Governance &amp; Guidelines</p>
          <h1>Restaurant Policies &amp; House Rules</h1>
          <p className="owner-page-subtitle">
            Configure customer-facing dining terms, allergen declarations, and internal staff compliance procedures.
          </p>
        </div>

        <div className="owner-header-actions">
          <button
            className="owner-btn owner-btn-primary"
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            <Icon name="add" />
            <span>Create New Policy</span>
          </button>
        </div>
      </div>

      {/* Audience Filter Tabs */}
      <div className="owner-tabs-bar">
        <div className="owner-tabs-group" role="tablist">
          {(['All', 'Customer', 'Staff'] as const).map((aud) => {
            const count = aud === 'All' ? policies.length : policies.filter((p) => p.audience === aud).length;
            return (
              <button
                key={aud}
                className={`owner-tab-btn ${audienceFilter === aud ? 'is-active' : ''}`}
                onClick={() => setAudienceFilter(aud)}
                type="button"
              >
                <span>{aud === 'All' ? 'All Policies' : `${aud} Facing`}</span>
                <span className="owner-tab-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Policies Directory Table */}
      <div className="owner-table-wrapper">
        <table className="owner-table">
          <thead>
            <tr>
              <th>Policy Title</th>
              <th>Audience</th>
              <th>Category</th>
              <th>Version</th>
              <th>Last Updated</th>
              <th>Compliance / Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.title}</strong>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{item.id}</div>
                </td>
                <td>
                  <span
                    className={`owner-badge ${
                      item.audience === 'Customer' ? 'owner-badge-neutral' : 'owner-badge-primary'
                    }`}
                  >
                    {item.audience}
                  </span>
                </td>
                <td>{item.category}</td>
                <td>
                  <code>{item.version}</code>
                </td>
                <td style={{ fontSize: '0.6875rem' }}>{item.lastUpdated}</td>
                <td>
                  {item.requiresAcknowledgement ? (
                    <span
                      className={`owner-badge ${
                        item.acknowledgedCount === item.totalRequired
                          ? 'owner-badge-success'
                          : 'owner-badge-warning'
                      }`}
                    >
                      {item.acknowledgedCount} / {item.totalRequired} Staff Signed
                    </span>
                  ) : (
                    <span className="owner-badge owner-badge-success">{item.status}</span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                    {item.requiresAcknowledgement && (
                      <button
                        className="owner-btn owner-btn-sm owner-btn-secondary"
                        onClick={() => setAckModalTarget(item)}
                        type="button"
                      >
                        Signatures
                      </button>
                    )}
                    <button
                      className="owner-btn owner-btn-sm owner-btn-secondary"
                      onClick={() => setPreviewTarget(item)}
                      type="button"
                    >
                      Preview
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE NEW POLICY MODAL */}
      {isModalOpen && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal owner-modal-lg">
            <div className="owner-modal-header">
              <h3>Create Restaurant Policy</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleCreatePolicy}>
              <div className="owner-modal-body">
                <div className="owner-form-group">
                  <label htmlFor="pol-title">Policy Title *</label>
                  <input
                    id="pol-title"
                    className="owner-form-input"
                    placeholder="e.g. Patio Pet Policy &amp; Outdoor Seating Rules"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>

                <div className="owner-form-grid">
                  <div className="owner-form-group">
                    <label htmlFor="pol-aud">Target Audience *</label>
                    <select
                      id="pol-aud"
                      className="owner-form-select"
                      value={formAudience}
                      onChange={(e) => setFormAudience(e.target.value as any)}
                    >
                      <option value="Customer">Customer (Public Dining)</option>
                      <option value="Staff">Staff (Internal Workplace)</option>
                    </select>
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="pol-cat">Policy Category</label>
                    <input
                      id="pol-cat"
                      className="owner-form-input"
                      placeholder="e.g. Conduct, Hygiene, Dining"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                    />
                  </div>
                </div>

                <div className="owner-form-group">
                  <label htmlFor="pol-content">Policy Text &amp; Clauses *</label>
                  <textarea
                    id="pol-content"
                    className="owner-form-textarea"
                    placeholder="Enter the complete terms, rules, and procedures..."
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                  />
                </div>

                {formAudience === 'Staff' && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formRequireAck}
                      onChange={(e) => setFormRequireAck(e.target.checked)}
                    />
                    <span>Require explicit employee digital acknowledgement upon next shift sign-in</span>
                  </label>
                )}
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
                  Publish Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STAFF ACKNOWLEDGEMENT TRACKER MODAL */}
      {ackModalTarget && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal">
            <div className="owner-modal-header">
              <h3>Policy Acknowledgement Tracker</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setAckModalTarget(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="owner-modal-body">
              <p style={{ margin: 0, fontSize: '0.8125rem' }}>
                Signatures for: <strong>{ackModalTarget.title}</strong>
              </p>

              <div className="owner-banner owner-banner-info">
                <Icon name="verified" />
                <div>
                  <strong>Compliance Status:</strong> {ackModalTarget.acknowledgedCount} of {ackModalTarget.totalRequired} employees have digitally signed.
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', fontSize: '0.75rem' }}>
                  <span>Elena Rostova (Manager)</span>
                  <span className="owner-badge owner-badge-success">Signed Oct 14</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', fontSize: '0.75rem' }}>
                  <span>Marco Bellini (Head Chef)</span>
                  <span className="owner-badge owner-badge-success">Signed Oct 14</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', fontSize: '0.75rem' }}>
                  <span>David Chen (Line Cook)</span>
                  <span className="owner-badge owner-badge-warning">Pending Signature</span>
                </div>
              </div>
            </div>

            <div className="owner-modal-footer">
              <button
                className="owner-btn owner-btn-primary"
                onClick={() => {
                  showToast('Dispatched notification reminder to pending staff');
                  setAckModalTarget(null);
                }}
                type="button"
              >
                <Icon name="notifications" /> Send Reminder to Pending Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POLICY PREVIEW MODAL (Image 2 Fix) */}
      {previewTarget && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal owner-modal-lg">
            <div className="owner-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <span className={`owner-badge ${previewTarget.audience === 'Customer' ? 'owner-badge-neutral' : 'owner-badge-primary'}`}>
                  {previewTarget.audience} Policy
                </span>
                <h3 style={{ margin: 0 }}>{previewTarget.title}</h3>
              </div>
              <button
                className="owner-modal-close-btn"
                onClick={() => setPreviewTarget(null)}
                type="button"
                aria-label="Close preview modal"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="owner-modal-body">
              <div className="owner-banner owner-banner-info">
                <Icon name={previewTarget.audience === 'Customer' ? 'touch_app' : 'verified_user'} />
                <div>
                  <strong>Live Environment Rendering Context:</strong>{' '}
                  {previewTarget.audience === 'Customer'
                    ? 'This policy is displayed to dining guests on their mobile QR ordering screen, booking confirmation emails, and checkout receipts.'
                    : 'This protocol is displayed to staff upon onboarding and shift check-in. Digital acknowledgement is tracked for health & safety audits.'}
                </div>
              </div>

              <div className="owner-policy-preview-sheet">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--color-border-soft)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <h4>{previewTarget.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Category: {previewTarget.category} • Identifier: <code>{previewTarget.id}</code>
                    </span>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem' }}>
                    <span className="owner-badge owner-badge-success">{previewTarget.status}</span>
                    <div style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      Version {previewTarget.version} • Effective {previewTarget.lastUpdated}
                    </div>
                  </div>
                </div>

                <div className="owner-policy-clause">
                  <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--color-primary)' }}>
                    Section 1: Policy Mandate &amp; Provisions
                  </strong>
                  <p style={{ margin: 0, lineHeight: 1.7 }}>
                    {previewTarget.content}
                  </p>
                </div>

                <div className="owner-policy-clause">
                  <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--color-primary)' }}>
                    Section 2: Compliance &amp; Operational Enforcement
                  </strong>
                  <p style={{ margin: 0, lineHeight: 1.7, color: 'var(--color-text-muted)' }}>
                    All management, service personnel, and dining patrons agree to uphold the standards described herein. For inquiries or special accommodations, guests may contact restaurant management via the DineFlow concierge portal.
                  </p>
                </div>

                {previewTarget.requiresAcknowledgement && (
                  <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', border: '1px dashed var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <Icon name="check_circle" className="text-primary" />
                      <strong>Mandatory Staff Digital Sign-off:</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Current compliance record: {previewTarget.acknowledgedCount ?? 0} of {previewTarget.totalRequired ?? 18} active employees have signed acknowledgment.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="owner-modal-footer">
              <button
                className="owner-btn owner-btn-secondary"
                onClick={() => {
                  showToast(`Exported ${previewTarget.id} to PDF document.`);
                }}
                type="button"
              >
                <Icon name="download" /> Export PDF
              </button>
              <button
                className="owner-btn owner-btn-primary"
                onClick={() => setPreviewTarget(null)}
                type="button"
              >
                Done
              </button>
            </div>
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

