'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { LogOut, Trash2, RefreshCw } from 'lucide-react'

interface Booking {
  id: string
  serviceName: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  status: 'confirmed' | 'cancelled'
  createdAt: string
}

const ADMIN_PASSWORD = 'lucasblack2024'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all')

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      setError('')
    } else {
      setError('Palavra-passe incorreta.')
    }
  }

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/booking')
      const data = await res.json()
      setBookings(data.bookings || [])
    } finally {
      setLoading(false)
    }
  }

  const cancel = async (id: string) => {
    if (!confirm('Cancelar esta marcação?')) return
    await fetch(`/api/booking?id=${id}`, { method: 'DELETE' })
    fetchBookings()
  }

  useEffect(() => {
    if (authed) fetchBookings()
  }, [authed])

  if (!authed) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-cream">
              Lucas <span className="text-gold">Black</span>
            </h1>
            <p className="text-muted text-sm mt-2 tracking-wider">Painel de Administração</p>
          </div>
          <div className="bg-ink-surface border border-gold/15 p-6">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-6 -mt-6 -mx-6" />
            <label className="text-cream/40 text-xs tracking-[0.15em] uppercase block mb-2">
              Palavra-passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              placeholder="••••••••••••"
              className="w-full bg-ink-raised border border-gold/15 text-cream px-4 py-3 text-sm placeholder-cream/20 focus:outline-none focus:border-gold/60 mb-4"
            />
            {error && <p className="text-red-400/70 text-xs mb-3">{error}</p>}
            <button onClick={login} className="btn-gold w-full">
              Entrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  const filtered = bookings.filter((b) => filter === 'all' || b.status === filter)
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length

  return (
    <div className="min-h-screen bg-ink text-cream">
      {/* Header */}
      <div className="border-b border-gold/10 bg-ink-surface px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-playfair text-xl font-bold">
            Lucas <span className="text-gold">Black</span>
          </h1>
          <p className="text-muted text-xs tracking-wider">Gestão de Marcações</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBookings}
            className="p-2 text-cream/50 hover:text-gold transition-colors"
            title="Atualizar"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="p-2 text-cream/50 hover:text-gold transition-colors"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total', value: bookings.length },
            { label: 'Confirmadas', value: confirmed },
            { label: 'Canceladas', value: bookings.length - confirmed },
          ].map((s) => (
            <div key={s.label} className="bg-ink-surface border border-gold/10 p-4 text-center">
              <div className="font-playfair text-3xl font-bold text-gold">{s.value}</div>
              <div className="text-muted text-xs tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5">
          {(['all', 'confirmed', 'cancelled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs tracking-[0.1em] uppercase border transition-all ${
                filter === f
                  ? 'border-gold text-gold bg-gold/10'
                  : 'border-gold/15 text-muted hover:border-gold/40'
              }`}
            >
              {f === 'all' ? 'Todas' : f === 'confirmed' ? 'Confirmadas' : 'Canceladas'}
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <p>Nenhuma marcação encontrada.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered
              .sort((a, b) => (a.date + a.time < b.date + b.time ? -1 : 1))
              .map((b) => (
                <div
                  key={b.id}
                  className={`bg-ink-surface border p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
                    b.status === 'cancelled'
                      ? 'border-red-400/10 opacity-50'
                      : 'border-gold/10 hover:border-gold/25'
                  } transition-colors`}
                >
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="text-cream/30 text-[10px] uppercase tracking-wider">Cliente</p>
                      <p className="text-cream font-medium">{b.name}</p>
                      <p className="text-muted text-xs">{b.phone}</p>
                    </div>
                    <div>
                      <p className="text-cream/30 text-[10px] uppercase tracking-wider">Serviço</p>
                      <p className="text-cream">{b.serviceName}</p>
                    </div>
                    <div>
                      <p className="text-cream/30 text-[10px] uppercase tracking-wider">Data</p>
                      <p className="text-cream capitalize">
                        {format(new Date(b.date + 'T12:00'), "d MMM yyyy", { locale: pt })}
                      </p>
                      <p className="text-gold text-xs">{b.time}</p>
                    </div>
                    <div>
                      <p className="text-cream/30 text-[10px] uppercase tracking-wider">Estado</p>
                      <span
                        className={`text-xs tracking-wider ${
                          b.status === 'confirmed' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {b.status === 'confirmed' ? '● Confirmada' : '● Cancelada'}
                      </span>
                    </div>
                  </div>

                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => cancel(b.id)}
                      className="text-red-400/50 hover:text-red-400 transition-colors p-1 self-start sm:self-center"
                      title="Cancelar"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
