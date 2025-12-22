import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navigation } from '../nav/navigation';

export default function SmsHero() {
  const words = [ 'SMART', 'EFFICIENCY', 'SIMPLICITY'];
  const [currentWord, setCurrentWord] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-blue-50/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center mt-5 text-center px-8">
          
          <div className="max-w-7xl mx-auto">
            
            {/* Animated Word */}
            <div className="relative  flex items-center justify-center overflow-hidden ">           
              <h1 
                className={`text-6xl lg:text-[160px] font-black text-[#1a1a1a] transition-all duration-300 bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center font-bold text-zinc-700  ${
                  isFlipping ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
                }`}
                style={{
                  fontFamily: "'Sora', 'Space Grotesk', sans-serif",
                  fontWeight: '900',
                  letterSpacing: '-0.06em',
                  lineHeight: '0.85',
                }}
              >
                {words[currentWord]}
              </h1>
            </div>
            
            {/* Subtitle - Extra Tight & Small */}
            <p 
              className="text-sm lg:text-base font-bold text-gray-600 max-w-2xl mx-auto mb-5 "
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
                letterSpacing: '-0.02em',
                lineHeight: '1.3',
              
              }}
            >
              All-in-one system helps schools go digital, save time, and relax.
            </p>

            <button className="bg-indigo-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-indigo-600 transition-all hover:scale-105 shadow-lg mb-6">
              Start for free →
            </button>

            <div className="flex items-center justify-center gap-6 text-xs font-bold text-gray-400">
              <span>* No credit card required</span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Premium features
              </span>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
      <div className="flex items-center justify-center gap-3 px-8 flex-wrap mt-5">

          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="text-gray-600">👨‍🎓</span>
            Student Portal
          </div>
          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="text-gray-600">💰</span>
            Fee Management
          </div>
          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="text-gray-600">📱</span>
            Parent App
          </div>
          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="text-gray-600">📝</span>
            Attendance Tracking
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 px-8 flex-wrap">
          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="bg-indigo-500 text-white px-2 py-1 rounded text-xs font-bold">📚</span>
            Library Management
          </div>
          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="text-gray-600">📊</span>
            Report Generation
          </div>
          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="text-gray-600">✏️</span>
            Grade Recording
          </div>
          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="text-gray-600">🏫</span>
            Class Scheduling
          </div>
          <div className="bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-400 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm border border-gray-200">
            <span className="text-gray-600">👨‍🎓</span>
            Student Portal
          </div>
        </div>

        <div className="text-center text-xs font-bold text-gray-400 pb-6">
          Manage your entire school in just a click with our <a href="#" className="text-indigo-500 hover:underline">AI-Powered Platform</a>
        </div>
      </div>

      {/* Font Loading */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800;900&family=Sora:wght@900&family=Inter:wght@400;500;600&display=swap');
      `}</style>
    </div>
  );
}