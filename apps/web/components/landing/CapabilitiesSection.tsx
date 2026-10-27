import { Icon } from './Icon';

function MenuAvailabilityPreview() {
  return (
    <div className="capability-visual inventory-preview">
      <div className="mini-preview-heading"><span>Live 86&apos;d Inventory</span><span className="mini-switch" aria-hidden="true"><i /></span></div>
      <div className="inventory-row"><Icon name="check_circle" /><span>Wild Morel Risotto</span><strong>Available</strong></div>
      <div className="inventory-row unavailable"><Icon name="cancel" /><span>Pacific Halibut Crudo</span><strong>86&apos;d (Sold Out)</strong></div>
    </div>
  );
}

function QrPreview() {
  return (
    <div className="capability-visual qr-preview">
      <span className="qr-icon"><Icon name="qr_code_2" /></span>
      <div><strong>Table 14</strong><span>Zero Download Required</span></div>
      <span className="qr-speed"><Icon name="bolt" />&lt;1.2s</span>
    </div>
  );
}

function TicketPreview() {
  return (
    <div className="capability-visual ticket-preview">
      <div className="ticket-preview-heading"><span>Ticket #109</span><span>Flow Course 1: Hors d&apos;oeuvres</span><Icon name="check_circle" /></div>
      <div className="ticket-progress-row"><Icon name="receipt_long" /><span>Received</span><time>19:42</time></div>
      <div className="ticket-progress-row active"><Icon name="skillet" /><span>Prep Line</span><strong>Firing now</strong></div>
      <div className="ticket-progress-row"><Icon name="room_service" /><span>Plated &amp; Pass</span><span>Queue</span></div>
    </div>
  );
}

function InsightsPreview() {
  return (
    <div className="capability-visual insights-preview">
      <div className="insights-summary"><span>Turnover Velocity</span><strong>+18.4%</strong><small>efficiency</small></div>
      <div aria-label="Illustrative service activity by hour" className="insights-bars" role="img">
        {[28, 42, 56, 44, 77, 65].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
      </div>
      <div className="insights-hours"><span>5 PM</span><span>6 PM</span><span>7 PM</span><span>8 PM</span><span>9 PM</span><span>10 PM</span></div>
      <span className="peak-label">Peak</span>
    </div>
  );
}

const capabilities = [
  {
    icon: 'menu_book' as const,
    title: 'Digital Menus',
    description: "Keep restaurant menus organized and easy to explore. Instant updates to 86’d items, dynamic seasonal pricing, and rich dietary indicators.",
    visual: <MenuAvailabilityPreview />,
  },
  {
    icon: 'qr_code_scanner' as const,
    title: 'QR Ordering & Pay',
    description: 'Let guests browse and place orders directly from their phones. Seamless Apple Pay and card checkout without waiting for staff.',
    visual: <QrPreview />,
  },
  {
    icon: 'receipt_long' as const,
    title: 'Order Coordination',
    description: 'Make order progress easier for restaurant teams to follow. Real-time ticket flow organized by prep station and course priority.',
    visual: <TicketPreview />,
  },
  {
    icon: 'insights' as const,
    title: 'Restaurant Insights',
    description: 'Present operational information in a clearer, more useful way. Table turnover velocity, peak hour surges, and top-performing items.',
    visual: <InsightsPreview />,
  },
];

export function CapabilitiesSection() {
  return (
    <section aria-labelledby="capabilities-title" className="capabilities-section" id="features-anchor">
      <div className="section-intro">
        <span className="eyebrow"><Icon name="inventory_2" /> Core Capabilities</span>
        <h2 id="capabilities-title">Everything connected.<br />Service made simpler.</h2>
        <p>Modern tools configured to reduce chaotic rushes into effortless guest satisfaction.</p>
      </div>
      <div className="capabilities-list">
        {capabilities.map((capability, index) => (
          <article className={`capability-item ${index % 2 === 1 ? 'reverse' : ''}`} key={capability.title}>
            <div className="capability-copy">
              <span className="capability-icon"><Icon name={capability.icon} /></span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </div>
            {capability.visual}
          </article>
        ))}
      </div>
    </section>
  );
}
