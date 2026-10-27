import { Icon } from './Icon';
import { DemoPreview } from './DemoPreview';

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="hero-section" id="product-overview">
      <div className="hero-copy">
        <span className="hero-eyebrow"><i />Designed for modern restaurant teams</span>
        <h1 id="hero-title">A smoother way to run your restaurant.</h1>
        <p>Bring digital menus, QR ordering, and order management together in one connected experience — built to help restaurants serve better and operate smarter.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="/signup">Get Started <Icon name="arrow_forward" /></a>
          <a className="button button-secondary" href="#features-anchor"><Icon name="explore" /> Explore the Platform</a>
        </div>
      </div>
      <DemoPreview />
    </section>
  );
}
