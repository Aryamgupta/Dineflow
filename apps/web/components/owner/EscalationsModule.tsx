'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type EscalationCase = {
  id: string;
  title: string;
  reporter: string;
  role: string;
  category: 'Workplace Conflict' | 'Safety Concern' | 'Customer Incident' | 'Equipment / Operational' | 'Payroll Concern';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  submittedAt: string;
  reviewer: string;
  status: 'Open' | 'Under Review' | 'Resolved';
  description: string;
  notes: string[];
};

const initialCases: EscalationCase[] = [
  {
    id: 'ESC-101',
    title: 'Table 4 Entrée Delay & Grill Station Backlog',
    reporter: 'Priya Kapoor',
    role: 'Waiter',
    category: 'Customer Incident',
    severity: 'High',
    submittedAt: 'Today, 7:42 PM',
    reviewer: 'Elena Rostova (GM)',
    status: 'Open',
    description: 'Guests at Table 4 ordered 2 steaks medium-rare. Grill station experienced unexpected gas pressure drop causing a 25-minute delay. Guest requested manager visit.',
    notes: ['GM Elena visited table and offered complimentary vintage port.', 'Gas valve inspected by maintenance.'],
  },
  {
    id: 'ESC-102',
    title: 'Dishwashing Station Drainage Overflow',
    reporter: 'Sophia Martinez',
    role: 'Cleaner',
    category: 'Safety Concern',
    severity: 'Medium',
    submittedAt: 'Today, 5:15 PM',
    reviewer: 'Marcus Vance (GM)',
    status: 'Under Review',
    description: 'Floor drain near dish sanitizing machine is draining slowly after heavy evening rinse cycle. Slip hazard cones placed.',
    notes: ['Plumber scheduled for tomorrow 8:00 AM before lunch prep.'],
  },
  {
    id: 'ESC-103',
    title: 'POS Terminal 2 Paper Jam & Card Reader Reconnect',
    reporter: 'Alex Moreno',
    role: 'Waiter',
    category: 'Equipment / Operational',
    severity: 'Low',
    submittedAt: 'Today, 2:30 PM',
    reviewer: 'Marcus Vance (GM)',
    status: 'Resolved',
    description: 'Thermal receipt roll got jammed during lunch checkout rush. Device reset performed.',
    notes: ['Roller cleaned and test receipt printed successfully.'],
  },
  {
    id: 'ESC-104',
    title: 'Discrepancy in Sunday Evening Tip Pool Allocation',
    reporter: 'Alex Moreno',
    role: 'Waiter',
    category: 'Payroll Concern',
    severity: 'Medium',
    submittedAt: 'Yesterday, 11:00 PM',
    reviewer: 'Elena Rostova (GM)',
    status: 'Resolved',
    description: 'Credit card tips for Banquet Room Table 12 were split between 2 shifts. Adjustment needed.',
    notes: ['Audited POS shift report and corrected payroll line item.'],
  },
];

export function EscalationsModule() {
  const [cases, setCases] = useState<EscalationCase[]>(initialCases);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Under Review' | 'Resolved'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedCase, setSelectedCase] = useState<EscalationCase | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Escalation Form
  const [newTitle, setNewTitle] = useState('');
  const [newReporter, setNewReporter] = useState('');
  const [newCategory, setNewCategory] = useState<EscalationCase['category']>('Customer Incident');
  const [newSeverity, setNewSeverity] = useState<EscalationCase['severity']>('Medium');
  const [newDesc, setNewDesc] = useState('');

  // Internal Note form inside modal
  const [newNote, setNewNote] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCases = cases.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && c.category !== categoryFilter) return false;
    return true;
  });

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newReporter.trim()) {
      alert('Please fill out the escalation title and reporting employee.');
      return;
    }

    const created: EscalationCase = {
      id: `ESC-${cases.length + 101}`,
      title: newTitle,
      reporter: newReporter,
      role: 'Staff Member',
      category: newCategory,
      severity: newSeverity,
      submittedAt: 'Just now',
      reviewer: 'Elena Rostova (GM)',
      status: 'Open',
      description: newDesc || 'No extended description provided.',
      notes: ['Case opened by restaurant management.'],
    };

    setCases((prev) => [created, ...prev]);
    setIsLogModalOpen(false);
    setNewTitle('');
    setNewReporter('');
    setNewDesc('');
    showToast(`Escalation ticket ${created.id} logged successfully.`);
  };

  const handleAddNote = (caseId: string) => {
    if (!newNote.trim()) return;
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, notes: [...c.notes, newNote] } : c))
    );
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase({ ...selectedCase, notes: [...selectedCase.notes, newNote] });
    }
    setNewNote('');
    showToast('Internal note saved to case timeline.');
  };

  const handleUpdateStatus = (caseId: string, newStatus: EscalationCase['status']) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
    );
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase({ ...selectedCase, status: newStatus });
    }
    showToast(`Case ${caseId} marked ${newStatus}.`);
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Operations &amp; Compliance</p>
          <h1>Staff Escalations &amp; Incident Center</h1>
          <p className="owner-page-subtitle">
            Confidential repository for workplace concerns, kitchen disruptions, safety hazards, and guest complaints.
          </p>
        </div>

        <div className="owner-header-actions">
          <button
            className="owner-btn owner-btn-primary"
            onClick={() => setIsLogModalOpen(true)}
            type="button"
          >
            <Icon name="priority_high" />
            <span>Log Operational Issue</span>
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="owner-kpi-grid">
        <div className="owner-kpi-card">
          <span className="owner-kpi-label">Open Escalations</span>
          <span className="owner-kpi-value">
            {cases.filter((c) => c.status === 'Open').length}
          </span>
          <span className="owner-badge owner-badge-warning">Requires Review</span>
        </div>
        <div className="owner-kpi-card">
          <span className="owner-kpi-label">Under Investigation</span>
          <span className="owner-kpi-value">
            {cases.filter((c) => c.status === 'Under Review').length}
          </span>
          <span className="owner-badge owner-badge-neutral">In Progress</span>
        </div>
        <div className="owner-kpi-card">
          <span className="owner-kpi-label">Resolved This Month</span>
          <span className="owner-kpi-value">
            {cases.filter((c) => c.status === 'Resolved').length}
          </span>
          <span className="owner-badge owner-badge-success">Audit Complete</span>
        </div>
        <div className="owner-kpi-card">
          <span className="owner-kpi-label">Avg Resolution Time</span>
          <span className="owner-kpi-value">3.2 hrs</span>
          <span className="owner-kpi-footer">Standard SLA is &lt; 24h</span>
        </div>
      </div>

      {/* Segmented Status Tabs & Category Filters */}
      <div className="owner-tabs-bar">
        <div className="owner-tabs-group" role="tablist">
          {(['All', 'Open', 'Under Review', 'Resolved'] as const).map((s) => {
            const count = s === 'All' ? cases.length : cases.filter((c) => c.status === s).length;
            return (
              <button
                key={s}
                className={`owner-tab-btn ${statusFilter === s ? 'is-active' : ''}`}
                onClick={() => setStatusFilter(s)}
                type="button"
              >
                <span>{s}</span>
                <span className="owner-tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        <select
          className="owner-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Customer Incident">Customer Incident</option>
          <option value="Safety Concern">Safety Concern</option>
          <option value="Equipment / Operational">Equipment / Operational</option>
          <option value="Payroll Concern">Payroll Concern</option>
          <option value="Workplace Conflict">Workplace Conflict</option>
        </select>
      </div>

      {/* Escalation Table */}
      <div className="owner-table-wrapper">
        <table className="owner-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Incident Title</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Reported By</th>
              <th>Submitted</th>
              <th>Reviewer</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                  No escalations found for the current filter.
                </td>
              </tr>
            ) : (
              filteredCases.map((c) => (
                <tr key={c.id}>
                  <td>
                    <code>{c.id}</code>
                  </td>
                  <td>
                    <strong>{c.title}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600 }}>{c.category}</span>
                  </td>
                  <td>
                    <span
                      className={`owner-badge ${
                        c.severity === 'Critical' || c.severity === 'High'
                          ? 'owner-badge-danger'
                          : c.severity === 'Medium'
                          ? 'owner-badge-warning'
                          : 'owner-badge-neutral'
                      }`}
                    >
                      {c.severity}
                    </span>
                  </td>
                  <td>
                    {c.reporter}{' '}
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>({c.role})</span>
                  </td>
                  <td style={{ fontSize: '0.6875rem' }}>{c.submittedAt}</td>
                  <td style={{ fontSize: '0.6875rem' }}>{c.reviewer}</td>
                  <td>
                    <span
                      className={`owner-badge ${
                        c.status === 'Resolved'
                          ? 'owner-badge-success'
                          : c.status === 'Under Review'
                          ? 'owner-badge-neutral'
                          : 'owner-badge-warning'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="owner-btn owner-btn-sm owner-btn-secondary"
                      onClick={() => setSelectedCase(c)}
                      type="button"
                    >
                      Case Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* LOG NEW ESCALATION MODAL */}
      {isLogModalOpen && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal">
            <div className="owner-modal-header">
              <h3>Log New Operational Incident or Escalation</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setIsLogModalOpen(false)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleCreateCase}>
              <div className="owner-modal-body">
                <div className="owner-banner owner-banner-info">
                  <Icon name="shield" />
                  <div>
                    <strong>Confidential Workplace Record:</strong> Only authorized General Managers and Restaurant Owners have access to escalation dossiers.
                  </div>
                </div>

                <div className="owner-form-group">
                  <label htmlFor="case-title">Incident Title *</label>
                  <input
                    id="case-title"
                    className="owner-form-input"
                    placeholder="Brief description of the incident"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className="owner-form-grid">
                  <div className="owner-form-group">
                    <label htmlFor="case-category">Category *</label>
                    <select
                      id="case-category"
                      className="owner-form-select"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                    >
                      <option value="Customer Incident">Customer Incident</option>
                      <option value="Safety Concern">Safety Concern</option>
                      <option value="Equipment / Operational">Equipment / Operational</option>
                      <option value="Payroll Concern">Payroll Concern</option>
                      <option value="Workplace Conflict">Workplace Conflict</option>
                    </select>
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="case-severity">Severity Level *</label>
                    <select
                      id="case-severity"
                      className="owner-form-select"
                      value={newSeverity}
                      onChange={(e) => setNewSeverity(e.target.value as any)}
                    >
                      <option value="Low">Low (Informational)</option>
                      <option value="Medium">Medium (Attention needed)</option>
                      <option value="High">High (Immediate intervention)</option>
                      <option value="Critical">Critical (Safety hazard)</option>
                    </select>
                  </div>
                </div>

                <div className="owner-form-group">
                  <label htmlFor="case-reporter">Reporting Employee Name *</label>
                  <input
                    id="case-reporter"
                    className="owner-form-input"
                    placeholder="e.g. Alex Moreno"
                    required
                    value={newReporter}
                    onChange={(e) => setNewReporter(e.target.value)}
                  />
                </div>

                <div className="owner-form-group">
                  <label htmlFor="case-desc">Incident Description &amp; Context</label>
                  <textarea
                    id="case-desc"
                    className="owner-form-textarea"
                    placeholder="Details about what happened, affected tables, or equipment involved..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="owner-modal-footer">
                <button
                  type="button"
                  className="owner-btn owner-btn-secondary"
                  onClick={() => setIsLogModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="owner-btn owner-btn-primary">
                  Log Incident Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CASE DETAIL & WORKFLOW MODAL */}
      {selectedCase && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal owner-modal-lg">
            <div className="owner-modal-header">
              <div>
                <h3 style={{ margin: 0 }}>{selectedCase.title}</h3>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                  {selectedCase.id} • {selectedCase.category} • Submitted {selectedCase.submittedAt}
                </span>
              </div>
              <button
                className="owner-modal-close-btn"
                onClick={() => setSelectedCase(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="owner-modal-body">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="owner-badge owner-badge-neutral">Reported by {selectedCase.reporter}</span>
                <span className="owner-badge owner-badge-primary">Reviewer: {selectedCase.reviewer}</span>
                <span
                  className={`owner-badge ${
                    selectedCase.status === 'Resolved' ? 'owner-badge-success' : 'owner-badge-warning'
                  }`}
                >
                  Status: {selectedCase.status}
                </span>
              </div>

              <div style={{ padding: '1rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)' }}>
                <strong style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Incident Description:</strong>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                  {selectedCase.description}
                </p>
              </div>

              <div>
                <strong style={{ fontSize: '0.75rem' }}>Internal Action Timeline &amp; Notes:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {selectedCase.notes.map((note, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.6rem 0.85rem',
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border-soft)',
                        borderRadius: 'var(--radius-control)',
                        fontSize: '0.75rem',
                      }}
                    >
                      <Icon name="check" style={{ fontSize: '0.875rem', color: 'var(--color-success)', marginRight: '0.35rem' }} />
                      {note}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <input
                    className="owner-form-input"
                    placeholder="Add supervisor note or action item..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button
                    className="owner-btn owner-btn-secondary"
                    onClick={() => handleAddNote(selectedCase.id)}
                    type="button"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>

            <div className="owner-modal-footer">
              {selectedCase.status !== 'Under Review' && selectedCase.status !== 'Resolved' && (
                <button
                  className="owner-btn owner-btn-secondary"
                  onClick={() => handleUpdateStatus(selectedCase.id, 'Under Review')}
                  type="button"
                >
                  Mark Under Review
                </button>
              )}

              {selectedCase.status !== 'Resolved' && (
                <button
                  className="owner-btn owner-btn-primary"
                  onClick={() => handleUpdateStatus(selectedCase.id, 'Resolved')}
                  type="button"
                >
                  <Icon name="check_circle" /> Mark Case Resolved
                </button>
              )}

              <button
                className="owner-btn owner-btn-secondary"
                onClick={() => setSelectedCase(null)}
                type="button"
              >
                Close
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

