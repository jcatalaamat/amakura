import { getDb } from '~/database'
import { volunteerApplication } from '~/database/schema-public'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { name, email, phone, startDate, endDate, experience, motivation, skills } =
      data

    if (!name || !email || !motivation) {
      return Response.json({ message: 'Faltan campos requeridos' }, { status: 400 })
    }

    const db = getDb()

    const newApplication = {
      id: crypto.randomUUID(),
      name,
      email,
      phone: phone || null,
      startDate: startDate || null,
      endDate: endDate || null,
      experience: experience || null,
      motivation,
      skills: skills || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    await db.insert(volunteerApplication).values(newApplication)

    return Response.json({
      success: true,
      message: 'Aplicación enviada exitosamente',
    })
  } catch (error) {
    console.error('Volunteer application error:', error)
    return Response.json({ message: 'Error al procesar la aplicación' }, { status: 500 })
  }
}
