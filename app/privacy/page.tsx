import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Matthew Nicholson',
  description: 'Privacy policy for matthewnicholson.dev',
}

const SERIF = "var(--font-instrument, 'Instrument Serif', serif)"
const SANS  = "var(--font-geist, 'Geist', sans-serif)"
const MONO  = "var(--font-geist-mono, 'Geist Mono', monospace)"

export default function PrivacyPage() {
  return (
    <div style={{ background: '#F2EBDD', minHeight: '100vh', color: '#0E0E0C', fontFamily: SANS }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'grid',
        gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '16px 32px',
        background: '#F2EBDD', borderBottom: '1px solid rgba(14,14,12,.18)',
        fontFamily: MONO, fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center',
          color: '#0E0E0C', textDecoration: 'none', justifySelf: 'start' }}>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '30px', lineHeight: 1,
            letterSpacing: '-.03em', textTransform: 'none' }}>M</span>
          <span style={{ fontWeight: 800, fontSize: '22px', lineHeight: 1,
            letterSpacing: '-.05em', marginLeft: '-7px', marginTop: '8px' }}>N</span>
        </Link>
        <span style={{ fontFamily: MONO, fontSize: '13px', letterSpacing: '.1em',
          textTransform: 'uppercase', opacity: 0.5, justifySelf: 'center' }}>
          PRIVACY POLICY
        </span>
        <div style={{ justifySelf: 'end' }}>
          <Link href="/" style={{ fontFamily: MONO, fontSize: '13px',
            letterSpacing: '.12em', textTransform: 'uppercase', color: '#0E0E0C',
            textDecoration: 'none', padding: '9px 14px', border: '1px solid rgba(14,14,12,.3)' }}>
            ← Home
          </Link>
        </div>
      </nav>

      {/* ── HEADER ── */}
      <header style={{ padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,48px)',
        borderBottom: '1px solid rgba(14,14,12,.18)' }}>
        <div style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em',
          textTransform: 'uppercase', opacity: 0.5, marginBottom: '24px' }}>
          Legal
        </div>
        <h1 style={{ margin: '0 0 24px', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(48px,8vw,100px)', lineHeight: 0.9, letterSpacing: '-.02em' }}>
          Privacy Policy<span style={{ color: '#D8351F' }}>.</span>
        </h1>
        <p style={{ margin: 0, fontFamily: MONO, fontSize: '12px', letterSpacing: '.1em',
          textTransform: 'uppercase', opacity: 0.5 }}>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </header>

      {/* ── BODY ── */}
      <article style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,48px)',
        maxWidth: '780px' }}>

        <Section title="Overview">
          <p>This privacy policy describes how Matthew Nicholson (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses, and handles information when you visit this website (<strong>matthewnicholson.dev</strong>) or interact with any services connected to it, including third-party integrations such as the Pinterest API.</p>
        </Section>

        <Section title="Information I collect">
          <p>I collect only the minimum information necessary to operate this site:</p>
          <ul>
            <li><strong>Contact form submissions</strong> — name, email address, and message content you voluntarily submit through the contact form.</li>
            <li><strong>Usage data</strong> — standard server logs may capture IP addresses, browser type, pages visited, and timestamps. This data is not linked to individuals and is used solely for debugging and performance monitoring.</li>
            <li><strong>Pinterest API data</strong> — if you authorise a Pinterest integration, I may access basic profile information and content you explicitly grant permission for, as described in the Pinterest authorisation flow.</li>
          </ul>
        </Section>

        <Section title="How I use your information">
          <ul>
            <li>To respond to messages you send through the contact form.</li>
            <li>To operate and improve this website and its integrations.</li>
            <li>To fulfil the specific purpose of any third-party API connection you authorise (e.g. displaying Pinterest content).</li>
          </ul>
          <p>I do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </Section>

        <Section title="Third-party services">
          <p>This site uses the following third-party services, each governed by their own privacy policies:</p>
          <ul>
            <li><strong>Sanity</strong> — content management (sanity.io/legal/privacy)</li>
            <li><strong>Vercel</strong> — hosting and deployment (vercel.com/legal/privacy-policy)</li>
            <li><strong>Pinterest API</strong> — social content integration (policy.pinterest.com/en/privacy-policy)</li>
          </ul>
        </Section>

        <Section title="Data retention">
          <p>Contact form submissions are retained only as long as necessary to respond to your inquiry. Pinterest API tokens are not stored beyond the active session unless a persistent integration is explicitly built and disclosed.</p>
        </Section>

        <Section title="Your rights">
          <p>You may request to view, correct, or delete any personal information I hold about you at any time by contacting me directly.</p>
        </Section>

        <Section title="Cookies">
          <p>This site does not use tracking or advertising cookies. Session-level cookies may be set by the hosting infrastructure for performance purposes only.</p>
        </Section>

        <Section title="Changes to this policy">
          <p>I may update this policy from time to time. The &quot;last updated&quot; date at the top of this page reflects the most recent revision.</p>
        </Section>

        <Section title="Contact">
          <p>If you have any questions about this privacy policy, please reach out:</p>
          <p>
            <a href="mailto:thematthewnicholson@gmail.com"
              style={{ color: '#D8351F', textDecoration: 'none', fontFamily: MONO,
                fontSize: '13px', letterSpacing: '.08em' }}>
              thematthewnicholson@gmail.com
            </a>
          </p>
        </Section>
      </article>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(14,14,12,.18)',
        padding: '32px clamp(20px,5vw,48px)', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        fontFamily: MONO, fontSize: '12px', letterSpacing: '.1em',
        textTransform: 'uppercase', opacity: 0.6 }}>
        <span>© {new Date().getFullYear()} MATTHEW NICHOLSON</span>
        <Link href="/" style={{ color: '#0E0E0C', textDecoration: 'none' }}>
          ← HOME
        </Link>
      </footer>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '52px', paddingTop: '40px',
      borderTop: '1px solid rgba(14,14,12,.12)' }}>
      <h2 style={{ margin: '0 0 20px', fontFamily: SANS, fontWeight: 800, fontSize: '13px',
        letterSpacing: '.1em', textTransform: 'uppercase' }}>
        {title}
      </h2>
      <div style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(14,14,12,.85)' }}>
        {children}
      </div>
    </section>
  )
}
