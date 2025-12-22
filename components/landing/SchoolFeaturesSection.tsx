import React, { useState } from 'react';

export default function SchoolFeaturesSection() {
  type TabId = 'students' | 'teachers' | 'academics' | 'finance';
  type Card = { type: string; bgColor: string; content: React.ReactNode };
  type ContentGroup = { title: string; description: string; cards: Card[] };

  const [activeTab, setActiveTab] = useState<TabId>('students');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'students', label: 'Student Management' },
    { id: 'teachers', label: 'Teachers & Staff' },
    { id: 'academics', label: 'Academic Operations' },
    { id: 'finance', label: 'Finance' }
  ];

  const content: Record<TabId, ContentGroup> = {
    students: {
      title: '4x faster student enrollment with digital onboarding',
      description: 'SMS makes it easy to register students, track their progress, and communicate with parents in real-time.',
      cards: [
        {
          type: 'visual',
          bgColor: 'bg-indigo-500',
          content: (
            <div className="relative h-full rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop" 
                alt="Students"
                className="w-full h-full object-cover"
              />
              {/* grass like bg */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="rounded-lg p-2 inline-block">
                  <span className="text-white font-bold text-xs">TRACKING STUDENT PROGRESS</span>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    teachers: {
      title: '3x improvement in teacher efficiency with smart scheduling',
      description: 'Automate teacher assignments, track performance, and manage workload distribution seamlessly.',
      cards: [
        {
          type: 'visual',
          bgColor: 'bg-purple-500',
          content: (
            <div className="relative h-full rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop" 
                alt="Teachers"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="text-white font-bold text-xs">
                  <span className="text-white font-bold text-xs">TEACHER PERFORMANCE</span>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    academics: {
      title: '5x faster report card generation with automated grading',
      description: 'Generate comprehensive academic reports, track attendance, and monitor student performance effortlessly.',
      cards: [
        {
          type: 'visual',
          bgColor: 'bg-blue-500',
          content: (
            <div className="relative h-full rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop" 
                alt="Academic"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="text-white font-bold text-xs">
                  <span className="text-white font-bold text-xs">AUTOMATED GRADING</span>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    finance: {
      title: '10x easier fee collection with automated payment tracking',
      description: 'Manage school finances, track payments, generate invoices, and send automated reminders.',
      cards: [
        {
          type: 'visual',
          bgColor: 'bg-green-500',
          content: (
            <div className="relative h-full rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop" 
                alt="Finance"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="text-white font-bold text-xs">
                  <span className="text-white font-bold text-xs">PAYMENT TRACKING</span>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  };

  const activeContent = content[activeTab];

  return (
    <div className="bg-gray-100 py-20 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 max-w-4xl mx-auto" style={{
            fontFamily: "'Sora', 'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em'
          }}>
            AN <span className="text-indigo-600">END-TO-END</span> SCHOOL MANAGEMENT
            <br />
            FOR YOUR INSTITUTION
          </h2>
          <p className="text-sm lg:text-base font-bold text-gray-600 max-w-2xl mx-auto mb-5">
            Talking student enrollment, engaging parent communication, compelling report cards. SMS helps you make an impact – whatever your use case.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-bold text-xs text-gray-700 transition-all bg-white ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'bg-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Cards */}
          <div className="space-y-6">
            {activeContent.cards.map((card, index) => (
              <div
                key={index}
                className={`${card.bgColor} rounded-2xl overflow-hidden ${
                  card.type === 'visual' ? 'h-80' : 'h-64'
                } shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
              >
                {card.content}
              </div>
            ))}
          </div>

          {/* Right Side - Description */}
          <div className="lg:sticky lg:top-8">
            <h3 className="text-3xl lg:text-4xl text-gray-900 mb-6" style={{
              fontFamily: "'Inter', sans-serif",
              lineHeight: '1.2'
            }}>
              {activeContent.title}
            </h3>
            <p className="text-sm lg:text-base font-bold text-gray-600 max-w-2xl mx-auto mb-5">
              {activeContent.description}
            </p>
            <button className="bg-indigo-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-600 transition-all hover:scale-105 shadow-lg">
              Learn More →
            </button>
          </div>
        </div>
      </div>

      {/* Font Loading */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
}