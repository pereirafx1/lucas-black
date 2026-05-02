export default function About() {
  const stats = [
    { value: '8+', label: 'Anos de Experiência' },
    { value: '3K+', label: 'Clientes Satisfeitos' },
    { value: '100%', label: 'Dedicação ao Detalhe' },
  ]

  return (
    <section id="sobre" className="section-pad bg-ink-surface relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <div className="relative reveal">
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              {/* Main "photo" */}
              <div className="absolute inset-0 bg-gradient-to-br from-ink-high via-ink-raised to-ink overflow-hidden">
                {/* Decorative barbershop visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center select-none pointer-events-none">
                    <div
                      className="font-playfair font-bold leading-none text-gold/10"
                      style={{ fontSize: 'clamp(5rem, 15vw, 9rem)' }}
                    >
                      LB
                    </div>
                    <div className="mt-4 w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto" />
                    <p className="mt-4 text-gold/15 text-xs tracking-[0.4em] uppercase">
                      Est. 2016
                    </p>
                  </div>
                </div>
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30" />
              </div>
              {/* Gold border frame */}
              <div className="absolute -inset-3 border border-gold/15 pointer-events-none" />
              <div className="absolute -inset-1 border border-gold/8 pointer-events-none" />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-4 -right-4 lg:right-0 bg-gold p-5 text-ink text-center min-w-[100px]">
              <div className="font-playfair text-3xl font-bold">8+</div>
              <div className="text-[10px] tracking-[0.15em] uppercase font-semibold mt-0.5 leading-tight">
                Anos de<br />Excelência
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="reveal">
            <span className="text-gold/70 text-xs tracking-[0.35em] uppercase">A nossa história</span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-3 mb-6 text-cream leading-tight">
              Paixão pelo<br />
              <span className="text-gold">Ofício</span>
            </h2>
            <div className="gold-line w-16 mb-8" />

            <div className="space-y-4 text-cream/60 leading-relaxed font-light">
              <p>
                Lucas Black nasceu em Setúbal com uma visão clara: criar um espaço onde a
                barbearia tradicional se funde com a estética contemporânea do luxo. Cada
                visita é uma experiência cuidadosamente desenhada.
              </p>
              <p>
                Com mais de 8 anos de experiência e formação em Lisboa e Madrid, Lucas trouxe
                para Setúbal técnicas de referência internacional, adaptadas ao gosto e
                cultura portuguesa.
              </p>
              <p>
                Aqui, não atendemos clientes — recebemos pessoas. Cada detalhe, desde os
                produtos utilizados aos rituais de cada sessão, é escolhido com um único
                propósito: a sua satisfação total.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gold/10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-playfair text-2xl md:text-3xl font-bold text-gold">
                    {stat.value}
                  </div>
                  <div className="text-cream/40 text-xs mt-1 leading-tight font-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
