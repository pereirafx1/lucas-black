'use client'

import { Clock } from 'lucide-react'

const SERVICES = [
  {
    id: 'corte-classico',
    name: 'Corte Clássico',
    price: 15,
    duration: '30 min',
    description: 'O corte tradicional executado com mestria. Personalizado ao seu estilo e estrutura facial.',
    icon: '✦',
  },
  {
    id: 'corte-degrade',
    name: 'Corte Degradê',
    price: 20,
    duration: '45 min',
    description: 'Fade moderno e preciso com transições impecáveis. Define o homem contemporâneo.',
    icon: '◈',
  },
  {
    id: 'barba',
    name: 'Barba Tradicional',
    price: 15,
    duration: '30 min',
    description: 'Modelação e contorno de barba com toalha quente. Um ritual de cuidado masculino.',
    icon: '⟁',
  },
  {
    id: 'corte-barba',
    name: 'Corte + Barba',
    price: 28,
    duration: '60 min',
    description: 'A experiência completa. Corte e barba combinados para um resultado de luxo.',
    icon: '⬡',
    featured: true,
  },
  {
    id: 'hidratacao',
    name: 'Hidratação Premium',
    price: 25,
    duration: '45 min',
    description: 'Tratamento intensivo com produtos de alta gama. Cabelo nutrido e revitalizado.',
    icon: '◇',
  },
  {
    id: 'crianca',
    name: 'Criança (até 12 anos)',
    price: 12,
    duration: '30 min',
    description: 'Corte especial num ambiente acolhedor. Os mais novos merecem o melhor.',
    icon: '◌',
  },
]

const openBooking = () => window.dispatchEvent(new CustomEvent('openBooking'))

export default function Services() {
  return (
    <section id="servicos" className="section-pad bg-ink">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-gold/70 text-xs tracking-[0.35em] uppercase">O que oferecemos</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-3 mb-4 text-cream">
            Serviços
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 reveal-stagger">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`relative group card-surface p-7 cursor-pointer ${
                service.featured
                  ? 'border-gold/40 bg-gradient-to-br from-gold/[0.07] to-transparent'
                  : ''
              }`}
              onClick={openBooking}
            >
              {service.featured && (
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              )}

              <div className="flex items-start justify-between mb-5">
                <span className="text-2xl text-gold/60 group-hover:text-gold transition-colors duration-300 select-none">
                  {service.icon}
                </span>
                {service.featured && (
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gold border border-gold/40 px-2 py-0.5">
                    Popular
                  </span>
                )}
              </div>

              <h3 className="font-playfair text-xl font-semibold text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-5 font-light">
                {service.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                <span className="font-playfair text-2xl font-bold text-gold">
                  €{service.price}
                </span>
                <div className="flex items-center gap-1.5 text-muted text-xs tracking-wider">
                  <Clock size={12} />
                  {service.duration}
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal">
          <button onClick={openBooking} className="btn-gold">
            Reservar Agora
          </button>
        </div>
      </div>
    </section>
  )
}
