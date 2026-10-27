import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';

const navigation = [
  { label: 'Product', href: '#product-overview' },
  { label: 'Features', href: '#features-anchor' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <a aria-label="DineFlow home" className="brand-lockup" href="#product-overview">
            <span className="brand-mark"><Icon name="room_service" /></span>
            <span className="brand-name">Dine<span>Flow</span></span>
          </a>

          <nav aria-label="Main navigation" className="desktop-navigation">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <a className="header-sign-in" href="/login">
              <span>Sign In</span>
              <Icon name="person" />
            </a>
            <a className="button button-primary header-cta" href="/signup">Get Started</a>
          </div>
        </div>
      </header>

      <div aria-label="Service network status and quick links" className="service-ribbon">
        <div className="service-status">
          <span aria-hidden="true" className="service-pulse" />
          <span>Service Network <span className="status-divider">•</span> Optimal</span>
        </div>
        <div className="service-actions">
          <ThemeToggle compact />
          <a className="preview-link" href="#demo-preview">Live Preview <Icon name="arrow_downward" /></a>
        </div>
      </div>

      <nav aria-label="Quick page navigation" className="mobile-navigation">
        <a href="#product-overview"><Icon name="inventory_2" /><span>Product</span></a>
        <a href="#features-anchor"><Icon name="dashboard_customize" /><span>Features</span></a>
        <a href="#how-it-works"><Icon name="sync_alt" /><span>Workflow</span></a>
        <a href="#contact"><Icon name="mail" /><span>Contact</span></a>
        <a href="/login"><Icon name="person" /><span>Sign in</span></a>
      </nav>
    </>
  );
}
