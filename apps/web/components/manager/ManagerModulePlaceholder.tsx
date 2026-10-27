'use client';

import Link from 'next/link';
import { Icon } from '../landing/Icon';

type ManagerModulePlaceholderProps = {
  moduleName: string;
  moduleSlug: string;
};

export function ManagerModulePlaceholder({ moduleName, moduleSlug }: ManagerModulePlaceholderProps) {
  return (
    <div className="manager-placeholder-card">
      <div className="manager-placeholder-icon">
        <Icon name="construction" />
      </div>
      <div className="manager-badge manager-badge-primary" style={{ alignSelf: 'center' }}>
        Phase 2 Milestone — Scope Notice
      </div>
      <h2>{moduleName} Module</h2>
      <p>
        The navigation shell and route mapping for <strong>{moduleName}</strong> (<code>/manager/{moduleSlug}</code>)
        are registered in accordance with the Stitch design system. In accordance with the Phase 2 specification,
        active implementation in this phase is focused strictly on the <strong>Manager Operational Overview</strong>.
      </p>
      <div className="manager-banner manager-banner-info" style={{ maxWidth: '38rem', margin: '1rem auto' }}>
        <Icon name="info" />
        <div>
          <strong>Development Status:</strong> This module is scheduled for implementation in subsequent phases (Phase 3 through Phase 6).
          All data models, live state, and interactive controls will be connected in sequence.
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link className="manager-btn manager-btn-primary" href="/manager">
          <Icon name="grid_view" /> Return to Operational Overview
        </Link>
      </div>
    </div>
  );
}
