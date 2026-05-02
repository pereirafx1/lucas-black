'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Scissors } from 'lucide-react'

interface NavbarProps {
  onBooking: () => void
}

const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#testemunhos', label: 'Testemunhos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar({ onBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/95 backdrop-blur-md border-b border-gold/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <Scissors
            size={18}
            className="text-gold rotate-45 group-hover:rotate-12 transition-transform duration-500"
          />
          <span className="font-playfair text-lg font-bold tracking-[0.2em] uppercase">
            <span className="text-cream">Lucas</span>
            <span className="text-gold ml-1.5">Black</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-xs tracking-[0.18em] uppercase text-cream/60 hover:text-gold transition-colors duration-300 font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <button onClick={onBooking} className="btn-outline text-xs">
            Marcar Sessão
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-cream/80 hover:text-gold transition-colors p-1"
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-ink-surface border-t border-gold/10 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-xs tracking-[0.18em] uppercase text-cream/60 hover:text-gold transition-colors text-left font-medium"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => { setMenuOpen(false); onBooking() }}
              className="btn-outline text-xs w-full"
            >
              Marcar Sessão
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
