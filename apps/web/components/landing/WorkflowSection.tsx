import { Icon } from './Icon';

const steps = [
  {
    number: '01',
    icon: 'tune' as const,
    title: 'Set up your restaurant and menu',
    description: 'Upload menus, designate floor tables, assign sections, and configure kitchen stations in under sixty minutes.',
  },
  {
    number: '02',
    icon: 'cell_tower' as const,
    title: 'Let guests scan, browse, and order',
    description: 'Guests scan table-specific QR markers to view live menus, request dietary adjustments, and send orders straight to prep rails.',
  },
  {
    number: '03',
    icon: 'dinner_dining' as const,
    title: 'Coordinate preparation and service',
    description: 'Staff manage prep timing, course pacing, and order readiness from one harmonious, real-time workflow across every station.',
  },
];

export function WorkflowSection() {
  return (
    <section aria-labelledby="workflow-title" className="workflow-section" id="how-it-works">
      <div className="section-intro">
        <span className="eyebrow"><Icon name="sync_alt" /> Effortless Deployment</span>
        <h2 id="workflow-title">How DineFlow Works</h2>
        <p>Up and serving in minutes, without replacing your POS or kitchen hardware.</p>
      </div>
      <div className="workflow-steps">
        {steps.map((step) => (
          <article className="workflow-step" key={step.number}>
            <span className="step-number">{step.number}</span>
            <span className="step-icon"><Icon name={step.icon} /></span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
