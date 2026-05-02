import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json')

const ALL_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30',
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'Parâmetro de data obrigatório.' }, { status: 400 })
  }

  let bookings: { date: string; time: string; status: string }[] = []
  try {
    if (fs.existsSync(DATA_FILE)) {
      bookings = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    }
  } catch {
    bookings = []
  }

  const bookedTimes = new Set(
    bookings
      .filter((b) => b.date === date && b.status !== 'cancelled')
      .map((b) => b.time)
  )

  const slots = ALL_SLOTS.map((time) => ({
    time,
    available: !bookedTimes.has(time),
  }))

  return NextResponse.json({ slots })
}
