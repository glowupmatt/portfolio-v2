import Link from 'next/link'
import { getWalkthroughs, getBreakdowns } from '../../sanity/lib/queries'
import type { Walkthrough } from '../../sanity/lib/types'

const SERIF = "var(--font-instrument, 'Instrument Serif', serif)"
const SANS  = "var(--font-geist, 'Geist', sans-serif)"
const MONO  = "var(--font-geist-mono, 'Geist Mono', monospace)"

const FALLBACK_VIDEOS: Walkthrough[] = [
  { _id: '1', order: 1, title: 'Project Walkthrough', youtubeEmbedUrl: 'https://www.youtube.com/embed/9w1gj-xKPDo' },
  { _id: '2', order: 2, title: 'Project Walkthrough', youtubeEmbedUrl: 'https://www.youtube.com/embed/UMfp6tvcPsI' },
  { _id: '3', order: 3, title: 'Project Walkthrough', youtubeEmbedUrl: 'https://www.youtube.com/embed/sUerGm06kh4' },
  { _id: '4', order: 4, title: 'Project Walkthrough', youtubeEmbedUrl: 'https://www.youtube.com/embed/7r387Jbqej4' },
]

export const revalidate = 60

export default async function ProjectBreakdownsPage() {
  const [rawBreakdowns, rawVideos] = await Promise.all([getBreakdowns(), getWalkthroughs()])
  const breakdowns = rawBreakdowns
  const walkthroughs = rawVideos.length > 0 ? rawVideos : FALLBACK_VIDEOS
  const videoCount = String(walkthroughs.length).padStart(2, '0')

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
          <span style={{ letterSpacing: '.14em', fontWeight: 500, marginLeft: '14px' }}>
            FULL-STACK · DEV
          </span>
        </Link>
        <span style={{ fontFamily: MONO, fontSize: '13px', letterSpacing: '.1em',
          textTransform: 'uppercase', opacity: 0.5, justifySelf: 'center' }}>
          PROJECT BREAKDOWNS
        </span>
        <div style={{ justifySelf: 'end' }}>
          <Link href="/" style={{ fontFamily: MONO, fontSize: '13px', letterSpacing: '.12em',
            textTransform: 'uppercase', color: '#0E0E0C', textDecoration: 'none',
            padding: '9px 14px', border: '1px solid rgba(14,14,12,.3)' }}>
            ← Portfolio
          </Link>
        </div>
      </nav>

      {/* ── HERO STRIP ── */}
      <div style={{ padding: 'clamp(36px,5vw,56px) clamp(20px,5vw,48px) 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px',
          flexWrap: 'wrap', fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em',
          textTransform: 'uppercase', opacity: 0.7, marginBottom: '48px',
          paddingBottom: '24px', borderBottom: '1px solid rgba(14,14,12,.18)' }}>
          <span>NO.01 / PROJECT BREAKDOWNS</span>
          <span>{String(breakdowns.length).padStart(2,'0')} POSTS · {videoCount} CLIPS</span>
        </div>
        <h1 style={{ margin: '0 0 80px', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(56px,10vw,140px)', lineHeight: 0.9, letterSpacing: '-.02em' }}>
          Behind the{' '}
          <span style={{ fontFamily: SANS, fontStyle: 'normal', fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '-.04em' }}>build.</span>
        </h1>
      </div>

      {/* ── BREAKDOWN POSTS ── */}
      {breakdowns.length > 0 && (
        <section style={{ margin: '0 clamp(20px,5vw,48px) 80px' }}>
          <div style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em',
            textTransform: 'uppercase', opacity: 0.5, marginBottom: '32px',
            paddingBottom: '16px', borderBottom: '1px solid rgba(14,14,12,.18)' }}>
            Written breakdowns
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2px',
            maxWidth: '1400px', margin: '0 auto' }}>
            {breakdowns.map((b, i) => (
              <Link key={b._id} href={`/project-breakdowns/${b.slug.current}`}
                style={{ textDecoration: 'none', color: '#0E0E0C',
                  border: '1px solid rgba(14,14,12,.15)', padding: '32px',
                  display: 'flex', flexDirection: 'column', gap: '16px',
                  transition: 'background .15s' }}
                className="breakdown-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.14em',
                    textTransform: 'uppercase', opacity: 0.5 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {b.role && (
                    <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.1em',
                      textTransform: 'uppercase', opacity: 0.5 }}>{b.role}</span>
                  )}
                </div>
                <h2 style={{ margin: 0, fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                  fontSize: 'clamp(28px,3vw,40px)', letterSpacing: '-.02em', lineHeight: 1.1 }}>
                  {b.title}
                </h2>
                {b.challenge && (
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, opacity: 0.75 }}>
                    {b.challenge}
                  </p>
                )}
                {b.tools && b.tools.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                    {b.tools.map((t) => (
                      <span key={t} style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '.1em',
                        textTransform: 'uppercase', border: '1px solid rgba(14,14,12,.2)',
                        padding: '4px 10px' }}>{t}</span>
                    ))}
                  </div>
                )}
                <span style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '.12em',
                  textTransform: 'uppercase', color: '#D8351F', marginTop: '4px' }}>
                  Read breakdown →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── VIDEO CLIPS ── */}
      <section style={{ margin: '0 clamp(20px,5vw,48px) 80px' }}>
        <div style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em',
          textTransform: 'uppercase', opacity: 0.5, marginBottom: '32px',
          paddingBottom: '16px', borderBottom: '1px solid rgba(14,14,12,.18)' }}>
          Video walkthroughs · {videoCount} clips
        </div>
        <div className="ed-vids" style={{ display: 'grid',
          gridTemplateColumns: 'repeat(2,1fr)', gap: '24px' }}>
          {walkthroughs.map((w) => (
            <div key={w._id} style={{ border: '1px solid #0E0E0C', overflow: 'hidden',
              background: '#0E0E0C' }}>
              {w.title && (
                <div style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.1em',
                  textTransform: 'uppercase', color: '#F2EBDD', padding: '10px 14px', opacity: 0.7 }}>
                  {w.title}
                </div>
              )}
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe src={w.youtubeEmbedUrl} loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(14,14,12,.18)', padding: '32px clamp(20px,5vw,48px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: MONO, fontSize: '12px', letterSpacing: '.1em', textTransform: 'uppercase',
        opacity: 0.6 }}>
        <span>© 2026 MATTHEW NICHOLSON</span>
        <Link href="/" style={{ color: '#0E0E0C', textDecoration: 'none' }}>
          ← BACK TO PORTFOLIO
        </Link>
      </footer>
    </div>
  )
}
