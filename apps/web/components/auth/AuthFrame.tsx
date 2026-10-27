import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '../landing/Icon';
import { ThemeToggle } from '../landing/ThemeToggle';

type AuthFrameProps = {
  mode: 'signup' | 'login';
  children: ReactNode;
};

const signupBenefits = [
  ['qr_code_2', 'Unified digital menus & QR ordering', 'Publish menu changes across your restaurant experience.'],
  ['skillet', 'Real-time kitchen coordination', 'Bring service teams and kitchen workflows into one view.'],
  ['inventory_2', "Availability & dynamic pricing", 'Manage menu availability and pricing from one place.'],
] as const;

export function AuthFrame({ mode, children }: AuthFrameProps) {
  const signup = mode === 'signup';

  return (
    <main className={`auth-page auth-page-${mode}`}>
      <div className="auth-theme-control"><ThemeToggle compact /></div>
      <section className="auth-frame" aria-label={signup ? 'Create a DineFlow owner account' : 'Sign in to DineFlow'}>
        <aside className="auth-brand-panel">
          <Link className="auth-brand" href="/" aria-label="DineFlow home">
            <span className="auth-brand-mark"><Icon name="room_service" /></span>
            <span><strong>DineFlow</strong><small>Hospitality OS</small></span>
          </Link>

          <div className="auth-brand-story">
            <span className="auth-status"><i />{signup ? 'Operator Cloud' : 'Operational Command'}</span>
            <h1>{signup ? 'Modern infrastructure for ambitious hospitality.' : 'Run your dining room with complete clarity.'}</h1>
            <p>{signup
              ? 'The quiet, reliable operating engine designed for restaurant teams and the craft of service.'
              : 'DineFlow connects front-of-house, kitchen workflows, and guest orders in one smooth experience.'}</p>
          </div>

          {signup ? (
            <div className="auth-benefits">
              {signupBenefits.map(([icon, title, description]) => (
                <div className="auth-benefit" key={title}>
                  <span><Icon name={icon} /></span>
                  <div><strong>{title}</strong><p>{description}</p></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="auth-service-card">
              <span className="auth-card-eyebrow"><i /> One connected workspace</span>
              <strong>Restaurant operations, brought together.</strong>
              <p>Menus, ordering, and service coordination in one place.</p>
            </div>
          )}

          <p className="auth-brand-footer">DineFlow OS <span>•</span> Designed for hospitality teams</p>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-inner">{children}</div>
          <div className="auth-security-note"><Icon name="verified_user" /> Secure account access for restaurant teams</div>
        </section>
      </section>
    </main>
  );
}
