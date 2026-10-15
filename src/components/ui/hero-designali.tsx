import { ArrowRight, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const TOPICS = ['university matching', 'career direction', 'your next chapter']

function useTypewriter(strings: string[]) {
  const [text, setText] = useState(strings[0])
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[index]
    const delay = deleting ? 32 : 72
    const timer = window.setTimeout(() => {
      if (!deleting && text === current) { setDeleting(true); return }
      if (deleting && text === '') { setDeleting(false); setIndex((value) => (value + 1) % strings.length); return }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, text === current && !deleting ? 1200 : delay)
    return () => window.clearTimeout(timer)
  }, [deleting, index, strings, text])

  return text
}

interface TrailNode { x: number; y: number; vx: number; vy: number }

class LightTrail {
  private readonly spring: number
  private readonly friction: number
  private readonly nodes: TrailNode[]

  constructor(start: { x: number; y: number }, index: number, size: number) {
    this.spring = 0.45 + (index / 80) * 0.025 + (Math.random() - 0.5) * 0.1
    this.friction = 0.5 + (Math.random() - 0.5) * 0.01
    this.nodes = Array.from({ length: size }, () => ({ x: start.x, y: start.y, vx: 0, vy: 0 }))
  }

  update(target: { x: number; y: number }, dampening: number, tension: number) {
    let spring = this.spring
    const head = this.nodes[0]
    head.vx += (target.x - head.x) * spring
    head.vy += (target.y - head.y) * spring
    for (let index = 0; index < this.nodes.length; index += 1) {
      const node = this.nodes[index]
      if (index > 0) {
        const previous = this.nodes[index - 1]
        node.vx += (previous.x - node.x) * spring + previous.vx * dampening
        node.vy += (previous.y - node.y) * spring + previous.vy * dampening
      }
      node.vx *= this.friction
      node.vy *= this.friction
      node.x += node.vx
      node.y += node.vy
      spring *= tension
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.moveTo(this.nodes[0].x, this.nodes[0].y)
    for (let index = 1; index < this.nodes.length - 2; index += 1) {
      const node = this.nodes[index]
      const next = this.nodes[index + 1]
      context.quadraticCurveTo(node.x, node.y, (node.x + next.x) / 2, (node.y + next.y) / 2)
    }
    const secondLast = this.nodes[this.nodes.length - 2]
    const last = this.nodes[this.nodes.length - 1]
    context.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y)
    context.stroke()
  }
}

function MotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let trails: LightTrail[] = []
    let frame = 0
    let animationFrame = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = bounds.width * ratio
      canvas.height = bounds.height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      target.x = bounds.width / 2
      target.y = bounds.height / 2
      trails = Array.from({ length: 80 }, (_, index) => new LightTrail(target, index, 50))
    }
    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      target.x = event.clientX - bounds.left
      target.y = event.clientY - bounds.top
    }
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect()
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'
      const hue = 210 + Math.sin(frame * 0.008) * 12
      context.strokeStyle = `hsla(${Math.round(hue)}, 100%, 62%, .04)`
      context.lineWidth = 10
      context.shadowBlur = 18
      context.shadowColor = `hsla(${Math.round(hue)}, 100%, 62%, .2)`
      trails.forEach((trail) => { trail.update(target, 0.025, 0.99); trail.draw(context) })
      context.shadowBlur = 0
      context.globalCompositeOperation = 'source-over'
      frame += 1
      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    return () => { window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onPointerMove); cancelAnimationFrame(animationFrame) }
  }, [])

  return <canvas ref={canvasRef} className="hero-motion-canvas" aria-hidden="true" />
}

export function HeroDesignali({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  const topic = useTypewriter(TOPICS)

  return <section className="hero-designali" aria-labelledby="hero-title">
    <div className="hero-designali-grid" aria-hidden="true" />
    <MotionCanvas />
    <div className="hero-designali-content">
      <div className="hero-designali-badge">Orientaa <span>•</span> Your next chapter starts here</div>
      <div className="hero-designali-frame">
        <Plus className="hero-frame-mark hero-frame-mark-top-left" aria-hidden="true" />
        <Plus className="hero-frame-mark hero-frame-mark-top-right" aria-hidden="true" />
        <Plus className="hero-frame-mark hero-frame-mark-bottom-left" aria-hidden="true" />
        <Plus className="hero-frame-mark hero-frame-mark-bottom-right" aria-hidden="true" />
        <h1 id="hero-title">Find the university<br /><span>that fits you.</span></h1>
      </div>
      <div className="hero-designali-status"><span className="hero-status-dot" /> Available now</div>
      <p className="hero-designali-description">A clearer path to <strong>{topic}</strong><span className="hero-cursor">|</span>. Match your ambitions with the places and people that help you grow.</p>
      <div className="hero-designali-actions"><Button variant="teal" size="lg" onClick={onWaitlistClick}>Join the waitlist <ArrowRight size={18} /></Button><a href="#how-it-works" className="hero-designali-link">See how it works <ArrowRight size={15} /></a></div>
    </div>
  </section>
}