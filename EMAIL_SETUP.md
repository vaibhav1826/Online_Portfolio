# Email Form Setup Guide

This portfolio uses a simple React-based contact form. To enable actual email sending, you have several options:

## Option 1: Backend API Endpoint (Recommended)

The contact form in `src/components/Sections/ContactForm.tsx` is set up to send data via a POST request. You need to create your own backend endpoint.

### Setup Steps:

1. **Create a backend server** (Node.js/Express example):

```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'vaibhavbhatt145@gmail.com',
    subject: `Portfolio Contact: ${subject}`,
    text: `From: ${name} (${email})\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3001, () => console.log('Email server running on port 3001'));
```

2. **Update ContactForm.tsx** to point to your endpoint:

```typescript
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      toast.success('Message sent successfully! I will get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } else {
      throw new Error('Failed to send')
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to send message. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}
```

3. **Deploy your backend** on platforms like:
   - Vercel (serverless functions)
   - Netlify (serverless functions)
   - Railway
   - Heroku
   - AWS Lambda

## Option 2: Serverless Function

For platforms like Vercel or Netlify, create a serverless function:

### Vercel Function (`/api/contact.ts`):

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: email,
      to: 'vaibhavbhatt145@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `From: ${name} (${email})\n\n${message}`,
    })

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' })
  }
}
```

Then set environment variables in your Vercel dashboard:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASSWORD`: Your Gmail app password

## Option 3: Third-Party Services

### Using EmailJS:

1. Install EmailJS:
```bash
npm install @emailjs/browser
```

2. Sign up at [EmailJS](https://www.emailjs.com/)

3. Get your credentials and update the form:

```typescript
import emailjs from '@emailjs/browser'

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  setIsSubmitting(true)

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'
    )

    toast.success('Message sent successfully!')
    setFormData({ name: '', email: '', subject: '', message: '' })
  } catch (error) {
    toast.error('Failed to send message.')
  } finally {
    setIsSubmitting(false)
  }
}
```

### Using Formspree:

1. Sign up at [Formspree](https://formspree.io/)
2. Update the form to post to Formspree:

```typescript
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      toast.success('Message sent successfully!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
  } catch (error) {
    toast.error('Failed to send message.')
  } finally {
    setIsSubmitting(false)
  }
}
```

## Gmail App Password Setup

If using Gmail for sending emails:

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in your `EMAIL_PASSWORD` environment variable

## Current Implementation

The current form simulates sending (with a 1-second delay) and shows a success toast. Replace the simulated logic with one of the options above to enable real email sending.

## Security Notes

- Never commit email credentials to your repository
- Always use environment variables for sensitive data
- Implement rate limiting on your backend to prevent spam
- Add CAPTCHA for additional security (Google reCAPTCHA)
- Validate and sanitize all input on the backend
