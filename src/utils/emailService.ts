import emailjs from 'emailjs-com'

export type ContactFormPayload = {
  name: string
  email: string
  message: string
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

export const isEmailServiceConfigured = () =>
  Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

export const sendContactEmail = async (payload: ContactFormPayload) => {
  if (!isEmailServiceConfigured()) {
    throw new Error(
      'EmailJS is not configured. Please add your service, template, and public keys to the .env file.',
    )
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY)
}

