'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navbar from './Navbar'
import ScrollRevealInit from './ScrollReveal'

const BookingModal = dynamic(() => import('./BookingModal'), { ssr: false })

export default function ClientWrapper() {
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const handler = () => setBookingOpen(true)
    window.addEventListener('openBooking', handler)
    return () => window.removeEventListener('openBooking', handler)
  }, [])

  return (
    <>
      <ScrollRevealInit />
      <Navbar onBooking={() => setBookingOpen(true)} />
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </>
  )
}
