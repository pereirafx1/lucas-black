'use client'

export default function BookingTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const open = () => window.dispatchEvent(new CustomEvent('openBooking'))
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  )
}
