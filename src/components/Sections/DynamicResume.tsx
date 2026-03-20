import { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from 'react-modal'
import { FaTimes, FaCertificate } from 'react-icons/fa'
import SectionTitle from '../UI/SectionTitle'
import AnimatedCard from '../UI/AnimatedCard'
import { resumeSections } from '../../utils/chartData'

Modal.setAppElement('#root')

/* -------------------------------------------------------
   CERTIFICATE NAME → IMAGE PATH MAPPING
   Add all your certificates here:
------------------------------------------------------- */

const certificateImages: Record<string, string> = {
  // Existing certificates
  "Programming with C & CPP — Internshala": "Screenshot_3.png",
  "Cloud Computing — NPTEL (IIT Kharagpur, SWAYAM)": "Screenshot_6.png",
  "Basics of Data Structures & Algorithms — LPU (CPE)": "DSA_lpu.png",
  "Computer Programming in C - IamNeo": "Screenshot_8.png",
}

type DynamicResumeProps = {
  id: string
}

const DynamicResume = ({ id }: DynamicResumeProps) => {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set([resumeSections[0]?.title]),
  )
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<string>('')

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

  const openCertificateModal = (certificateName: string) => {
    setSelectedCertificate(certificateName)
    setCertificateModalOpen(true)
  }

  const closeCertificateModal = () => {
    setCertificateModalOpen(false)
    setSelectedCertificate('')
  }

  return (
    <section id={id} className="flex flex-col gap-8 sm:gap-10">
      <SectionTitle
        eyebrow="professional experience"
        title="Resume & Qualifications"
        subtitle="Expand each section to explore my professional journey, skills, and achievements in detail."
      />

      <AnimatedCard className="space-y-6 sm:space-y-8 px-4 sm:px-8 py-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-forest-600 dark:text-forest-400 font-semibold transition-colors">
              overview
            </p>
            <h3 className="font-display text-2xl text-slate-900 dark:text-white transition-colors">Professional Summary</h3>
          </div>
        </div>

        <div className="space-y-4">
          {/* 🟦 Certificate Modal */}
          <Modal
            isOpen={certificateModalOpen}
            onRequestClose={closeCertificateModal}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            overlayClassName="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gradient-to-br from-white to-forest-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-forest-100 dark:border-gray-700 shadow-2xl transition-colors"
            >
              <button
                onClick={closeCertificateModal}
                className="absolute top-4 right-4 z-10 bg-red-500/20 hover:bg-red-500/40 text-white p-3 rounded-full transition-all duration-300 border border-red-500/50"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaCertificate className="text-4xl text-forest-600 dark:text-forest-400 transition-colors" />
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">{selectedCertificate}</h3>
                </div>

                {/* 🟦 DYNAMIC CERTIFICATE IMAGE */}
                <div className="relative rounded-xl overflow-hidden border-4 border-forest-500/30 shadow-2xl">
                  <img
                    src={certificateImages[selectedCertificate] || "/certificates/default.png"}
                    alt={selectedCertificate}
                    className="w-full h-auto"
                  />
                </div>

                <p className="mt-6 text-forest-600/80 dark:text-gray-400 text-center italic transition-colors">
                  Certificate preview - Click outside to close
                </p>
              </div>
            </motion.div>
          </Modal>

          {/* 🟦 Resume Sections */}
          {resumeSections.map((section, index) => {
            const isOpen = openSections.has(section.title)
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-3xl border border-forest-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm transition-colors"
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between px-4 sm:px-6 py-4 text-left hover:bg-forest-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-forest-600 dark:text-forest-400 font-semibold mb-1 transition-colors">
                      {section.title}
                    </p>
                    <p className="text-sm text-forest-800/80 dark:text-gray-300 font-medium transition-colors">
                      {section.items.length} item{section.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-6 w-6 text-forest-600 dark:text-forest-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <div className="space-y-4 px-4 sm:px-6 pb-6">
                    {section.items.map((item) => (
                      <div
                        key={item.title}
                        className={`rounded-2xl bg-forest-50/50 dark:bg-slate-900 p-5 border border-forest-100 dark:border-slate-800 transition-colors ${section.title === 'Certificates' ? 'cursor-pointer hover:bg-forest-100 dark:hover:bg-slate-800 hover:border-forest-300 dark:hover:border-slate-600 shadow-sm' : ''
                          }`}
                        onClick={() => section.title === 'Certificates' && openCertificateModal(item.title)}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-display text-lg text-slate-900 dark:text-white font-bold transition-colors">{item.title}</h4>
                            {section.title === 'Certificates' && (
                              <FaCertificate className="text-forest-600 dark:text-forest-400 animate-pulse transition-colors" />
                            )}
                          </div>
                          {item.period ? (
                            <span className="text-xs uppercase tracking-[0.2em] text-forest-600 dark:text-forest-400 font-medium transition-colors">
                              {item.period}
                            </span>
                          ) : null}
                        </div>
                        {item.subtitle ? <p className="mt-1 text-sm font-semibold text-forest-800 dark:text-gray-300 transition-colors">{item.subtitle}</p> : null}
                        {item.description ? <p className="mt-3 text-sm text-forest-700 dark:text-gray-400 leading-relaxed transition-colors">{item.description}</p> : null}
                        {section.title === 'Certificates' && (
                          <p className="mt-2 text-xs text-forest-600 dark:text-forest-400 italic transition-colors">Click to view certificate</p>
                        )}
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