import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const SMSFooter = () => {
  return (
    <div className="max-w-6xl p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          I want to <span className="text-purple-600 underline decoration-purple-600">start using SMS</span>
        </h2>
      </div>

      {/* Cards Section */}
      <div className="grid  lg:grid-cols-2 gap-6 mb-8">
        {/* Card 1 - Getting Started */}
        <div className="bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Getting Started with SMS</h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            Begin your journey with our School Management System by completing essential onboarding tasks. These tutorials will guide you through creating student profiles, setting up class schedules, configuring grade levels, managing teacher assignments, and understanding the core navigation across all modules of the platform.
          </p>
          <button className="flex items-center text-xs font-bold text-gray-800 hover:text-gray-900">
            <span className="mr-2">→</span>
          </button>
        </div>

        {/* Card 2 - Documentation */}
        <div className="bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Explore SMS Documentation</h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            Find comprehensive user guides, step-by-step tutorials, video walkthroughs, SDK documentation, API references & CLI tools for all SMS features including student enrollment, attendance tracking, gradebook management, parent communication, report generation, and administrative functions in the system.
          </p>
          <button className="flex items-center text-xs font-bold text-gray-800 hover:text-gray-900">
            <span className="mr-2">→</span>
          </button>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-400 rounded-lg p-8">
        <div className="grid lg:grid-cols-2 items-center justify-between">
          <div className="max-w-lg">
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Do you like SMS?
            </h3>
            <p className="text-xs text-gray-800 font-normal">
              Let us know so we can improve the quality of the content on our platform
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-3">
            <button className="px-8 py-3 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg">
              Yes
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button className="px-8 py-3 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg">
              No
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSFooter;