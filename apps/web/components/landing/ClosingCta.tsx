import { Icon } from './Icon';

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="closing-cta" id="contact">
      <span className="closing-kicker"><Icon name="bolt" /> Immediate Onboarding</span>
      <h2 id="closing-title">Make every order flow better.</h2>
      <p>Give your restaurant a more connected way to manage digital ordering and everyday service.</p>
      <div className="closing-actions">
        <a className="button button-light" href="/signup">Get Started <Icon name="arrow_forward" /></a>
        <a className="walkthrough-link" href="mailto:hello@dineflow.example"><Icon name="calendar_today" /> Schedule a walkthrough</a>
      </div>
      <div className="setup-note"><Icon name="bolt" /> Setup takes under an hour <span>•</span> No proprietary hardware required</div>
    </section>
  );
}
