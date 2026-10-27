'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
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
  const activeItem = ownerNavigation.flatMap((group) => group.items).find((item) => item.slug === activeSlug);
  const activeGroup = ownerNavigation.find((group) => group.items.some((item) => item.slug === activeSlug));
  const pageTitle = activeItem?.label ?? 'Owner Dashboard';

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

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
            <span className="owner-brand-mark"><Icon name="room_service" /></span>
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
          <div className="owner-workspace-label">
            <Icon name="storefront" />
            <span>Restaurant workspace</span>
          </div>
          <div className="owner-sidebar-actions">
            <a href="#owner-support" onClick={() => setMobileOpen(false)}>
              <Icon name="support_agent" />
              <span className="owner-nav-label">Support</span>
            </a>
            <button
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="owner-collapse-button"
              onClick={() => setCollapsed((value) => !value)}
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
              <Link href="/">DineFlow</Link>
              <span aria-hidden="true">/</span>
              <span>{activeGroup?.label ?? 'Overview'}</span>
              <span aria-hidden="true">/</span>
              <strong>{pageTitle}</strong>
            </nav>
            <span aria-hidden="true" className="owner-breadcrumb-mobile">{pageTitle}</span>
            <button aria-label="Select restaurant" className="owner-restaurant-selector" type="button">
              <Icon name="restaurant" />
              <span>Select restaurant</span>
              <Icon name="arrow_drop_down" />
            </button>
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
            <button aria-label="Notifications" className="owner-icon-action" type="button">
              <Icon name="notifications" />
            </button>
            <span aria-hidden="true" className="owner-topbar-divider" />
            <span aria-label="Owner account" className="owner-avatar">
              <Icon name="person" />
            </span>
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
