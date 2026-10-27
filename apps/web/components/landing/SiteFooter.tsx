import { Icon } from './Icon';

const footerLinks = [
  { label: 'Product Overview', href: '#product-overview' },
  { label: 'POS & Floor', href: '#features-anchor' },
  { label: 'Kitchen Rail', href: '#features-anchor' },
  { label: 'About Us', href: '#contact' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy', href: '#contact' },
  { label: 'Terms', href: '#contact' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a aria-label="DineFlow home" className="brand-lockup" href="#product-overview">
          <span className="brand-mark"><Icon name="room_service" /></span>
          <span className="brand-name">Dine<span>Flow</span></span>
        </a>
        <p>The modern restaurant operations and digital ordering platform built for hospitality teams.</p>
      </div>
      <nav aria-label="Footer navigation" className="footer-links">
        {footerLinks.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
      </nav>
      <p className="copyright">© 2025 DineFlow Technologies Inc. All rights reserved.</p>
    </footer>
  );
}
