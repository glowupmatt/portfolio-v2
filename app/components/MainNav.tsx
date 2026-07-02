'use client'

import { useState, useEffect } from 'react'

const SERIF = "var(--font-instrument, 'Instrument Serif', serif)"
const MONO  = "var(--font-geist-mono, 'Geist Mono', monospace)"

interface MainNavProps {
  tagline:     string
  isOpenToWork: boolean
  resumeUrl?:  string
}

export function MainNav({ tagline, isOpenToWork, resumeUrl }: MainNavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'grid',
        gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '16px 32px',
        background: '#F2EBDD', borderBottom: '1px solid rgba(14,14,12,.18)',
        fontFamily: MONO, fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>

        {/* Logo */}
        <a href="#about" style={{ display: 'inline-flex', alignItems: 'center',
          color: '#0E0E0C', textDecoration: 'none', justifySelf: 'start' }}>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '30px', lineHeight: 1,
            letterSpacing: '-.03em', textTransform: 'none' }}>M</span>
          <span style={{ fontWeight: 800, fontSize: '22px', lineHeight: 1,
            letterSpacing: '-.05em', marginLeft: '-7px', marginTop: '8px' }}>N</span>
          <span style={{ letterSpacing: '.14em', fontWeight: 500, marginLeft: '14px' }}>
            {tagline}
          </span>
        </a>

        {/* Center links — desktop only */}
        <div className="ed-nav-center" style={{ display: 'flex', gap: '32px', justifySelf: 'center' }}>
          <a href="#work"    className="nav-link">Work</a>
          <a href="#stack"   className="nav-link">Stack</a>
          <a href="#about"   className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Right buttons — desktop only */}
        <div className="ed-nav-right" style={{ display: 'flex', gap: '20px',
          justifyContent: 'flex-end', alignItems: 'center', justifySelf: 'end' }}>
          {isOpenToWork && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.75 }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--ac)', display: 'inline-block',
                animation: 'mn-blink 1.4s ease-in-out infinite' }} />
              Open to work
            </span>
          )}
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
              className="btn-outline" style={{ display: 'inline-block',
              padding: '9px 14px', letterSpacing: '.12em', textDecoration: 'none',
              fontFamily: MONO, fontSize: '13px' }}>Résumé ↗</a>
          )}
          <a href="/project-breakdowns" className="btn-dark" style={{ display: 'inline-block',
            padding: '9px 14px', letterSpacing: '.12em', textDecoration: 'none',
            fontFamily: MONO, fontSize: '13px' }}>Breakdowns →</a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            justifySelf: 'end', gridColumn: '3', color: '#0E0E0C', display: 'none' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            {open ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div style={{ position: 'fixed', top: '63px', left: 0, right: 0, bottom: 0,
          background: '#0E0E0C', color: '#F2EBDD', zIndex: 49,
          display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

          {/* Page links */}
          {[
            { href: '#work',    label: 'Work' },
            { href: '#stack',   label: 'Stack' },
            { href: '#about',   label: 'About' },
            { href: '#contact', label: 'Contact' },
          ].map((link) => (
            <a key={link.href} href={link.href} onClick={close}
              style={{ color: '#F2EBDD', textDecoration: 'none',
                padding: '22px 32px', borderBottom: '1px solid rgba(242,235,221,.1)',
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(32px,9vw,52px)', letterSpacing: '-.02em', lineHeight: 1 }}>
              {link.label}
            </a>
          ))}

          {/* Utility links */}
          <a href="/project-breakdowns" onClick={close}
            style={{ color: 'var(--ac)', textDecoration: 'none',
              padding: '20px 32px', borderBottom: '1px solid rgba(242,235,221,.1)',
              fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
            Breakdowns →
          </a>

          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={close}
              style={{ color: '#F2EBDD', textDecoration: 'none',
                padding: '20px 32px', borderBottom: '1px solid rgba(242,235,221,.1)',
                fontFamily: MONO, fontSize: '12px', letterSpacing: '.14em',
                textTransform: 'uppercase', opacity: 0.6 }}>
              View Résumé ↗
            </a>
          )}

          {isOpenToWork && (
            <div style={{ padding: '20px 32px', display: 'inline-flex', alignItems: 'center',
              gap: '10px', fontFamily: MONO, fontSize: '11px', letterSpacing: '.14em',
              textTransform: 'uppercase', opacity: 0.4 }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--ac)', display: 'inline-block',
                animation: 'mn-blink 1.4s ease-in-out infinite' }} />
              Open to work
            </div>
          )}
        </div>
      )}
    </>
  )
}
