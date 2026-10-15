import * as React from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  speed?: number
  repeat?: boolean
}

export function Marquee({ children, pauseOnHover = false, direction = 'left', speed = 30, repeat = true, className, ...props }: MarqueeProps) {
  return <div className={cn('marquee w-full overflow-hidden', className)} {...props}>
    <div className="marquee-viewport">
      <div className={cn('marquee-track', !repeat && 'marquee-single', pauseOnHover && 'marquee-paused-on-hover', direction === 'right' && 'marquee-reverse')} style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}>
        {children}
        {repeat && children}
      </div>
    </div>
  </div>
}