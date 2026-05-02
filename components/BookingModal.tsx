'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Calendar,
  Clock,
  User,
  Scissors,
} from 'lucide-react'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  isAfter,
  isSunday,
  isSameDay,
  addDays,
  startOfDay,
} from 'date-fns'
import { pt } from 'date-fns/locale'

const SERVICES = [
  { id: 'corte-classico', name: 'Corte Clássico', price: 15, duration: '30 min' },
  { id: 'corte-degrade', name: 'Corte Degradê', price: 20, duration: '45 min' },
  { id: 'barba', name: 'Barba Tradicional', price: 15, duration: '30 min' },
  { id: 'corte-barba', name: 'Corte + Barba', price: 28, duration: '60 min', popular: true },
  { id: 'hidratacao', name: 'Hidratação Premium', price: 25, duration: '45 min' },
  { id: 'crianca', name: 'Criança (até 12 anos)', price: 12, duration: '30 min' },
]

interface Slot { time: string; available: boolean }

interface BookingData {
  service: (typeof SERVICES)[0] | null
  date: Date | null
  time: string
  name: string
  email: string
  phone: string
}

interface BookingModalProps {
  onClose: () => void
}

const STEPS = ['Serviço', 'Data', 'Horário', 'Dados', 'Confirmação']

// ─── Step 1: Service selection ───────────────────────────────────────────────
function StepService({
  selected,
  onSelect,
}: {
  selected: (typeof SERVICES)[0] | null
  onSelect: (s: (typeof SERVICES)[0]) => void
}) {
  return (
    <div className="space-y-3">
      {SERVICES.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s)}
          className={`w-full flex items-center justify-between p-4 border transition-all duration-200 text-left group ${
            selected?.id === s.id
              ? 'border-gold bg-gold/10'
              : 'border-gold/10 hover:border-gold/40 hover:bg-gold/5'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                selected?.id === s.id ? 'border-gold bg-gold' : 'border-gold/30'
              }`}
            >
              {selected?.id === s.id && <Check size={10} className="text-ink" strokeWidth={3} />}
            </div>
            <div>
              <span
                className={`font-medium text-sm transition-colors ${
                  selected?.id === s.id ? 'text-gold' : 'text-cream group-hover:text-cream/90'
                }`}
              >
                {s.name}
              </span>
              {s.popular && (
                <span className="ml-2 text-[9px] tracking-[0.15em] uppercase text-gold/70 border border-gold/30 px-1.5 py-0.5">
                  Popular
                </span>
              )}
              <p className="text-cream/40 text-xs mt-0.5">{s.duration}</p>
            </div>
          </div>
          <span
            className={`font-playfair text-lg font-bold flex-shrink-0 ${
              selected?.id === s.id ? 'text-gold' : 'text-cream/60'
            }`}
          >
            €{s.price}
          </span>
        </button>
      ))}
    </div>
  )
}

