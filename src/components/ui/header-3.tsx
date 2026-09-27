import React from 'react'
import { ArrowUpRight, BookOpen, Compass, FileText, GraduationCap, Moon, Sparkles, Sun, Users } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { cn } from '@/lib/utils'
import lightLogo from '@/assets/orientaaLogoLight.png'
import darkLogo from '@/assets/orinetaaLogoDark.png'

const productLinks = [
  { title: 'Smart matching', description: 'Find universities that fit your future.', icon: Sparkles },
  { title: 'Explore programs', description: 'Compare courses, costs, and outcomes.', icon: BookOpen },
  { title: 'Build your shortlist', description: 'Keep every promising option together.', icon: Compass },
  { title: 'Connecting students with counsellors', description: 'Talk to people who can guide your next step.', icon: Users },
]
const companyLinks = [{ title: 'About Orientaa', icon: Users }, { title: 'Guides & resources', icon: FileText }, { title: 'For universities', icon: GraduationCap }]

export function Header({ theme, onThemeToggle }: { theme: 'light' | 'dark'; onThemeToggle: () => void }) {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)
  React.useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])

  return <header className={cn('site-header', scrolled && 'site-header-scrolled')}>
    <nav className="nav-shell">
      <a href="#top" className="brand" aria-label="Orientaa home"><img src={theme === 'dark' ? darkLogo : lightLogo} alt="Orientaa" /></a>
      <div className="desktop-nav">
        <div className="nav-dropdown"><button type="button" className="nav-link">Discover <span>⌄</span></button><div className="dropdown-panel">{productLinks.map(({ title, description, icon: Icon }) => <a href="#how-it-works" className="dropdown-item" key={title}><span className="icon-box"><Icon size={17} /></span><span><strong>{title}</strong><small>{description}</small></span></a>)}</div></div>
        <div className="nav-dropdown"><button type="button" className="nav-link">Our institution <span>⌄</span></button><div className="dropdown-panel compact">{companyLinks.map(({ title, icon: Icon }) => <a href="#about" className="dropdown-item" key={title}><span className="icon-box"><Icon size={17} /></span><strong>{title}</strong></a>)}</div></div>
        <a href="#how-it-works" className="nav-link">How it works</a>
      </div>
      <div className="nav-actions"><button type="button" className="theme-toggle" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={onThemeToggle}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button><Button variant="teal" className="start-button">Join waitlist <ArrowUpRight size={16} /></Button></div>
      <Button size="icon" variant="outline" className="mobile-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><MenuToggleIcon open={open} className="size-5" /></Button>
    </nav>
    {open && typeof window !== 'undefined' && createPortal(<div className="mobile-menu"><div className="mobile-menu-inner"><a href="#how-it-works" onClick={() => setOpen(false)}>Discover</a><a href="#how-it-works" onClick={() => setOpen(false)}>How it works</a><a href="#about" onClick={() => setOpen(false)}>Our institution</a><div className="mobile-actions"><Button variant="teal">Join waitlist <ArrowUpRight size={16} /></Button></div></div></div>, document.body)}
  </header>
}

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => { const onScroll = () => setScrolled(window.scrollY > threshold); onScroll(); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [threshold])
  return scrolled
}