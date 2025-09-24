import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    // Obtener el contexto de la base de datos
    const { data: contextoData, error: contextoError } = await supabase
      .from('contexto_chat')
      .select('descripcion')
      .limit(1)
      .single()

    if (contextoError) {
      console.error('Error obteniendo contexto:', contextoError)
      return NextResponse.json(
        { error: 'Error obteniendo contexto del chat' },
        { status: 500 }
      )
    }

    const contexto = contextoData.descripcion

    // Llamada a OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres Pjoxantito, un asistente virtual de Casa Pjoxante. Tu trabajo es responder preguntas sobre la organización basándote en el siguiente contexto. Mantén un tono amigable y profesional, y si no sabes algo específico, dilo claramente.

CONTEXTO:
${contexto}

INSTRUCCIONES:
- Responde únicamente basándote en el contexto proporcionado
- Si la pregunta no se puede responder con el contexto disponible, indícalo claramente
- Mantén las respuestas muy breves y directas, solo extiéndete si es absolutamente necesario
- Usa un tono cálido y amigable, como si fueras parte del equipo de Casa Pjoxante`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_completion_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      console.error('Error de OpenAI:', errorData)
      return NextResponse.json(
        { error: 'Error conectando con el servicio de IA' },
        { status: 500 }
      )
    }

    const openaiData = await openaiResponse.json()
    const respuesta = openaiData.choices[0]?.message?.content

    if (!respuesta) {
      return NextResponse.json(
        { error: 'No se pudo generar una respuesta' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      respuesta: respuesta.trim() 
    })

  } catch (error) {
    console.error('Error en API de chat:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}