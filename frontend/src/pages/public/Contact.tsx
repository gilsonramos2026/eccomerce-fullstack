// src/pages/public/Contact.tsx
import { useState, type FormEvent } from 'react'
import { Breadcrumb } from '../../components/common/Breadcrumb'
import { Button } from '../../components/common/Button'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <div className="grid md:grid-cols-3 gap-10 py-6">
        <div className="border border-[var(--border-line)] rounded-md p-6 flex flex-col gap-6 text-sm">
          <div>
            <p className="font-semibold text-[var(--text-title)] mb-2">📞 Call Us</p>
            <p className="text-[var(--text-body)]">We are available 24/7, 7 days a week.</p>
            <p className="text-[var(--text-body)]">Phone: +88015-88888-9999</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-title)] mb-2">✉️ Write To Us</p>
            <p className="text-[var(--text-body)]">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-[var(--text-body)]">Emails: customer@exclusive.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-2 border border-[var(--border-line)] rounded-md p-6 grid grid-cols-3 gap-4">
          <input
            placeholder="Your Name *" required value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="bg-[var(--bg-base)] rounded-md px-3 py-2 col-span-3 md:col-span-1"
          />
          <input
            type="email" placeholder="Your Email *" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="bg-[var(--bg-base)] rounded-md px-3 py-2 col-span-3 md:col-span-1"
          />
          <input
            placeholder="Your Phone *" required value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="bg-[var(--bg-base)] rounded-md px-3 py-2 col-span-3 md:col-span-1"
          />
          <textarea
            placeholder="Your Message" value={form.message} rows={6}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="bg-[var(--bg-base)] rounded-md px-3 py-2 col-span-3"
          />
          <Button type="submit" className="col-span-3 md:col-start-3 md:w-fit md:ml-auto">
            Send Message
          </Button>
          {sent && <p className="text-[var(--color-success-500)] text-sm col-span-3">Mensagem enviada!</p>}
        </form>
      </div>
    </div>
  )
}
