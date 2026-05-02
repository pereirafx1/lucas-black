import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const HOURS = [
  { day: 'Segunda — Sexta', time: '09:00 — 19:30' },
  { day: 'Sábado', time: '09:00 — 18:00' },
  { day: 'Domingo', time: 'Fechado' },
]

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
                <p className="text-cream font-medium">Rua dos Barbeiros, 15</p>
                <p className="text-cream/60 text-sm">2900-001 Setúbal</p>
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
                  href="tel:+351265123456"
                  className="text-cream font-medium hover:text-gold transition-colors"
                >
                  +351 265 123 456
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="card-surface p-6 flex gap-4">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-cream/40 text-xs tracking-[0.15em] uppercase mb-1">Email</p>
                <a
                  href="mailto:info@lucasblack.pt"
                  className="text-cream font-medium hover:text-gold transition-colors"
                >
                  info@lucasblack.pt
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
                      className={`font-medium ${
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

          {/* Map placeholder — 3 cols */}
          <div className="lg:col-span-3">
            <div className="relative w-full h-full min-h-[400px] bg-ink-raised border border-gold/10 overflow-hidden group">
              {/* Stylized map representation */}
              <div className="absolute inset-0">
                {/* Grid lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 h-px bg-gold/5"
                    style={{ top: `${(i + 1) * 12.5}%` }}
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 w-px bg-gold/5"
                    style={{ left: `${(i + 1) * 12.5}%` }}
                  />
                ))}

                {/* Simulated streets */}
                <div className="absolute top-[40%] left-0 right-0 h-0.5 bg-ink-high/80" />
                <div className="absolute top-[60%] left-0 right-0 h-0.5 bg-ink-high/80" />
                <div className="absolute left-[35%] top-0 bottom-0 w-0.5 bg-ink-high/80" />
                <div className="absolute left-[65%] top-0 bottom-0 w-0.5 bg-ink-high/80" />

                {/* Simulated blocks */}
                <div className="absolute top-[15%] left-[10%] w-[20%] h-[20%] bg-ink-surface/60 border border-gold/5" />
                <div className="absolute top-[15%] left-[40%] w-[18%] h-[20%] bg-ink-surface/60 border border-gold/5" />
                <div className="absolute top-[65%] left-[10%] w-[20%] h-[28%] bg-ink-surface/60 border border-gold/5" />
                <div className="absolute top-[65%] left-[40%] w-[18%] h-[28%] bg-ink-surface/60 border border-gold/5" />
                <div className="absolute top-[15%] left-[70%] w-[22%] h-[65%] bg-ink-surface/60 border border-gold/5" />

                {/* Location pin */}
                <div className="absolute top-[40%] left-[35%] -translate-x-1/2 -translate-y-full">
                  <div className="animate-pulse-gold flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-gold border-2 border-gold-light shadow-lg shadow-gold/30" />
                    <div className="w-0.5 h-4 bg-gold" />
                  </div>
                </div>
              </div>

              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-ink/90 backdrop-blur-sm border border-gold/20 p-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-cream font-semibold text-sm">Lucas Black Barbearia</p>
                    <p className="text-cream/50 text-xs mt-0.5">Rua dos Barbeiros, 15 · Setúbal</p>
                    <a
                      href="https://maps.google.com/?q=Setubal,Portugal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold/70 text-xs hover:text-gold transition-colors mt-1 inline-block tracking-wider"
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
