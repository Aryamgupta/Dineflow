'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

type StaffMember = {
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  role: 'Manager' | 'Waiter' | 'Cleaner' | 'Kitchen Staff';
  kitchenCategory?: 'Head Chef' | 'Sous Chef' | 'Line Cook' | 'Prep Cook' | 'Dishwasher';
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
  joiningDate: string;
  salary: number;
  salaryFrequency: 'Monthly' | 'Weekly' | 'Hourly';
  status: 'Active' | 'Inactive';
  rating: number;
  reviewCount: number;
  hoursWorked: number;
  credentialsDelivered: boolean;
};

const initialStaff: StaffMember[] = [
  {
    id: 'EMP-001',
    name: 'Elena Rostova',
    username: 'elena.gm',
    phone: '+1 (555) 234-5678',
    email: 'elena@therusticoak.com',
    role: 'Manager',
    employmentType: 'Full-time',
    joiningDate: '2023-01-15',
    salary: 5800,
    salaryFrequency: 'Monthly',
    status: 'Active',
    rating: 4.95,
    reviewCount: 42,
    hoursWorked: 168,
    credentialsDelivered: true,
  },
  {
    id: 'EMP-002',
    name: 'Marcus Vance',
    username: 'marcus.ops',
    phone: '+1 (555) 345-6789',
    email: 'marcus@therusticoak.com',
    role: 'Manager',
    employmentType: 'Full-time',
    joiningDate: '2023-03-01',
    salary: 5400,
    salaryFrequency: 'Monthly',
    status: 'Active',
    rating: 4.88,
    reviewCount: 36,
    hoursWorked: 160,
    credentialsDelivered: true,
  },
  {
    id: 'EMP-003',
    name: 'Marco Bellini',
    username: 'chef.marco',
    phone: '+1 (555) 456-7890',
    email: 'marco@therusticoak.com',
    role: 'Kitchen Staff',
    kitchenCategory: 'Head Chef',
    employmentType: 'Full-time',
    joiningDate: '2023-02-10',
    salary: 6200,
    salaryFrequency: 'Monthly',
    status: 'Active',
    rating: 4.92,
    reviewCount: 88,
    hoursWorked: 172,
    credentialsDelivered: true,
  },
  {
    id: 'EMP-004',
    name: 'Alex Moreno',
    username: 'alex.m',
    phone: '+1 (555) 567-8901',
    email: 'alex@therusticoak.com',
    role: 'Waiter',
    employmentType: 'Full-time',
    joiningDate: '2023-05-20',
    salary: 22,
    salaryFrequency: 'Hourly',
    status: 'Active',
    rating: 4.90,
    reviewCount: 114,
    hoursWorked: 140,
    credentialsDelivered: true,
  },
  {
    id: 'EMP-005',
    name: 'Priya Kapoor',
    username: 'priya.k',
    phone: '+1 (555) 678-9012',
    email: 'priya@therusticoak.com',
    role: 'Waiter',
    employmentType: 'Full-time',
    joiningDate: '2023-06-12',
    salary: 22,
    salaryFrequency: 'Hourly',
    status: 'Active',
    rating: 4.82,
    reviewCount: 96,
    hoursWorked: 144,
    credentialsDelivered: true,
  },
  {
    id: 'EMP-006',
    name: 'Kenji Sato',
    username: 'kenji.s',
    phone: '+1 (555) 789-0123',
    email: 'kenji@therusticoak.com',
    role: 'Kitchen Staff',
    kitchenCategory: 'Sous Chef',
    employmentType: 'Full-time',
    joiningDate: '2023-08-01',
    salary: 4600,
    salaryFrequency: 'Monthly',
    status: 'Active',
    rating: 4.85,
    reviewCount: 52,
    hoursWorked: 165,
    credentialsDelivered: true,
  },
  {
    id: 'EMP-007',
    name: 'Sophia Martinez',
    username: 'sophia.m',
    phone: '+1 (555) 890-1234',
    email: 'sophia@therusticoak.com',
    role: 'Cleaner',
    employmentType: 'Part-time',
    joiningDate: '2023-09-15',
    salary: 19,
    salaryFrequency: 'Hourly',
    status: 'Active',
    rating: 4.90,
    reviewCount: 18,
    hoursWorked: 80,
    credentialsDelivered: true,
  },
  {
    id: 'EMP-008',
    name: 'David Chen',
    username: 'david.c',
    phone: '+1 (555) 901-2345',
    email: 'david@therusticoak.com',
    role: 'Kitchen Staff',
    kitchenCategory: 'Line Cook',
    employmentType: 'Full-time',
    joiningDate: '2024-01-10',
    salary: 3800,
    salaryFrequency: 'Monthly',
    status: 'Active',
    rating: 4.75,
    reviewCount: 24,
    hoursWorked: 155,
    credentialsDelivered: false,
  },
];

