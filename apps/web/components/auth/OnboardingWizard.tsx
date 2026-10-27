'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Icon } from '../landing/Icon';
import { ThemeToggle } from '../landing/ThemeToggle';

type OnboardingData = {
  restaurantName: string;
  restaurantType: string;
  otherType: string;
  businessStructure: string;
  locations: string;
  description: string;
  contactPerson: string;
  countryCode: string;
  phone: string;
  email: string;
  country: string;
  street: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  landmark: string;
  timeZone: string;
  confirmation: boolean;
};

const emptyData: OnboardingData = {
  restaurantName: '', restaurantType: '', otherType: '', businessStructure: '', locations: '', description: '',
  contactPerson: '', countryCode: '+1 (US)', phone: '', email: '', country: '', street: '', addressLine2: '', city: '',
  state: '', postalCode: '', landmark: '', timeZone: '', confirmation: false,
};

const steps = ['Restaurant Details', 'Contact & Address', 'Review & Confirm'];
const onboardingStorageKey = 'dineflow-onboarding-draft';

function Field({ label, id, required, hint, children }: { label: string; id: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div className="onboarding-field">
      <div className="onboarding-label-row">
        <label htmlFor={id}>{label}{required ? <span className="required-mark"> *</span> : null}</label>
        {hint ? <small>{hint}</small> : null}
      </div>
      {children}
    </div>
  );
}

