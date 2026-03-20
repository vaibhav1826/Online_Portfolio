// A comprehensive dictionary of user intents, keywords, and pre-calculated responses.
// Each response follows the rule: Summarize the question -> Provide the answer based on the portfolio.
const assistantKnowledgeBase = [
  {
    intent: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'hola', 'sup', 'morning', 'afternoon', 'evening'],
    answer: "You're saying hello! Hi there! I'm Vaibhav's AI portfolio assistant. How can I help you explore his work today?",
  },
  {
    intent: 'how_are_you',
    keywords: ['how are you', 'how do you do', 'how is your day'],
    answer: "You're asking how I'm doing. As an AI, I don't feel much, but I'm fully operational and ready to share Vaibhav's portfolio with you!",
  },
  {
    intent: 'identity',
    keywords: ['who are you', 'what are you', 'are you human', 'bot', 'are you an ai'],
    answer: "You're wondering about my identity. I am a custom-built digital assistant embedded directly into Vaibhav's portfolio to answer all your questions about his skills and experience.",
  },
  {
    intent: 'contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'call', 'message', 'number', 'speak with'],
    answer: "You'd like to get in touch with Vaibhav. \n\n📬 You can reach him instantly:\n• Email: vaibhavbhatt145@gmail.com\n• Phone: +91 9058065003\n• LinkedIn: linkedin.com/in/vaibhav-bhatt-382971283/\n• GitHub: github.com/vaibhav1826",
  },
  {
    intent: 'hire',
    keywords: ['hire', 'hiring', 'internship', 'job', 'opportunity', 'recruit', 'open to', 'available', 'availability'],
    answer: "You're asking about Vaibhav's availability. Yes, he is actively looking for internship and junior developer opportunities, and is completely open to remote, hybrid, or on-site roles!",
  },
  {
    intent: 'why_hire',
    keywords: ['why should we hire', 'makes you unique', 'best quality', 'strength', 'why hire'],
    answer: "You're asking why Vaibhav would be a great hire. He combines deep full-stack knowledge (MERN, PHP, React) with a strong eye for UI/UX and fluid animations. He doesn't just build backends; he delivers complete, production-ready experiences.",
  },
  {
    intent: 'why_not_hire',
    keywords: ['why should we not hire', 'reasons not to hire', 'weakness', 'failure', 'mistake'],
    answer: "You're asking about potential weaknesses or reasons not to hire. If you want a developer who refuses to learn new stacks or clings to obsolete tech, Vaibhav isn't the guy. He is highly adaptable, constantly learning, and obsessed with modern, dynamic architectures.",
  },
  {
    intent: 'hobbies',
    keywords: ['hobbies', 'free time', 'fun', 'outside of work', 'play'],
    answer: "You're curious about what Vaibhav does outside of coding. When he's not building full-stack applications, he loves exploring new UI/UX trends, contributing to open-source projects, and tackling complex algorithmic challenges.",
  },
  {
    intent: 'location',
    keywords: ['where are you', 'location', 'live', 'based in', 'relocate', 'move to'],
    answer: "You're asking about Vaibhav's location and mobility. He is currently based in Jalandhar, Punjab (India), but is completely open to remote work and willing to relocate for the right opportunity.",
  },
  {
    intent: 'education',
    keywords: ['education', 'university', 'college', 'school', 'degree', 'study', 'studied'],
    answer: "You're asking about Vaibhav's educational background. He is currently pursuing a B.Tech in Computer Science and Engineering at Lovely Professional University, expected to graduate in 2026.",
  },
  {
    intent: 'cgpa',
    keywords: ['cgpa', 'gpa', 'grade', 'marks', 'percentage'],
    answer: "You're looking for Vaibhav's academic performance. He maintains a strong CGPA of 8.0/10 in his B.Tech program at LPU, while his 12th standard percentage was 89%.",
  },
  {
    intent: 'skills_general',
    keywords: ['skills', 'tech', 'languages', 'framework', 'stack', 'know', 'good at', 'proficient'],
    answer: "You're asking about Vaibhav's technical skills. He is a full-stack developer proficient in React, Node.js, Express, MongoDB, PHP, Java, Python, and C++. He also works heavily with Tailwind CSS and Framer Motion for UI/UX.",
  },
  {
    intent: 'skills_react',
    keywords: ['react', 'next.js', 'frontend window'],
    answer: "You're asking specifically about Vaibhav's React experience. He has extensive experience building highly interactive frontends using React 18, Vite, and Framer Motion, as demonstrated by this very portfolio and his Gamified Learning Platform.",
  },
  {
    intent: 'skills_backend',
    keywords: ['backend', 'database', 'node', 'express', 'mongodb', 'php', 'sql'],
    answer: "You want to know about backend technologies. Vaibhav builds robust APIs and server infrastructure using Node.js & Express, as well as PHP. He is proficient in both NoSQL (MongoDB) and Relational (MySQL) databases.",
  },
  {
    intent: 'projects_general',
    keywords: ['projects', 'built', 'work', 'apps', 'creations', 'made', 'portfolio'],
    answer: "You're asking about the projects Vaibhav has built. He has developed several major applications, including a Gamified Education Platform with real-time sockets, a Smart Payroll System, a Virtual Swift e-commerce site, and a Crop Yield Prediction ML model.",
  },
  {
    intent: 'project_education',
    keywords: ['gamified', 'education', 'learning platform', 'socket', 'webrtc'],
    answer: "You're asking about his Gamified Education Platform. It's a massive full-stack application leveraging WebRTC and WebSockets for real-time video streaming, group chats, and interactive quizzes, built on the MERN stack.",
  },
  {
    intent: 'project_payroll',
    keywords: ['payroll', 'smart payroll', 'salary', 'management system'],
    answer: "You're interested in the Smart Payroll System. Vaibhav built this comprehensive tool to manage employee data, attendance, and dynamic salary generation, showcasing his ability to build practical enterprise solutions.",
  },
  {
    intent: 'project_ecommerce',
    keywords: ['ecommerce', 'e-commerce', 'virtu swift', 'shopping'],
    answer: "You're asking about his e-commerce work. Vaibhav developed 'Virtu Swift', a fully functional digital storefront with cart management, user authentication, and categorized product listings.",
  },
  {
    intent: 'project_ml',
    keywords: ['machine learning', 'ml', 'crop yield', 'prediction', 'ai'],
    answer: "You're asking about his Machine Learning experience. Vaibhav created a Crop Yield Prediction platform that analyzes agricultural data—such as temperature and rainfall—to forecast yields using established ML algorithms.",
  },
  {
    intent: 'achievements',
    keywords: ['achievements', 'awards', 'hackathon', 'recognition', 'proud of', 'won'],
    answer: "You're asking about Vaibhav's notable achievements. He proudly reached the Top 20 out of numerous teams at the Blitz Byte Hackathon in November 2025, validating his rapid prototyping and problem-solving skills under pressure.",
  },
  {
    intent: 'volunteer',
    keywords: ['volunteer', 'social work', 'community'],
    answer: "You're asking about community involvement. Vaibhav actively volunteers with local welfare associations in his hometown, organizing community service events and contributing to social causes.",
  },
  {
    intent: 'certificates',
    keywords: ['certificates', 'courses', 'certifications', 'certified', 'training'],
    answer: "You're asking about Vaibhav's certifications. He holds verified certificates in Advanced JavaScript, PHP Fundamentals, and Python for Data Science from platforms like Udemy and Coursera, constantly upskilling himself.",
  },
  {
    intent: 'resume',
    keywords: ['resume', 'cv', 'download', 'pdf', 'paper'],
    answer: "You're asking for a copy of Vaibhav's resume. You can instantly download the full PDF version by using the prominent 'Download Resume' button visible on the main Hero section of this website.",
  },
  {
    intent: 'experience',
    keywords: ['experience', 'years', 'timeline', 'history', 'background', 'how long'],
    answer: "You're inquiring about his overall experience timeline. Vaibhav brings over a year of intensive, hands-on development experience, progressing rapidly from creating predictive ML models to deploying massive, real-time MERN stack architectures.",
  },
  {
    intent: 'portfolio_tech',
    keywords: ['how did you build this', 'what is this site made of', 'tech stack of this site'],
    answer: "You're asking what powers this specific portfolio website! It was engineered using React 18, TypeScript, and Vite. The design system uses Tailwind CSS, fluid physics-based animations are powered by Framer Motion, and it features real-time dynamic integrations.",
  },
  {
    intent: 'github_leetcode',
    keywords: ['github', 'leetcode', 'profiles', 'coding profiles', 'commits', 'rank'],
    answer: "You're asking about his open-source and coding platform activity. You can view his live statistics (over 190 solved problems on LeetCode and annual GitHub commits) on the dedicated 'Coding Profiles' page located in the top navigation bar.",
  }
]

export const findBestMatch = (query: string): string => {
  const normalizedQuery = query.toLowerCase()
  
  for (const knowledge of assistantKnowledgeBase) {
    if (knowledge.keywords.some(keyword => normalizedQuery.includes(keyword))) {
      return knowledge.answer
    }
  }

  // Intelligent fallback if NO keywords match
  return "You're asking something I haven't been explicitly programmed to answer. However, I can definitively tell you that Vaibhav is a highly skilled full-stack developer. Check out the 'Projects' or 'Coding Profiles' sections above to see his capabilities in action!"
}
