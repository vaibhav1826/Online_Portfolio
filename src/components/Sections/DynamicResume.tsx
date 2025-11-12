import { useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { motion } from 'framer-motion'
import { useReactToPrint } from 'react-to-print'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import { resumeSections } from '../../utils/chartData'

type DynamicResumeProps = {
  id: string
}

const DynamicResume = ({ id }: DynamicResumeProps) => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set([resumeSections[0]?.title]),
  )
  const resumeRef = useRef<HTMLDivElement | null>(null)
  const printableRef = resumeRef as unknown as RefObject<Element>

  const handleExport = useReactToPrint({
    contentRef: printableRef,
    documentTitle: 'Vaibhav-Living-Portfolio-Resume',
  })

  const toggleSection = (title: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }

  const resumeSummary = useMemo(
    () => ({
      totalSections: resumeSections.length,
      totalHighlights: resumeSections.reduce((sum, section) => sum + section.items.length, 0),
    }),
    [],
  )

  return (
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="dynamic resume"
        title="An evergreen résumé—ready to share"
        subtitle="Open the vines to explore each chapter, then export a polished PDF snapshot with a single click."
      />

      <AnimatedCard className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-charcoal/60">
              overview
            </p>
            <h3 className="font-display text-2xl">Professional highlight reel</h3>
            <p className="text-sm text-charcoal/70">
              {resumeSummary.totalSections} sections · {resumeSummary.totalHighlights} curated
              highlights
            </p>
          </div>
          <button
            onClick={() => handleExport?.()}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-mint shadow-bloom transition hover:bg-[#131a16]"
          >
            Export to PDF
          </button>
        </div>

        <div ref={resumeRef} className="space-y-4">
          <div className="rounded-3xl border border-white/30 bg-white/50 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-display text-xl">Vaibhav Bhatt</h4>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <a className="text-sage underline decoration-dotted underline-offset-4" href="mailto:vaibhavbhatt145@gmail.com">
                  vaibhavbhatt145@gmail.com
                </a>
                <a className="text-sage underline decoration-dotted underline-offset-4" href="https://linkedin.com/in/vaibhav-bhatt-382971283/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="text-sage underline decoration-dotted underline-offset-4" href="https://github.com/vaibhav1826" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <span className="text-charcoal/70">+91 9058065003</span>
              </div>
            </div>
          </div>

          {resumeSections.map((section, index) => {
            const isOpen = openSections.has(section.title)
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-3xl border border-white/30 bg-white/40"
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-charcoal"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-charcoal/60">
                      {section.title}
                    </p>
                    <p className="text-sm text-charcoal/70">
                      {section.items.length} highlight
                      {section.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="text-2xl"
                  >
                    ✳️
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <div className="space-y-4 px-6 pb-6">
                    {section.items.map((item) => (
                      <div key={item.title} className="rounded-2xl bg-white/40 p-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="font-display text-lg">{item.title}</h4>
                          {item.period ? (
                            <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60">
                              {item.period}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm font-medium text-charcoal/70">{item.subtitle}</p>
                        <p className="mt-3 text-sm text-charcoal/70">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </AnimatedCard>
    </section>
  )
}

export default DynamicResume

