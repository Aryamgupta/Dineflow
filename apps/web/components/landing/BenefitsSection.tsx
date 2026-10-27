import { Icon } from './Icon';

const benefits = [
  {
    icon: 'touch_app' as const,
    title: 'Easier digital ordering',
    description: 'Intuitive mobile ordering guests love, with zero friction and no app download required.',
  },
  {
    icon: 'table_restaurant' as const,
    title: 'Clearer order coordination',
    description: 'Real-time synchronization between front-of-house servers, bar staff, and the kitchen line.',
  },
  {
    icon: 'sentiment_satisfied' as const,
    title: 'A better guest experience',
    description: 'Faster table turns, pinpoint dietary allergy tagging, and instantaneous split checkouts.',
  },
];

export function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-title" className="benefits-section">
      <div className="benefits-heading">
        <Icon name="verified_user" />
        <h2 id="benefits-title">The Dining Architecture</h2>
      </div>
      <div className="benefits-list">
        {benefits.map((benefit) => (
          <article className="benefit-item" key={benefit.title}>
            <span className="benefit-icon"><Icon name={benefit.icon} /></span>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
