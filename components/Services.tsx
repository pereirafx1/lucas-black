'use client'

const SERVICES = [
  { id: 'corte-classico',  name: 'Corte Clássico',        price: '15,00' },
  { id: 'corte-degrade',   name: 'Corte Degradê',          price: '20,00' },
  { id: 'corte-barba',     name: 'Corte + Barba',          price: '28,00', popular: true },
  { id: 'barba',           name: 'Barba Tradicional',      price: '15,00' },
  { id: 'hidratacao',      name: 'Hidratação Premium',     price: '25,00' },
  { id: 'crianca',         name: 'Criança (até 12 anos)',  price: '12,00' },
]

const openBooking = () => window.dispatchEvent(new CustomEvent('openBooking'))

export default function Services() {
  return (
    <section id="servicos" className="section-pad bg-ink">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 reveal">
          <span className="text-gold/60 text-xs tracking-[0.35em] uppercase">O que oferecemos</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-2 text-cream uppercase tracking-wide">
            Tabela de Preços
          </h2>
          <div className="w-10 h-0.5 bg-gold mt-4" />
        </div>

        {/* Price list */}
        <div className="reveal">
          {SERVICES.map((service, i) => (
            <div key={service.id}>
              <div
                className="flex items-center justify-between py-4 cursor-pointer group"
                onClick={openBooking}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-cream group-hover:text-gold transition-colors duration-200 tracking-wide">
                    {service.name}
                  </span>
                  {service.popular && (
                    <span className="text-[9px] tracking-[0.15em] uppercase text-gold border border-gold/40 px-1.5 py-0.5 hidden sm:inline">
                      Popular
                    </span>
                  )}
                </div>
                <span className="font-playfair text-cream group-hover:text-gold transition-colors duration-200 tracking-wider whitespace-nowrap ml-4">
                  € {service.price}
                </span>
              </div>
              {i < SERVICES.length - 1 && (
                <div className="h-px bg-cream/10" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 reveal">
          <button onClick={openBooking} className="btn-gold w-full sm:w-auto">
            Marcar Sessão
          </button>
        </div>
      </div>
    </section>
  )
}
