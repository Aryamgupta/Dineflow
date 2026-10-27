'use client';

import { useState } from 'react';
import { Icon } from '../landing/Icon';

export function GeneralSettingsModule() {
  const [activeTab, setActiveTab] = useState<'profile' | 'staff-policy' | 'notifications' | 'preferences'>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form state
  const [restaurantName, setRestaurantName] = useState('The Rustic Oak');
  const [cuisine, setCuisine] = useState('Modern Italian & Wood-Fired Steaks');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [email, setEmail] = useState('contact@therusticoak.com');
  const [street, setStreet] = useState('420 Culinary Boulevard, Suite 100');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('94103');
  const [timezone, setTimezone] = useState('America/Los_Angeles (PST)');

  // Policy Toggles
  const [allowManagerPriceEdits, setAllowManagerPriceEdits] = useState(true);
  const [allowWaiterComps, setAllowWaiterComps] = useState(false);
  const [requireTableNumberOnCheckout, setRequireTableNumberOnCheckout] = useState(true);

  // Notification Toggles
  const [notifyDailySales, setNotifyDailySales] = useState(true);
  const [notifyEscalations, setNotifyEscalations] = useState(true);
  const [notifyLowReviews, setNotifyLowReviews] = useState(true);

  // Business Preferences
  const [currency, setCurrency] = useState('USD ($)');
  const [salesTax, setSalesTax] = useState('8.5');
  const [serviceCharge, setServiceCharge] = useState('18.0');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Restaurant configuration saved successfully.');
  };

  return (
    <div className="owner-page-container">
      {/* Header */}
      <div className="owner-page-header">
        <div className="owner-page-title-wrap">
          <p className="owner-eyebrow">Restaurant Administration</p>
          <h1>General Settings &amp; Configuration</h1>
          <p className="owner-page-subtitle">
            Manage your restaurant profile, manager allocation rules, notification preferences, and currency settings.
          </p>
        </div>

        <div className="owner-header-actions">
          <button className="owner-btn owner-btn-primary" onClick={handleSave} type="button">
            <Icon name="save" /> Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="owner-tabs-bar">
        <div className="owner-tabs-group" role="tablist">
          <button
            className={`owner-tab-btn ${activeTab === 'profile' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('profile')}
            type="button"
          >
            <Icon name="storefront" /> Restaurant Profile
          </button>
          <button
            className={`owner-tab-btn ${activeTab === 'staff-policy' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('staff-policy')}
            type="button"
          >
            <Icon name="badge" /> Staff &amp; Role Policy
          </button>
          <button
            className={`owner-tab-btn ${activeTab === 'notifications' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('notifications')}
            type="button"
          >
            <Icon name="notifications" /> Notifications
          </button>
          <button
            className={`owner-tab-btn ${activeTab === 'preferences' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('preferences')}
            type="button"
          >
            <Icon name="tune" /> Business Preferences
          </button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="owner-card-section">
            <div className="owner-card-header">
              <div>
                <h2>Primary Business Profile</h2>
                <p>Public-facing contact information and legal address</p>
              </div>
            </div>

            <div className="owner-form-grid">
              <div className="owner-form-group">
                <label htmlFor="set-name">Restaurant Brand Name *</label>
                <input
                  id="set-name"
                  className="owner-form-input"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  required
                />
              </div>

              <div className="owner-form-group">
                <label htmlFor="set-cuisine">Cuisine Classification</label>
                <input
                  id="set-cuisine"
                  className="owner-form-input"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                />
              </div>

              <div className="owner-form-group">
                <label htmlFor="set-phone">Contact Phone</label>
                <input
                  id="set-phone"
                  className="owner-form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="owner-form-group">
                <label htmlFor="set-email">Official Invoicing Email</label>
                <input
                  id="set-email"
                  type="email"
                  className="owner-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="owner-form-group owner-col-span-2">
                <label htmlFor="set-street">Physical Street Address</label>
                <input
                  id="set-street"
                  className="owner-form-input"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div className="owner-form-group">
                <label htmlFor="set-city">City</label>
                <input
                  id="set-city"
                  className="owner-form-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="owner-form-group">
                <label htmlFor="set-state">State / Region</label>
                <input
                  id="set-state"
                  className="owner-form-input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="owner-form-group">
                <label htmlFor="set-zip">Postal Code</label>
                <input
                  id="set-zip"
                  className="owner-form-input"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>

              <div className="owner-form-group">
                <label htmlFor="set-tz">Operational Timezone</label>
                <select
                  id="set-tz"
                  className="owner-form-select"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                  <option value="America/New_York (EST)">America/New_York (EST)</option>
                  <option value="America/Chicago (CST)">America/Chicago (CST)</option>
                  <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                  <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Staff Policy Tab */}
        {activeTab === 'staff-policy' && (
          <div className="owner-card-section">
            <div className="owner-card-header">
              <div>
                <h2>Workforce Rules &amp; Role Boundaries</h2>
                <p>Enforced system safeguards for manager and floor staff permissions</p>
              </div>
            </div>

            <div className="owner-banner owner-banner-info">
              <Icon name="verified_user" />
              <div>
                <strong>Strict Business Policy:</strong> DineFlow enforces a hard limit of maximum 2 General Managers per restaurant location. Both manager seats are currently assigned to Elena Rostova and Marcus Vance.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={allowManagerPriceEdits}
                  onChange={(e) => setAllowManagerPriceEdits(e.target.checked)}
                  style={{ marginTop: '0.2rem' }}
                />
                <div>
                  <strong style={{ fontSize: '0.8125rem' }}>Permit General Managers to modify dish prices &amp; 86 status</strong>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    When disabled, only the Restaurant Owner may edit menu base prices.
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={allowWaiterComps}
                  onChange={(e) => setAllowWaiterComps(e.target.checked)}
                  style={{ marginTop: '0.2rem' }}
                />
                <div>
                  <strong style={{ fontSize: '0.8125rem' }}>Allow floor servers to void or comp items up to $20</strong>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    When disabled, every ticket item cancellation requires manager PIN authorization.
                  </p>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={requireTableNumberOnCheckout}
                  onChange={(e) => setRequireTableNumberOnCheckout(e.target.checked)}
                  style={{ marginTop: '0.2rem' }}
                />
                <div>
                  <strong style={{ fontSize: '0.8125rem' }}>Mandate physical QR table session for order placement</strong>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Prevents orders from outside the geofenced dining room.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="owner-card-section">
            <div className="owner-card-header">
              <div>
                <h2>Executive Notification Feeds</h2>
                <p>Alert triggers delivered to owner email and mobile dashboard</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', cursor: 'pointer' }}>
                <div>
                  <strong style={{ fontSize: '0.8125rem' }}>Daily Gross Revenue &amp; Shift Close Summary</strong>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Dispatched at midnight with final z-report metrics</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyDailySales}
                  onChange={(e) => setNotifyDailySales(e.target.checked)}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', cursor: 'pointer' }}>
                <div>
                  <strong style={{ fontSize: '0.8125rem' }}>Immediate Alert for High-Priority Escalations</strong>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Kitchen safety or guest disputes exceeding 20m response</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyEscalations}
                  onChange={(e) => setNotifyEscalations(e.target.checked)}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-control)', cursor: 'pointer' }}>
                <div>
                  <strong style={{ fontSize: '0.8125rem' }}>Low Guest Rating Alerts (&le; 2 Stars)</strong>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Instant alert to facilitate immediate guest recovery</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyLowReviews}
                  onChange={(e) => setNotifyLowReviews(e.target.checked)}
                />
              </label>
            </div>
          </div>
        )}

        {/* Business Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="owner-card-section">
            <div className="owner-card-header">
              <div>
                <h2>Currency, Taxes &amp; Financial Standards</h2>
                <p>Accounting settings applied across checkout receipts</p>
              </div>
            </div>

            <div className="owner-form-grid">
              <div className="owner-form-group">
                <label htmlFor="pref-curr">Reporting Currency</label>
                <select
                  id="pref-curr"
                  className="owner-form-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD ($)">USD ($) — United States Dollar</option>
                  <option value="EUR (€)">EUR (€) — Euro</option>
                  <option value="GBP (£)">GBP (£) — British Pound</option>
                  <option value="INR (₹)">INR (₹) — Indian Rupee</option>
                </select>
              </div>

              <div className="owner-form-group">
                <label htmlFor="pref-tax">Local Sales Tax Rate (%)</label>
                <input
                  id="pref-tax"
                  type="number"
                  step="0.1"
                  className="owner-form-input"
                  value={salesTax}
                  onChange={(e) => setSalesTax(e.target.value)}
                />
              </div>

              <div className="owner-form-group">
                <label htmlFor="pref-serv">Default Dine-in Service Charge (%)</label>
                <input
                  id="pref-serv"
                  type="number"
                  step="0.5"
                  className="owner-form-input"
                  value={serviceCharge}
                  onChange={(e) => setServiceCharge(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
          <button type="submit" className="owner-btn owner-btn-primary">
            <Icon name="save" /> Save Restaurant Configuration
          </button>
        </div>
      </form>

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

