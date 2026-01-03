"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTypewriter } from "@/hooks/useTypewriter"
import { Prisma } from "@/generated/prisma"
import { Loader2 } from "lucide-react"

type  InstitutionDisplay = Prisma.RoleOnInstitutionToUserAssignedDepGetPayload<{
  include:{
    role:{
      include:{
        role:true
      }
    },
    institution: true,
  }
}>

function enrichInstitutionData(institutions: InstitutionDisplay[]): InstitutionDisplay[] {
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
  ]

  const decorativeColors = [
    { color: "bg-blue-400", position: "top-20 right-20" },
    { color: "bg-purple-400", position: "bottom-32 left-10" },
    { color: "bg-pink-400", position: "top-40 left-32" },
    { color: "bg-teal-400", position: "bottom-20 right-40" },
    { color: "bg-orange-400", position: "top-1/3 right-1/4" },
  ]

  return institutions.map((institution, idx) => ({
    ...institution,
    title: institution.institution.name,
    subtitle: `${institution.institution.institutionType} • ${institution.institution.city}, ${institution.institution.state}`,
    ctaText: "LAUNCH SCHOOL DASHBOARD",
    bgGradient: gradients[idx % gradients.length],
    decorativeElements: [
      decorativeColors[idx % decorativeColors.length],
      decorativeColors[(idx + 1) % decorativeColors.length],
      decorativeColors[(idx + 2) % decorativeColors.length],
    ],
  }))
}

export default function SchoolSelector({ defaultSchools }: { defaultSchools?: InstitutionDisplay[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showChatTooltip, setShowChatTooltip] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const enrichedSchools = defaultSchools ? enrichInstitutionData(defaultSchools) : []
  const currentSlide = enrichedSchools[currentIndex]

  const subtitle = `${currentSlide.institution.name} brings together passionate educators and motivated students in ${currentSlide.institution.city} to create an inspiring learning community. Experience personalized attention, modern infrastructure, and a commitment to your success with our ${currentSlide.institution.state.toLowerCase()} education plan.`

  const { displayedText, isComplete } = useTypewriter(subtitle, 30);

  if (!enrichedSchools.length) {
    return (
      <div className="w-full min-h-[600px] flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">No schools available</p>
      </div>
    )
  }

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % enrichedSchools.length)
    }, 5000)
  }

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [isAutoPlaying])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatTooltip(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const launchInstitutionDashboard = () => {
    // Implement navigation to the institution dashboard
    setIsLaunching(true);
    window.location.href = `/dashboard?q=${currentSlide.id}`;
    
  }

  return (
    <div className="relative w-full">
      {/* Hero Carousel Section */}
      <div
        className="relative w-full min-h-[600px] overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.institution.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute rounded-b-[3rem] inset-0 bg-gradient-to-br from-blue-500 to-cyan-500`}
          >
            <div className="max-w-7xl mx-auto px-6 py-20 h-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-2"
                ><div className="flex space-x-3 items-center">
                    <span className="px-3 py-1 bg-white/30 text-white text-xs font-semibold rounded-full backdrop-blur-sm">Welcome Back!</span>
                    <span className="px-3 py-1 bg-white/30 text-white text-xs font-semibold rounded-full backdrop-blur-sm">Your are playing as {currentSlide.role.role.name}</span>
                  </div>
                  {/* Title */}
                  <h1 className="text-3xl lg:text-5xl font-bold text-white/50 leading-tight">{currentSlide.institution.name}</h1>

                  <p className="text-xs text-gray-200 font-bold max-w-2xl mx-auto mb-5" style={{ fontFamily: "'Inter', -apple-system, sans-serif", letterSpacing: "-0.02em", lineHeight: "1.3" }}>
                    {displayedText}
                    {!isComplete && <span className="animate-pulse">|</span>} {/* Blinking cursor */}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={launchInstitutionDashboard}
                    disabled={isLaunching}
                   className="bg-slate-900 text-white px-8 py-4 rounded-full text-xs font-semibold hover:bg-slate-800 transition shadow-lg hover:shadow-xl transform hover:scale-105">
                   {isLaunching ? <Loader2 className="animate-spin" /> : "LAUNCH INSTITUTION DASHBOARD"}
                  </button>

                  {/* Carousel Indicators */}
                  <div className="flex gap-2 pt-8">
                    {enrichedSchools.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentIndex ? "w-8 bg-slate-900" : "w-2 bg-slate-900/30 hover:bg-slate-900/50"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
                {/* Right Image */}
                <div className="relative w-full h-64 lg:h-96">
                  <motion.img
                    src={currentSlide.institution.thumbnail || `https://mubas.ac.mw/images/backgrounds/mubas-ict-odl.jpg`}
                    alt={currentSlide.institution.name}
                    className="w-full h-full object-cover rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
