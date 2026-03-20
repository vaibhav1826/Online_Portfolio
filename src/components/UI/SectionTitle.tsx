type SectionTitleProps = {
  title: string
  subtitle?: string
  eyebrow: string
  align?: 'left' | 'center'
}

const SectionTitle = ({
  title,
  subtitle,
  eyebrow,
  align = 'left',
}: SectionTitleProps) => {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <header className={`flex flex-col gap-3 ${alignment}`}>
      <span className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.45em] text-forest-600 dark:text-forest-400 font-semibold transition-colors">{eyebrow}</span>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white font-bold transition-colors">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-forest-800/80 dark:text-gray-300 transition-colors">{subtitle}</p> : null}
    </header>
  )
}

export default SectionTitle

