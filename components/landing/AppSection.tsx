import React from 'react';

export default function AppSection() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="px-10 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 max-w-4xl mx-auto" style={{
                fontFamily: "'Sora', 'Space Grotesk', sans-serif",
                letterSpacing: '-0.02em'
            }}>
              PRO-LEVEL MANAGEMENT,
            </h2>
            <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 max-w-4xl mx-auto" style={{
              fontFamily: "'Sora', 'Space Grotesk', sans-serif",
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              IN YOUR POCKET
            </h3>
            
            <p className="text-sm lg:text-base font-bold text-gray-600 max-w-2xl mx-auto mb-5" style={{
              fontFamily: "Sora', 'Space Grotesk', sans-serif"
            }}>
              Your phone is the ultimate school management tool. Track attendance, grades, and communicate with parents using SMS Mobile App.
            </p>

            {/* Stats Card */}
            <div className="bg-white rounded-3xl p-8 mb-8 inline-block">
              <div className="flex items-center gap-8">
                {/* Rating */}
                <div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-black text-gray-900">4.9</span>
                    <span className="text-xl text-gray-500">/5</span>
                  </div>
                  <p className="text-sm lg:text-base font-bold text-gray-600 max-w-2xl mx-auto mb-5">based on 6.7k reviews</p>
                </div>

                {/* Divider */}
                <div className="w-px h-16 bg-gray-200"></div>

                {/* Users */}
                <div>
                  <div className="text-5xl font-black text-gray-900 mb-2">4M</div>
                  <p className="text-sm lg:text-base font-bold text-gray-600 max-w-2xl mx-auto mb-5">users around the world</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-indigo-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-600 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
              Explore More →
            </button>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[340px] h-[680px] bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200 rounded-[50px] p-3 shadow-2xl">
                <div className="w-full h-full bg-gray-900 rounded-[42px] overflow-hidden relative">
                  {/* Phone Content - Dashboard Screenshot */}
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=800&fit=crop" 
                      alt="School Dashboard"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay UI Elements */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40">
                      {/* Top Bar */}
                      <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-6">
                        <div className="flex gap-3">
                          <button className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">←</span>
                          </button>
                          <button className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">↻</span>
                          </button>
                          <button className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">↺</span>
                          </button>
                        </div>
                        <button className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">✓</span>
                        </button>
                      </div>

                      {/* Right Side Menu */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-6">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">⚙️</span>
                          </div>
                          <span className="text-white text-xs font-semibold">Format</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">🎵</span>
                          </div>
                          <span className="text-white text-xs font-semibold">Audio</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">🌐</span>
                          </div>
                          <span className="text-white text-xs font-semibold">EN (US)</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">✏️</span>
                          </div>
                          <span className="text-white text-xs font-semibold">Style</span>
                        </div>
                      </div>

                      {/* Center Play Button */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-20 bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="text-white text-3xl ml-1">▶</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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