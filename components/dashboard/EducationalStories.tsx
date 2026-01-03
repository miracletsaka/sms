import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"

type Story = {
  id: string
  category: string
  title: string
  description: string
  image: string
  link: string
}

const categories = [
  "education",
  "higher education",
  "K-12",
  "online learning",
  "student management",
]

const stories: Story[] = [
  {
    id: "1",
    category: "education",
    title: "Lincoln Academy transforms student engagement",
    description: "Lincoln Academy enhances learning outcomes through AI-powered personalized education, enabling teachers to tailor instruction to individual student needs.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80",
    link: "#",
  },
  {
    id: "2",
    category: "education",
    title: "Global University accelerates digital transformation",
    description: "Global University modernizes campus operations with cloud-based student management, improving administrative efficiency and student satisfaction.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80",
    link: "#",
  },
  {
    id: "3",
    category: "higher education",
    title: "State College improves enrollment process",
    description: "State College streamlines admissions and enrollment with automated workflows, reducing processing time by 60% and enhancing applicant experience.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
    link: "#",
  },
  {
    id: "4",
    category: "K-12",
    title: "Riverside School District enhances parent communication",
    description: "Riverside connects parents and teachers through real-time messaging and progress tracking, increasing family engagement by 75%.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    link: "#",
  },
  {
    id: "5",
    category: "online learning",
    title: "EduTech Platform scales to 1M students",
    description: "EduTech Platform delivers seamless online learning experiences to over one million students worldwide with 99.9% uptime and adaptive learning paths.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80",
    link: "#",
  },
  {
    id: "6",
    category: "student management",
    title: "Metro Schools optimizes resource allocation",
    description: "Metro Schools leverages analytics to optimize teacher assignments and classroom utilization, improving educational outcomes and reducing costs.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
    link: "#",
  },
]

export default function EducationStories() {
  const [selectedCategory, setSelectedCategory] = useState("education")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredStories = stories.filter(
    (story) => story.category === selectedCategory
  )

  return (
    <div className="w-full bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Dropdown */}
        <div className="mb-12">
          <h2 className="text-xl md:text-sm font-bold text-gray-700 mb-4">
            I want to see new customer stories in{" "}
            <div className="relative inline-block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-purple-600 underline decoration-2 underline-offset-8 decoration-purple-600 hover:text-purple-700 transition-colors inline-flex items-center gap-2"
              >
                {selectedCategory}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-10"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        selectedCategory === category
                          ? "text-purple-600 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </h2>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredStories.map((story, index) => (
            <motion.a
              key={story.id}
              href={story.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Image Section */}
              <div className="md:w-2/5 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                    {story.category.charAt(0).toUpperCase() +
                      story.category.slice(1)}
                  </span>
                </div>
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Section */}
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3 group-hover:text-purple-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-bold leading-relaxed">
                    {story.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="mt-6 flex items-center text-gray-900 group-hover:text-purple-600 transition-colors">
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors group"
          >
            View all customer stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  )
}