import { useState, useCallback } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import { toast } from 'react-toastify'

type ContactFormProps = {
  id: string
}

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

const ContactForm = ({ id }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (field: keyof FormData) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }))
      },
    [],
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate email sending - replace with your backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Message sent successfully! I will get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error(error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="get in touch"
        title="Let's Work Together"
        subtitle="Have a project in mind or want to discuss opportunities? Feel free to reach out. I'm always open to new challenges and collaborations."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <AnimatedCard className="space-y-6">
          <h3 className="font-display text-2xl text-white">Send a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-gray-300">
                Name
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange('name')}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-500/40"
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-300">
                Email
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-500/40"
                  placeholder="you@email.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-gray-300">
              Subject
              <input
                required
                type="text"
                value={formData.subject}
                onChange={handleChange('subject')}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-500/40"
                placeholder="What's this about?"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-300">
              Message
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={handleChange('message')}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-navy-500 focus:ring-2 focus:ring-navy-500/40"
                placeholder="Tell me about your project or inquiry..."
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-navy-600 to-navy-500 px-6 py-3 font-medium text-white transition hover:from-navy-500 hover:to-navy-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </AnimatedCard>

        <AnimatedCard delay={0.1} className="space-y-6">
          <h3 className="font-display text-2xl text-white">Contact Information</h3>

          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 rounded-xl bg-white/5 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-600/50">
                <svg className="h-5 w-5 text-navy-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a href="mailto:vaibhavbhatt145@gmail.com" className="text-white hover:text-navy-400 transition">
                  vaibhavbhatt145@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 rounded-xl bg-white/5 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-600/50">
                <svg className="h-5 w-5 text-navy-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">+91 9058065003</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 rounded-xl bg-white/5 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-600/50">
                <svg className="h-5 w-5 text-navy-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white">Jalandhar, Punjab, India</p>
              </div>
            </motion.div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/vaibhav1826"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 transition hover:bg-navy-600 hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/vaibhav-bhatt-382971283/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 transition hover:bg-navy-600 hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  )
}

export default ContactForm
