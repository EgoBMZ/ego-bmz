import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY no está configurada.' }, { status: 500 });
  }

  try {
    const { title_es, type_es, desc_es } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
Eres un asistente experto en diseño web y desarrollo de software para un portafolio profesional.
Tu objetivo es tomar los datos de un proyecto en Español y generar automáticamente sus equivalentes en Inglés, además de un slug de URL, un emoji representativo y un gradiente CSS vibrante.

Datos del proyecto en español:
- Título: ${title_es}
- Tipo: ${type_es}
- Descripción: ${desc_es}

Genera un JSON EXACTAMENTE con esta estructura (sin bloques de código markdown, solo el JSON raw):
{
  "title_en": "El título traducido al inglés (o mantenido igual si es un nombre propio)",
  "type_en": "El tipo traducido al inglés (ej. Web, Mobile, etc)",
  "desc_en": "La traducción natural y profesional de la descripción al inglés",
  "slug": "un-identificador-url-amigable-en-minusculas-basado-en-el-titulo",
  "tags": "React, Next.js, Tailwind", // 3 o 4 tecnologías clave separadas por comas
  "gradient": "linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%)",
  "emoji": "🚀" // Un único emoji que represente mejor el proyecto
}

NOTA: Para el gradiente, utiliza colores modernos, vibrantes y armoniosos acordes a la temática del proyecto, en formato HEX.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up potential markdown formatting from the response
    if (text.startsWith('\`\`\`json')) {
      text = text.slice(7, -3).trim();
    } else if (text.startsWith('\`\`\`')) {
      text = text.slice(3, -3).trim();
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: error.message || 'Error generating content' }, { status: 500 });
  }
}
