'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Icon } from '../landing/Icon';

export function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setMessage('Sign-in is not connected yet. No session was started.');
  }

  return (
    <>
      <div className="auth-form-heading">
        <span className="auth-portal-label"><Icon name="shield" /> Owner &amp; GM Portal</span>
        <h2>Welcome back.</h2>
        <p>Sign in to continue managing your restaurant with DineFlow.</p>
      </div>

      {message ? (
        <div aria-live="polite" className="auth-notice auth-notice-error" role="alert">
          <Icon name="info" />
          <div><strong>Authentication unavailable</strong><p>{message}</p></div>
          <button aria-label="Dismiss message" onClick={() => setMessage('')} type="button"><Icon name="close" /></button>
        </div>
      ) : null}

      <form className="auth-form login-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">Work Email</label>
          <div className="input-with-icon">
            <Icon name="email" />
            <input autoComplete="email" id="login-email" name="email" placeholder="you@restaurant.com" required type="email" />
          </div>
        </div>

        <div className="form-field">
          <div className="label-row">
            <label htmlFor="login-password">Password</label>
            <span aria-disabled="true" className="auth-disabled-link" title="Password recovery is not designed or connected yet.">Forgot password?</span>
          </div>
          <div className="input-with-icon password-input">
            <Icon name="lock" />
            <input autoComplete="current-password" id="login-password" name="password" placeholder="Enter your password" required type={passwordVisible ? 'text' : 'password'} />
            <button aria-label={passwordVisible ? 'Hide password' : 'Show password'} onClick={() => setPasswordVisible((value) => !value)} type="button"><Icon name={passwordVisible ? 'visibility_off' : 'visibility'} /></button>
          </div>
        </div>

        <label className="remember-field"><input name="remember" type="checkbox" /> <span>Remember me for 30 days</span></label>

        <button className="button button-primary auth-submit" type="submit">Sign In to Restaurant <Icon name="arrow_forward" /></button>
      </form>

      <div className="auth-switch-link"><span>New to DineFlow?</span> <Link href="/signup">Create an owner account <Icon name="chevron_right" /></Link></div>
      <p className="auth-account-note">General Managers Only</p>
    </>
  );
}
