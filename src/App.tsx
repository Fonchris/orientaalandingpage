import { ArrowRight, BarChart3, Check, ChevronRight, CircleCheck, Mail, MapPin, Phone, Search, Sparkles, Target, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import GlobeFeatureSection from '@/components/ui/globe-feature-section'
import { Header } from '@/components/ui/header-3'
import { CinematicFooter } from '@/components/ui/motion-footer'
import TeamShowcase from '@/components/ui/team-showcase'
import './App.css'

const recommendations = [
  { name: 'University of Yaoundé I', initials: 'UY', location: 'Yaoundé, Cameroon', fit: 96, tag: 'Great fit', color: 'orange' },
  { name: 'Covenant University', initials: 'CU', location: 'Ota, Nigeria', fit: 91, tag: 'Strong fit', color: 'blue' },
  { name: 'University of Cape Town', initials: 'CT', location: 'Cape Town, South Africa', fit: 88, tag: 'Good fit', color: 'green' },
]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  return <div id="top" className="app-shell">
    <Header theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> Your next chapter starts here</div>
          <h1>Find the university<br /><em>that fits you.</em></h1>
          <p className="hero-description">Orientaa turns your ambitions, interests, and goals into a clear path toward the right university.</p>
          <div className="hero-actions"><Button variant="teal" size="lg">Join the waitlist <ArrowRight size={18} /></Button><a href="#how-it-works" className="text-link"><span className="play-icon">▶</span> See how it works</a></div>
          <div className="trust-row"><div className="avatar-stack"><span>AM</span><span>SK</span><span>JL</span><span>+</span></div><span>Join 12,000+ students finding their way</span></div>
        </div>
        <div className="hero-visual" aria-label="Orientaa university recommendation preview">
          <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          <div className="dashboard-card">
            <div className="dashboard-top"><div><p className="tiny-label">YOUR ORIENTAA MATCH</p><h2>Universities made for you</h2></div><span className="sparkle-badge"><Sparkles size={16} /></span></div>
            <div className="search-strip"><Search size={16} /><span>Search your dream degree</span><kbd>⌘ K</kbd></div>
            <div className="match-label"><span>Top matches</span><span className="match-count">24 universities</span></div>
            <div className="recommendation-list">{recommendations.map((item) => <div className="recommendation" key={item.name}><div className={`uni-mark ${item.color}`}>{item.initials}</div><div className="uni-details"><strong>{item.name}</strong><span><MapPin size={12} /> {item.location}</span></div><div className="fit-score"><strong>{item.fit}%</strong><small>{item.tag}</small></div><ChevronRight size={16} className="recommendation-arrow" /></div>)}</div>
            <div className="dashboard-footer"><span><CircleCheck size={14} /> Personalised for you</span><a href="#how-it-works">View all <ArrowRight size={13} /></a></div>
          </div>
          <div className="floating-note note-top"><span className="note-icon mint"><Target size={16} /></span><span><strong>Built around you</strong><small>Your goals come first</small></span></div>
          <div className="floating-note note-bottom"><span className="note-icon peach"><BarChart3 size={16} /></span><span><strong>96% match</strong><small>for your next step</small></span></div>
        </div>
      </section>
      <GlobeFeatureSection />
      <section className="proof-strip"><p>Made for every kind of ambition</p><div className="proof-items"><span><UsersRound size={17} /> 12k+ students</span><span><CircleCheck size={17} /> 500+ universities</span><span><Sparkles size={17} /> Smarter decisions</span></div></section>
      <section id="how-it-works" className="section-block"><div className="section-heading"><div><p className="section-kicker">A clearer way forward</p><h2>Less scrolling.<br /><em>More certainty.</em></h2></div><p>Choosing where to study is a big decision. Orientaa makes it feel a little more like finding your direction.</p></div><div className="steps-grid"><article><span className="step-number">01</span><span className="step-icon"><Search size={20} /></span><h3>Tell us what matters</h3><p>Share your interests, goals, and the kind of life you want to build.</p></article><article><span className="step-number">02</span><span className="step-icon teal-icon"><Sparkles size={20} /></span><h3>Get your matches</h3><p>Our system connects the dots across thousands of programs and universities.</p></article><article><span className="step-number">03</span><span className="step-icon orange-icon"><Check size={20} /></span><h3>Move with confidence</h3><p>Compare your shortlist and take the next step with a plan that feels like yours.</p></article></div></section>
      <TeamShowcase />
      <section className="contact-section" aria-labelledby="contact-title"><div><p className="section-kicker">Partnerships & donations</p><h2 id="contact-title">Help us make opportunity<br /><em>easier to find.</em></h2><p>Interested in partnering with Orientaa or supporting the next generation of students? Reach out directly.</p></div><div className="contact-links"><a href="mailto:pemmenyif@gmail.com"><Mail size={17} /><span><small>Email us</small><strong>pemmenyif@gmail.com</strong></span><ArrowRight size={15} /></a><a href="tel:+237677684842"><Phone size={17} /><span><small>Call us</small><strong>+237 677 684 842</strong></span><ArrowRight size={15} /></a><a href="https://wa.link/xxvnj5" target="_blank" rel="noreferrer"><span className="whatsapp-mark">W</span><span><small>Message on WhatsApp</small><strong>Start a conversation</strong></span><ArrowRight size={15} /></a></div></section>
      <section id="about" className="cta-section"><div><p className="section-kicker">Your future, better oriented</p><h2>Start with a little<br /><em>curiosity.</em></h2></div><Button variant="teal" size="lg">Join the waitlist <ArrowRight size={18} /></Button></section>
    </main>
    <CinematicFooter />
  </div>
}

export default App
