import React from 'react'
import Image from 'next/image'
import { getPageData } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { ContactForm } from './components/ContactForm'
import type { SanityImage, Project, About, SiteSettings } from '@/sanity/lib/types'

// ── Font helpers (CSS vars set by layout via next/font) ──────────

const SERIF = "var(--font-instrument, 'Instrument Serif', serif)"
const SANS  = "var(--font-geist, 'Geist', sans-serif)"
const MONO  = "var(--font-geist-mono, 'Geist Mono', monospace)"

// ── Fallback data (used when Sanity docs not yet seeded) ─────────

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: 'p1', order: 1, no: '01', kind: 'Full-Stack App', title: 'Project One',
    description: 'A short, punchy description of what you built, the problem it solved, and the impact. Swap in your real project — the layout is ready.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'], liveUrl: '#', codeUrl: '#',
  },
  {
    _id: 'p2', order: 2, no: '02', kind: 'Web Platform', title: 'Project Two',
    description: 'Another standout build. Describe the stack, the tricky parts you solved, and what makes it worth a look.',
    tags: ['Next.js', 'TypeScript', 'Express', 'SQL'], liveUrl: '#', codeUrl: '#',
  },
  {
    _id: 'p3', order: 3, no: '03', kind: 'Side Project', title: 'Project Three',
    description: "Round out your portfolio with a third piece — a side project, an experiment, or client work you're proud of.",
    tags: ['React', 'SASS', 'Node.js'], liveUrl: '#', codeUrl: '#',
  },
]

const FALLBACK_TECHS = ['TypeScript','React','Next.js','Node.js','Express','MongoDB','SQL','Tailwind','SASS']

const FALLBACK_VIDEOS = [
  'https://www.youtube.com/embed/9w1gj-xKPDo',
  'https://www.youtube.com/embed/UMfp6tvcPsI',
  'https://www.youtube.com/embed/sUerGm06kh4',
  'https://www.youtube.com/embed/7r387Jbqej4',
]

const FALLBACK_SETTINGS: SiteSettings = {
  name: 'Matthew Nicholson', tagline: 'FULL-STACK · DEV',
  location: 'BROOKLYN → REMOTE', isOpenToWork: true,
  email: 'thematthewnicholson@gmail.com',
  githubUrl: 'https://github.com/glowupmatt',
  linkedInUrl: 'https://www.linkedin.com/in/matthew-nicholson-bb91aa23a',
  resume: undefined,
  editionLabel: 'PORTFOLIO · v02 · EDITORIAL',
  heroItalicLine: 'building',
  heroHeadline: 'FOR THE\nWEB',
}

const FALLBACK_ABOUT: About = {
  introQuote: 'A background in creative direction led me to fall in love with solving technical problems — now I do both.',
  introAccentPhrase: 'solving technical problems',
  bioParagraph1: 'I discovered my passion for building while helping users navigate complex systems. As a full-stack developer I combine development with technical support — building with TypeScript, React and Node, troubleshooting API integrations, and supporting cross-functional teams.',
  bioParagraph2: "I write clean, readable code, I care about how things feel, and I'd rather over-communicate than leave you guessing.",
  skillAreas: [
    { _key: 'fe', label: 'frontend', sub: 'react · next · tailwind' },
    { _key: 'be', label: 'backend',  sub: 'node · express · sql' },
    { _key: 'la', label: 'language', sub: 'typescript · 3+ yrs' },
  ],
}

// ── Sub-components ────────────────────────────────────────────────

