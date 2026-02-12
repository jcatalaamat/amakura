import { useState } from 'react'

export interface BookingFormData {
  name: string
  email: string
  phone: string
  experienceType: string
  date: string
  guests: number
  notes: string
}

export function useBooking() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const createBooking = async (data: BookingFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al crear la reservación')
      }

      setSuccess(true)
      return await response.json()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setError(null)
    setSuccess(false)
  }

  return {
    createBooking,
    isLoading,
    error,
    success,
    reset,
  }
}