export function StaffManagementModule() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [selectedRoleTab, setSelectedRoleTab] = useState<'All' | 'Manager' | 'Waiter' | 'Cleaner' | 'Kitchen Staff'>('All');
  const [kitchenSubFilter, setKitchenSubFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStaffDetail, setSelectedStaffDetail] = useState<StaffMember | null>(null);
  const [credentialsModalData, setCredentialsModalData] = useState<{ member: StaffMember; tempPassword: string; whatsappStatus: string } | null>(null);
  const [deactivateTarget, setDeactivateTarget] = useState<StaffMember | null>(null);

  // Add Employee Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<'Manager' | 'Waiter' | 'Cleaner' | 'Kitchen Staff'>('Waiter');
  const [formKitchenCategory, setFormKitchenCategory] = useState<'Head Chef' | 'Sous Chef' | 'Line Cook' | 'Prep Cook' | 'Dishwasher'>('Line Cook');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formEmpType, setFormEmpType] = useState<'Full-time' | 'Part-time' | 'Contract'>('Full-time');
  const [formSalary, setFormSalary] = useState('');
  const [formFrequency, setFormFrequency] = useState<'Monthly' | 'Weekly' | 'Hourly'>('Monthly');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeManagersCount = staff.filter((s) => s.role === 'Manager' && s.status === 'Active').length;
  const isManagerLimitReached = activeManagersCount >= 2;

  // Filtered staff list
  const filteredStaff = staff.filter((member) => {
    if (selectedRoleTab !== 'All' && member.role !== selectedRoleTab) return false;
    if (selectedRoleTab === 'Kitchen Staff' && kitchenSubFilter !== 'All' && member.kitchenCategory !== kitchenSubFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(q) ||
        member.username.toLowerCase().includes(q) ||
        member.id.toLowerCase().includes(q) ||
        member.phone.includes(q)
      );
    }
    return true;
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert('Please fill out the required employee name and phone number.');
      return;
    }

    if (formRole === 'Manager' && isManagerLimitReached) {
      alert('Business Rule: Maximum of 2 managers allowed per restaurant. You cannot assign another manager.');
      return;
    }

    const newId = `EMP-${String(staff.length + 1).padStart(3, '0')}`;
    const newUsername = formName.toLowerCase().replace(/\s+/g, '.') + Math.floor(10 + Math.random() * 90);
    const tempPass = 'OakPass!' + Math.floor(1000 + Math.random() * 9000);

    const newMember: StaffMember = {
      id: newId,
      name: formName,
      username: newUsername,
      phone: formPhone,
      email: formEmail,
      role: formRole,
      kitchenCategory: formRole === 'Kitchen Staff' ? formKitchenCategory : undefined,
      employmentType: formEmpType,
      joiningDate: new Date().toISOString().split('T')[0],
      salary: parseFloat(formSalary) || 20,
      salaryFrequency: formFrequency,
      status: 'Active',
      rating: 5.0,
      reviewCount: 0,
      hoursWorked: 0,
      credentialsDelivered: false,
    };

    setStaff((prev) => [newMember, ...prev]);
    setIsAddModalOpen(false);

    // Reset Form
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormSalary('');

    // Trigger credentials delivery modal
    setCredentialsModalData({
      member: newMember,
      tempPassword: tempPass,
      whatsappStatus: 'Not Sent',
    });

    showToast(`Employee ${newMember.name} created successfully.`);
  };

  const handleToggleStatus = (member: StaffMember) => {
    const updatedStatus = member.status === 'Active' ? 'Inactive' : 'Active';
    setStaff((prev) =>
      prev.map((s) => (s.id === member.id ? { ...s, status: updatedStatus } : s))
    );
    setDeactivateTarget(null);
    showToast(`${member.name} is now marked ${updatedStatus}.`);
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Workforce Management</p>
          <h1>Staff Directory &amp; Roles</h1>
          <p className="owner-page-subtitle">
            Manage employee profiles, shift access, kitchen categories, and temporary login credentials.
          </p>
        </div>

        <div className="owner-header-actions">
          <button
            className="owner-btn owner-btn-primary"
            onClick={() => setIsAddModalOpen(true)}
            type="button"
          >
            <Icon name="person" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Manager Limit Banner */}
      <div className={`owner-banner ${isManagerLimitReached ? 'owner-banner-warning' : 'owner-banner-info'}`}>
        <div className="owner-banner-content">
          <Icon name="verified_user" />
          <div>
            <strong>Manager Allocation Policy:</strong> {activeManagersCount} of 2 permitted General Managers assigned ({staff.filter(s => s.role === 'Manager').map(m => m.name).join(', ')}).
            {isManagerLimitReached ? ' Manager capacity is reached.' : ' 1 additional manager slot available.'}
          </div>
        </div>
        <span className="owner-badge owner-badge-neutral">{activeManagersCount} / 2 Managers</span>
      </div>

      {/* Role Segmented Tabs */}
      <div className="owner-tabs-bar">
        <div className="owner-tabs-group" role="tablist">
          {(['All', 'Manager', 'Waiter', 'Cleaner', 'Kitchen Staff'] as const).map((role) => {
            const count = role === 'All' ? staff.length : staff.filter((s) => s.role === role).length;
            return (
              <button
                key={role}
                className={`owner-tab-btn ${selectedRoleTab === role ? 'is-active' : ''}`}
                onClick={() => setSelectedRoleTab(role)}
                type="button"
              >
                <span>{role === 'Manager' ? 'Managers' : role === 'Waiter' ? 'Waiters' : role === 'Cleaner' ? 'Cleaners' : role}</span>
                <span className="owner-tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {selectedRoleTab === 'Kitchen Staff' && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['All', 'Head Chef', 'Sous Chef', 'Line Cook', 'Prep Cook', 'Dishwasher'].map((cat) => (
              <button
                key={cat}
                className={`owner-btn owner-btn-sm ${kitchenSubFilter === cat ? 'owner-btn-primary' : 'owner-btn-secondary'}`}
                onClick={() => setKitchenSubFilter(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search and Filters Toolbar */}
      <div className="owner-toolbar">
        <div className="owner-toolbar-left">
          <div className="owner-input-search">
            <Icon name="search" />
            <input
              placeholder="Search by name, username, ID, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="owner-toolbar-right">
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Showing {filteredStaff.length} of {staff.length} team members
          </span>
        </div>
      </div>

      {/* Staff Table */}
      <div className="owner-table-wrapper">
        <table className="owner-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role &amp; Category</th>
              <th>Username</th>
              <th>Contact Phone</th>
              <th>Compensation</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Credentials</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>
                  No employees found matching the active filters.
                </td>
              </tr>
            ) : (
              filteredStaff.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="owner-avatar" style={{ width: '2rem', height: '2rem', fontSize: '0.8125rem' }}>
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{member.name}</strong>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>{member.id} • Joined {member.joiningDate}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}>{member.role}</span>
                      {member.kitchenCategory && (
                        <span style={{ fontSize: '0.6875rem', color: 'var(--color-secondary)' }}>
                          {member.kitchenCategory}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <code>@{member.username}</code>
                  </td>
                  <td>{member.phone}</td>
                  <td>
                    ${member.salary.toLocaleString()} <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>/ {member.salaryFrequency.toLowerCase()}</span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                      <Icon name="star" className="text-warning" />
                      {member.rating.toFixed(2)}
                      <small style={{ color: 'var(--color-text-muted)' }}>({member.reviewCount})</small>
                    </span>
                  </td>
                  <td>
                    <span className={`owner-badge ${member.status === 'Active' ? 'owner-badge-success' : 'owner-badge-neutral'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <span className={`owner-badge ${member.credentialsDelivered ? 'owner-badge-primary' : 'owner-badge-warning'}`}>
                      {member.credentialsDelivered ? 'Delivered' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                      <button
                        className="owner-btn owner-btn-sm owner-btn-secondary"
                        onClick={() => setSelectedStaffDetail(member)}
                        title="View Full Profile"
                        type="button"
                      >
                        Profile
                      </button>
                      <button
                        className="owner-btn owner-btn-sm owner-btn-secondary"
                        onClick={() =>
                          setCredentialsModalData({
                            member,
                            tempPassword: 'OakPass!' + Math.floor(1000 + Math.random() * 9000),
                            whatsappStatus: member.credentialsDelivered ? 'Delivered' : 'Not Sent',
                          })
                        }
                        title="Send / Regenerate Login Credentials"
                        type="button"
                      >
                        Credentials
                      </button>
                      <button
                        className="owner-btn owner-btn-sm owner-btn-danger"
                        onClick={() => setDeactivateTarget(member)}
                        title={member.status === 'Active' ? 'Deactivate Account' : 'Reactivate Account'}
                        type="button"
                      >
                        {member.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD EMPLOYEE MODAL */}
      {isAddModalOpen && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal owner-modal-lg">
            <div className="owner-modal-header">
              <h3>Create New Restaurant Employee</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
                type="button"
                aria-label="Close modal"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee}>
              <div className="owner-modal-body">
                {formRole === 'Manager' && isManagerLimitReached && (
                  <div className="owner-banner owner-banner-danger">
                    <Icon name="error" />
                    <div>
                      <strong>Manager Limit Reached (2/2):</strong> A restaurant cannot exceed two managers under DineFlow policy. Please select another role or reassign existing managers.
                    </div>
                  </div>
                )}

                <div className="owner-form-grid">
                  <div className="owner-form-group">
                    <label htmlFor="staff-name">Full Name *</label>
                    <input
                      id="staff-name"
                      className="owner-form-input"
                      placeholder="e.g. Liam Gallagher"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="staff-role">Role *</label>
                    <select
                      id="staff-role"
                      className="owner-form-select"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value as any)}
                    >
                      <option value="Waiter">Waiter (Floor Staff)</option>
                      <option value="Kitchen Staff">Kitchen Staff (Culinary)</option>
                      <option value="Cleaner">Cleaner (Support)</option>
                      <option value="Manager" disabled={isManagerLimitReached}>
                        General Manager {isManagerLimitReached ? '(Limit 2/2 Reached)' : ''}
                      </option>
                    </select>
                  </div>

                  {formRole === 'Kitchen Staff' && (
                    <div className="owner-form-group owner-col-span-2">
                      <label htmlFor="kitchen-category">Kitchen Specific Category *</label>
                      <select
                        id="kitchen-category"
                        className="owner-form-select"
                        value={formKitchenCategory}
                        onChange={(e) => setFormKitchenCategory(e.target.value as any)}
                      >
                        <option value="Head Chef">Head Chef</option>
                        <option value="Sous Chef">Sous Chef</option>
                        <option value="Line Cook">Line Cook</option>
                        <option value="Prep Cook">Prep Cook</option>
                        <option value="Dishwasher">Dishwasher</option>
                      </select>
                    </div>
                  )}

                  <div className="owner-form-group">
                    <label htmlFor="staff-phone">Mobile Phone (for WhatsApp credentials) *</label>
                    <input
                      id="staff-phone"
                      className="owner-form-input"
                      placeholder="+1 (555) 000-0000"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                    />
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="staff-email">Work / Personal Email</label>
                    <input
                      id="staff-email"
                      type="email"
                      className="owner-form-input"
                      placeholder="employee@restaurant.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="staff-emp-type">Employment Arrangement</label>
                    <select
                      id="staff-emp-type"
                      className="owner-form-select"
                      value={formEmpType}
                      onChange={(e) => setFormEmpType(e.target.value as any)}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="staff-salary">Compensation Amount</label>
                    <input
                      id="staff-salary"
                      type="number"
                      className="owner-form-input"
                      placeholder="e.g. 25"
                      value={formSalary}
                      onChange={(e) => setFormSalary(e.target.value)}
                    />
                  </div>

                  <div className="owner-form-group">
                    <label htmlFor="staff-frequency">Salary Frequency</label>
                    <select
                      id="staff-frequency"
                      className="owner-form-select"
                      value={formFrequency}
                      onChange={(e) => setFormFrequency(e.target.value as any)}
                    >
                      <option value="Hourly">Hourly</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="owner-modal-footer">
                <button
                  type="button"
                  className="owner-btn owner-btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="owner-btn owner-btn-primary"
                  disabled={formRole === 'Manager' && isManagerLimitReached}
                >
                  Save &amp; Generate Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREDENTIALS DELIVERY MODAL */}
      {credentialsModalData && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal">
            <div className="owner-modal-header">
              <h3>Employee Login Credentials</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setCredentialsModalData(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="owner-modal-body">
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                Direct access credentials for <strong>{credentialsModalData.member.name}</strong> ({credentialsModalData.member.role}).
                Employees must change their password at initial sign-in.
              </p>

              <div style={{ background: 'var(--color-surface-low)', padding: '1rem', borderRadius: 'var(--radius-control)', border: '1px solid var(--color-border-soft)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>System Username:</span>
                  <code style={{ fontSize: '0.8125rem', fontWeight: 700 }}>@{credentialsModalData.member.username}</code>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Temporary Password:</span>
                  <code style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)' }}>{credentialsModalData.tempPassword}</code>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>WhatsApp Delivery:</span>
                  <span className={`owner-badge ${credentialsModalData.whatsappStatus === 'Delivered' ? 'owner-badge-success' : 'owner-badge-warning'}`}>
                    {credentialsModalData.whatsappStatus}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  className="owner-btn owner-btn-primary"
                  onClick={() => {
                    setCredentialsModalData({ ...credentialsModalData, whatsappStatus: 'Delivered' });
                    setStaff((prev) =>
                      prev.map((s) => (s.id === credentialsModalData.member.id ? { ...s, credentialsDelivered: true } : s))
                    );
                    showToast(`Credentials dispatched via WhatsApp to ${credentialsModalData.member.phone}`);
                  }}
                  type="button"
                >
                  <Icon name="send" /> Dispatch via WhatsApp
                </button>

                <button
                  className="owner-btn owner-btn-secondary"
                  onClick={() => {
                    const newPass = 'OakPass!' + Math.floor(1000 + Math.random() * 9000);
                    setCredentialsModalData({ ...credentialsModalData, tempPassword: newPass, whatsappStatus: 'Not Sent' });
                    showToast('Regenerated temporary password.');
                  }}
                  type="button"
                >
                  <Icon name="refresh" /> Regenerate Password
                </button>
              </div>
            </div>

            <div className="owner-modal-footer">
              <button
                className="owner-btn owner-btn-secondary"
                onClick={() => setCredentialsModalData(null)}
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMPLOYEE DETAIL PROFILE MODAL */}
      {selectedStaffDetail && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal owner-modal-lg">
            <div className="owner-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="owner-avatar" style={{ width: '2.25rem', height: '2.25rem' }}>
                  {selectedStaffDetail.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{selectedStaffDetail.name}</h3>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                    {selectedStaffDetail.id} • {selectedStaffDetail.role} {selectedStaffDetail.kitchenCategory ? `(${selectedStaffDetail.kitchenCategory})` : ''}
                  </span>
                </div>
              </div>
              <button
                className="owner-modal-close-btn"
                onClick={() => setSelectedStaffDetail(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="owner-modal-body">
              <div className="owner-kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="owner-kpi-card" style={{ padding: '0.85rem' }}>
                  <span className="owner-kpi-label">Customer Rating</span>
                  <span className="owner-kpi-value">{selectedStaffDetail.rating.toFixed(2)} ★</span>
                  <span className="owner-kpi-footer">{selectedStaffDetail.reviewCount} total guest reviews</span>
                </div>
                <div className="owner-kpi-card" style={{ padding: '0.85rem' }}>
                  <span className="owner-kpi-label">Monthly Hours</span>
                  <span className="owner-kpi-value">{selectedStaffDetail.hoursWorked} hrs</span>
                  <span className="owner-kpi-footer">Shift punctuality: 98.4%</span>
                </div>
                <div className="owner-kpi-card" style={{ padding: '0.85rem' }}>
                  <span className="owner-kpi-label">Compensation</span>
                  <span className="owner-kpi-value">${selectedStaffDetail.salary}</span>
                  <span className="owner-kpi-footer">Paid {selectedStaffDetail.salaryFrequency}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <strong style={{ fontSize: '0.8125rem' }}>Contact &amp; Administrative Information</strong>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.75rem' }}>
                  <div><strong>Username:</strong> @{selectedStaffDetail.username}</div>
                  <div><strong>Mobile:</strong> {selectedStaffDetail.phone}</div>
                  <div><strong>Email:</strong> {selectedStaffDetail.email || 'None on record'}</div>
                  <div><strong>Joined:</strong> {selectedStaffDetail.joiningDate}</div>
                  <div><strong>Status:</strong> {selectedStaffDetail.status}</div>
                  <div><strong>Credentials:</strong> {selectedStaffDetail.credentialsDelivered ? 'WhatsApp Active' : 'Pending Delivery'}</div>
                </div>
              </div>
            </div>

            <div className="owner-modal-footer">
              <button
                className="owner-btn owner-btn-secondary"
                onClick={() => setSelectedStaffDetail(null)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEACTIVATE CONFIRMATION DIALOG */}
      {deactivateTarget && (
        <div className="owner-modal-backdrop" role="dialog" aria-modal="true">
          <div className="owner-modal" style={{ maxWidth: '30rem' }}>
            <div className="owner-modal-header">
              <h3>Confirm Employee Status Change</h3>
              <button
                className="owner-modal-close-btn"
                onClick={() => setDeactivateTarget(null)}
                type="button"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="owner-modal-body">
              <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: 1.6 }}>
                Are you sure you want to mark <strong>{deactivateTarget.name}</strong> as{' '}
                <strong>{deactivateTarget.status === 'Active' ? 'Inactive' : 'Active'}</strong>?
              </p>
              <div className="owner-banner owner-banner-info">
                <Icon name="info" />
                <div>
                  <strong>Data Preservation Guarantee:</strong> Deactivating an account revokes active login access immediately, while fully preserving historical orders served, shift logs, and customer reviews.
                </div>
              </div>
            </div>

            <div className="owner-modal-footer">
              <button
                className="owner-btn owner-btn-secondary"
                onClick={() => setDeactivateTarget(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="owner-btn owner-btn-danger"
                onClick={() => handleToggleStatus(deactivateTarget)}
                type="button"
              >
                Confirm {deactivateTarget.status === 'Active' ? 'Deactivation' : 'Reactivation'}
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

