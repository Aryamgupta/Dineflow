'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../landing/Icon';
import { ThemeToggle } from '../landing/ThemeToggle';
import { ownerNavigation } from './navigation';
import '../../app/owner.css';

type OwnerDashboardShellProps = {
  activeSlug: string;
  children: ReactNode;
};

export function OwnerDashboardShell({ activeSlug, children }: OwnerDashboardShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [restaurantSelectorOpen, setRestaurantSelectorOpen] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState('The Rustic Oak — Downtown');

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const restaurantRef = useRef<HTMLDivElement>(null);

  const activeItem = ownerNavigation.flatMap((group) => group.items).find((item) => item.slug === activeSlug);
  const activeGroup = ownerNavigation.find((group) => group.items.some((item) => item.slug === activeSlug));
  const pageTitle = activeItem?.label ?? 'Owner Dashboard';

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
    setRestaurantSelectorOpen(false);
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
      if (restaurantRef.current && !restaurantRef.current.contains(target)) {
        setRestaurantSelectorOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setProfileOpen(false);
        setNotificationsOpen(false);
        setRestaurantSelectorOpen(false);
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
    <div className={`owner-app${collapsed ? ' sidebar-collapsed' : ''}`}>
      {mobileOpen ? (
        <button
          aria-label="Close navigation menu"
          className="owner-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        aria-label="Owner workspace"
        className={`owner-sidebar${mobileOpen ? ' is-open' : ''}`}
        id="owner-navigation-panel"
      >
        <div className="owner-sidebar-top">
          <Link aria-label="DineFlow owner workspace" className="owner-brand" href="/owner">
            <span className="owner-brand-mark">
              <Icon name="room_service" />
            </span>
            <span className="owner-brand-copy">
              <strong>DineFlow</strong>
              <small>Executive</small>
            </span>
          </Link>
          <span className="owner-role-badge">Owner</span>
          <button
            aria-label="Close navigation menu"
            className="owner-mobile-close"
            onClick={() => setMobileOpen(false)}
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label="Owner dashboard navigation" className="owner-navigation">
          {ownerNavigation.map((group) => (
            <section aria-label={group.label} className="owner-nav-group" key={group.label}>
              <h2 className="owner-nav-heading">{group.label}</h2>
              {group.items.map((item) => {
                const active = item.slug === activeSlug;
                const href = item.slug ? `/owner/${item.slug}` : '/owner';
                return (
                  <Link
                    aria-current={active ? 'page' : undefined}
                    className={`owner-nav-link${active ? ' is-active' : ''}`}
                    href={href}
                    key={item.slug || 'overview'}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon name={item.icon} />
                    <span className="owner-nav-label">{item.label}</span>
                  </Link>
                );
              })}
            </section>
          ))}
        </nav>

        <div className="owner-sidebar-footer">
          <div className="owner-sidebar-actions">
            <a
              href="#owner-support"
              onClick={() => setMobileOpen(false)}
              title={collapsed ? 'Support & Helpdesk' : undefined}
            >
              <Icon name="support_agent" />
              <span className="owner-nav-label">Support</span>
            </a>

            <button
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="owner-collapse-button"
              onClick={() => setCollapsed((value) => !value)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              type="button"
            >
              <Icon name={collapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'} />
              <span className="owner-nav-label">{collapsed ? 'Expand' : 'Collapse'}</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="owner-workspace">
        <header className="owner-topbar">
          <div className="owner-topbar-leading">
            <button
              aria-controls="owner-navigation-panel"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="owner-mobile-menu"
              onClick={() => setMobileOpen((value) => !value)}
              type="button"
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} />
            </button>

            <nav aria-label="Breadcrumb" className="owner-breadcrumb">
              <span className="owner-breadcrumb-trail">
                <Link href="/">DineFlow</Link>
                <span aria-hidden="true">/</span>
                <span>{activeGroup?.label ?? 'Overview'}</span>
                <span aria-hidden="true">/</span>
              </span>
              <strong>{pageTitle}</strong>
            </nav>

            <span aria-hidden="true" className="owner-breadcrumb-mobile">
              {pageTitle}
            </span>

            {/* Restaurant Location Switcher */}
            <div className="owner-topbar-relative" ref={restaurantRef} style={{ minWidth: 0, flexShrink: 1 }}>
              <button
                aria-label="Select restaurant"
                className="owner-restaurant-selector"
                onClick={() => setRestaurantSelectorOpen(!restaurantSelectorOpen)}
                type="button"
              >
                <Icon name="storefront" />
                <span>{activeRestaurant}</span>
                <Icon name="arrow_drop_down" />
              </button>

              {restaurantSelectorOpen && (
                <div className="owner-topbar-dropdown" style={{ left: 0, right: 'auto' }}>
                  <div className="owner-dropdown-header">
                    <strong>Active Restaurant Workspace</strong>
                    <small>Switch between your licensed locations</small>
                  </div>
                  <button
                    className="owner-dropdown-item"
                    onClick={() => {
                      setActiveRestaurant('The Rustic Oak — Downtown');
                      setRestaurantSelectorOpen(false);
                    }}
                    type="button"
                  >
                    <Icon name="check" style={{ color: 'var(--color-primary)' }} />
                    <div>
                      <strong>The Rustic Oak — Downtown</strong>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                        Main location • 24 tables
                      </div>
                    </div>
                  </button>
                  <button
                    className="owner-dropdown-item"
                    onClick={() => {
                      setActiveRestaurant('The Rustic Oak — Uptown Wine Bar');
                      setRestaurantSelectorOpen(false);
                    }}
                    type="button"
                  >
                    <Icon name="storefront" />
                    <div>
                      <strong>The Rustic Oak — Uptown</strong>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                        Secondary branch • 12 tables
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="owner-topbar-actions">
            <label className="owner-search">
              <Icon name="search" />
              <input aria-label="Search dashboard" placeholder="Search staff, reviews, sales..." type="search" />
            </label>

            <ThemeToggle />

            <a aria-label="Help and documentation" className="owner-icon-action" href="#owner-help">
              <Icon name="help_outline" />
            </a>

            {/* Notification Center Dropdown */}
            <div className="owner-topbar-relative" ref={notifRef}>
              <button
                aria-label="Notifications (2 unread)"
                className="owner-icon-action"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                type="button"
              >
                <Icon name="notifications" />
                <span className="owner-notification-badge">2</span>
              </button>

              {notificationsOpen && (
                <div className="owner-topbar-dropdown">
                  <div className="owner-dropdown-header">
                    <strong>Operational Notifications (2)</strong>
                    <small>Live alerts from kitchen and floor service</small>
                  </div>
                  <Link
                    href="/owner/escalations"
                    className="owner-dropdown-item"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    <span className="owner-badge owner-badge-danger" style={{ padding: '0.2rem' }}>
                      <Icon name="priority_high" />
                    </span>
                    <div>
                      <strong>Table 4 Entrée Delay</strong>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                        Grill station backlog • 7:42 PM
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/owner/reviews-ratings"
                    className="owner-dropdown-item"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    <span className="owner-badge owner-badge-success" style={{ padding: '0.2rem' }}>
                      <Icon name="star" />
                    </span>
                    <div>
                      <strong>New 5★ Verified Review</strong>
                      <div style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
                        Camila R. praised Truffle Tagliatelle
                      </div>
                    </div>
                  </Link>
                  <div className="owner-dropdown-divider" />
                  <Link
                    href="/owner/general-settings"
                    className="owner-dropdown-item"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    <Icon name="settings" />
                    <span>Notification Preferences</span>
                  </Link>
                </div>
              )}
            </div>

            <span aria-hidden="true" className="owner-topbar-divider" />

            {/* Owner Profile Dropdown Menu (Image 3 fix) */}
            <div className="owner-topbar-relative" ref={profileRef}>
              <button
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-label="Owner account menu for Laurent Mercier"
                className="owner-profile-trigger"
                onClick={() => setProfileOpen(!profileOpen)}
                type="button"
              >
                <div className="owner-avatar-initials">LM</div>
                <div className="owner-profile-meta">
                  <span className="owner-profile-name">Laurent Mercier</span>
                  <span className="owner-profile-role">Owner &amp; GM</span>
                </div>
                <Icon name="arrow_drop_down" />
              </button>

              {profileOpen && (
                <div className="owner-topbar-dropdown">
                  <div className="owner-dropdown-header">
                    <strong>Laurent Mercier</strong>
                    <small>laurent@therusticoak.com</small>
                    <div style={{ marginTop: '0.25rem' }}>
                      <span className="owner-badge owner-badge-primary">Restaurant Owner</span>
                    </div>
                  </div>

                  <Link
                    href="/owner/general-settings"
                    className="owner-dropdown-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Icon name="settings" />
                    <span>Restaurant Profile &amp; Settings</span>
                  </Link>

                  <Link
                    href="/owner/staff-management"
                    className="owner-dropdown-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Icon name="badge" />
                    <span>Workforce &amp; Staff Access</span>
                  </Link>

                  <Link
                    href="/owner/restaurant-policies"
                    className="owner-dropdown-item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Icon name="policy" />
                    <span>House Rules &amp; Policies</span>
                  </Link>

                  <div className="owner-dropdown-divider" />

                  <Link
                    href="/login"
                    className="owner-dropdown-item owner-dropdown-item-danger"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Icon name="cancel" />
                    <span>Sign Out of DineFlow</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="owner-main" id="owner-main">
          <div className="owner-main-heading">
            <div>
              <p className="owner-eyebrow">{activeGroup?.label ?? 'Overview'}</p>
              <h1>{pageTitle}</h1>
            </div>
          </div>
          {children}
          <div className="owner-help-anchor" id="owner-help" />
          <div className="owner-help-anchor" id="owner-support" />
        </main>
      </div>
    </div>
  );
}
