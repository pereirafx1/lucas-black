import ClientWrapper from '@/components/ClientWrapper'
import Services from '@/components/Services'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BookingTrigger from '@/components/BookingTrigger'

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <ClientWrapper />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1408_0%,_#080808_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(201,168,76,.5) 79px,rgba(201,168,76,.5) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(201,168,76,.5) 79px,rgba(201,168,76,.5) 80px)',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-gold/5 pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <div className="h-px w-12 bg-gold/50" />
            <span className="text-gold/80 text-xs tracking-[0.35em] uppercase font-medium">
              Barbearia de Luxo · Setúbal
            </span>
            <div className="h-px w-12 bg-gold/50" />
          </div>

          <h1 className="font-playfair font-bold leading-none mb-2 animate-slide-up">
            <span
              className="block text-cream/95 tracking-tight"
              style={{ fontSize: 'clamp(4.5rem,14vw,11rem)', lineHeight: '0.9' }}
            >
              LUCAS
            </span>
            <span
              className="block tracking-tight gold-shimmer-text"
              style={{ fontSize: 'clamp(4.5rem,14vw,11rem)', lineHeight: '0.9' }}
            >
              BLACK
            </span>
          </h1>

          <div
            className="gold-line w-64 mx-auto my-8 animate-fade-in"
            style={{ animationDelay: '.4s', animationFillMode: 'backwards' }}
          />

          <p
            className="text-cream/50 text-sm md:text-base tracking-[0.25em] uppercase mb-12 font-light animate-fade-in"
            style={{ animationDelay: '.5s', animationFillMode: 'backwards' }}
          >
            Onde a tradição encontra a excelência
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '.7s', animationFillMode: 'backwards' }}
          >
            <BookingTrigger className="btn-gold min-w-[200px]">
              Marcar Sessão
            </BookingTrigger>
            <a href="#servicos" className="btn-outline min-w-[200px] inline-block text-center">
              Ver Serviços
            </a>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: '1.2s', animationFillMode: 'backwards' }}
        >
          <span className="text-cream/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-ink pointer-events-none" />
      </section>

      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
