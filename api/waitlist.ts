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

export default async function handler(request: WaitlistRequest, response: WaitlistResponse) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed.' })

  const body = typeof request.body === 'string' ? JSON.parse(request.body) as { email?: unknown } : request.body as { email?: unknown } | undefined
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!emailPattern.test(email)) return response.status(400).json({ error: 'Enter a valid email address.' })

  const supabaseUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, '').replace(/\/rest\/v1$/, '')
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!supabaseUrl || !supabaseServiceRoleKey) return response.status(503).json({ error: 'The waitlist is not configured yet.' })

  try {
    const databaseResponse = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email }),
    })
    if (databaseResponse.status === 409) return response.status(200).json({ message: 'Signup already exists.' })
    if (!databaseResponse.ok) {
      const databaseError = await databaseResponse.text()
      console.error('Supabase rejected waitlist signup:', databaseResponse.status, databaseError)
      return response.status(502).json({ error: 'We could not save your signup. Please try again.' })
    }
    return response.status(201).json({ message: 'Signup received.' })
  } catch (error) {
    console.error('Supabase waitlist request failed:', error)
    return response.status(502).json({ error: 'We could not save your signup. Please try again.' })
  }
}
