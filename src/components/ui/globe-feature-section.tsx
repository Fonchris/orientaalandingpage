import { ArrowRight } from 'lucide-react'
import createGlobe, { type COBEOptions } from 'cobe'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0.35,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.92, 0.98, 0.96],
  markerColor: [0.094, 0.604, 0.549],
  glowColor: [0.85, 0.96, 0.91],
  markers: [
    { location: [3.848, 11.502], size: 0.08 },
    { location: [6.524, 3.379], size: 0.1 },
    { location: [-33.9258, 18.4232], size: 0.1 },
    { location: [5.6037, -0.187], size: 0.06 },
    { location: [-1.286, 36.817], size: 0.07 },
    { location: [30.0444, 31.2357], size: 0.06 },
    { location: [14.7167, -17.4677], size: 0.05 },
    { location: [-26.2041, 28.0473], size: 0.08 },
  ],
}

export default function GlobeFeatureSection() {
  return (
    <section className="about-globe-section" aria-labelledby="about-globe-title">
      <div className="about-globe-copy">
        <p className="section-kicker">About Orientaa</p>
        <h2 id="about-globe-title">Your next step can start <em>anywhere.</em></h2>
        <p>Orientaa helps students see beyond the search bar. Discover universities across Africa and around the world, then find the ones that make sense for your ambitions, your story, and your future.</p>
        <Button variant="teal" size="lg">Explore your possibilities <ArrowRight size={18} /></Button>
      </div>
      <div className="about-globe-canvas" aria-label="Interactive globe showing Orientaa university destinations">
        <Globe />
      </div>
    </section>
  )
}

export function Globe({ className, config = GLOBE_CONFIG }: { className?: string; config?: COBEOptions }) {
  const phi = useRef(0)
  const width = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const rotation = useRef(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) canvasRef.current.style.cursor = value === null ? 'grab' : 'grabbing'
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      rotation.current = delta / 200
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onResize = () => { width.current = canvas.offsetWidth }
    onResize()
    window.addEventListener('resize', onResize)
    const globe = createGlobe(canvas, { ...config, width: width.current * 2, height: width.current * 2 })
    let animationFrame = 0
    const render = () => {
      if (pointerInteracting.current === null) phi.current += 0.005
      globe.update({ phi: phi.current + rotation.current, width: width.current * 2, height: width.current * 2 })
      animationFrame = requestAnimationFrame(render)
    }
    render()
    canvas.style.opacity = '1'

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrame)
      globe.destroy()
    }
  }, [config])

  return (
    <div className={cn('globe-canvas-wrap', className)}>
      <canvas
        ref={canvasRef}
        className="globe-canvas"
        onPointerDown={(event) => updatePointerInteraction(event.clientX - pointerInteractionMovement.current)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerLeave={() => updatePointerInteraction(null)}
        onMouseMove={(event) => updateMovement(event.clientX)}
        onTouchMove={(event) => { if (event.touches[0]) updateMovement(event.touches[0].clientX) }}
      />
    </div>
  )
}
