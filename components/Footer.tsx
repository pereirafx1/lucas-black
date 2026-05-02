import { Scissors } from 'lucide-react'

const FOOTER_LINKS = {
  Serviços: [
    'Corte Clássico',
    'Corte Degradê',
    'Barba Tradicional',
    'Corte + Barba',
    'Tratamentos',
  ],
  Informações: ['Sobre Nós', 'Galeria', 'Testemunhos', 'Contacto'],
}

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'WhatsApp', href: 'https://wa.me/351265123456' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-surface border-t border-gold/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Scissors size={18} className="text-gold rotate-45" />
              <span className="font-playfair text-xl font-bold tracking-[0.2em] uppercase">
                <span className="text-cream">Lucas</span>
                <span className="text-gold ml-1.5">Black</span>
              </span>
            </div>
            <p className="text-cream/45 text-sm leading-relaxed max-w-xs font-light">
              Barbearia de luxo em Setúbal. Onde cada detalhe é tratado com a precisão e
              cuidado que merece.
            </p>
            <div className="flex gap-4 mt-6">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase text-cream/40 hover:text-gold transition-colors border-b border-transparent hover:border-gold/50 pb-0.5"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-cream/90 text-xs tracking-[0.25em] uppercase font-semibold mb-5">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-cream/40 text-sm hover:text-gold/70 transition-colors cursor-pointer font-light">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div className="gold-line" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 md:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-cream/25 text-xs tracking-wider">
          © {new Date().getFullYear()} Lucas Black Barbearia · Setúbal · Todos os direitos reservados
        </p>
        <div className="flex items-center gap-2">
          <div className="w-4 h-px bg-gold/30" />
          <span className="text-gold/30 text-xs tracking-[0.15em]">Est. 2016</span>
          <div className="w-4 h-px bg-gold/30" />
        </div>
      </div>
    </footer>
  )
}
