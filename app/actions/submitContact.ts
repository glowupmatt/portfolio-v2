'use server'

import { client } from '../../sanity/lib/client'

export async function submitContact(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const name    = String(formData.get('name')    ?? '').trim()
  const company = String(formData.get('company') ?? '').trim()
  const email   = String(formData.get('email')   ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { ok: false, error: 'Please fill in your name, email, and message.' }
  }

  await client.create({
    _type: 'contactSubmission',
    name,
    company,
    email,
    message,
    submittedAt: new Date().toISOString(),
  })

  return { ok: true }
}
