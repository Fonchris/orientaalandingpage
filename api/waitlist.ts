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

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) return response.status(503).json({ error: 'The waitlist is not configured yet.' })

  try {
    const providerResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'New Orientaa waitlist signup',
        from_name: 'Orientaa landing page',
        email,
        message: `${email} joined the Orientaa waitlist.`,
      }),
    })
    const providerResult = await providerResponse.json() as { success?: boolean }
    if (!providerResponse.ok || !providerResult.success) return response.status(502).json({ error: 'We could not save your signup. Please try again.' })
    return response.status(200).json({ message: 'Signup received.' })
  } catch {
    return response.status(502).json({ error: 'We could not save your signup. Please try again.' })
  }
}
