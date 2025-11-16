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
  "Computer Programming in C - IamNeo":"Screenshot_8.png",
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
    <section id={id} className="flex flex-col gap-10">
      <SectionTitle
        eyebrow="professional experience"
        title="Resume & Qualifications"
        subtitle="Expand each section to explore my professional journey, skills, and achievements in detail."
      />

      <AnimatedCard className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-navy-400">
              overview
            </p>
            <h3 className="font-display text-2xl text-white">Professional Summary</h3>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 glass-effect p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-display text-xl text-white">Vaibhav Bhatt</h4>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <a className="text-navy-400 underline decoration-dotted underline-offset-4 hover:text-white transition" href="mailto:vaibhavbhatt145@gmail.com">
                  vaibhavbhatt145@gmail.com
                </a>
                <a className="text-navy-400 underline decoration-dotted underline-offset-4 hover:text-white transition" href="https://linkedin.com/in/vaibhav-bhatt-382971283/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="text-navy-400 underline decoration-dotted underline-offset-4 hover:text-white transition" href="https://github.com/vaibhav1826" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <span className="text-gray-400">+91 9058065003</span>
              </div>
            </div>
          </div>

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
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-gray-700 shadow-2xl"
            >
              <button
                onClick={closeCertificateModal}
                className="absolute top-4 right-4 z-10 bg-red-500/20 hover:bg-red-500/40 text-white p-3 rounded-full transition-all duration-300 border border-red-500/50"
              >
                <FaTimes className="text-xl" />
              </button>
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaCertificate className="text-4xl text-blue-400" />
                  <h3 className="text-3xl font-bold text-white">{selectedCertificate}</h3>
                </div>
                
                {/* 🟦 DYNAMIC CERTIFICATE IMAGE */}
                <div className="relative rounded-xl overflow-hidden border-4 border-blue-500/30 shadow-2xl">
                  <img
                    src={certificateImages[selectedCertificate] || "/certificates/default.png"}
                    alt={selectedCertificate}
                    className="w-full h-auto"
                  />
                </div>
                
                <p className="mt-6 text-gray-400 text-center italic">
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
                className="overflow-hidden rounded-3xl border border-white/10 glass-effect"
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-white hover:bg-white/5 transition"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-navy-400">
                      {section.title}
                    </p>
                    <p className="text-sm text-gray-400">
                      {section.items.length} item{section.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-6 w-6 text-navy-400"
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
                  <div className="space-y-4 px-6 pb-6">
                    {section.items.map((item) => (
                      <div 
                        key={item.title} 
                        className={`rounded-2xl bg-white/5 p-5 border border-white/10 ${
                          section.title === 'Certificates' ? 'cursor-pointer hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300' : ''
                        }`}
                        onClick={() => section.title === 'Certificates' && openCertificateModal(item.title)}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-display text-lg text-white">{item.title}</h4>
                            {section.title === 'Certificates' && (
                              <FaCertificate className="text-blue-400 animate-pulse" />
                            )}
                          </div>
                          {item.period ? (
                            <span className="text-xs uppercase tracking-[0.2em] text-navy-400">
                              {item.period}
                            </span>
                          ) : null}
                        </div>
                        {item.subtitle ? <p className="mt-1 text-sm font-medium text-gray-300">{item.subtitle}</p> : null}
                        {item.description ? <p className="mt-3 text-sm text-gray-400">{item.description}</p> : null}
                        {section.title === 'Certificates' && (
                          <p className="mt-2 text-xs text-blue-400 italic">Click to view certificate</p>
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