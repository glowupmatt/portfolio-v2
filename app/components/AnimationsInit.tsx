'use client'
import { useEffect } from 'react'

export function AnimationsInit() {
  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return

      ctx = gsap.context(() => {
        // ── Hero entrance sequence ───────────────────────────
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from('.hero-meta', { opacity: 0, y: -14, duration: 0.6 })
          .from('.hero-headline', { opacity: 0, y: 90, duration: 1.05 }, '-=0.25')
          .from('.hero-portrait', { opacity: 0, y: 50, duration: 0.85 }, '-=0.55')
          .from('.hero-bio',      { opacity: 0, y: 50, duration: 0.85 }, '-=0.72')

        // ── Section headers ──────────────────────────────────
        gsap.utils.toArray<Element>('.ed-head').forEach((el) => {
          gsap.from(el, {
            opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 87%' },
          })
        })

        // ── Project articles ─────────────────────────────────
        gsap.utils.toArray<Element>('.ed-feat').forEach((el) => {
          gsap.from(el, {
            opacity: 0, y: 65, duration: 0.85, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          })
        })

        // ── Stack grid cells ─────────────────────────────────
        gsap.from('.stack-cell', {
          opacity: 0, scale: 0.88, duration: 0.45, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: '.ed-stack', start: 'top 80%' },
        })

        // ── Video embeds ─────────────────────────────────────
        gsap.utils.toArray<Element>('.ed-vids > div').forEach((el) => {
          gsap.from(el, {
            opacity: 0, y: 36, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 87%' },
          })
        })

        // ── Footer big text ──────────────────────────────────
        gsap.from('.footer-big-text', {
          opacity: 0, y: 70, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.footer-big-text', start: 'top 92%' },
        })
      })
    })()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return null
}
