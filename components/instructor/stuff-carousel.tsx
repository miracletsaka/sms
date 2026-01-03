"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselCard {
  id: number
  category: string
  title: string
  description: string
  logo: string
  bgColor: string
  image: string
}

const educationalCards: CarouselCard[] = [
  {
    id: 1,
    category: "Mathematics & Science",
    title: "Interactive STEM Learning",
    description:
      "Engage students with hands-on experiments, coding challenges, and scientific exploration through interactive platforms and virtual labs.",
    logo: "🔬",
    bgColor: "from-blue-900 to-blue-800",
    image: "/stem-learning-lab.jpg",
  },
  {
    id: 2,
    category: "Language Arts",
    title: "Digital Reading Platform",
    description:
      "Access thousands of e-books, interactive reading exercises, and creative writing tools designed to enhance literacy skills across all grade levels.",
    logo: "📚",
    bgColor: "from-emerald-900 to-emerald-800",
    image: "/digital-library-reading.jpg",
  },
  {
    id: 3,
    category: "Computer Science",
    title: "Coding Bootcamp Program",
    description:
      "Learn programming fundamentals with Python, JavaScript, and Web Development. Build real projects and prepare for tech careers.",
    logo: "💻",
    bgColor: "from-purple-900 to-purple-800",
    image: "/coding-programming-class.jpg",
  },
  {
    id: 4,
    category: "Arts & Creativity",
    title: "Digital Arts Studio",
    description:
      "Master digital design, animation, and multimedia creation. Develop creative portfolios and showcase artistic talent globally.",
    logo: "🎨",
    bgColor: "from-pink-900 to-pink-800",
    image: "/digital-art-studio.jpg",
  },
  {
    id: 5,
    category: "Social Studies",
    title: "Global Learning Network",
    description:
      "Explore world cultures, history, and current events. Connect with students worldwide and develop global citizenship.",
    logo: "🌍",
    bgColor: "from-orange-900 to-orange-800",
    image: "/global-education-world.jpg",
  },
]

export function EducationalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? educationalCards.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === educationalCards.length - 1 ? 0 : prev + 1))
  }

  const getVisibleCards = () => {
    const cards = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + educationalCards.length) % educationalCards.length
      cards.push(educationalCards[index])
    }
    return cards
  }

  const visibleCards = getVisibleCards()

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center gap-4">
            {/* Left Card (Partial) */}
            <div className="hidden lg:block w-1/4 opacity-50">
              <div
                className={`bg-gradient-to-br ${visibleCards[0].bgColor} rounded-2xl h-80 p-6 text-white shadow-lg transform -scale-x-100`}
              >
                <div className="text-4xl mb-4">{visibleCards[0].logo}</div>
                <p className="text-xs font-bold opacity-75 mb-2">{visibleCards[0].category}</p>
              </div>
            </div>

            {/* Center Card (Main) */}
            <div className="w-full lg:w-2/4">
              <div
                className={`bg-gradient-to-br ${visibleCards[1].bgColor} rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex h-80">
                  {/* Content */}
                  <div className="w-1/2 p-8 text-white flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold opacity-80 mb-3 tracking-wide">{visibleCards[1].category}</p>
                      <h3 className="text-2xl font-bold mb-3 leading-tight">{visibleCards[1].title}</h3>
                      <p className="text-sm font-bold opacity-85 leading-relaxed">{visibleCards[1].description}</p>
                    </div>
                    <button className="text-xs font-bold opacity-75 hover:opacity-100 transition-opacity flex items-center gap-1">
                      Explore <span>→</span>
                    </button>
                  </div>

                  {/* Image */}
                  <div className="w-1/2 relative">
                    <img
                      src={visibleCards[1].image || "/placeholder.svg"}
                      alt={visibleCards[1].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card (Partial) */}
            <div className="hidden lg:block w-1/4 opacity-50">
              <div className={`bg-gradient-to-br ${visibleCards[2].bgColor} rounded-2xl h-80 p-6 text-white shadow-lg`}>
                <div className="text-4xl mb-4">{visibleCards[2].logo}</div>
                <p className="text-xs font-bold opacity-75 mb-2">{visibleCards[2].category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Pagination Indicator */}
          <div className="flex items-center gap-2 bg-gray-900 dark:bg-gray-800 px-4 py-2 rounded-full">
            <span className="text-xs font-bold text-white">
              {currentIndex + 1} / {educationalCards.length}
            </span>
          </div>

          <Button
            onClick={goToNext}
            variant="outline"
            size="icon"
            className="rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {educationalCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-gray-900 dark:bg-white w-6"
                  : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
