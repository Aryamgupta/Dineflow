'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../landing/Icon';
import { ThemeToggle } from '../landing/ThemeToggle';
import { managerNavigation } from './navigation';
import '../../app/manager.css';

type ManagerDashboardShellProps = {
  activeSlug: string;
  children: ReactNode;
};

export function ManagerDashboardShell({ activeSlug, children }: ManagerDashboardShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [venueSelectorOpen, setVenueSelectorOpen] = useState(false);
  const [activeVenue, setActiveVenue] = useState('The Rustic Oak — Downtown');

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);

  const activeItem = managerNavigation.flatMap((group) => group.items).find((item) => item.slug === activeSlug);
  const activeGroup = managerNavigation.find((group) => group.items.some((item) => item.slug === activeSlug));
  const pageTitle = activeItem?.label ?? 'Operational Overview';

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
    setVenueSelectorOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
      if (venueRef.current && !venueRef.current.contains(target)) {
        setVenueSelectorOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setProfileOpen(false);
        setNotificationsOpen(false);
        setVenueSelectorOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className={`manager-app${collapsed ? ' sidebar-collapsed' : ''}`}>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <button
          aria-label="Close navigation menu"
          className="manager-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          type="button"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        aria-label="Manager workspace"
        className={`manager-sidebar${mobileOpen ? ' is-open' : ''}`}
        id="manager-navigation-panel"
      >
        <div className="manager-sidebar-top">
          <Link aria-label="DineFlow manager workspace" className="manager-brand" href="/manager">
            <span className="manager-brand-mark">
              <Icon name="skillet" />
            </span>
            <span className="manager-brand-copy">
              <strong>DineFlow</strong>
              <small>Operations</small>
            </span>
          </Link>
          <span className="manager-role-badge">Manager</span>
          <button
            aria-label="Close navigation menu"
            className="manager-mobile-close"
            onClick={() => setMobileOpen(false)}
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Venue Switcher */}
        <div className="manager-venue-switcher-container" ref={venueRef}>
          <button
            aria-expanded={venueSelectorOpen}
            aria-haspopup="true"
            aria-label="Switch active branch venue"
            className="manager-venue-selector"
            onClick={() => setVenueSelectorOpen(!venueSelectorOpen)}
            type="button"
          >
            <Icon name="storefront" />
            <span className="manager-venue-name">{activeVenue}</span>
            <Icon name="unfold_more" />
          </button>

          {venueSelectorOpen && (
            <div className="manager-topbar-dropdown" style={{ left: '0.75rem', right: 'auto', width: '15.5rem' }}>
              <div className="manager-dropdown-header">
                <strong>Assigned Shift Location</strong>
                <small>Select branch under management</small>
              </div>
              <button
                className="manager-dropdown-item"
                onClick={() => {
                  setActiveVenue('The Rustic Oak — Downtown');
                  setVenueSelectorOpen(false);
                }}
                type="button"
              >
                <Icon name="check" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <strong>The Rustic Oak — Downtown</strong>
                  <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>Main Dining Floor • 24 Tables</div>
                </div>
              </button>
              <button
                className="manager-dropdown-item"
                onClick={() => {
                  setActiveVenue('The Rustic Oak — Uptown Wine Bar');
                  setVenueSelectorOpen(false);
                }}
                type="button"
              >
                <Icon name="storefront" />
                <div>
                  <strong>The Rustic Oak — Uptown</strong>
                  <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>Secondary Lounge • 12 Tables</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Grouped Navigation Links */}
        <nav aria-label="Manager dashboard navigation" className="manager-navigation">
          {managerNavigation.map((group) => (
            <section aria-label={group.label} className="manager-nav-group" key={group.label}>
              <h2 className="manager-nav-heading">{group.label}</h2>
              {group.items.map((item) => {
                const active = item.slug === activeSlug;
                const href = item.slug ? `/manager/${item.slug}` : '/manager';
                return (
                  <Link
                    aria-current={active ? 'page' : undefined}
                    className={`manager-nav-link${active ? ' is-active' : ''}`}
                    href={href}
                    key={item.slug || 'overview'}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon name={item.icon} />
                    <span className="manager-nav-label">{item.label}</span>
                  </Link>
                );
              })}
            </section>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="manager-sidebar-footer">
          {/* Active Venue Snapshot card (Visible when expanded) */}
          <div className="manager-active-venue-card">
            <div className="manager-venue-card-header">
              <span className="manager-venue-badge">Active Venue</span>
              <span className="manager-live-dot" />
            </div>
            <strong>The Rustic Oak</strong>
            <small>Flagship • Downtown Floor</small>
          </div>

          <div className="manager-sidebar-actions">
            <a
              href="#manager-support"
              onClick={() => setMobileOpen(false)}
              title={collapsed ? 'Support & Helpdesk' : undefined}
            >
              <Icon name="support_agent" />
              <span className="manager-nav-label">Support</span>
            </a>

            <button
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="manager-collapse-button"
              onClick={() => setCollapsed((value) => !value)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              type="button"
            >
              <Icon name={collapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'} />
              <span className="manager-nav-label">{collapsed ? 'Expand' : 'Collapse'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="manager-workspace">
        <header className="manager-topbar">
          <div className="manager-topbar-leading">
            <button
              aria-controls="manager-navigation-panel"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="manager-mobile-menu"
              onClick={() => setMobileOpen((value) => !value)}
              type="button"
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} />
            </button>

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="manager-breadcrumb">
              <span className="manager-breadcrumb-trail">
                <Link href="/manager">Operations</Link>
                <span aria-hidden="true">/</span>
                <span>{activeGroup?.label ?? 'Overview'}</span>
                <span aria-hidden="true">/</span>
              </span>
              <strong>{pageTitle}</strong>
            </nav>

            <span aria-hidden="true" className="manager-breadcrumb-mobile">
              {pageTitle}
            </span>
          </div>

          {/* Topbar Actions & Shift Telemetry */}
          <div className="manager-topbar-actions">
            {/* Search Input Bar with Command Key Affordance */}
            <label className="manager-search">
              <Icon name="search" />
              <input
                aria-label="Search orders, tables, staff, alerts"
                placeholder="Search orders, tables, staff, alerts, guest queries..."
                type="search"
              />
              <kbd className="manager-search-kbd">⌘K</kbd>
            </label>

            {/* Shift Context Badge */}
            <div className="manager-shift-pill" title="Current Active Shift Window (Simulated)">
              <span className="manager-live-dot" />
              <span>Shift B: Dinner Rush</span>
            </div>

            <div className="manager-demo-tag" title="Operating on static demo fixtures; no live backend connection">
              Demo Fixtures
            </div>

            <ThemeToggle />

            {/* Notifications with Unread Count Badge */}
            <div className="manager-topbar-relative" ref={notifRef}>
              <button
                aria-label="Notifications (4 simulated unread items)"
                className="manager-icon-action"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                type="button"
              >
                <Icon name="notifications" />
                <span className="manager-notification-badge">4</span>
              </button>

              {notificationsOpen && (
                <div className="manager-topbar-dropdown">
                  <div className="manager-dropdown-header">
                    <strong>Shift Alert Queue (4) [Simulated]</strong>
                    <small>Operational floor alerts from local development fixtures</small>
                  </div>

                  <div className="manager-dropdown-item">
                    <span className="manager-badge manager-badge-danger" style={{ padding: '0.2rem' }}>
                      <Icon name="notification_important" />
                    </span>
                    <div>
                      <strong>Table 14 — Gluten Allergen Flag</strong>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                        Pending manager protocol verification • 4m ago
                      </div>
                    </div>
                  </div>

                  <div className="manager-dropdown-item">
                    <span className="manager-badge manager-badge-warning" style={{ padding: '0.2rem' }}>
                      <Icon name="nest_clock_farsight_analog" />
                    </span>
                    <div>
                      <strong>Table 7 — Cleaning Overdue (+3.4m)</strong>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                        Miller party waiting at vestibule
                      </div>
                    </div>
                  </div>

                  <div className="manager-dropdown-item">
                    <span className="manager-badge manager-badge-warning" style={{ padding: '0.2rem' }}>
                      <Icon name="timer" />
                    </span>
                    <div>
                      <strong>Order #DF-9038 Delayed (+6m)</strong>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                        Table 12 VIP • Hearth Meats station backlog
                      </div>
                    </div>
                  </div>

                  <div className="manager-dropdown-item">
                    <span className="manager-badge manager-badge-primary" style={{ padding: '0.2rem' }}>
                      <Icon name="event_seat" />
                    </span>
                    <div>
                      <strong>VIP Party of 6 Arriving in 15m</strong>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                        Sophia Chen • Mezzanine M-2 pre-assigned
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <span aria-hidden="true" className="manager-topbar-divider" />

            {/* Manager Profile Menu */}
            <div className="manager-topbar-relative" ref={profileRef}>
              <button
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-label="Manager account menu for Mark Santos"
                className="manager-profile-trigger"
                onClick={() => setProfileOpen(!profileOpen)}
                type="button"
              >
                <div className="manager-avatar-initials">MS</div>
                <div className="manager-profile-meta">
                  <span className="manager-profile-name">Mark Santos</span>
                  <span className="manager-profile-role">Floor Operations GM</span>
                </div>
                <Icon name="arrow_drop_down" />
              </button>

              {profileOpen && (
                <div className="manager-topbar-dropdown">
                  <div className="manager-dropdown-header">
                    <strong>Mark Santos</strong>
                    <small>mark.santos@therusticoak.com</small>
                    <div style={{ marginTop: '0.25rem' }}>
                      <span className="manager-badge manager-badge-primary">Restaurant Manager</span>
                    </div>
                  </div>

                  <Link
                    className="manager-dropdown-item"
                    href="/manager"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Icon name="grid_view" />
                    <span>Floor Command Center</span>
                  </Link>

                  <Link
                    className="manager-dropdown-item"
                    href="/manager/notifications-and-activity"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Icon name="edit_note" />
                    <span>Shift Handover Notes</span>
                  </Link>

                  <div className="manager-dropdown-divider" />

                  <Link
                    className="manager-dropdown-item manager-dropdown-item-danger"
                    href="/login"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Icon name="cancel" />
                    <span>Sign Out of Shift</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="manager-main" id="manager-main">
          {children}
          <div className="manager-help-anchor" id="manager-help" />
          <div className="manager-help-anchor" id="manager-support" />
        </main>
      </div>
    </div>
  );
}
