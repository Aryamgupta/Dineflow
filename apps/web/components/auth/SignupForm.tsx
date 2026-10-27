'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Icon } from '../landing/Icon';

export function SignupForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const passwordRules = [
    { label: '8+ characters', valid: password.length >= 8 },
    { label: 'Number or symbol', valid: /[0-9]|[^A-Za-z0-9]/.test(password) },
    { label: 'Passwords match', valid: password.length > 0 && password === confirmPassword },
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const password = String(data.get('password') ?? '');
    const confirmation = String(data.get('confirmPassword') ?? '');
    if (password !== confirmation) {
      setMessage('Passwords do not match. Check both password fields and try again.');
      return;
    }
    setMessage('Account creation is not connected yet. No account was created. You can preview the restaurant setup flow; its draft stays in this browser session and will not be submitted.');
  }

  return (
    <>
      <div className="auth-form-heading">
        <span className="auth-portal-label"><Icon name="shield" /> DineFlow for Restaurant Owners</span>
        <h2>Bring your restaurant to DineFlow.</h2>
        <p>Create your owner account and set up a simpler way to manage digital ordering.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="signup-name">Full Name</label>
          <div className="input-with-icon">
            <input autoComplete="name" id="signup-name" name="fullName" placeholder="Your full name" required type="text" />
            <Icon name="person" />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="signup-email">Work Email</label>
          <div className="input-with-icon">
            <input autoComplete="email" id="signup-email" name="email" placeholder="you@restaurant.com" required type="email" />
            <Icon name="email" />
          </div>
          <small>Use an email address you can access. Email verification is not available yet.</small>
        </div>

        <div className="auth-password-grid">
          <div className="form-field">
            <label htmlFor="signup-password">Password</label>
            <div className="input-with-icon password-input">
              <input autoComplete="new-password" id="signup-password" minLength={8} name="password" onChange={(event) => setPassword(event.target.value)} pattern="(?=.*(?:[0-9]|[^A-Za-z0-9])).{8,}" placeholder="At least 8 characters" required type={passwordVisible ? 'text' : 'password'} />
              <button aria-label={passwordVisible ? 'Hide password' : 'Show password'} onClick={() => setPasswordVisible((value) => !value)} type="button"><Icon name={passwordVisible ? 'visibility_off' : 'visibility'} /></button>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <div className="input-with-icon password-input">
              <input autoComplete="new-password" id="signup-confirm-password" name="confirmPassword" onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter password" required type={confirmVisible ? 'text' : 'password'} />
              <button aria-label={confirmVisible ? 'Hide confirm password' : 'Show confirm password'} onClick={() => setConfirmVisible((value) => !value)} type="button"><Icon name={confirmVisible ? 'visibility_off' : 'visibility'} /></button>
            </div>
          </div>
        </div>

        <div className="password-rules" aria-label="Password requirements">
          <strong>Security baseline requirements</strong>
          {passwordRules.map((rule) => <span className={rule.valid ? 'rule-valid' : 'rule-pending'} key={rule.label}><Icon name={rule.valid ? 'check_circle' : 'radio_button_unchecked'} /> {rule.label}</span>)}
        </div>

        <label className="consent-field">
          <input name="termsConsent" required type="checkbox" />
          <span>I agree to DineFlow&apos;s Terms of Service and Privacy Policy, and confirm I am authorized to register this restaurant.</span>
        </label>

        {message ? (
          <div aria-live="polite" className="auth-notice auth-notice-warning" role="status">
            <Icon name="info" />
            <div><strong>Account not created</strong><p>{message}</p><Link href="/onboarding">Preview restaurant setup <Icon name="arrow_forward" /></Link></div>
          </div>
        ) : null}

        <button className="button button-primary auth-submit" type="submit">Create Owner Account <Icon name="arrow_forward" /></button>
      </form>

      <div className="auth-switch-link"><span>Already have an account?</span> <Link href="/login">Sign in <Icon name="chevron_right" /></Link></div>
      <p className="auth-preview-link"><Link href="/onboarding">Preview the onboarding flow <span>(no account required; nothing is submitted)</span></Link></p>
    </>
  );
}
