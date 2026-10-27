/// <reference types="node" />
import { neon } from '@neondatabase/serverless'

type WaitlistRequest = {
  method?: string
  body?: unknown
}

type WaitlistResponse = {
  status: (code: number) => {
    json: (body: Record<string, string>) => void
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const databaseUrl = process.env.DATABASE_URL?.trim()
const sql = databaseUrl ? neon(databaseUrl) : null

export default async function handler(request: WaitlistRequest, response: WaitlistResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed.' })

  const body = typeof request.body === 'string' ? JSON.parse(request.body) as { email?: unknown } : request.body as { email?: unknown } | undefined
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!emailPattern.test(email)) return response.status(400).json({ error: 'Enter a valid email address.' })

  if (!sql) return response.status(503).json({ error: 'The waitlist is not configured yet.' })

  try {
    const rows = await sql`
      insert into waitlist (email)
      values (${email})
      on conflict (email) do nothing
      returning id
    `
    return response.status(201).json({ message: rows.length ? 'Signup received.' : 'Signup already exists.' })
  } catch (error) {
    console.error('Neon waitlist request failed:', error)
    return response.status(502).json({ error: 'We could not save your signup. Please try again.' })
  }
}
