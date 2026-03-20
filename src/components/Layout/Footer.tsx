const Footer = () => {
  const socials = [
    { label: 'GitHub', url: 'https://github.com/vaibhav1826' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/vaibhav-bhatt-382971283/' },
    { label: 'Email', url: 'mailto:vaibhavbhatt145@gmail.com' },
  ]

  return (
    <footer className="relative z-10 mt-12 sm:mt-24 bg-transparent pb-16 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center text-sm text-slate-600 dark:text-gray-400 transition-colors sm:flex-row sm:justify-between sm:text-left">
        <p className="max-w-sm text-sm">
          “Keep growing, one commit at a time.” — A living reflection of code, creativity, and
          sustainability.
        </p>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-forest-600 dark:text-forest-400 underline decoration-dotted underline-offset-4 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer

