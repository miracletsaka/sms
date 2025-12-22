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
              <MobileMenuSection title="Product" defaultOpen={true}>
                <div className="flex flex-col gap-3">
                  <MobileProductItem
                    title="Video Editor"
                    href="#"
                    imageQuery="professional video editing interface"
                    bgColor="bg-gradient-to-br from-purple-600 to-indigo-600"
                    description="Professional video editing tools in your browser"
                  />
                  <MobileProductItem
                    title="AI Video Generator"
                    href="#"
                    imageQuery="AI generating video content"
                    bgColor="bg-gradient-to-br from-pink-600 to-rose-600"
                    description="Create stunning videos from text with AI"
                  />
                  <MobileProductItem
                    title="Screen Recorder"
                    href="#"
                    imageQuery="screen recording software"
                    bgColor="bg-gradient-to-br from-blue-600 to-cyan-600"
                    description="Record your screen, camera, and audio"
                  />
                  <MobileProductItem
                    title="Subtitles & Transcription"
                    href="#"
                    imageQuery="video subtitles and captions"
                    bgColor="bg-gradient-to-br from-emerald-600 to-teal-600"
                    description="Auto-generate accurate subtitles instantly"
                  />
                </div>
              </MobileMenuSection>

              <MobileMenuSection title="Use Cases">
                <div className="flex flex-col gap-2">
                  <MobileSimpleLink
                    title="Marketing & Social Media"
                    description="Engage your audience"
                    href="#"
                    imageQuery="social media marketing"
                    bgColor="bg-gradient-to-br from-orange-400 to-pink-500"
                  />
                  <MobileSimpleLink
                    title="Business & Sales"
                    description="Close more deals"
                    href="#"
                    imageQuery="business presentation"
                    bgColor="bg-gradient-to-br from-blue-500 to-indigo-600"
                  />
                  <MobileSimpleLink
                    title="Education & Training"
                    description="Teach effectively"
                    href="#"
                    imageQuery="online education"
                    bgColor="bg-gradient-to-br from-green-500 to-emerald-600"
                  />
                  <MobileSimpleLink
                    title="Content Creators"
                    description="Grow your channel"
                    href="#"
                    imageQuery="content creation"
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
                  AI
                </a>
              </div>

              <MobileMenuSection title="APIs">
                <div className="flex flex-col gap-3">
                  <MobileProductItem
                    title="Video API"
                    href="#"
                    imageQuery="API code integration"
                    bgColor="bg-gradient-to-br from-slate-700 to-gray-900"
                    description="Programmatic access to video tools"
                  />
                  <MobileProductItem
                    title="Transcription API"
                    href="#"
                    imageQuery="speech to text technology"
                    bgColor="bg-gradient-to-br from-violet-600 to-purple-700"
                    description="Speech-to-text at scale"
                  />
                </div>
              </MobileMenuSection>

              <MobileMenuSection title="Resources">
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-gray-400 mb-1">LEARN</div>
                  <MobileSimpleLink
                    title="Blog"
                    description="Tips & tutorials"
                    href="#"
                    imageQuery="blog articles"
                    bgColor="bg-gradient-to-br from-amber-400 to-orange-500"
                  />
                  <MobileSimpleLink
                    title="Video Tutorials"
                    description="Step-by-step guides"
                    href="#"
                    imageQuery="video tutorial"
                    bgColor="bg-gradient-to-br from-red-500 to-pink-600"
                  />
                  <MobileSimpleLink
                    title="Help Center"
                    description="Get support"
                    href="#"
                    imageQuery="customer support"
                    bgColor="bg-gradient-to-br from-cyan-500 to-blue-600"
                  />
                  <div className="text-xs font-semibold text-gray-400 mt-3 mb-1">COMPANY</div>
                  <MobileSimpleLink
                    title="About Us"
                    description="Our story"
                    href="#"
                    imageQuery="company team"
                    bgColor="bg-gradient-to-br from-indigo-500 to-purple-600"
                  />
                  <MobileSimpleLink
                    title="Careers"
                    description="Join our team"
                    href="#"
                    imageQuery="office workspace"
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
                      <h4 className="text-sm font-bold text-gray-900">Pro Plan</h4>
                      <DollarSign className="w-5 h-5 text-indigo-500" />
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Full access to all features</p>
                    <div className="text-lg font-bold text-indigo-600">$24/mo</div>
                  </a>
                  <a
                    href="#"
                    className="relative overflow-hidden p-5 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-900">Business</h4>
                      <Building2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Advanced tools for teams</p>
                    <div className="text-lg font-bold text-gray-900">$59/mo</div>
                  </a>
                </div>
              </MobileMenuSection>

              {/* CTA Buttons */}
              <div className="px-6 py-6 space-y-3">
                <button className="w-full px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  Contact Sales
                </button>
                <button className="w-full px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  Login
                </button>
                <button className="w-full bg-black text-white px-5 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