// ─── Step 2: Date selection ───────────────────────────────────────────────────
function StepDate({
  selected,
  onSelect,
}: {
  selected: Date | null
  onSelect: (d: Date) => void
}) {
  const [viewMonth, setViewMonth] = useState(new Date())
  const today = startOfDay(new Date())
  const maxDate = addDays(today, 45)

  const monthStart = startOfMonth(viewMonth)
  const monthEnd = endOfMonth(viewMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Offset so grid starts on Monday (0=Mon, 6=Sun)
  const startOffset = (monthStart.getDay() + 6) % 7

  const isDisabled = (d: Date) =>
    isBefore(d, today) || isAfter(d, maxDate) || isSunday(d)

  const canGoPrev = isAfter(subMonths(viewMonth, 1), addMonths(today, -1))
  const canGoNext = isBefore(addMonths(viewMonth, 1), addMonths(today, 2))

  const DAY_NAMES = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => canGoPrev && setViewMonth((m) => subMonths(m, 1))}
          className={`p-2 transition-colors ${
            canGoPrev ? 'text-cream/60 hover:text-gold' : 'text-cream/15 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-playfair text-cream font-semibold capitalize">
          {format(viewMonth, 'MMMM yyyy', { locale: pt })}
        </span>
        <button
          onClick={() => canGoNext && setViewMonth((m) => addMonths(m, 1))}
          className={`p-2 transition-colors ${
            canGoNext ? 'text-cream/60 hover:text-gold' : 'text-cream/15 cursor-not-allowed'
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[10px] tracking-wider text-cream/25 py-1.5 uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map((date) => {
          const disabled = isDisabled(date)
          const isSelected = selected ? isSameDay(date, selected) : false
          const isToday = isSameDay(date, today)

          return (
            <button
              key={date.toISOString()}
              disabled={disabled}
              onClick={() => !disabled && onSelect(date)}
              className={`
                aspect-square flex items-center justify-center text-xs font-medium rounded-sm transition-all duration-150
                ${disabled ? 'text-cream/15 cursor-not-allowed' : 'cursor-pointer hover:bg-gold/15 hover:text-gold'}
                ${isSelected ? 'bg-gold text-ink font-bold hover:bg-gold-light' : ''}
                ${isToday && !isSelected ? 'border border-gold/40 text-gold' : ''}
                ${!disabled && !isSelected && !isToday ? 'text-cream/70' : ''}
              `}
            >
              {format(date, 'd')}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-center text-cream/30 text-xs">
        Domingos encerrado · Disponível até {format(maxDate, "d 'de' MMMM", { locale: pt })}
      </p>
    </div>
  )
}

// ─── Step 3: Time slot selection ──────────────────────────────────────────────
function StepTime({
  date,
  selected,
  onSelect,
}: {
  date: Date
  selected: string
  onSelect: (t: string) => void
}) {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const dateStr = format(date, 'yyyy-MM-dd')
    setLoading(true)
    fetch(`/api/slots?date=${dateStr}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false))
  }, [date])

  const morning = slots.filter((s) => s.time < '13:00')
  const afternoon = slots.filter((s) => s.time >= '13:00')

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="text-gold animate-spin" />
      </div>
    )
  }

  const TimeGrid = ({ group, label }: { group: Slot[]; label: string }) => (
    <div className="mb-5">
      <p className="text-cream/30 text-[10px] tracking-[0.25em] uppercase mb-2.5">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        {group.map((slot) => (
          <button
            key={slot.time}
            disabled={!slot.available}
            onClick={() => slot.available && onSelect(slot.time)}
            className={`py-2.5 text-xs font-medium tracking-wider border transition-all duration-150 ${
              !slot.available
                ? 'border-gold/5 text-cream/15 cursor-not-allowed bg-ink-raised/40'
                : selected === slot.time
                ? 'border-gold bg-gold text-ink font-bold'
                : 'border-gold/20 text-cream/70 hover:border-gold/50 hover:text-gold hover:bg-gold/5'
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  )

  const available = slots.filter((s) => s.available).length

  return (
    <div>
      <p className="text-center mb-5">
        <span className="font-playfair text-cream capitalize">
          {format(date, "EEEE, d 'de' MMMM", { locale: pt })}
        </span>
        <span className="ml-2 text-gold/60 text-xs">· {available} horário{available !== 1 ? 's' : ''} disponível{available !== 1 ? 'is' : ''}</span>
      </p>
      <TimeGrid group={morning} label="Manhã" />
      <TimeGrid group={afternoon} label="Tarde" />
    </div>
  )
}

// ─── Step 4: Personal info ────────────────────────────────────────────────────
function StepInfo({
  data,
  onChange,
}: {
  data: { name: string; email: string; phone: string }
  onChange: (field: string, value: string) => void
}) {
  const Field = ({
    label,
    field,
    type = 'text',
    placeholder,
  }: {
    label: string
    field: string
    type?: string
    placeholder: string
  }) => (
    <div>
      <label className="text-cream/40 text-xs tracking-[0.15em] uppercase block mb-2">
        {label}
      </label>
      <input
        type={type}
        value={data[field as keyof typeof data]}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-ink-raised border border-gold/15 text-cream text-sm px-4 py-3 placeholder-cream/20 focus:outline-none focus:border-gold/60 transition-colors"
      />
    </div>
  )

  return (
    <div className="space-y-4">
      <Field label="Nome completo" field="name" placeholder="O seu nome" />
      <Field label="Email" field="email" type="email" placeholder="email@exemplo.com" />
      <Field label="Telefone" field="phone" type="tel" placeholder="+351 9XX XXX XXX" />
      <p className="text-cream/25 text-xs pt-1">
        Receberá uma confirmação por email e poderá cancelar até 24h antes da sessão.
      </p>
    </div>
  )
}

// ─── Step 5: Confirmation ─────────────────────────────────────────────────────
function StepConfirmation({ bookingId }: { bookingId: string }) {
  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
        <Check size={28} className="text-gold" strokeWidth={2.5} />
      </div>
      <h3 className="font-playfair text-2xl font-bold text-cream mb-2">
        Marcação Confirmada!
      </h3>
      <p className="text-cream/50 text-sm mb-6 leading-relaxed">
        A sua sessão foi reservada com sucesso. Receberá um email de confirmação em breve.
      </p>
      <div className="border border-gold/20 bg-gold/5 p-4 inline-block">
        <p className="text-gold/60 text-[10px] tracking-[0.25em] uppercase">Código de reserva</p>
        <p className="font-playfair text-gold font-bold text-lg mt-1 tracking-widest">
          #{bookingId.slice(0, 8).toUpperCase()}
        </p>
      </div>
      <p className="text-cream/30 text-xs mt-6">
        Até breve na Lucas Black Barbearia, Setúbal
      </p>
    </div>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function BookingModal({ onClose }: BookingModalProps) {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [confirmedId, setConfirmedId] = useState('')

  const [booking, setBooking] = useState<BookingData>({
    service: null,
    date: null,
    time: '',
    name: '',
    email: '',
    phone: '',
  })

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const canAdvance = () => {
    if (step === 0) return !!booking.service
    if (step === 1) return !!booking.date
    if (step === 2) return !!booking.time
    if (step === 3) return booking.name.trim().length > 1 && /\S+@\S+\.\S+/.test(booking.email) && booking.phone.trim().length > 8
    return false
  }

  const handleNext = async () => {
    if (step < 3) {
      setStep((s) => s + 1)
      return
    }
    // Submit
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: booking.service!.id,
          serviceName: booking.service!.name,
          date: format(booking.date!, 'yyyy-MM-dd'),
          time: booking.time,
          name: booking.name.trim(),
          email: booking.email.trim(),
          phone: booking.phone.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao processar a marcação.')
      setConfirmedId(data.booking.id)
      setStep(4)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao processar a marcação.')
    } finally {
      setSubmitting(false)
    }
  }

  const STEP_ICONS = [Scissors, Calendar, Clock, User, Check]
  const StepIcon = STEP_ICONS[step] ?? Check

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full sm:max-w-md bg-ink-surface border border-gold/15 flex flex-col max-h-[92vh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-none overflow-hidden">
        {/* Gold top line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent flex-shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <StepIcon size={16} className="text-gold" />
            <div>
              <p className="text-cream font-semibold text-sm">
                {step < 4 ? `Passo ${step + 1} de 4` : 'Concluído'}
              </p>
              <p className="text-gold/60 text-[11px] tracking-wider uppercase mt-0.5">
                {STEPS[step]}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-cream/40 hover:text-cream transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress bar */}
        {step < 4 && (
          <div className="h-0.5 bg-ink-raised flex-shrink-0">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Booking summary bar */}
        {step > 0 && step < 4 && (
          <div className="px-6 py-2.5 bg-ink-raised/50 border-b border-gold/5 flex flex-wrap gap-3 text-xs flex-shrink-0">
            {booking.service && (
              <span className="text-gold/70">
                <span className="text-cream/40 mr-1">✦</span>{booking.service.name}
              </span>
            )}
            {booking.date && (
              <span className="text-gold/70">
                <span className="text-cream/40 mr-1">✦</span>
                {format(booking.date, "d MMM", { locale: pt })}
              </span>
            )}
            {booking.time && (
              <span className="text-gold/70">
                <span className="text-cream/40 mr-1">✦</span>{booking.time}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 0 && (
            <StepService
              selected={booking.service}
              onSelect={(s) => setBooking((b) => ({ ...b, service: s }))}
            />
          )}
          {step === 1 && (
            <StepDate
              selected={booking.date}
              onSelect={(d) => setBooking((b) => ({ ...b, date: d, time: '' }))}
            />
          )}
          {step === 2 && booking.date && (
            <StepTime
              date={booking.date}
              selected={booking.time}
              onSelect={(t) => setBooking((b) => ({ ...b, time: t }))}
            />
          )}
          {step === 3 && (
            <StepInfo
              data={{ name: booking.name, email: booking.email, phone: booking.phone }}
              onChange={(field, value) => setBooking((b) => ({ ...b, [field]: value }))}
            />
          )}
          {step === 4 && <StepConfirmation bookingId={confirmedId} />}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gold/10 flex-shrink-0">
          {error && (
            <p className="text-red-400/80 text-xs text-center mb-3 border border-red-400/20 bg-red-400/5 px-3 py-2">
              {error}
            </p>
          )}
          {step < 4 ? (
            <div className="flex gap-3">
              {step > 0 && (
                <button
                  onClick={() => { setStep((s) => s - 1); setError('') }}
                  className="px-4 py-3 border border-gold/20 text-cream/60 hover:border-gold/50 hover:text-cream transition-all text-sm"
                >
                  <ChevronLeft size={16} />
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canAdvance() || submitting}
                className={`flex-1 py-3 font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  canAdvance() && !submitting
                    ? 'bg-gold text-ink hover:bg-gold-light'
                    : 'bg-gold/20 text-cream/20 cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : step === 3 ? (
                  'Confirmar Marcação'
                ) : (
                  'Continuar'
                )}
              </button>
            </div>
          ) : (
            <button onClick={onClose} className="w-full btn-gold">
              Fechar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
