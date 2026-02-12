import { getDb } from '~/database'
import { booking } from '~/database/schema-public'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { name, email, phone, experienceType, date, guests, notes } = data

    if (!name || !email || !experienceType || !date) {
      return Response.json({ message: 'Faltan campos requeridos' }, { status: 400 })
    }

    const db = getDb()

    const newBooking = {
      id: crypto.randomUUID(),
      name,
      email,
      phone: phone || null,
      experienceTypeId: experienceType,
      date,
      guests: guests || 1,
      notes: notes || null,
      status: 'pending',
      locale: 'es',
      createdAt: new Date().toISOString(),
    }

    await db.insert(booking).values(newBooking)

    return Response.json({
      success: true,
      bookingId: newBooking.id,
      message: 'Reservación creada exitosamente',
    })
  } catch (error) {
    console.error('Booking error:', error)
    return Response.json({ message: 'Error al procesar la reservación' }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({ message: 'Booking API' })
}
