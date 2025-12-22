import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "I love using SMS. The grade tracking is the most accurate I've seen on the market.",
      highlight: "It's helped take my teaching to the next level.",
      author: "Sarah Mitchell",
      position: "High School Principal, Greenwood Academy",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      logo: "🏫"
    },
    {
      quote: "I used SMS to manage attendance, generate reports, and communicate with parents in one spot.",
      highlight: "I can now do this all in one spot with SMS.",
      author: "Michael Chen",
      position: "Academic Director, Riverside International School",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      logo: "📚"
    },
    {
      quote: "SMS has simplified my entire workflow. From student enrollment to fee collection, everything is seamless and efficient.",
      highlight: "It's a game changer for school administration.",
      author: "Dr. Jennifer Martinez",
      position: "Superintendent, Lakeside School District",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      logo: "🎓"
    },
    {
      quote: "The parent communication features have transformed how we engage with families. Real-time updates and easy messaging make a huge difference.",
      highlight: "Parents love the transparency and instant access.",
      author: "Robert Thompson",
      position: "IT Director, Oakmont Elementary",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      logo: "💼"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gray-100 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-sm font-black text-gray-700 mb-4 max-w-2xl" style={{
            fontFamily: "'Sora', 'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em'
          }}>
            LOVED BY EDUCATORS.
          </h2>
          <h3 className="text-5xl font-black text-gray-900 max-w-xl" style={{
            fontFamily: "'Sora', 'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em',
          }}>
            LOVED BY THE FORTUNE
          </h3>
          <h3 className="text-5xl lg:text-6xl font-black" style={{
            fontFamily: "'Sora', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 50%, #C084FC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            500
          </h3>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="bg-white rounded-3xl p-12">
                    <div className="max-w-3xl">
                      {/* Quote */}
                      <div className="mb-8">
                        <span className=" text-gray-300 font-serif">"</span>
                        <p className="text-sm text-gray-700 font-bold mb-4" style={{
                          fontFamily: "'Inter', sans-serif",
                          lineHeight: '1.4'
                        }}>
                          {testimonial.quote}{' '}
                          <span className="text-indigo-500 font-semibold">
                            {testimonial.highlight}
                          </span>
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                          />
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-2xl">{testimonial.logo}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">
                            {testimonial.author}
                          </h4>
                          <p className="text-gray-600 text-xs">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-indigo-500' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Font Loading */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@900&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}