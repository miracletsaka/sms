import React from 'react';

export default function CTASection() {
  return (
    <div className="py-20 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Top CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl uppercase lg:text-5xl font-black text-gray-900 mb-4 max-w-4xl mx-auto" style={{
            fontFamily: "Sora', 'Space Grotesk', sans-serif",
            lineHeight: '1.3'
          }}>
            ALL you need is SMS
          </h2>

          {/* Large Button */}
          <div className="flex justify-center">
            <button className="relative bg-indigo-500 hover:bg-indigo-600 text-white px-32 py-8 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-2xl overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4">No credit card required</p>
        </div>

        {/* Bottom Section */}
        <div className="rounded-3xl p-12">
          <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8 text-center" style={{
            fontFamily: "'Sora', sans-serif",
            letterSpacing: '-0.02em'
          }}>
            MORE THAN AN AI-POWERED SCHOOL PLATFORM
          </h3>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Text */}
            <div>
              <p className="text-xs text-gray-700 font-bold max-w-2xl mx-auto" style={{
                fontFamily: "'Inter', sans-serif"
              }}>
                SMS eliminates the chaos! AI-powered Student Enrollment, Grade Management, Attendance Tracking, Fee Collection — everything you need. Our complete school management software helps you create stunning data-driven reports in minutes — no coding skills required.
              </p>
            </div>

            {/* Right Text */}
            <div>
              <p className="text-xs text-gray-700 font-bold max-w-2xl mx-auto" style={{
                fontFamily: "'Inter', sans-serif"
              }}>
                Worried about data security and professional management tools? With SMS, you can also add powerful automation, real-time analytics, parent communication, and student progress tracking — all in one platform.
              </p>
            </div>
          </div>

          {/* Device Mockups */}
          <div className="flex justify-center items-end gap-4">
            {/* Desktop */}
            <div className="relative w-[420px]">
              <div className="bg-gray-800 rounded-t-2xl p-3 pb-0">
                <div className="bg-white rounded-t-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&h=500&fit=crop" 
                    alt="Desktop Dashboard"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="h-6 bg-gray-800 rounded-b-2xl"></div>
            </div>

            {/* Laptop */}
            <div className="relative w-[480px] -ml-8">
              <div className="bg-gray-800 rounded-t-2xl p-3 pb-0">
                <div className="bg-white rounded-t-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop" 
                    alt="Laptop Dashboard"
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
              <div className="h-2 bg-gray-700"></div>
              <div className="h-6 bg-gray-800 rounded-b-2xl mx-auto" style={{ width: '90%' }}></div>
            </div>

            {/* Mobile */}
            <div className="relative w-[140px] -ml-8">
              <div className="bg-gray-800 rounded-[28px] p-2">
                <div className="bg-white rounded-[22px] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop" 
                    alt="Mobile App"
                    className="w-full h-72 object-cover"
                  />
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