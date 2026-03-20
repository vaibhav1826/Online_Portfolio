import { GoogleGenerativeAI } from '@google/generative-ai'
import { resumeSections, projectShowcase } from '../utils/chartData'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

// Initialize the Gemini API client only if the key exists
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

// Construct the system instruction dynamically from the portfolio data
const buildSystemInstruction = () => {
  const skills = resumeSections.find((x) => x.title.toLowerCase().includes('skills'))?.items.map(i => `${i.title} (${i.subtitle})`).join(', ') || ''
  const experience = resumeSections.find((x) => x.title.toLowerCase().includes('experience'))?.items.map(i => `${i.title} at ${i.subtitle} (${i.period})`).join('. ') || ''
  const ed = resumeSections.find((x) => x.title.toLowerCase().includes('education'))?.items.map(i => `${i.title} at ${i.subtitle} (${i.period})`).join('. ') || ''
  
  const projects = projectShowcase.map(p => `${p.name}: ${p.description} Built with ${p.stack.join(', ')}`).join('. ')

  return `You are Vaibhav Bhatt's strict, professional, and friendly AI Portfolio Assistant. Your job is to answer questions about Vaibhav's skills, projects, and career, as well as general technology questions.

RULES:
1. REQUIRED FORMATTING: MUST start every response by briefly summarizing or acknowledging the user's specific question (e.g., "You're asking about my experience with React." or "Regarding why I might be a good fit..."), and THEN transition into the answer.
2. Answer concisely (2-3 sentences max unless providing a list).
3. If the user asks for Vaibhav's contact info, provide: Email (vaibhavbhatt145@gmail.com), Phone (+91 9058065003), LinkedIn, and GitHub.
4. If the user asks something completely unrelated to technology or Vaibhav, gently redirect them. If it IS related to technology, feel free to answer intelligently.
5. Keep a positive, enthusiastic tone.
6. Emphasize his full-stack expertise (MERN, PHP, React) and passion for building production-ready apps.
7. Use emojis occasionally for flavor.

VAIBHAV'S BACKGROUND:
- Skills: ${skills}
- Experience: ${experience}
- Education: ${ed}
- Projects: ${projects}
- Current Focus: actively looking for internship and junior developer opportunities, open to remote and hybrid.
- Known for: Deep full-stack knowledge, strong eye for UI/UX, and fast learning.
`
}

let activeChat: any = null

export const askGemini = async (prompt: string): Promise<string> => {
  if (!genAI) {
    throw new Error('Gemini API key is not configured.')
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: buildSystemInstruction()
    })
    
    // Initialize chat if not already initialized
    if (!activeChat) {
      activeChat = model.startChat()
    }

    const result = await activeChat.sendMessage(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('Failed to fetch response from Gemini.')
  }
}

export const isGeminiConfigured = () => !!genAI
