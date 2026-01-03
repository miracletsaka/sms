import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

type HeroSlide = {
  id: string
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  bgGradient: string
  decorativeElements: {
    color: string
    position: string
  }[]
}

const heroSlides: HeroSlide[] = [
  {
    id: "student-management",
    title: "Complete student information and enrollment management",
    subtitle: "Streamline admissions, track student progress, and manage records all in one place",
    ctaText: "Start Free Trial",
    ctaLink: "#",
    bgGradient: "from-purple-200 via-pink-200 to-blue-200",
    decorativeElements: [
      { color: "bg-yellow-300", position: "top-20 right-40" },
      { color: "bg-pink-400", position: "top-40 right-20" },
      { color: "bg-blue-400", position: "bottom-40 right-60" },
    ]
  },
  {
    id: "class-scheduling",
    title: "Intelligent class scheduling and timetable automation",
    subtitle: "Create conflict-free schedules with smart room allocation and teacher assignment",
    ctaText: "Explore Features",
    ctaLink: "#",
    bgGradient: "from-blue-200 via-cyan-200 to-teal-200",
    decorativeElements: [
      { color: "bg-cyan-300", position: "top-32 right-32" },
      { color: "bg-teal-400", position: "top-48 right-48" },
      { color: "bg-blue-500", position: "bottom-32 right-40" },
    ]
  },
  {
    id: "parent-communication",
    title: "Seamless parent-teacher communication platform",
    subtitle: "Keep parents informed with real-time updates, grades, and attendance notifications",
    ctaText: "Learn More",
    ctaLink: "#",
    bgGradient: "from-green-200 via-emerald-200 to-lime-200",
    decorativeElements: [
      { color: "bg-lime-300", position: "top-28 right-36" },
      { color: "bg-emerald-400", position: "top-44 right-24" },
      { color: "bg-green-500", position: "bottom-36 right-52" },
    ]
  },
  {
    id: "academic-analytics",
    title: "Powerful analytics for academic performance tracking",
    subtitle: "Data-driven insights to improve student outcomes and institutional effectiveness",
    ctaText: "View Demo",
    ctaLink: "#",
    bgGradient: "from-orange-200 via-amber-200 to-yellow-200",
    decorativeElements: [
      { color: "bg-yellow-300", position: "top-24 right-44" },
      { color: "bg-orange-400", position: "top-52 right-28" },
      { color: "bg-amber-500", position: "bottom-28 right-56" },
    ]
  },
  {
    id: "learning-resources",
    title: "Comprehensive digital learning resource library",
    subtitle: "Centralized content management for lessons, assignments, and educational materials",
    ctaText: "Get Started",
    ctaLink: "#",
    bgGradient: "from-indigo-200 via-violet-200 to-purple-200",
    decorativeElements: [
      { color: "bg-violet-300", position: "top-36 right-40" },
      { color: "bg-purple-400", position: "top-48 right-20" },
      { color: "bg-indigo-500", position: "bottom-44 right-48" },
    ]
  },
]

export default function EducationHeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showChatTooltip, setShowChatTooltip] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const currentSlide = heroSlides[currentIndex]

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length)
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
  }, [isAutoPlaying, currentIndex])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatTooltip(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
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
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute rounded-b-[3rem] inset-0 bg-gradient-to-br ${currentSlide.bgGradient}`}
          >
            <div className="max-w-7xl mx-auto px-6 py-20 h-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-2"
                >

                  {/* Title */}
                  <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    {currentSlide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm lg:text-base font-bold text-gray-600 max-w-2xl mx-auto mb-5 "
                    style={{
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      letterSpacing: '-0.02em',
                      lineHeight: '1.3',
                    
                    }}>
                    {currentSlide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <button className="bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-800 transition shadow-lg hover:shadow-xl transform hover:scale-105">
                    {currentSlide.ctaText}
                  </button>

                  {/* Carousel Indicators */}
                  <div className="flex gap-2 pt-8">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentIndex 
                            ? "w-8 bg-slate-900" 
                            : "w-2 bg-slate-900/30 hover:bg-slate-900/50"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Right Decorative Elements */}
                <div className="relative h-[500px] hidden lg:block">
                  {currentSlide.decorativeElements.map((element, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ 
                        delay: 0.4 + idx * 0.15, 
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      className={`absolute ${element.color} rounded-full blur-3xl`}
                      style={{
                        width: idx === 0 ? '280px' : idx === 1 ? '320px' : '240px',
                        height: idx === 0 ? '280px' : idx === 1 ? '320px' : '240px',
                      }}
                    >
                      <div className={element.position} />
                    </motion.div>
                  ))}

                  {/* Abstract Shape */}
                  <motion.div
                    initial={{ rotate: 0, scale: 0 }}
                    animate={{ rotate: 15, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="absolute top-1/2 right-20 transform -translate-y-1/2"
                  >
                    <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
                      <path
                        d="M200 50 L350 150 L350 250 L200 350 L50 250 L50 150 Z"
                        fill="url(#gradient)"
                        fillOpacity="0.4"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="50%" stopColor="#EC4899" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Chat Tooltip */}
      <AnimatePresence>
        {showChatTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-sm z-50"
          >
            <button
              onClick={() => setShowChatTooltip(false)}
              className="absolute top-2 right-2 text-white/60 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C5.58 2 2 5.58 2 10C2 11.8 2.6 13.45 3.6 14.8L2 18L5.2 16.4C6.55 17.4 8.2 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2Z" fill="white"/>
                </svg>
              </div>
              <div>
                <p className="text-sm leading-relaxed">
                  Hi, I can help you explore our school management features or answer any questions you have.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl z-40"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          1
        </span>
      </motion.button>
    </div>
  )
}