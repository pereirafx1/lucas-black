import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json')

interface Booking {
  id: string
  service: string
  serviceName: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  status: 'confirmed' | 'cancelled'
  createdAt: string
}

function readBookings(): Booking[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dir = path.dirname(DATA_FILE)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(DATA_FILE, '[]', 'utf-8')
      return []
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function writeBookings(bookings: Booking[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8')
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { service, serviceName, date, time, name, email, phone } = body

  if (!service || !date || !time || !name || !email || !phone) {
    return NextResponse.json({ error: 'Campos obrigatórios em falta.' }, { status: 400 })
  }

  const bookings = readBookings()
  const conflict = bookings.find(
    (b) => b.date === date && b.time === time && b.status !== 'cancelled'
  )
  if (conflict) {
    return NextResponse.json(
      { error: 'Este horário já está reservado. Por favor escolha outro.' },
      { status: 409 }
    )
  }

  const booking: Booking = {
    id: uuidv4(),
    service,
    serviceName,
    date,
    time,
    name,
    email,
    phone,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }

  bookings.push(booking)
  writeBookings(bookings)

  return NextResponse.json({ booking }, { status: 201 })
}

export async function GET() {
  const bookings = readBookings()
  return NextResponse.json({ bookings })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID obrigatório.' }, { status: 400 })

  const bookings = readBookings()
  const idx = bookings.findIndex((b) => b.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Marcação não encontrada.' }, { status: 404 })

  bookings[idx].status = 'cancelled'
  writeBookings(bookings)
  return NextResponse.json({ ok: true })
}
