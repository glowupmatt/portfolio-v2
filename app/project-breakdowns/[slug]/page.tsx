import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getBreakdown, getBreakdowns } from '../../../sanity/lib/queries'
import type { SanityBodyImage } from '../../../sanity/lib/types'

const SERIF = "var(--font-instrument, 'Instrument Serif', serif)"
const SANS  = "var(--font-geist, 'Geist', sans-serif)"
const MONO  = "var(--font-geist-mono, 'Geist Mono', monospace)"

export const revalidate = 60

export async function generateStaticParams() {
  const breakdowns = await getBreakdowns()
  return breakdowns.map((b) => ({ slug: b.slug.current }))
}

const ptComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
        fontSize: 'clamp(28px,3vw,40px)', letterSpacing: '-.02em', lineHeight: 1.15,
        margin: '56px 0 20px', borderTop: '1px solid rgba(14,14,12,.15)', paddingTop: '40px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: '15px', letterSpacing: '.04em',
        textTransform: 'uppercase', margin: '32px 0 10px' }}>
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ margin: '0 0 20px', fontSize: '16px', lineHeight: 1.75, maxWidth: '680px' }}>
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ margin: '0 0 20px', paddingLeft: '20px', maxWidth: '680px' }}>{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ margin: '0 0 20px', paddingLeft: '20px', maxWidth: '680px' }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '6px' }}>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '6px' }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em style={{ fontFamily: SERIF, fontStyle: 'italic' }}>{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code style={{ fontFamily: MONO, fontSize: '13px', background: 'rgba(14,14,12,.07)',
        padding: '2px 6px' }}>{children}</code>
    ),
  },
  types: {
    image: ({ value }: { value: SanityBodyImage }) => {
      if (!value?.asset?.url) return null
      const w = value.asset.metadata?.dimensions?.width  ?? 1200
      const h = value.asset.metadata?.dimensions?.height ?? 675
      return (
        <figure style={{ margin: '48px 0' }}>
          <Image
            src={value.asset.url}
            alt={value.alt ?? ''}
            width={w}
            height={h}
            style={{ width: '100%', height: 'auto', display: 'block',
              border: '1px solid rgba(14,14,12,.12)' }}
            placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={value.asset.metadata?.lqip ?? undefined}
          />
          {value.caption && (
            <figcaption style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.1em',
              textTransform: 'uppercase', opacity: 0.5, marginTop: '12px' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default async function BreakdownPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const breakdown = await getBreakdown(slug)
  if (!breakdown) notFound()

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
          PROJECT BREAKDOWN
        </span>
        <div style={{ justifySelf: 'end' }}>
          <Link href="/project-breakdowns" style={{ fontFamily: MONO, fontSize: '13px',
            letterSpacing: '.12em', textTransform: 'uppercase', color: '#0E0E0C',
            textDecoration: 'none', padding: '9px 14px', border: '1px solid rgba(14,14,12,.3)' }}>
            ← All breakdowns
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header style={{ padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,48px)',
        borderBottom: '1px solid rgba(14,14,12,.18)' }}>
        <div style={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em',
          textTransform: 'uppercase', opacity: 0.5, marginBottom: '24px' }}>
          Project Breakdown
        </div>
        <h1 style={{ margin: '0 0 40px', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(48px,8vw,120px)', lineHeight: 0.9, letterSpacing: '-.02em' }}>
          {breakdown.title}
        </h1>
        {breakdown.challenge && (
          <p style={{ margin: '0 0 40px', fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.6,
            maxWidth: '640px', opacity: 0.8 }}>
            {breakdown.challenge}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px',
          fontFamily: MONO, fontSize: '12px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
          {breakdown.role && (
            <div>
              <div style={{ opacity: 0.4, marginBottom: '6px' }}>Role</div>
              <div>{breakdown.role}</div>
            </div>
          )}
          {breakdown.tools && breakdown.tools.length > 0 && (
            <div>
              <div style={{ opacity: 0.4, marginBottom: '6px' }}>Tools</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {breakdown.tools.map((t) => (
                  <span key={t} style={{ border: '1px solid rgba(14,14,12,.25)',
                    padding: '4px 10px', fontSize: '11px' }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── BODY ── */}
      <article style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,48px)' }}>
        {breakdown.body && <PortableText value={breakdown.body} components={ptComponents} />}
      </article>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(14,14,12,.18)',
        padding: '32px clamp(20px,5vw,48px)', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px', overflow: 'hidden',
        fontFamily: MONO, fontSize: '12px', letterSpacing: '.1em',
        textTransform: 'uppercase', opacity: 0.6 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center',
          color: '#0E0E0C', textDecoration: 'none' }}>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '30px', lineHeight: 1,
            letterSpacing: '-.03em', textTransform: 'none' }}>M</span>
          <span style={{ fontWeight: 800, fontSize: '22px', lineHeight: 1,
            letterSpacing: '-.05em', marginLeft: '-7px', marginTop: '8px' }}>N</span>
        </Link>
        <Link href="/project-breakdowns" style={{ color: '#0E0E0C', textDecoration: 'none' }}>
          ← ALL BREAKDOWNS
        </Link>
      </footer>
    </div>
  )
}
