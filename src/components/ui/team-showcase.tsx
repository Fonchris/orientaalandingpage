import { useState } from 'react'
import { FaBehance, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { UserRound } from 'lucide-react'
import founderImage from '@/assets/founderImage.jpeg'
import { cn } from '@/lib/utils'

export interface TeamMember {
  id: string
  name: string
  role: string
  image?: string
  social?: { twitter?: string; linkedin?: string; instagram?: string; behance?: string }
}

const DEFAULT_MEMBERS: TeamMember[] = [
  { id: 'founder', name: 'Founder', role: 'CEO & FOUNDER', image: founderImage, social: { linkedin: '#', twitter: '#' } },
  { id: 'product', name: 'Product Lead', role: 'PRODUCT STRATEGY', social: { linkedin: '#' } },
  { id: 'design', name: 'Creative Lead', role: 'CREATIVE DIRECTION', social: { instagram: '#' } },
  { id: 'engineering', name: 'Engineering Lead', role: 'LEAD ENGINEERING', social: { linkedin: '#', twitter: '#' } },
  { id: 'growth', name: 'Partnerships Lead', role: 'UNIVERSITY PARTNERSHIPS', social: { linkedin: '#' } },
  { id: 'community', name: 'Community Lead', role: 'COMMUNITY & BRAND', social: { instagram: '#' } },
]

interface TeamShowcaseProps {
  members?: TeamMember[]
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const columns = [members.filter((_, index) => index % 3 === 0), members.filter((_, index) => index % 3 === 1), members.filter((_, index) => index % 3 === 2)]
  const columnOffsets = ['md:mt-0', 'md:mt-[68px]', 'md:mt-[32px]']
  const cardSizes = ['w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]', 'w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]', 'w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]']

  return (
    <section id="team" className="team-section" aria-labelledby="team-title">
      <div className="team-heading">
        <div>
          <p className="section-kicker">The people behind Orientaa</p>
          <h2 id="team-title">A small team with<br /><em>a wide horizon.</em></h2>
        </div>
        <p>We are building a clearer way forward for students, one thoughtful decision at a time.</p>
      </div>
      <div className="team-showcase">
        <div className="team-photo-grid" aria-label="Orientaa team portraits">
          {columns.map((column, columnIndex) => (
            <div className={cn('team-photo-column', columnOffsets[columnIndex])} key={columnIndex}>
              {column.map((member) => <PhotoCard key={member.id} member={member} className={cardSizes[columnIndex]} activeId={hoveredId} onHover={setHoveredId} />)}
            </div>
          ))}
        </div>
        <div className="team-member-list">
          {members.map((member) => <MemberRow key={member.id} member={member} activeId={hoveredId} onHover={setHoveredId} />)}
        </div>
      </div>
    </section>
  )
}

function PhotoCard({ member, className, activeId, onHover }: { member: TeamMember; className: string; activeId: string | null; onHover: (id: string | null) => void }) {
  const isActive = activeId === member.id
  return <div className={cn('team-photo-card', className, activeId && !isActive ? 'team-dimmed' : '')} onMouseEnter={() => onHover(member.id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(member.id)} onBlur={() => onHover(null)} tabIndex={0}>
    {member.image ? <img src={member.image} alt={`${member.name}, ${member.role}`} className={cn('team-photo', isActive ? 'team-photo-active' : '')} /> : <div className={cn('team-placeholder', `team-placeholder-${member.id}`, isActive ? 'team-photo-active' : '')}><UserRound className="team-placeholder-icon" strokeWidth={1.4} /><span>{member.role.split(' ')[0]}</span></div>}
  </div>
}

function MemberRow({ member, activeId, onHover }: { member: TeamMember; activeId: string | null; onHover: (id: string | null) => void }) {
  const isActive = activeId === member.id
  const hasSocial = Boolean(member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance)
  return <div className={cn('team-member-row', activeId && !isActive ? 'team-dimmed' : '')} onMouseEnter={() => onHover(member.id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(member.id)} onBlur={() => onHover(null)} tabIndex={0}>
    <div className="team-member-name">
      <span className={cn('team-marker', isActive ? 'team-marker-active' : '')} />
      <span>{member.name}</span>
      {hasSocial && <div className={cn('team-socials', isActive ? 'team-socials-active' : '')}>
        {member.social?.twitter && <a href={member.social.twitter} aria-label={`${member.name} on X`} onClick={(event) => event.stopPropagation()}><FaTwitter /></a>}
        {member.social?.linkedin && <a href={member.social.linkedin} aria-label={`${member.name} on LinkedIn`} onClick={(event) => event.stopPropagation()}><FaLinkedinIn /></a>}
        {member.social?.instagram && <a href={member.social.instagram} aria-label={`${member.name} on Instagram`} onClick={(event) => event.stopPropagation()}><FaInstagram /></a>}
        {member.social?.behance && <a href={member.social.behance} aria-label={`${member.name} on Behance`} onClick={(event) => event.stopPropagation()}><FaBehance /></a>}
      </div>}
    </div>
    <p>{member.role}</p>
  </div>
}
