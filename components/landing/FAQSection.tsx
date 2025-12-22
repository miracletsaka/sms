"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

type FAQSectionProps = {
  title?: string
  faqs?: FAQItem[]
}

const defaultFAQs: FAQItem[] = [
  {
    question: "What is the School Management System and how does it work?",
    answer:
      "Our School Management System is an all-in-one platform that helps schools manage students, staff, academics, and administration in one place. It centralizes key workflows like admissions, attendance, fees, exams, results, timetables, and communication. Schools simply create their accounts, set up classes and users (admins, teachers, parents), and start running daily operations digitally from day one.",
  },
  {
    question: "Can parents and teachers use the system on mobile?",
    answer:
      "Yes. The platform is designed for mobile-first use so teachers can record attendance and grades quickly, and parents can receive announcements, reminders, results, and fee updates on their phones. Access is role-based—admins, teachers, students, and parents only see what they are permitted to see.",
  },
  {
    question: "How do we get started and what are the pricing options for schools?",
    answer:
      "Getting started is simple: request a demo or create an account, then we help you set up your school structure (classes, terms, subjects, fees, and users). Pricing is flexible based on school size and modules needed. We typically offer a School Plan (for single schools) and Multi-Campus (for groups of schools). Contact our team for a quote and onboarding support.",
  },
]

export const FAQSection = ({ title = "Frequently asked questions", faqs = defaultFAQs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <h2
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 max-w-4xl mx-auto"
              style={{
                fontFamily: "'Sora', 'Space Grotesk', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-sm text-gray-700 font-bold">{faq.question}</span>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-6 h-6 text-[#202020]" strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-12">
                          <p
                            className="text-xs text-gray-700 font-bold "
                            style={{
                              fontFamily: "var(--font-figtree), Figtree",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
