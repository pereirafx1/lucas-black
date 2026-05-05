import { MapPin, Phone, Clock } from 'lucide-react'

const HOURS = [
  { day: 'Segunda — Sábado', time: '10:00 — 13:00  |  14:00 — 20:00' },
  { day: 'Domingo', time: 'Fechado' },
]

const ADDRESS = 'Rua Dr. Antônio Rodrigues Manito 143'
const MAPS_URL = 'https://maps.google.com/?q=Rua+Dr.+Ant%C3%B4nio+Rodrigues+Manito+143+Set%C3%BAbal'

export default function Contact() {
  return (
    <section id="contacto" className="section-pad bg-ink relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-gold/70 text-xs tracking-[0.35em] uppercase">Encontre-nos</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-3 mb-4 text-cream">
            Contacto
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 reveal">
          {/* Info cards — 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {/* Address */}
            <div className="card-surface p-6 flex gap-4">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-cream/40 text-xs tracking-[0.15em] uppercase mb-1">Morada</p>
                <p className="text-cream font-medium">{ADDRESS}</p>
                <p className="text-cream/60 text-sm">Setúbal</p>
              </div>
            </div>

            {/* Phone */}
            <div className="card-surface p-6 flex gap-4">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-cream/40 text-xs tracking-[0.15em] uppercase mb-1">Telefone</p>
                <a
                  href="tel:+351913887639"
                  className="text-cream font-medium hover:text-gold transition-colors"
                >
                  +351 913 887 639
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="card-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-gold" />
                </div>
                <p className="text-cream/40 text-xs tracking-[0.15em] uppercase">Horário</p>
              </div>
              <div className="space-y-2.5">
                {HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between text-sm border-b border-gold/5 pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="text-cream/60 font-light">{h.day}</span>
                    <span
                      className={`font-medium text-right ${
                        h.time === 'Fechado' ? 'text-muted' : 'text-cream'
                      }`}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map — 3 cols */}
          <div className="lg:col-span-3">
            <div className="relative w-full min-h-[420px] h-full border border-gold/15 overflow-hidden">
              {/* Google Maps iframe — satellite 45° tilt + dark CSS filter */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d800!2d-8.8905!3d38.5215!2m3!1f45!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua%20Dr.%20Ant%C3%B4nio%20Rodrigues%20Manito%20143%2C%20Set%C3%BAbal%2C%20Portugal!5e1!3m2!1spt!2spt!4v1714000000000"
                title="Localização Lucas Black Barbearia"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  border: 0,
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  filter: 'grayscale(1) invert(0.9) hue-rotate(180deg)',
                }}
              />

              {/* Overlay card */}
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-ink/90 backdrop-blur-sm border border-gold/20 p-4 pointer-events-none">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cream font-semibold text-sm">Lucas Black Barbearia</p>
                    <p className="text-cream/50 text-xs mt-0.5">{ADDRESS} · Setúbal</p>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold/70 text-xs hover:text-gold transition-colors mt-1.5 inline-block tracking-wider pointer-events-auto"
                    >
                      Abrir no Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
