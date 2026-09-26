import { Menu, X } from 'lucide-react'

export function MenuToggleIcon({ open, className }: { open: boolean; className?: string }) {
  return open ? <X className={className} aria-hidden="true" /> : <Menu className={className} aria-hidden="true" />
}