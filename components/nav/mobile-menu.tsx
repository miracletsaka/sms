"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, Sparkles, Building2, DollarSign } from "lucide-react"

const MobileProductItem = ({
  title,
  description,
  href,
  imageQuery,
  bgColor,
}: {
  title: string
  description: string
  href: string
  imageQuery: string
  bgColor: string
}) => {
  return (
    <a href={href} className="group relative overflow-hidden rounded-lg hover:shadow-md transition-all duration-300">
      <div className={`absolute inset-0 ${bgColor} opacity-90`} />
      <img
        src={`/.jpg?height=150&width=250&query=${imageQuery}`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
      />
      <div className="relative p-4">
        <h4 className="text-sm font-bold mb-1 text-white">{title}</h4>
        <p className="text-xs text-white/90 leading-relaxed">{description}</p>
      </div>
    </a>
  )
}

const MobileSimpleLink = ({
  title,
  description,
  href,
  imageQuery,
  bgColor,
}: {
  title: string
  description?: string
  href: string
  imageQuery: string
  bgColor: string
}) => {
  return (
    <a href={href} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`shrink-0 w-10 h-10 rounded-lg ${bgColor} overflow-hidden relative`}>
        <img
          src={`/.jpg?height=80&width=80&query=${imageQuery}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</div>
        {description && <div className="text-xs text-gray-500 mt-0.5">{description}</div>}
      </div>
    </a>
  )
}

const MobileMenuSection = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
      >
        <span>{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-[72px] right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto lg:hidden"
          >
            <div className="py-4">
              <MobileMenuSection title="Platform" defaultOpen={true}>
                <div className="flex flex-col gap-3">
                  <MobileProductItem
                    title="Student Management"
                    href="#"
                    imageQuery="student information system dashboard"
                    bgColor="bg-gradient-to-br from-purple-600 to-indigo-600"
                    description="Profiles, enrollment, classes, and student records"
                  />
                  <MobileProductItem
                    title="Attendance Tracking"
                    href="#"
                    imageQuery="school attendance tracking dashboard"
                    bgColor="bg-gradient-to-br from-pink-600 to-rose-600"
                    description="Daily attendance for students and teachers"
                  />
                  <MobileProductItem
                    title="Exams & Results"
                    href="#"
                    imageQuery="exam results management dashboard"
                    bgColor="bg-gradient-to-br from-blue-600 to-cyan-600"
                    description="Scores, grading, report cards, and analytics"
                  />
                  <MobileProductItem
                    title="Fees & Billing"
                    href="#"
                    imageQuery="school fees payment management system"
                    bgColor="bg-gradient-to-br from-emerald-600 to-teal-600"
                    description="Invoices, payments, balances, and receipts"
                  />
                </div>
              </MobileMenuSection>

              <MobileMenuSection title="Solutions">
                <div className="flex flex-col gap-2">
                  <MobileSimpleLink
                    title="Primary Schools"
                    description="Simplify day-to-day operations"
                    href="#"
                    imageQuery="primary school classroom"
                    bgColor="bg-gradient-to-br from-orange-400 to-pink-500"
                  />
                  <MobileSimpleLink
                    title="Secondary Schools"
                    description="Manage academics and discipline"
                    href="#"
                    imageQuery="secondary school students"
                    bgColor="bg-gradient-to-br from-blue-500 to-indigo-600"
                  />
                  <MobileSimpleLink
                    title="Colleges & Institutes"
                    description="Advanced academic administration"
                    href="#"
                    imageQuery="college administration office"
                    bgColor="bg-gradient-to-br from-green-500 to-emerald-600"
                  />
                  <MobileSimpleLink
                    title="International Schools"
                    description="Multi-campus & multi-curriculum support"
                    href="#"
                    imageQuery="international school classroom"
                    bgColor="bg-gradient-to-br from-purple-500 to-pink-600"
                  />
                </div>
              </MobileMenuSection>

              <div className="border-b border-gray-200">
                <a
                  href="#"
                  className="flex items-center gap-2 px-6 py-4 text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  AI Insights
                </a>
              </div>

              <MobileMenuSection title="Integrations">
                <div className="flex flex-col gap-3">
                  <MobileProductItem
                    title="Parent Messaging API"
                    href="#"
                    imageQuery="parent teacher communication app"
                    bgColor="bg-gradient-to-br from-slate-700 to-gray-900"
                    description="Announcements, SMS, reminders, and notifications"
                  />
                  <MobileProductItem
                    title="Reporting API"
                    href="#"
                    imageQuery="education analytics reports dashboard"
                    bgColor="bg-gradient-to-br from-violet-600 to-purple-700"
                    description="Export results, attendance, and financial reports"
                  />
                </div>
              </MobileMenuSection>

              <MobileMenuSection title="Resources">
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-gray-400 mb-1">LEARN</div>
                  <MobileSimpleLink
                    title="School Admin Blog"
                    description="Guides, tips, and best practices"
                    href="#"
                    imageQuery="school administration blog"
                    bgColor="bg-gradient-to-br from-amber-400 to-orange-500"
                  />
                  <MobileSimpleLink
                    title="Training Videos"
                    description="Quick platform walkthroughs"
                    href="#"
                    imageQuery="software training videos"
                    bgColor="bg-gradient-to-br from-red-500 to-pink-600"
                  />
                  <MobileSimpleLink
                    title="Support Center"
                    description="Help for admins, teachers, and parents"
                    href="#"
                    imageQuery="customer support help center"
                    bgColor="bg-gradient-to-br from-cyan-500 to-blue-600"
                  />
                  <div className="text-xs font-semibold text-gray-400 mt-3 mb-1">COMPANY</div>
                  <MobileSimpleLink
                    title="About the Platform"
                    description="Our mission in education"
                    href="#"
                    imageQuery="education technology team"
                    bgColor="bg-gradient-to-br from-indigo-500 to-purple-600"
                  />
                  <MobileSimpleLink
                    title="Careers"
                    description="Build the future of schools"
                    href="#"
                    imageQuery="edtech office workspace"
                    bgColor="bg-gradient-to-br from-teal-500 to-green-600"
                  />
                </div>
              </MobileMenuSection>

              <MobileMenuSection title="Pricing">
                <div className="flex flex-col gap-3">
                  <a
                    href="#"
                    className="relative overflow-hidden p-5 rounded-xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-900">School Plan</h4>
                      <DollarSign className="w-5 h-5 text-indigo-500" />
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Everything a school needs</p>
                    <div className="text-lg font-bold text-indigo-600">From $29/mo</div>
                  </a>
                  <a
                    href="#"
                    className="relative overflow-hidden p-5 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-900">Multi-Campus</h4>
                      <Building2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600 mb-2">For large institutions</p>
                    <div className="text-lg font-bold text-gray-900">Custom Pricing</div>
                  </a>
                </div>
              </MobileMenuSection>

              {/* CTA Buttons */}
              <div className="px-6 py-6 space-y-3">
                <button className="w-full px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  Book a Demo
                </button>
                <button className="w-full px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  Login
                </button>
                <button className="w-full bg-black text-white px-5 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
