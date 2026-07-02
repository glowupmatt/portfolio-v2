'use client'

import { useState } from 'react'
import { submitContact } from '../actions/submitContact'

const SANS = "var(--font-geist, 'Geist', sans-serif)"
const MONO = "var(--font-geist-mono, 'Geist Mono', monospace)"

export function ContactForm() {
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const result = await submitContact(new FormData(e.currentTarget))
    if (result.ok) {
      setStatus('sent')
    } else {
      setErrorMsg(result.error ?? 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ background: '#F2EBDD', color: '#0E0E0C', padding: '32px',
        display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.14em',
          textTransform: 'uppercase', color: '#D8351F' }}>Message received</div>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: '16px', lineHeight: 1.6 }}>
          Thanks for reaching out — I&rsquo;ll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form"
      style={{ background: '#F2EBDD', color: '#0E0E0C',
        display: 'flex', flexDirection: 'column', gap: '18px' }}
    >
      <div className="contact-name-row">
        {[
          { label: 'Your name', name: 'name',    type: 'text',  placeholder: 'Jane Doe' },
          { label: 'Company',   name: 'company', type: 'text',  placeholder: 'Acme Inc.' },
        ].map((field) => (
          <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.14em',
              textTransform: 'uppercase', opacity: 0.75 }}>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              style={{ background: 'transparent', border: 0,
                borderBottom: '1px solid #0E0E0C', outline: 0,
                fontFamily: SANS, fontSize: '16px', color: '#0E0E0C', padding: '8px 0' }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.14em',
          textTransform: 'uppercase', opacity: 0.75 }}>
          Work email
        </label>
        <input
          type="email"
          name="email"
          placeholder="jane@company.com"
          style={{ background: 'transparent', border: 0,
            borderBottom: '1px solid #0E0E0C', outline: 0,
            fontFamily: SANS, fontSize: '16px', color: '#0E0E0C', padding: '8px 0' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.14em',
          textTransform: 'uppercase', opacity: 0.75 }}>
          What are you building?
        </label>
        <textarea
          rows={5}
          name="message"
          placeholder="A few lines about the project, the stack, and the timeline."
          style={{ background: 'transparent', border: '1px solid rgba(14,14,12,.18)',
            padding: '12px', outline: 0, fontFamily: SANS, fontSize: '16px',
            color: '#0E0E0C', resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <div style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.08em',
          color: '#D8351F' }}>
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="contact-submit"
        style={{ background: '#0E0E0C', color: '#F2EBDD', border: 0,
          padding: '18px 24px', fontFamily: MONO, fontSize: '14px',
          letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer',
          opacity: status === 'sending' ? 0.6 : 1 }}
      >
        {status === 'sending' ? 'Sending…' : 'Send message →'}
      </button>

      <div style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '.08em',
        opacity: 0.6, lineHeight: 1.4 }}>
        No CRM, no spam, no &ldquo;let&rsquo;s circle back.&rdquo;
      </div>
    </form>
  )
}
