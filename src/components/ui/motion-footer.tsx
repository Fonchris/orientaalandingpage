import * as React from 'react'
import { useEffect, useRef } from 'react'
import { Apple, ArrowUp, Heart, Smartphone } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const STYLES = `
.cinematic-footer-wrapper {
  --footer-bg: var(--paper);
  --footer-fg: var(--ink);
  --footer-muted: var(--muted);
  --footer-line: var(--line);
  --footer-accent: var(--teal);
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  border: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: inherit;
  -webkit-font-smoothing: antialiased;
}
.cinematic-footer-wrapper span:last-child { margin-left: 0; font-family: inherit; font-size: inherit; }
.cinematic-footer-wrapper::selection { background: color-mix(in srgb, var(--footer-accent) 25%, transparent); }
@keyframes footer-breathe { from { transform: translate(-50%, -50%) scale(1); opacity: .45; } to { transform: translate(-50%, -50%) scale(1.1); opacity: .8; } }
@keyframes footer-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.footer-marquee { animation: footer-marquee 36s linear infinite; }
.footer-grid { background-size: 54px 54px; background-image: linear-gradient(to right, color-mix(in srgb, var(--footer-fg) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--footer-fg) 5%, transparent) 1px, transparent 1px); mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent); }
.footer-aurora { background: radial-gradient(circle, color-mix(in srgb, var(--footer-accent) 22%, transparent), transparent 68%); }
.footer-pill { background: color-mix(in srgb, var(--footer-fg) 4%, transparent); border: 1px solid color-mix(in srgb, var(--footer-fg) 12%, transparent); box-shadow: inset 0 1px color-mix(in srgb, var(--footer-fg) 12%, transparent), 0 12px 30px color-mix(in srgb, var(--footer-bg) 25%, transparent); backdrop-filter: blur(16px); transition: .35s ease; }
.footer-pill:hover { color: var(--footer-fg); background: color-mix(in srgb, var(--footer-fg) 9%, transparent); border-color: color-mix(in srgb, var(--footer-fg) 28%, transparent); transform: translateY(-2px); }
.footer-giant-text { font-size: 25vw; line-height: .75; font-weight: 900; letter-spacing: -.07em; color: transparent; -webkit-text-stroke: 1px color-mix(in srgb, var(--footer-fg) 8%, transparent); background: linear-gradient(180deg, color-mix(in srgb, var(--footer-fg) 12%, transparent), transparent 62%); -webkit-background-clip: text; background-clip: text; }
.footer-glow { background: linear-gradient(180deg, var(--footer-fg), color-mix(in srgb, var(--footer-fg) 45%, transparent)); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 0 20px color-mix(in srgb, var(--footer-fg) 15%, transparent)); }
`

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'a' | 'button'
  href?: string
  type?: 'button' | 'submit' | 'reset'
}

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(({ as: Component = 'button', className, children, ...props }, forwardedRef) => {
  const localRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = localRef.current
    if (!element) return
    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      gsap.to(element, { x: x * .18, y: y * .18, rotationX: -y * .08, rotationY: x * .08, scale: 1.03, duration: .35, ease: 'power2.out' })
    }
    const handleMouseLeave = () => gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, duration: .8, ease: 'elastic.out(1, .35)' })
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    return () => { element.removeEventListener('mousemove', handleMouseMove); element.removeEventListener('mouseleave', handleMouseLeave); gsap.killTweensOf(element) }
  }, [])

  return <Component ref={(node: HTMLElement | null) => { localRef.current = node; if (typeof forwardedRef === 'function') forwardedRef(node); else if (forwardedRef) forwardedRef.current = node }} className={cn('cursor-pointer', className)} {...props}>{children}</Component>
})
MagneticButton.displayName = 'MagneticButton'

function MarqueeItem() {
  return <div className="flex items-center gap-10 px-5"><span>Personalised guidance</span><span className="text-[var(--teal)]">✦</span><span>Confident decisions</span><span className="text-[#f2a477]">✦</span><span>Opportunity, oriented</span><span className="text-[var(--teal)]">✦</span></div>
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const context = gsap.context(() => {
      gsap.fromTo(giantTextRef.current, { y: '10vh', scale: .82, opacity: 0 }, { y: 0, scale: 1, opacity: 1, scrollTrigger: { trigger: wrapper, start: 'top 85%', end: 'bottom bottom', scrub: 1 } })
      gsap.fromTo(contentRef.current, { y: 45, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: wrapper, start: 'top 45%', end: 'bottom bottom', scrub: 1 } })
    }, wrapper)
    return () => context.revert()
  }, [])

  return <>
    <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    <div ref={wrapperRef} className="relative h-screen w-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
      <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 z-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[var(--footer-bg)] text-[var(--footer-fg)]">
        <div className="footer-aurora footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[62vh] w-[82vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" />
        <div className="footer-grid pointer-events-none absolute inset-0 z-0" />
        <div ref={giantTextRef} className="footer-giant-text pointer-events-none absolute bottom-[-4vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap">ORIENTAA</div>
        <div className="absolute left-0 top-12 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-[var(--footer-line)] bg-[color-mix(in_srgb,var(--footer-bg)_72%,transparent)] py-4 backdrop-blur-md">
          <div className="footer-marquee flex w-max text-xs font-bold uppercase tracking-[.28em] text-[var(--footer-muted)] md:text-sm"><MarqueeItem /><MarqueeItem /></div>
        </div>
        <div ref={contentRef} className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pt-16">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[.24em] text-[var(--teal)]">Your next chapter starts here</p>
          <h2 className="footer-glow mb-10 text-center text-5xl font-semibold tracking-[-.07em] md:text-8xl">Ready to begin?</h2>
          <div className="flex w-full flex-wrap justify-center gap-4">
            <MagneticButton as="a" href="#about" className="footer-pill flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold md:px-10 md:py-5 md:text-base"><Apple className="size-5 text-[var(--footer-muted)]" />Download iOS</MagneticButton>
            <MagneticButton as="a" href="#about" className="footer-pill flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold md:px-10 md:py-5 md:text-base"><Smartphone className="size-5 text-[var(--footer-muted)]" />Download Android</MagneticButton>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3"><MagneticButton as="a" href="#contact-title" className="footer-pill rounded-full px-5 py-3 text-xs text-[var(--footer-muted)]">Partnerships</MagneticButton><MagneticButton as="a" href="#contact-title" className="footer-pill rounded-full px-5 py-3 text-xs text-[var(--footer-muted)]">Support</MagneticButton><MagneticButton as="a" href="#top" className="footer-pill rounded-full px-5 py-3 text-xs text-[var(--footer-muted)]">Back to explore</MagneticButton></div>
        </div>
        <div className="relative z-10 flex w-full flex-col items-center justify-between gap-5 px-6 pb-8 text-center text-[10px] font-semibold uppercase tracking-[.2em] text-[var(--footer-muted)] md:flex-row md:px-12 md:text-left">
          <span>© 2025 Orientaa. All rights reserved.</span>
          <span className="footer-pill flex items-center gap-2 rounded-full px-5 py-3"><span>Made with</span><Heart className="size-3 fill-current text-[#e88e61]" /><span>for your next step</span></span>
          <MagneticButton as="button" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-pill flex size-11 items-center justify-center rounded-full"><ArrowUp className="size-4" /></MagneticButton>
        </div>
      </footer>
    </div>
  </>
}
