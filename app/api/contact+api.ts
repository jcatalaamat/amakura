import { getDb } from '~/database'
import { contactMessage } from '~/database/schema-public'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { name, email, interest, message } = data

    if (!name || !email || !message) {
      return Response.json({ message: 'Faltan campos requeridos' }, { status: 400 })
    }

    const db = getDb()

    const newMessage = {
      id: crypto.randomUUID(),
      name,
      email,
      interest: interest || null,
      message,
      status: 'unread',
      createdAt: new Date().toISOString(),
    }

    await db.insert(contactMessage).values(newMessage)

    return Response.json({
      success: true,
      message: 'Mensaje enviado exitosamente',
    })
  } catch (error) {
    console.error('Contact error:', error)
    return Response.json({ message: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
