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
      <span className="text-xs uppercase tracking-[0.45em] text-navy-400">{eyebrow}</span>
      <h2 className="font-display text-3xl text-white sm:text-4xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-gray-400">{subtitle}</p> : null}
    </header>
  )
}

export default SectionTitle

