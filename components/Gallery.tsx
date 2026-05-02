const GALLERY_ITEMS = [
  {
    id: 1,
    label: 'Cortes Clássicos',
    sub: 'Tradição & Precisão',
    gradient: 'from-slate-900 via-slate-800 to-ink',
    accent: '#6B7FA3',
  },
  {
    id: 2,
    label: 'Arte com Barba',
    sub: 'Modelação Perfeita',
    gradient: 'from-stone-900 via-stone-800 to-ink',
    accent: '#9A8570',
    tall: true,
  },
  {
    id: 3,
    label: 'Degradê Premium',
    sub: 'Fade & Transições',
    gradient: 'from-neutral-900 via-zinc-800 to-ink',
    accent: '#7A7A8A',
  },
  {
    id: 4,
    label: 'O Nosso Espaço',
    sub: 'Ambiente de Luxo',
    gradient: 'from-amber-950 via-stone-900 to-ink',
    accent: '#B8956A',
    tall: true,
  },
  {
    id: 5,
    label: 'Tratamentos',
    sub: 'Cuidado Premium',
    gradient: 'from-gray-900 via-gray-800 to-ink',
    accent: '#8A9A8A',
  },
  {
    id: 6,
    label: 'Detalhes & Acabamentos',
    sub: 'Perfeição nos Mínimos',
    gradient: 'from-zinc-900 via-neutral-800 to-ink',
    accent: '#8A8A7A',
  },
]

export default function Gallery() {
  return (
    <section id="galeria" className="section-pad bg-ink">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-gold/70 text-xs tracking-[0.35em] uppercase">O nosso trabalho</span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-3 mb-4 text-cream">
            Galeria
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 reveal">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden cursor-pointer ${
                item.tall ? 'row-span-2' : ''
              }`}
              style={{ aspectRatio: item.tall ? '3/4' : '4/3' }}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-105`}
              />

              {/* Decorative inner pattern */}
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, ${item.accent}33, transparent 60%)`,
                }}
              />

              {/* Corner frames */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/40 transition-all duration-500 group-hover:border-gold/80 group-hover:w-8 group-hover:h-8" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/40 transition-all duration-500 group-hover:border-gold/80 group-hover:w-8 group-hover:h-8" />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-0 transition-opacity duration-500 select-none">
                <span className="text-5xl text-gold">✦</span>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-playfair text-cream font-semibold text-sm md:text-base">
                  {item.label}
                </p>
                <p className="text-gold/70 text-xs tracking-[0.15em] uppercase mt-0.5">
                  {item.sub}
                </p>
              </div>

              {/* Always visible label on small screens */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:hidden">
                <div className="bg-ink/70 backdrop-blur-sm px-3 py-1.5">
                  <p className="text-cream text-xs font-medium">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted text-xs tracking-[0.2em] uppercase mt-8 reveal">
          Siga-nos no Instagram{' '}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold/70 hover:text-gold transition-colors"
          >
            @lucasblack.setubal
          </a>
        </p>
      </div>
    </section>
  )
}
