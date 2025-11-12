import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import {
  isEmailServiceConfigured,
  sendContactEmail,
  type ContactFormPayload,
} from '../../utils/emailService'
import { toast } from 'react-toastify'

type ContactFormProps = {
  id: string
}

const initialForm: ContactFormPayload = {
  name: '',
  email: '',
  message: '',
}

const ContactForm = ({ id }: ContactFormProps) => {
  const [formValues, setFormValues] = useState<ContactFormPayload>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange =
    (field: keyof ContactFormPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (disabled) {
      toast.info('EmailJS not configured yet. Update your keys to enable messaging.')
      return
    }
    setIsSubmitting(true)
    try {
      await sendContactEmail(formValues)
      toast.success('Message sent successfully! 🌿')
      setFormValues(initialForm)
    } catch (error) {
      console.error(error)
      toast.error('Unable to send message right now. Please try again soon.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const disabled = !isEmailServiceConfigured()

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="contact"
        title="Let’s nurture something together"
        subtitle="Share an idea, request a collaboration, or just say hi. A thoughtful response will bloom in your inbox."
      />

      <AnimatedCard className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-sm text-charcoal/70"
        >
          EmailJS integration is configured via environment variables. Until then, the form will
          gracefully disable submission.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              Name
              <input
                required
                type="text"
                value={formValues.name}
                onChange={handleChange('name')}
                className="rounded-2xl border border-white/40 bg-white/60 px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/40"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Email
              <input
                required
                type="email"
                value={formValues.email}
                onChange={handleChange('email')}
                className="rounded-2xl border border-white/40 bg-white/60 px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/40"
                placeholder="you@email.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm">
            Message
            <textarea
              required
              rows={5}
              value={formValues.message}
              onChange={handleChange('message')}
              className="rounded-2xl border border-white/40 bg-white/60 px-4 py-3 outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/40"
              placeholder="Share ideas, goals, or how I can help."
            />
          </label>

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={disabled || isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-medium text-charcoal transition hover:bg-softgreen disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
            >
              {isSubmitting ? 'Sending...' : 'Send message'}
              <span aria-hidden className="text-lg">
                🌿
              </span>
            </button>
            {disabled ? (
              <p className="text-xs text-charcoal/60">
                Configure EmailJS keys to enable live messaging.
              </p>
            ) : null}
          </div>
        </form>
      </AnimatedCard>
    </section>
  )
}

export default ContactForm