function ImagePlaceholder({
  label, aspectRatio, light = false, style,
}: {
  label: string; aspectRatio: string; light?: boolean; style?: React.CSSProperties
}) {
  const fg = light ? 'rgba(242,235,221,.35)' : 'rgba(14,14,12,.35)'
  const bg = light ? 'rgba(242,235,221,.06)' : 'rgba(14,14,12,.05)'
  return (
    <div style={{ width: '100%', aspectRatio, background: bg, display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '10px', color: fg, fontFamily: MONO, fontSize: '11px',
      letterSpacing: '.1em', textTransform: 'uppercase', ...style }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span>{label}</span>
    </div>
  )
}

function SanityImg({
  image, label, aspectRatio, light = false, borderRadius = '14px', border,
}: {
  image?: SanityImage; label: string; aspectRatio: string
  light?: boolean; borderRadius?: string; border?: string
}) {
  if (image?.asset?.url) {
    const src = urlFor(image)
      .width(800)
      .auto('format')
      .fit('crop')
      .url()
    return (
      <div style={{ width: '100%', aspectRatio, position: 'relative', overflow: 'hidden',
        borderRadius, border: border ?? (light ? '1px solid rgba(242,235,221,.3)' : '1px solid #0E0E0C') }}>
        <Image
          src={src}
          alt={label}
          fill
          style={{ objectFit: 'cover' }}
          placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={image.asset.metadata?.lqip ?? undefined}
        />
      </div>
    )
  }
  return (
    <ImagePlaceholder
      label={label}
      aspectRatio={aspectRatio}
      light={light}
      style={{ borderRadius, border: border ?? (light ? '1px solid rgba(242,235,221,.3)' : '1px solid #0E0E0C') }}
    />
  )
}

function SectionHeader({
  tag, heading, count, light = false,
}: {
  tag: string; heading: React.ReactNode; count: string; light?: boolean
}) {
  const border = light ? '1px solid rgba(242,235,221,.25)' : '1px solid rgba(14,14,12,.18)'
  return (
    <div className="ed-head" style={{ display: 'grid', gridTemplateColumns: '280px 1fr auto',
      alignItems: 'baseline', gap: '32px', padding: '24px clamp(20px,5vw,32px) 0',
      marginBottom: '48px', borderTop: border }}>
      <span className="ed-head-meta" style={{ fontFamily: MONO, fontSize: '13px',
        letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.7 }}>{tag}</span>
      <h2 style={{ margin: 0, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
        fontSize: 'clamp(48px,6vw,84px)', letterSpacing: '-.02em', lineHeight: 0.95 }}>
        {heading}
      </h2>
      <span className="ed-head-meta" style={{ fontFamily: MONO, fontSize: '13px',
        letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.7 }}>{count}</span>
    </div>
  )
}

// ── Intro quote with accent phrase highlighted ────────────────────

function IntroQuote({ about }: { about: About }) {
  const quote  = about.introQuote        ?? ''
  const accent = about.introAccentPhrase ?? ''
  if (!accent || !quote.includes(accent)) {
    return <>{quote}</>
  }
  const [before, after] = quote.split(accent)
  return (
    <>
      {before}
      <em style={{ fontStyle: 'normal', color: 'var(--ac)' }}>{accent}</em>
      {after}
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────

export default async function Portfolio() {
  const { settings: s, about: a, projects, techStack, walkthroughs } = await getPageData()

  const settings     = s            ?? FALLBACK_SETTINGS
  const about        = a            ?? FALLBACK_ABOUT
  const displayProjects  = projects.length    > 0 ? projects    : FALLBACK_PROJECTS
  const displayTechs     = (techStack ?? []).length > 0 ? techStack! : FALLBACK_TECHS
  const displayVideos    = walkthroughs.length > 0
    ? walkthroughs.map((w) => w.youtubeEmbedUrl)
    : FALLBACK_VIDEOS

  return (
    <div style={{ '--ac': '#D8351F', color: '#0E0E0C', fontFamily: SANS,
      fontSize: '16px', lineHeight: 1.5, overflowX: 'clip' } as React.CSSProperties}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'grid',
        gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '16px 32px',
        background: '#F2EBDD', borderBottom: '1px solid rgba(14,14,12,.18)',
        fontFamily: MONO, fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
        <a href="#about" style={{ display: 'inline-flex', alignItems: 'center',
          color: '#0E0E0C', textDecoration: 'none', justifySelf: 'start' }}>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '30px', lineHeight: 1,
            letterSpacing: '-.03em', textTransform: 'none' }}>M</span>
          <span style={{ fontWeight: 800, fontSize: '22px', lineHeight: 1,
            letterSpacing: '-.05em', marginLeft: '-7px', marginTop: '8px' }}>N</span>
          <span style={{ letterSpacing: '.14em', fontWeight: 500, marginLeft: '14px' }}>
            {settings.tagline}
          </span>
        </a>

        <div className="ed-nav-center" style={{ display: 'flex', gap: '32px', justifySelf: 'center' }}>
          <a href="#work"    className="nav-link">Work</a>
          <a href="#stack"   className="nav-link">Stack</a>
          <a href="#about"   className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div className="ed-nav-right" style={{ display: 'flex', gap: '20px',
          justifyContent: 'flex-end', alignItems: 'center', justifySelf: 'end' }}>
          {settings.isOpenToWork && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.75 }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--ac)', display: 'inline-block',
                animation: 'mn-blink 1.4s ease-in-out infinite' }} />
              Open to work
            </span>
          )}
          {settings.resume?.asset?.url && (
            <a href={settings.resume.asset.url} target="_blank" rel="noopener noreferrer"
              className="btn-outline" style={{ display: 'inline-block',
              padding: '9px 14px', letterSpacing: '.12em', textDecoration: 'none',
              fontFamily: MONO, fontSize: '13px' }}>Résumé ↗</a>
          )}
          <a href="/project-breakdowns"
            className="btn-dark" style={{ display: 'inline-block',
            padding: '9px 14px', letterSpacing: '.12em', textDecoration: 'none',
            fontFamily: MONO, fontSize: '13px' }}>Breakdowns →</a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <header id="about" style={{ padding: 0, background: '#F2EBDD', borderBottom: '1px solid #0E0E0C' }}>
        <div style={{ padding: 'clamp(36px,5vw,56px) clamp(20px,5vw,48px)',
          display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px',
            flexWrap: 'wrap', fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em',
            textTransform: 'uppercase', opacity: 0.7 }}>
            <span>{settings.editionLabel ?? 'PORTFOLIO · v02 · EDITORIAL'}</span>
            <span>30 / JUN / 26 · {settings.location}</span>
          </div>

          <h1 style={{ margin: 0, fontFamily: SANS, fontWeight: 800,
            fontSize: 'clamp(72px,15vw,260px)', lineHeight: 0.82,
            letterSpacing: '-.05em', textTransform: 'uppercase' }}>
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              textTransform: 'none', letterSpacing: '-.02em' }}>{settings.heroItalicLine ?? 'building'}</span><br />
            {(settings.heroHeadline ?? 'FOR THE\nWEB').split('\n').map((line, i, arr) =>
              i < arr.length - 1
                ? <span key={i}>{line}<br /></span>
                : <span key={i}>{line}<span style={{ color: 'var(--ac)' }}>.</span></span>
            )}
          </h1>

          <div className="ed-strip" style={{ display: 'grid', gridTemplateColumns: '340px 1fr',
            gap: '40px', alignItems: 'start', borderTop: '1px solid #0E0E0C', paddingTop: '32px' }}>
            {/* Portrait */}
            <div style={{ width: '100%', maxWidth: '340px' }}>
              <SanityImg image={about.portrait} label="Portrait · 4:5" aspectRatio="4/5"
                border="1px solid #0E0E0C" borderRadius="14px" />
            </div>

            {/* Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '4px' }}>
              <div style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em',
                textTransform: 'uppercase', opacity: 0.7 }}>NO.03 / WHO I AM</div>

              <p style={{ margin: 0, fontFamily: SERIF, fontStyle: 'italic',
                fontSize: 'clamp(22px,2vw,32px)', letterSpacing: '-.015em', lineHeight: 1.2 }}>
                <IntroQuote about={about} />
              </p>

              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, maxWidth: '560px' }}>
                {about.bioParagraph1}
              </p>

              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, maxWidth: '560px' }}>
                {about.bioParagraph2}
              </p>

              {/* Skill summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px',
                marginTop: '4px', paddingTop: '20px', borderTop: '1px solid rgba(14,14,12,.18)' }}>
                {about.skillAreas?.map((item) => (
                  <div key={item._key ?? item.label}>
                    <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '26px',
                      letterSpacing: '-.02em', lineHeight: 1, marginBottom: '6px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '.1em',
                      textTransform: 'uppercase', opacity: 0.65 }}>{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <a href="#work" className="btn-dark" style={{ display: 'inline-flex',
                  alignItems: 'center', gap: '10px', padding: '16px 22px', fontFamily: MONO,
                  fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase',
                  textDecoration: 'none' }}>See the work →</a>
                <a href="#contact" className="btn-outline" style={{ display: 'inline-flex',
                  alignItems: 'center', gap: '10px', padding: '16px 22px', fontFamily: MONO,
                  fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase',
                  textDecoration: 'none' }}>Get in touch</a>
                {settings.resume?.asset?.url && (
                  <a href={settings.resume.asset.url} target="_blank" rel="noopener noreferrer"
                    className="btn-outline" style={{ display: 'inline-flex',
                    alignItems: 'center', gap: '10px', padding: '16px 22px', fontFamily: MONO,
                    fontSize: '13px', letterSpacing: '.14em', textTransform: 'uppercase',
                    textDecoration: 'none' }}>View Résumé ↗</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── SELECTED WORK ───────────────────────────────────── */}
      <section id="work" style={{ background: '#1A2B6B', color: '#F2EBDD',
        padding: '64px 0', borderBottom: '1px solid rgba(242,235,221,.3)' }}>
        <SectionHeader
          tag="NO.01 / SELECTED WORK"
          heading={<>Featured <span style={{ fontFamily: SANS, fontStyle: 'normal', fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '-.04em' }}>projects.</span></>}
          count={`${String(displayProjects.length).padStart(2,'0')} PROJECTS`}
          light
        />

        <div style={{ margin: '0 clamp(20px,5vw,32px)', display: 'flex', flexDirection: 'column' }}>
          {displayProjects.map((p) => (
            <article key={p._id} className="ed-feat" style={{ display: 'grid',
              gridTemplateColumns: '1.6fr 1fr', gap: 'clamp(24px,4vw,56px)', alignItems: 'center',
              padding: '48px 0', borderTop: '1px solid rgba(242,235,221,.3)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px',
                  marginBottom: '18px', fontFamily: MONO, fontSize: '13px',
                  letterSpacing: '.12em', textTransform: 'uppercase', opacity: 0.7 }}>
                  <span>{p.no}</span><span>{p.kind}</span>
                </div>
                <h3 style={{ margin: '0 0 18px', fontFamily: SERIF, fontStyle: 'italic',
                  fontWeight: 400, fontSize: 'clamp(34px,4.5vw,68px)',
                  letterSpacing: '-.02em', lineHeight: 0.98 }}>
                  {p.title}<span style={{ color: 'var(--ac)' }}>.</span>
                </h3>
                <p style={{ margin: '0 0 24px', fontSize: '16px', lineHeight: 1.6, maxWidth: '480px' }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                  {p.tags?.map((tag) => (
                    <span key={tag} style={{ fontFamily: MONO, fontSize: '11px',
                      letterSpacing: '.1em', textTransform: 'uppercase',
                      border: '1px solid rgba(242,235,221,.3)', padding: '6px 12px' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '20px', fontFamily: MONO, fontSize: '13px',
                  letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="project-live-link">
                      {p.hasLiveSite ? 'Live site →' : 'More info →'}
                    </a>
                  )}
                  {p.codeUrl && (
                    <a href={p.codeUrl} target="_blank" rel="noopener noreferrer"
                      className="project-code-link">
                      {p.hasBreakdownVideo ? 'Breakdown →' : 'Code'}
                    </a>
                  )}
                </div>
              </div>
              <div className="ed-feat-img">
                <SanityImg image={p.image} label={`Project ${p.no} · 4:3`} aspectRatio="4/3" light />
              </div>
            </article>
          ))}
          <div style={{ borderTop: '1px solid rgba(242,235,221,.3)' }} />
        </div>
      </section>

      {/* ── STACK ───────────────────────────────────────────── */}
      <section id="stack" style={{ background: '#F2EBDD', padding: '64px 0',
        borderBottom: '1px solid rgba(14,14,12,.18)' }}>
        <SectionHeader
          tag="NO.02 / THE STACK"
          heading={<>Tools I <span style={{ fontFamily: SANS, fontStyle: 'normal', fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '-.04em' }}>reach for.</span></>}
          count={`${String(displayTechs.length).padStart(2,'0')} TOOLS`}
        />
        <div className="ed-stack" style={{ margin: '0 clamp(20px,5vw,32px)', display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid #0E0E0C',
          borderLeft: '1px solid #0E0E0C' }}>
          {displayTechs.map((tech) => (
            <div key={tech} className="stack-cell" style={{ borderRight: '1px solid #0E0E0C',
              borderBottom: '1px solid #0E0E0C', padding: '40px 16px', textAlign: 'center',
              fontFamily: SANS, fontWeight: 800, fontSize: '20px', letterSpacing: '-.02em',
              textTransform: 'uppercase', display: 'flex', alignItems: 'center',
              justifyContent: 'center', minHeight: '120px' }}>{tech}</div>
          ))}
        </div>
      </section>

      {/* ── WALKTHROUGHS ────────────────────────────────────── */}
      <section style={{ background: '#F2EBDD', padding: '64px 0',
        borderBottom: '1px solid rgba(14,14,12,.18)' }}>
        <SectionHeader
          tag="NO.03 / WALKTHROUGHS"
          heading={<>On <span style={{ fontFamily: SANS, fontStyle: 'normal', fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '-.04em' }}>video.</span></>}
          count={`${String(displayVideos.length).padStart(2,'0')} CLIPS`}
        />
        <div className="ed-vids" style={{ margin: '0 clamp(20px,5vw,32px)', display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }}>
          {displayVideos.map((src, i) => (
            <div key={i} style={{ border: '1px solid #0E0E0C', overflow: 'hidden', background: '#0E0E0C' }}>
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe src={src} loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <section id="contact" style={{ background: 'var(--ac)', color: '#F2EBDD',
        padding: '64px clamp(20px,5vw,32px)', borderBottom: '1px solid #0E0E0C' }}>
        <div className="ed-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '48px', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px',
              fontFamily: MONO, fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase',
              opacity: 0.85, paddingBottom: '24px', marginBottom: '32px',
              borderBottom: '1px solid rgba(242,235,221,.3)' }}>
              <span>NO.04 / GET IN TOUCH</span>
            </div>
            <h2 style={{ margin: 0, fontFamily: SANS, fontWeight: 800, textTransform: 'uppercase',
              fontSize: 'clamp(56px,9vw,140px)', letterSpacing: '-.05em', lineHeight: 0.85 }}>
              LET&apos;S<br />
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                textTransform: 'none', letterSpacing: '-.02em' }}>build</span>{' '}
              IT<span style={{ color: '#0E0E0C' }}>.</span>
            </h2>
            <p style={{ margin: '28px 0 0', maxWidth: '460px', fontFamily: SERIF,
              fontStyle: 'italic', fontSize: 'clamp(20px,1.7vw,26px)', lineHeight: 1.3 }}>
              Drop me a message with your details, and let&apos;s create something awesome together.
            </p>
            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '10px',
              fontFamily: MONO, fontSize: '12px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              {[
                { href: `mailto:${settings.email}`,   label: settings.email },
                { href: settings.githubUrl,           label: `github / ${settings.githubUrl.replace('https://github.com/','')}`  },
                { href: settings.linkedInUrl,         label: `linkedin / ${settings.linkedInUrl.split('/in/')[1]?.replace('/','') ?? 'matthew-nicholson'}` },
                ...(settings.resume?.asset?.url ? [{ href: settings.resume.asset.url, label: 'View Résumé ↗' }] : []),
              ].map((link) => (
                <a key={link.href} href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ color: '#F2EBDD', textDecoration: 'none', display: 'inline-flex',
                    gap: '10px', alignItems: 'center' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%',
                    background: '#0E0E0C', display: 'inline-block', flexShrink: 0 }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ padding: '96px clamp(20px,5vw,32px) 48px',
        background: '#0E0E0C', color: '#F2EBDD' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '12px', fontFamily: MONO, fontSize: '13px', letterSpacing: '.1em',
          textTransform: 'uppercase', opacity: 0.7, marginBottom: '48px' }}>
          <span>END OF {settings.editionLabel ?? 'PORTFOLIO · v02 · EDITORIAL'}</span>
          <span>30/06/26 · {settings.name.toUpperCase()}</span>
        </div>

        <div style={{ fontFamily: SANS, fontWeight: 800, textTransform: 'uppercase',
          fontSize: 'clamp(64px,14vw,220px)', lineHeight: 0.82, letterSpacing: '-.05em' }}>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            textTransform: 'none', letterSpacing: '-.02em' }}>building</span>{' '}
          ON<span style={{ color: 'var(--ac)' }}>.</span>
        </div>

        <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
          gap: '48px', borderTop: '1px solid rgba(242,235,221,.18)', paddingTop: '32px',
          fontFamily: MONO, fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          <div style={{ lineHeight: 1.7, opacity: 0.85, textTransform: 'none',
            letterSpacing: '.02em', maxWidth: '480px' }}>
            <h4 style={{ margin: '0 0 16px', opacity: 0.5, fontWeight: 500, fontSize: '11px',
              textTransform: 'uppercase', letterSpacing: '.08em' }}>FOOTER</h4>
            <em style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '16px' }}>Portfolio</em>.{' '}
            Started as a creative director. Ended up writing the code too.
          </div>
          <div>
            <h4 style={{ margin: '0 0 16px', opacity: 0.5, fontWeight: 500, fontSize: '11px' }}>LINKS</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                ...(settings.resume?.asset?.url ? [{ href: settings.resume.asset.url, label: 'Résumé ↗', external: true }] : []),
                { href: '#work',    label: 'Work',    external: false },
                { href: '#contact', label: 'Contact', external: false },
              ].map((link) => (
                <li key={link.label} style={{ padding: '6px 0' }}>
                  <a href={link.href} target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 16px', opacity: 0.5, fontWeight: 500, fontSize: '11px' }}>ELSEWHERE</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                { href: settings.githubUrl,   label: 'GitHub' },
                { href: settings.linkedInUrl, label: 'LinkedIn' },
                { href: 'https://thedrafts.dev/', label: 'The Drafts ↗' },
              ].map((link) => (
                <li key={link.label} style={{ padding: '6px 0' }}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer"
                    className="footer-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px', fontFamily: MONO, fontSize: '12px',
          letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.7,
          paddingTop: '24px', borderTop: '1px solid rgba(242,235,221,.18)' }}>
          <span>© 2026 {settings.name.toUpperCase()}</span>
          <span>FULL-STACK · HONEST · BUILDING</span>
        </div>
      </footer>
    </div>
  )
}
