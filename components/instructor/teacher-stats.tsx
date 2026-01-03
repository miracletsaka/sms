"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function StatsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    {
      id: 1,
      category: "Active Enrollment",
      title: "Students",
      subtitle: "45 students currently enrolled in active courses with full access",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop",
      bgColor: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      category: "Total Enrollment",
      title: "Total Students",
      subtitle: "105 students registered across all courses and programs this semester",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop",
      bgColor: "from-purple-600 to-pink-600",
    },
    {
      id: 3,
      category: "Tasks Awaiting",
      title: "Pending",
      subtitle: "18 assignments and tasks pending review from instructors and administrators",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop",
      bgColor: "from-orange-500 to-red-600",
    },
    {
      id: 4,
      category: "Class Participation",
      title: "Attendance",
      subtitle: "94% average attendance rate across all courses showing excellent engagement",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=800&fit=crop",
      bgColor: "from-green-500 to-emerald-600",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full px-4">
      <div className="max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div className="relative flex gap-4 overflow-hidden">
          {/* Left Preview */}
          <div className="hidden lg:block w-48 flex-shrink-0">
            <div
              className={`h-[500px] rounded-3xl bg-gradient-to-br ${
                slides[(currentIndex - 1 + slides.length) % slides.length].bgColor
              } p-8 cursor-pointer transition-all duration-300 hover:scale-105`}
              onClick={prevSlide}
            >
              <div className="flex flex-col justify-end h-full">
                <p className="text-white/80 text-xs font-mono mb-2 uppercase tracking-wider">
                  {slides[(currentIndex - 1 + slides.length) % slides.length].category}
                </p>
                <h3 className="text-white text-xl font-bold">
                  {slides[(currentIndex - 1 + slides.length) % slides.length].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Main Slide */}
          <div className="flex-1 relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slides[currentIndex].image || "/placeholder.svg"}
                  alt={slides[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8">
                {/* Category Badge */}
                <div className="flex justify-between items-start">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider">
                    {slides[currentIndex].category}
                  </span>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Star className="w-5 h-5 text-gray-900" />
                  </button>
                </div>

                {/* Title */}
                <div>
                  <div className="mb-4">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                  </div>
                  <h2 className="text-white text-4xl md:text-5xl font-black mb-4 leading-tight">
                    {slides[currentIndex].title}
                  </h2>
                  <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">{slides[currentIndex].subtitle}</p>
                  <button className="text-white flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Preview */}
          <div className="hidden lg:block w-48 flex-shrink-0">
            <div
              className={`h-[500px] rounded-3xl bg-gradient-to-br ${
                slides[(currentIndex + 1) % slides.length].bgColor
              } p-8 cursor-pointer transition-all duration-300 hover:scale-105`}
              onClick={nextSlide}
            >
              <div className="flex flex-col justify-end h-full">
                <p className="text-white/80 text-xs font-mono mb-2 uppercase tracking-wider">
                  {slides[(currentIndex + 1) % slides.length].category}
                </p>
                <h3 className="text-white text-xl font-bold">{slides[(currentIndex + 1) % slides.length].title}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full">
            <span className="text-sm font-bold">{currentIndex + 1}</span>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-sm text-gray-400">{slides.length}</span>
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-gray-900" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