export function OnboardingWizard() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData>(emptyData);
  const [step, setStep] = useState(1);
  const [furthestStep, setFurthestStep] = useState(1);
  const [savedDraft, setSavedDraft] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [exitDialog, setExitDialog] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    try {
      const draft = window.sessionStorage.getItem(onboardingStorageKey);
      if (draft) {
        const parsed = JSON.parse(draft) as { data?: OnboardingData; furthestStep?: number };
        if (parsed.data) setData({ ...emptyData, ...parsed.data });
        if (parsed.furthestStep && parsed.furthestStep >= 1 && parsed.furthestStep <= 3) {
          setFurthestStep(parsed.furthestStep);
          setStep(parsed.furthestStep);
        }
        setSavedDraft(true);
      }
    } catch {
      setSavedDraft(false);
    } finally {
      setDraftLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!draftLoaded) return;
    try {
      window.sessionStorage.setItem(onboardingStorageKey, JSON.stringify({ data, furthestStep }));
      setSavedDraft(true);
    } catch {
      setSavedDraft(false);
    }
  }, [data, furthestStep, draftLoaded]);

  useEffect(() => {
    if (!exitDialog) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExitDialog(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [exitDialog]);

  function update<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function submitStep(event: FormEvent<HTMLFormElement>, nextStep: number) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setStep(nextStep);
    setFurthestStep((current) => Math.max(current, nextStep));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function finishPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setFinished(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeDraft() {
    try {
      window.sessionStorage.setItem(onboardingStorageKey, JSON.stringify({ data, furthestStep }));
    } catch {
      // Continue to the landing page even if this browser cannot retain a draft.
    }
    router.push('/');
  }

  const input = (key: keyof OnboardingData, props: { id: string; type?: string; placeholder?: string; required?: boolean; autoComplete?: string } ) => (
    <input
      autoComplete={props.autoComplete}
      id={props.id}
      name={String(key)}
      onChange={(event) => update(key, event.target.value as OnboardingData[typeof key])}
      placeholder={props.placeholder}
      required={props.required}
      type={props.type ?? 'text'}
      value={String(data[key] ?? '')}
    />
  );

  const selectedType = data.restaurantType === 'Other' ? data.otherType : data.restaurantType;
  const fullAddress = [data.street, data.addressLine2, data.city, data.state, data.postalCode, data.country].filter(Boolean).join(', ');

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">
        <header className="onboarding-header">
          <Link aria-label="DineFlow home" className="onboarding-brand" href="/">
            <span className="onboarding-brand-mark"><Icon name="room_service" /></span>
            <span><strong>DineFlow</strong><small>Onboarding Suite</small></span>
          </Link>
          <div className="onboarding-header-actions">
            <span aria-live="polite" className="draft-status"><i />{savedDraft ? 'Draft saved in this browser session' : 'Draft is not saved to a server'}</span>
            <ThemeToggle compact />
            <button className="quiet-button" onClick={() => setExitDialog(true)} type="button">Save &amp; Exit</button>
          </div>
        </header>

        {!finished ? (
          <>
            <nav aria-label="Onboarding progress" className="onboarding-stepper">
              <ol>
                {steps.map((title, index) => {
                  const number = index + 1;
                  const accessible = number <= furthestStep;
                  return (
                    <li key={title}>
                      <button aria-current={number === step ? 'step' : undefined} disabled={!accessible} onClick={() => setStep(number)} type="button">
                        <span className="step-badge">{number < step ? <Icon name="check" /> : number}</span>
                        <span><small>Step {String(number).padStart(2, '0')}</small><strong>{title}</strong></span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {step === 1 ? (
              <section aria-labelledby="onboarding-step-one-title" className="onboarding-card">
                <div className="onboarding-intro">
                  <span className="onboarding-eyebrow"><Icon name="storefront" /> Profile Foundation</span>
                  <h1 id="onboarding-step-one-title">Tell us about your restaurant.</h1>
                  <p>Let&apos;s start with a few basic details to create your restaurant profile.</p>
                </div>
                <form className="onboarding-form" onSubmit={(event) => submitStep(event, 2)}>
                  <Field hint="Public display name" id="restaurant-name" label="Restaurant Name" required>
                    {input('restaurantName', { id: 'restaurant-name', placeholder: 'e.g. The Copper & Fig Bistro', required: true })}
                  </Field>

                  <div className="onboarding-grid-two">
                    <Field id="restaurant-type" label="Restaurant Type" required>
                      <select id="restaurant-type" onChange={(event) => update('restaurantType', event.target.value)} required value={data.restaurantType}>
                        <option value="">Select restaurant type</option>
                        {['Casual Dining', 'Fine Dining', 'Café', 'Quick Service / Fast Food', 'Bakery', 'Bar and Lounge', 'Cloud Kitchen', 'Food Truck', 'Other'].map((type) => <option key={type}>{type}</option>)}
                      </select>
                    </Field>
                    <Field hint="Optional" id="business-structure" label="Business Structure">
                      <select id="business-structure" onChange={(event) => update('businessStructure', event.target.value)} value={data.businessStructure}>
                        <option value="">Select legal entity</option>
                        {['Private Limited Company', 'Sole Proprietorship', 'Partnership', 'LLP', 'Other'].map((type) => <option key={type}>{type}</option>)}
                      </select>
                    </Field>
                  </div>

                  {data.restaurantType === 'Other' ? (
                    <Field id="other-restaurant-type" label="Specify Restaurant Type" required>
                      {input('otherType', { id: 'other-restaurant-type', placeholder: 'Describe your restaurant type', required: true })}
                    </Field>
                  ) : null}

                  <fieldset className="location-choice">
                    <legend>Number of Locations <span className="required-mark">*</span></legend>
                    <div className="onboarding-grid-two">
                      {[
                        ['One location', 'Single restaurant footprint'],
                        ['Multiple locations', 'Multi-unit operations'],
                      ].map(([value, description]) => (
                        <label className={`location-option${data.locations === value ? ' selected' : ''}`} key={value}>
                          <input checked={data.locations === value} name="locations" onChange={() => update('locations', value)} required type="radio" value={value} />
                          <span><strong>{value}</strong><small>{description}</small></span>
                        </label>
                      ))}
                    </div>
                    {data.locations === 'Multiple locations' ? <p className="inline-info"><Icon name="info" /> This setup registers your initial restaurant location. Additional locations can be configured later.</p> : null}
                  </fieldset>

                  <Field hint={`${data.description.length}/300 chars`} id="restaurant-description" label="Short Description">
                    <textarea id="restaurant-description" maxLength={300} onChange={(event) => update('description', event.target.value)} placeholder="Describe your culinary concept, atmosphere, or specialties..." rows={3} value={data.description} />
                  </Field>

                  <div className="onboarding-actions">
                    <button className="quiet-button" onClick={() => setExitDialog(true)} type="button">Save &amp; Exit</button>
                    <button className="button button-primary" type="submit">Continue to Location <Icon name="arrow_forward" /></button>
                  </div>
                </form>
              </section>
            ) : null}

            {step === 2 ? (
              <section aria-labelledby="onboarding-step-two-title" className="onboarding-card">
                <div className="onboarding-intro">
                  <span className="onboarding-eyebrow"><Icon name="pin_drop" /> Establishment Coordinates</span>
                  <h1 id="onboarding-step-two-title">Where is your restaurant located?</h1>
                  <p>Add your restaurant&apos;s contact details and address.</p>
                </div>
                <form className="onboarding-form" onSubmit={(event) => submitStep(event, 3)}>
                  <div className="onboarding-subsection"><span /><h2>Section A: Contact Information</h2></div>
                  <div className="onboarding-grid-two">
                    <Field id="contact-person" label="Contact Person" required>
                      {input('contactPerson', { id: 'contact-person', placeholder: 'Name and role', required: true, autoComplete: 'name' })}
                    </Field>
                    <Field id="contact-phone" label="Restaurant Contact Number" required>
                      <div className="phone-field">
                        <select aria-label="Country calling code" onChange={(event) => update('countryCode', event.target.value)} value={data.countryCode}>
                          {['+1 (US)', '+44 (UK)', '+33 (FR)', '+49 (DE)', '+81 (JP)'].map((code) => <option key={code} value={code}>{code}</option>)}
                        </select>
                        {input('phone', { id: 'contact-phone', type: 'tel', placeholder: '(555) 000-0000', required: true, autoComplete: 'tel-national' })}
                      </div>
                    </Field>
                    <Field hint="Owner contact" id="business-email" label="Business Email" required>
                      {input('email', { id: 'business-email', type: 'email', placeholder: 'contact@restaurant.com', required: true, autoComplete: 'email' })}
                    </Field>
                  </div>

                  <div className="onboarding-subsection"><span /><h2>Section B: Restaurant Address</h2></div>
                  <div className="onboarding-grid-two">
                    <Field id="address-country" label="Country" required>
                      <select id="address-country" onChange={(event) => update('country', event.target.value)} required value={data.country}>
                        <option value="">Select country</option>
                        {['United States', 'United Kingdom', 'Canada', 'France', 'Australia'].map((country) => <option key={country}>{country}</option>)}
                      </select>
                    </Field>
                    <Field id="street-address" label="Street Address" required>
                      {input('street', { id: 'street-address', placeholder: 'Street and number', required: true, autoComplete: 'address-line1' })}
                    </Field>
                    <Field hint="Optional" id="address-line-2" label="Line 2">
                      {input('addressLine2', { id: 'address-line-2', placeholder: 'Apt, Suite, Unit', autoComplete: 'address-line2' })}
                    </Field>
                    <Field id="address-city" label="City" required>
                      {input('city', { id: 'address-city', placeholder: 'City', required: true, autoComplete: 'address-level2' })}
                    </Field>
                    <Field id="address-state" label="State / Region" required>
                      {input('state', { id: 'address-state', placeholder: 'State or region', required: true, autoComplete: 'address-level1' })}
                    </Field>
                    <Field id="address-postal" label="Postal / ZIP Code" required>
                      {input('postalCode', { id: 'address-postal', placeholder: 'Postal code', required: true, autoComplete: 'postal-code' })}
                    </Field>
                    <Field hint="Optional" id="address-landmark" label="Landmark">
                      {input('landmark', { id: 'address-landmark', placeholder: 'Nearby cross-street or landmark' })}
                    </Field>
                  </div>

                  <div className="onboarding-subsection"><span /><h2>Section C: Operational Time Zone</h2></div>
                  <Field id="restaurant-timezone" label="Restaurant Time Zone" required>
                    <select id="restaurant-timezone" onChange={(event) => update('timeZone', event.target.value)} required value={data.timeZone}>
                      <option value="">Select time zone</option>
                      {['America/New_York (EST - UTC-5)', 'America/Chicago (CST - UTC-6)', 'America/Denver (MST - UTC-7)', 'America/Los_Angeles (PST - UTC-8)', 'Europe/London (GMT + UTC+0)', 'Europe/Paris (CET - UTC+1)'].map((zone) => <option key={zone}>{zone}</option>)}
                    </select>
                    <small className="field-help"><Icon name="info" /> Time zone is selected manually; automatic address detection is not connected.</small>
                  </Field>

                  <div className="onboarding-actions">
                    <button className="quiet-button" onClick={() => setStep(1)} type="button"><Icon name="arrow_back" /> Back to Details</button>
                    <button className="button button-primary" type="submit">Continue to Review <Icon name="arrow_forward" /></button>
                  </div>
                </form>
              </section>
            ) : null}

            {step === 3 ? (
              <section aria-labelledby="onboarding-step-three-title" className="onboarding-card">
                <div className="onboarding-intro">
                  <span className="onboarding-eyebrow"><Icon name="verified" /> Final Verification</span>
                  <h1 id="onboarding-step-three-title">Review your restaurant details.</h1>
                  <p>Check your information before creating your restaurant profile.</p>
                </div>
                <div className="onboarding-ready-note"><Icon name="check_circle" /><span>All required information is ready for review. Nothing has been submitted or saved to a DineFlow account.</span></div>

                <section className="review-section" aria-label="Restaurant profile details">
                  <div className="review-heading"><h2><Icon name="store" /> Restaurant Profile Details</h2><button onClick={() => setStep(1)} type="button"><Icon name="edit" /> Edit Details</button></div>
                  <dl className="review-grid">
                    <div><dt>Restaurant Name</dt><dd>{data.restaurantName || '—'}</dd></div>
                    <div><dt>Type of Concept</dt><dd>{selectedType || '—'}</dd></div>
                    <div><dt>Legal Structure</dt><dd>{data.businessStructure || 'Not specified'}</dd></div>
                    <div><dt>Active Scope</dt><dd>{data.locations || '—'}</dd></div>
                    <div className="review-wide"><dt>Concept Synopsis</dt><dd>{data.description ? `“${data.description}”` : 'No description provided.'}</dd></div>
                  </dl>
                </section>

                <section className="review-section" aria-label="Contact and physical address">
                  <div className="review-heading"><h2><Icon name="location_on" /> Contact &amp; Physical Address</h2><button onClick={() => setStep(2)} type="button"><Icon name="edit" /> Edit Address</button></div>
                  <dl className="review-grid">
                    <div><dt>Registered Contact</dt><dd>{data.contactPerson || '—'}</dd></div>
                    <div><dt>Contact Phone &amp; Email</dt><dd>{[data.countryCode + ' ' + data.phone, data.email].filter(Boolean).join(' · ') || '—'}</dd></div>
                    <div className="review-wide"><dt>Physical Address</dt><dd>{fullAddress || '—'}</dd></div>
                    <div><dt>Operational Time Zone</dt><dd>{data.timeZone || '—'}</dd></div>
                    {data.landmark ? <div><dt>Landmark</dt><dd>{data.landmark}</dd></div> : null}
                  </dl>
                </section>

                <form className="onboarding-form" onSubmit={finishPreview}>
                  <label className="consent-field review-consent">
                    <input checked={data.confirmation} onChange={(event) => update('confirmation', event.target.checked)} required type="checkbox" />
                    <span>I confirm that the information provided is accurate and that I am authorized to register this restaurant under the DineFlow network agreements.</span>
                  </label>
                  <div className="onboarding-actions">
                    <button className="quiet-button" onClick={() => setStep(2)} type="button"><Icon name="arrow_back" /> Back</button>
                    <button className="button button-primary" type="submit"><Icon name="add_business" /> Finish Setup Preview</button>
                  </div>
                </form>
              </section>
            ) : null}
          </>
        ) : (
          <section aria-labelledby="onboarding-complete-title" className="onboarding-card onboarding-complete">
            <span className="completion-icon"><Icon name="verified" /></span>
            <span className="onboarding-eyebrow">Setup preview complete</span>
            <h1 id="onboarding-complete-title">Your restaurant details are ready to submit.</h1>
            <p className="completion-copy">The {data.restaurantName || 'restaurant'} profile has not been created. DineFlow account and onboarding services are not connected, so your information remains only in this browser session.</p>
            <div className="completion-summary"><strong>{data.restaurantName || 'Restaurant name'}</strong><span>{[selectedType, data.city, data.country].filter(Boolean).join(' · ')}</span></div>
            <div className="completion-next"><strong>What&apos;s next?</strong><p>Once account creation and restaurant setup services are available, these details can be submitted to create your profile. No workspace session has been started.</p></div>
            <div className="onboarding-actions completion-actions">
              <button className="quiet-button" onClick={() => setFinished(false)} type="button"><Icon name="arrow_back" /> Back to Review</button>
              <Link className="button button-primary" href="/">Return to DineFlow <Icon name="arrow_forward" /></Link>
            </div>
          </section>
        )}

        <footer className="onboarding-footer"><Icon name="verified_user" /> Your draft is stored only for this browser session; it is not transmitted to DineFlow.</footer>
      </div>

      {exitDialog ? (
        <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setExitDialog(false); }}>
          <section aria-labelledby="exit-dialog-title" aria-modal="true" className="exit-dialog" role="dialog">
            <div className="exit-dialog-heading"><span><Icon name="save" /></span><button aria-label="Keep editing" onClick={() => setExitDialog(false)} type="button"><Icon name="close" /></button></div>
            <h2 id="exit-dialog-title">Save &amp; Exit Onboarding?</h2>
            <p>Your progress is saved only in this browser session. It has not been sent to DineFlow. You can return to this onboarding preview in the same session.</p>
            <div className="exit-dialog-actions"><button className="quiet-button" onClick={() => setExitDialog(false)} type="button">Keep Editing</button><button className="button button-primary" onClick={closeDraft} type="button">Save &amp; Close Session</button></div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
