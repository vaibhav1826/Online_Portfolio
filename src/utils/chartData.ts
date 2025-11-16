export const languageUsage = [
  { name: 'TypeScript', value: 42 },
  { name: 'React', value: 28 },
  { name: 'Node.js', value: 18 },
  { name: 'Python', value: 12 },
]

export const commitTrends = [
  { month: 'Jan', commits: 32 },
  { month: 'Feb', commits: 48 },
  { month: 'Mar', commits: 41 },
  { month: 'Apr', commits: 55 },
  { month: 'May', commits: 62 },
  { month: 'Jun', commits: 58 },
  { month: 'Jul', commits: 64 },
  { month: 'Aug', commits: 70 },
  { month: 'Sep', commits: 77 },
  { month: 'Oct', commits: 68 },
  { month: 'Nov', commits: 72 },
  { month: 'Dec', commits: 80 },
]

export const skillGrowth = [
  { skill: 'Frontend', projects: 12, impact: 85 },
  { skill: 'Backend', projects: 9, impact: 74 },
  { skill: 'Data Visualization', projects: 6, impact: 68 },
  { skill: 'Automation', projects: 5, impact: 71 },
]

export const projectShowcase = [
  {
    name: 'Crop Yield Prediction',
    description:
      'Web system predicting crop yields using real-time OpenWeatherMap data to assist farmers with data-driven decisions. Includes auth and data management.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Tailwind', 'Chart.js'],
    metric: 'Correlated weather and yield; responsive, farmer-friendly UI',
    github: 'https://github.com/vaibhav1826?tab=repositories',
    demo: '#',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Virtu Swift',
    description:
      'Prototype platform for digital asset organization and content deployment with intuitive upload, preview, and management.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'PHP', 'MySQL', 'Chart.js'],
    metric: 'Streamlined media handling with interactive insights',
    github: 'https://github.com/vaibhav1826?tab=repositories',
    demo: '#',
    image: '/Screenshot_1.png',
  },
  {
    name: 'Smart Payroll & Employee Management',
    description:
      'Full-stack MERN application for employee records, attendance tracking, and automated salary computation with JWT auth.',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind', 'Chart.js', 'JWT'],
    metric: 'Automated salary pipelines and clear admin dashboards',
    github: 'https://github.com/vaibhav1826?tab=repositories',
    demo: '#',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

export type ResumeSection = {
  title: string
  items: Array<{ title: string; subtitle: string; period: string; description: string }>
}

export const resumeSections: ResumeSection[] = [
  {
    title: 'Contact',
    items: [
      {
        title: 'Vaibhav Bhatt',
        subtitle:
          'LinkedIn: linkedin.com/in/vaibhav-bhatt-382971283/ · Email: vaibhavbhatt145@gmail.com · GitHub: github.com/vaibhav1826 · Mobile: +91 9058065003',
        period: '',
        description: 'Jalandhar, Punjab · Open to internships and junior roles',
      },
    ],
  },
  {
    title: 'Skills',
    items: [
      {
        title: 'Languages',
        subtitle: 'C++, Java, C, Python, HTML, CSS, JavaScript, PHP',
        period: '',
        description: '',
      },
      {
        title: 'Frameworks',
        subtitle: 'React.js, Node.js, Express.js, Tailwind CSS, Bootstrap',
        period: '',
        description: '',
      },
      {
        title: 'Tools & Platforms',
        subtitle: 'MySQL, MongoDB, Postman, VS Code',
        period: '',
        description: '',
      },
      {
        title: 'Soft Skills',
        subtitle:
          'Communication, Problem-Solving, Team Collaboration, Time Management, Adaptability',
        period: '',
        description: '',
      },
    ],
  },
  {
    title: 'Projects',
    items: [
      {
        title: 'Crop-Yield-Prediction — Modern Farming Solutions',
        subtitle:
          'Real-time weather integration with OpenWeatherMap; auth and data with PHP/MySQL; visualized correlations via Chart.js; responsive UI using Tailwind CSS.',
        period: 'Jan 2025 – May 2025',
        description: 'Tech: HTML, CSS, JavaScript, PHP, Tailwind CSS, MySQL, Chart.js, OWM API',
      },
      {
        title: 'Virtu Swift — Digital Asset Management Platform',
        subtitle:
          'Responsive prototype to organize and deploy digital assets. Upload, preview, and manage content; interactive charts with Chart.js; demo connectivity via PHP/MySQL.',
        period: 'May 2025 – Jun 2025',
        description: 'Tech: HTML, CSS, JavaScript, Tailwind CSS, PHP, MySQL, Chart.js',
      },
      {
        title: 'Smart Payroll & Employee Management System',
        subtitle:
          'MERN app for records, attendance, and automated salary computation; JWT authentication; dashboards in React + Tailwind; MongoDB persistence.',
        period: 'Sep 2025 – Nov 2025',
        description:
          'Tech: MongoDB, Express.js, React.js, Node.js, Tailwind CSS, Chart.js, JWT',
      },
    ],
  },
  {
    title: 'Certificates',
    items: [
      {
        title: 'Programming with C & CPP — Internshala',
        subtitle: '',
        period: 'Jan 2024',
        description: '',
      },
      {
        title: 'Cloud Computing — NPTEL (IIT Kharagpur, SWAYAM)',
        subtitle: '',
        period: 'Apr 2025',
        description: '',
      },
      {
        title: 'Basics of Data Structures & Algorithms — LPU (CPE)',
        subtitle: '',
        period: 'Jul 2025',
        description: '',
      },
      {
        title: 'Computer Programming in C - IamNeo',
        subtitle: '',
        period: 'Jan 2024',
        description: '',
      },
    ],
  },
  {
    title: 'Achievements',
    items: [
      {
        title: 'Top 20 Participant — Blitz Byte Hackathon',
        subtitle: '',
        period: 'Nov 2025',
        description: '',
      },
      {
        title: 'Volunteer — SIDCUL Contractors and Welfare Association',
        subtitle: '',
        period: 'Jul 2024',
        description: '',
      },
    ],
  },
  {
    title: 'Education',
    items: [
      {
        title: 'Lovely Professional University, Phagwara, Punjab',
        subtitle:
          'B.Tech — Computer Science and Engineering · CGPA: 8.28',
        period: 'Aug 2023 – Present',
        description: '',
      },
      {
        title: 'Jaycees Public School, Rudrapur, Uttarakhand',
        subtitle: 'Intermediate — Percentage: 74.8%',
        period: 'Apr 2022 – Mar 2023',
        description: '',
      },
      {
        title: 'Jaycees Public School, Rudrapur, Uttarakhand',
        subtitle: 'Matriculation — Percentage: 92.8%',
        period: '',
        description: '',
      },
    ],
  },
]

export const mindspaceGraphData = {
  nodes: [
    { id: 'React', group: 'Core' },
    { id: 'TypeScript', group: 'Core' },
    { id: 'Tailwind', group: 'Core' },
    { id: 'D3.js', group: 'Visualization' },
    { id: 'Framer Motion', group: 'Experience' },
    { id: 'Node.js', group: 'Platform' },
    { id: 'Automation', group: 'Focus' },
    { id: 'Analytics', group: 'Focus' },
    { id: 'Sustainability', group: 'Values' },
    { id: 'UX Research', group: 'Process' },
    { id: 'Projects', group: 'Output' },
  ],
  links: [
    { source: 'React', target: 'TypeScript', value: 3 },
    { source: 'React', target: 'Tailwind', value: 2 },
    { source: 'React', target: 'Framer Motion', value: 2 },
    { source: 'TypeScript', target: 'Automation', value: 1 },
    { source: 'Tailwind', target: 'UX Research', value: 1 },
    { source: 'D3.js', target: 'Analytics', value: 3 },
    { source: 'Automation', target: 'Analytics', value: 2 },
    { source: 'Automation', target: 'Projects', value: 1 },
    { source: 'Analytics', target: 'Projects', value: 2 },
    { source: 'Sustainability', target: 'Projects', value: 2 },
    { source: 'Sustainability', target: 'UX Research', value: 1 },
  ],
}

