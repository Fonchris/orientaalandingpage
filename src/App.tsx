import { ArrowRight, BarChart3, Check, ChevronRight, CircleCheck, Mail, MapPin, Search, Sparkles, Target, UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import GlobeFeatureSection from '@/components/ui/globe-feature-section'
import { Header } from '@/components/ui/header-3'
import lightLogo from '@/assets/orientaaLogoLight.png'
import darkLogo from '@/assets/orinetaaLogoDark.png'
import './App.css'

const recommendations = [
  { name: 'University of Yaoundé I', initials: 'UY', location: 'Yaoundé, Cameroon', fit: 96, tag: 'Great fit', color: 'orange' },
  { name: 'Covenant University', initials: 'CU', location: 'Ota, Nigeria', fit: 91, tag: 'Strong fit', color: 'blue' },
  { name: 'University of Cape Town', initials: 'CT', location: 'Cape Town, South Africa', fit: 88, tag: 'Good fit', color: 'green' },
]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
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
      <section id="about" className="cta-section"><div><p className="section-kicker">Your future, better oriented</p><h2>Start with a little<br /><em>curiosity.</em></h2></div><Button variant="teal" size="lg">Join the waitlist <ArrowRight size={18} /></Button></section>
    </main>
    <footer><div className="footer-brand"><img src={theme === 'dark' ? darkLogo : lightLogo} alt="Orientaa" /><span>Helping you choose what comes next.</span></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (newsletterEmail.trim()) setSubscribed(true) }}><label htmlFor="newsletter-email">Stay oriented</label>{subscribed ? <p className="newsletter-success"><CircleCheck size={15} /> You’re on the list.</p> : <div className="newsletter-input"><Mail size={15} /><input id="newsletter-email" type="email" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} placeholder="Your email address" required /><button type="submit">Subscribe</button></div>}</form><span className="copyright">© 2025 Orientaa</span></footer>
  </div>
}

export default App
