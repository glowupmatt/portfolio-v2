'use client'
import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    let lenis: import('lenis').default | undefined
    let rafId: number | undefined
    let cancelled = false

    ;(async () => {
      const Lenis = (await import('lenis')).default
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => lenis!.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    })()

    return () => {
      cancelled = true
      if (rafId !== undefined) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return null
}
