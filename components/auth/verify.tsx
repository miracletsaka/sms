"use client"

import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function SchoolOnboarding() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8"
    style={{
      fontFamily: "'Sora', 'Space Grotesk', sans-serif",
      fontWeight: '900',
      letterSpacing: '-0.06em',
      lineHeight: '0.85',
    }}>
      <div className="max-w-6xl w-full">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
             <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-400 rounded-full mb-4">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4"
            style={{
                  fontFamily: "'Sora', 'Space Grotesk', sans-serif",
                  fontWeight: '900',
                  letterSpacing: '-0.06em',
                  lineHeight: '0.85',
                }}>Registration Submitted!</h2>
            
            <p className="text-xs text-gray-400 mb-8"
            style={{
                  fontFamily: "'Sora', 'Space Grotesk', sans-serif",
                  fontWeight: '900',
                  letterSpacing: '-0.06em',
                  lineHeight: '0.85',
                }}>
              Thank you for registering your institution with SMS
            </p>
            
            <div className="bg-gray-800/50 rounded-2xl p-8 text-left space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Next Steps:</h3>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-white">Application Review</div>
                    <div className="text-sm">Our team will review your institution's registration details within 24-48 hours</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-white">Verification Email</div>
                    <div className="text-sm">Once approved, you'll receive a verification email with a secure link</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Verification</div>
                    <div className="text-sm">Click the link in the email to verify your account and activate your institution's dashboard</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <Link href={'/'}>
                <button className="px-8 py-4 bg-teal-400 hover:bg-teal-500 text-gray-900 font-bold rounded-xl transition-colors duration-200 shadow-lg">
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Logo Card */}
            <div 
              className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 shadow-2xl transform transition-all duration-1000 ${
                animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center gap-4">
                <div className="font-bold text-gray-900">
                  <img src="/sms.png" alt="School Management System Logo"  />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">SCHOOL MANAGEMENT SYSTEM</h1>
              </div>
            </div>
            {/* AI Grade Engine Card */}
            <div 
              className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl transform transition-all duration-1000 ${
                animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="flex items-center gap-3">
                <div className="text-white">
                  <div className="text-2xl font-bold">The new</div>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    AI-
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-gray-900"></div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 border-2 border-gray-900"></div>
                    </div>
                    School
                  </div>
                  <div className="text-2xl font-bold">management</div>
                </div>
                <div className="ml-auto">
                  <div className="text-orange-500 text-4xl animate-pulse">✦</div>
                </div>
              </div>
            </div>
          </div>
        </div>       
      </div>
    </div>
  );
}