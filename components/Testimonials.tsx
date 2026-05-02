const TESTIMONIALS = [
  {
    id: 1,
    name: 'Miguel Santos',
    role: 'Cliente desde 2019',
    text: 'Fui à procura de uma barbearia diferente e encontrei muito mais do que esperava. O Lucas tem um dom natural — saí com um corte que nunca tinha conseguido noutro sítio. O ambiente é de outro nível.',
    rating: 5,
    initial: 'M',
  },
  {
    id: 2,
    name: 'João Rodrigues',
    role: 'Cliente frequente',
    text: 'A atenção ao detalhe é impressionante. Cada sessão começa com uma conversa sobre o que realmente quero, e o resultado supera sempre as expectativas. Recomendo a toda a gente de Setúbal.',
    rating: 5,
    initial: 'J',
  },
  {
    id: 3,
    name: 'Carlos Ferreira',
    role: 'Cliente desde 2021',
    text: 'Nunca pensei que um simples corte de cabelo pudesse ser uma experiência tão completa. O Lucas é um profissional de excelência — pontual, atencioso e com resultados que falam por si.',
    rating: 5,
    initial: 'C',
  },
  {
    id: 4,
    name: 'Rui Oliveira',
    role: 'Cliente desde 2020',
    text: 'Vim cá pela primeira vez por recomendação e nunca mais fui a outro lugar. A barba ficou impecável e o tratamento premium que fiz ao cabelo foi uma descoberta. Vale cada cêntimo.',
    rating: 5,
    initial: 'R',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-gold fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testemunhos" className="section-pad bg-ink-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Background text watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-playfair text-[15rem] font-bold text-gold/[0.025] whitespace-nowrap">
          Reviews
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-gold/70 text-xs tracking-[0.35em] uppercase">O que dizem</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-3 mb-4 text-cream">
            Testemunhos
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 reveal-stagger">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="card-surface p-7 relative group">
              {/* Quote mark */}
              <div className="absolute top-5 right-6 font-playfair text-5xl text-gold/10 leading-none select-none">
                "
              </div>

              <StarRating count={t.rating} />

              <blockquote className="mt-4 text-cream/65 text-sm leading-relaxed font-light italic">
                "{t.text}"
              </blockquote>

              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gold/10">
                <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-playfair text-gold font-bold text-sm">{t.initial}</span>
                </div>
                <div>
                  <p className="text-cream font-semibold text-sm">{t.name}</p>
                  <p className="text-gold/50 text-xs tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="mt-12 text-center reveal">
          <div className="inline-flex items-center gap-4 border border-gold/15 px-8 py-4 bg-gold/5">
            <div>
              <div className="font-playfair text-4xl font-bold text-gold">5.0</div>
              <StarRating count={5} />
            </div>
            <div className="w-px h-10 bg-gold/20" />
            <div className="text-left">
              <p className="text-cream/70 text-sm">Avaliação média</p>
              <p className="text-cream/40 text-xs tracking-wider mt-0.5">Baseado em 200+ avaliações</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
