"use client"

import React, { useState } from 'react';
import {ArrowRight, Calendar, TrendingUp, AlertCircle, Award, Clock, Users, CheckCircle, Newspaper, Globe, Star, BookOpen, Trophy, TrendingDown, Menu, Search, Bell, Share2, Grid3x3, List } from 'lucide-react';
import TeacherCarousel from '@/components/instructor/teacher-curousel';
import StatsCarousel from '@/components/instructor/teacher-stats';
import { motion } from 'framer-motion'

export default function InstructorDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedTextClass = isDarkMode ? 'text-gray-400 text-xs font-bold' : 'text-xs font-bold text-gray-400';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverClass = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';

  const folders = [
    {
      id: 'courses',
      name: 'My Courses',
      items: 4,
      images: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=150&fit=crop',
      ],
    },
    {
      id: 'assignments',
      name: 'Assignments',
      items: 6,
      images: [],
    },
    {
      id: 'grades',
      name: 'Grade Books',
      items: 8,
      images: [],
    },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Conference', date: 'Dec 28, 2024', time: '2:00 PM - 5:00 PM', type: 'meeting', color: 'blue' },
    { id: 2, title: 'Final Exam - CS 101', date: 'Jan 5, 2025', time: '9:00 AM - 11:00 AM', type: 'exam', color: 'red' },
    { id: 3, title: 'Department Meeting', date: 'Dec 29, 2024', time: '3:30 PM - 4:30 PM', type: 'meeting', color: 'green' },
  ];

  const recentActivity = [
    { id: 1, student: 'Alice Johnson', action: 'submitted assignment', course: 'CS 101', time: '2 hours ago', icon: CheckCircle, color: 'green' },
    { id: 2, student: 'Bob Smith', action: 'requested grade review', course: 'CS 201', time: '5 hours ago', icon: AlertCircle, color: 'orange' },
    { id: 3, student: 'Carol Davis', action: 'completed quiz', course: 'CS 301', time: '1 day ago', icon: CheckCircle, color: 'green' },
  ];

  const topPerformers = [
    { id: 1, name: 'Emily Chen', course: 'CS 101', grade: '98%', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: 2, name: 'Michael Brown', course: 'CS 201', grade: '96%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { id: 3, name: 'Sarah Lee', course: 'CS 301', grade: '95%', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  ];

  const pendingTasks = [
    { id: 1, task: 'Grade CS 101 Midterm Exams', dueDate: 'Dec 26, 2024', count: 87, priority: 'high' },
    { id: 2, task: 'Review CS 201 Project Proposals', dueDate: 'Dec 27, 2024', count: 65, priority: 'medium' },
    { id: 3, task: 'Update CS 301 Lecture Materials', dueDate: 'Dec 28, 2024', count: 1, priority: 'low' },
  ];

  const educationNews = [
    { id: 1, title: 'New AI Integration Guidelines Released for Higher Education', source: 'Education Weekly', time: '3 hours ago', category: 'Technology', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop', excerpt: 'National education board announces comprehensive framework for AI tool usage in classrooms...' },
    { id: 2, title: 'Study Shows Remote Learning Effectiveness Varies by Subject', source: 'Academic Journal', time: '1 day ago', category: 'Research', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop', excerpt: 'Comprehensive study analyzing student performance across different learning modalities...' },
    { id: 3, title: 'Global Universities Adopt New Sustainability Curriculum Standards', source: 'World Education Forum', time: '2 days ago', category: 'Policy', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop', excerpt: 'Over 200 institutions worldwide commit to integrating climate education...' },
  ];

  const topSchools = [
    { id: 1, name: 'Stanford University', location: 'California, USA', ranking: 1, score: 98.5, change: 'up', category: 'Overall Excellence', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop' },
    { id: 2, name: 'MIT', location: 'Massachusetts, USA', ranking: 2, score: 97.8, change: 'same', category: 'Technology & Innovation', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=250&fit=crop' },
    { id: 3, name: 'Oxford University', location: 'England, UK', ranking: 3, score: 96.2, change: 'up', category: 'Research Impact', image: 'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=400&h=250&fit=crop' },
  ];

  const educationTrends = [
    { id: 1, trend: 'AI-Powered Learning Assistants', growth: '+245%', description: 'Adoption of AI tutoring systems in K-12', icon: TrendingUp, color: 'green' },
    { id: 2, trend: 'Micro-Credentials & Digital Badges', growth: '+189%', description: 'Alternative certification programs', icon: Award, color: 'blue' },
    { id: 3, trend: 'Hybrid Learning Models', growth: '+156%', description: 'Blended in-person and online education', icon: Globe, color: 'purple' },
    { id: 4, trend: 'Mental Health Programs', growth: '+134%', description: 'Student wellness initiatives', icon: Users, color: 'pink' },
  ];

  const educationBlogs = [
    { id: 1, title: '10 Strategies for Engaging Gen Z Students in 2025', author: 'Dr. Patricia Martinez', date: 'Dec 20, 2024', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop', tags: ['Teaching', 'Innovation'] },
    { id: 2, title: 'The Future of Assessment: Beyond Traditional Testing', author: 'Prof. James Anderson', date: 'Dec 18, 2024', readTime: '12 min read', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop', tags: ['Assessment', 'Reform'] },
    { id: 3, title: 'Building Inclusive Classrooms: A Practical Guide', author: 'Dr. Maya Patel', date: 'Dec 15, 2024', readTime: '10 min read', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop', tags: ['Diversity', 'Inclusion'] },
  ];

  const globalEducation = [
    { id: 1, country: 'Finland', initiative: 'Teacher Autonomy Program', impact: 'Increased student satisfaction by 34%', color: 'blue' },
    { id: 2, country: 'Singapore', initiative: 'STEM Excellence Framework', impact: 'Top 3 in global math rankings', color: 'green' },
    { id: 3, country: 'South Korea', initiative: 'Digital Literacy Curriculum', impact: '97% student tech proficiency', color: 'purple' },
  ];

  return (
    <div className={`${bgClass}`}>
      <TeacherCarousel />
         {/* Content */}
      <div className="p-6 overflow-auto">
        {/* Folders */}
        <div className="mb-8">
          <h1 className="text-sm font-bold text-gray-700 uppercase mb-4">For You</h1>
          <StatsCarousel />
        </div>

        {/* Upcoming Events */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <h1 className="text-sm font-bold text-gray-700 uppercase">Upcoming Events</h1>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
              >
                {/* Image Section with Event Type Badge */}
                <div className="md:w-2/5 relative overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`bg-${event.color}-100 px-3 py-1 rounded-full text-xs font-bold text-${event.color}-700 shadow-sm`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                  
                  {/* Event Icon/Illustration */}
                  <div className="w-full h-64 md:h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Calendar className={`w-24 h-24 text-${event.color}-300`} />
                  </div>
                  
                  {/* Color Indicator */}
                  <div className={`absolute bottom-4 left-4 w-3 h-3 rounded-full bg-${event.color}-500 animate-pulse`}></div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 mb-3 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    {/* Date and Time */}
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-400 text-xs font-bold flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </p>
                      <p className="text-gray-400 text-xs font-bold flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="mt-6 flex items-center text-gray-900 group-hover:text-purple-600 transition-colors">
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <h1 className="text-sm font-bold text-gray-700 uppercase">Recent Activity</h1>
          </div>
          <div className={`${cardBgClass} border ${borderClass} rounded-xl overflow-hidden`}>
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className={`p-4 flex items-center gap-3 ${hoverClass} ${index !== recentActivity.length - 1 ? `border-b ${borderClass}` : ''}`}>
                <div className={`w-8 h-8 rounded-full bg-${activity.color}-100 flex items-center justify-center`}>
                  <activity.icon className={`w-4 h-4 text-${activity.color}-500`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{activity.student} <span className="font-normal">{activity.action}</span></p>
                  <p className={`text-xs ${mutedTextClass}`}>{activity.course} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-yellow-500" />
            <h1 className="text-sm font-bold text-gray-700 uppercase">Top Performers This Month</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className={`${cardBgClass} border ${borderClass} rounded-xl p-4 ${hoverClass} cursor-pointer`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{index + 1}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{student.name}</h3>
                    <p className={`text-xs ${mutedTextClass}`}>{student.course}</p>
                  </div>
                  <p className="text-lg font-black text-green-600">{student.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <h1 className="text-sm font-bold text-gray-700 uppercase">Pending Tasks</h1>
          </div>
          <div className={`${cardBgClass} border ${borderClass} rounded-xl overflow-hidden`}>
            {pendingTasks.map((task, index) => (
              <div key={task.id} className={`p-4 flex items-center gap-3 ${hoverClass} ${index !== pendingTasks.length - 1 ? `border-b ${borderClass}` : ''}`}>
                <div className={`w-1 h-12 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{task.task}</h3>
                  <p className={`text-xs ${mutedTextClass}`}>Due: {task.dueDate} • {task.count} items</p>
                </div>
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-600">Start</button>
              </div>
            ))}
          </div>
        </div>

        {/* Education News */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-4 h-4 text-blue-500" />
            <h1 className="text-sm font-bold text-gray-700 uppercase">Education News & Updates</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {educationNews.map((news) => (
              <div key={news.id} className={`${cardBgClass} border ${borderClass} rounded-xl overflow-hidden ${hoverClass} cursor-pointer`}>
                <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700">{news.category}</span>
                  <h3 className="font-bold text-sm mt-2 mb-2">{news.title}</h3>
                  <p className={`text-xs ${mutedTextClass} mb-2`}>{news.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className={`text-xs ${mutedTextClass}`}>{news.source}</p>
                    <p className={`text-xs ${mutedTextClass}`}>{news.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Schools */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <h1 className="text-sm font-bold text-gray-700 uppercase">Top Global Schools 2024</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSchools.map((school) => (
              <div key={school.id} className={`${cardBgClass} border ${borderClass} rounded-xl overflow-hidden ${hoverClass} cursor-pointer`}>
                <img src={school.image} alt={school.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">#{school.ranking}</div>
                      <div>
                        <h3 className="font-bold text-sm">{school.name}</h3>
                        <p className={`text-xs ${mutedTextClass}`}>{school.location}</p>
                      </div>
                    </div>
                    {school.change === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs ${mutedTextClass}`}>{school.category}</span>
                    <span className="text-lg font-black text-indigo-600">{school.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Blogs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-green-500" />
            <h1 className="text-sm font-bold text-gray-700 uppercase">Featured Education Blogs</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {educationBlogs.map((blog) => (
              <div key={blog.id} className={`${cardBgClass} border ${borderClass} rounded-xl overflow-hidden ${hoverClass} cursor-pointer`}>
                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {blog.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm mb-2">{blog.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className={`text-xs ${mutedTextClass}`}>{blog.author}</p>
                    <p className={`text-xs ${mutedTextClass}`}>{blog.readTime}</p>
                  </div>
                  <p className={`text-xs ${mutedTextClass} mt-1`}>{blog.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Education */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-indigo-500" />
            <h1 className="text-sm font-bold text-gray-700 uppercase">Global Education Initiatives</h1>
          </div>
          <div className={`${cardBgClass} border ${borderClass} rounded-xl overflow-hidden`}>
            {globalEducation.map((item, index) => (
              <div key={item.id} className={`p-4 flex items-center gap-3 ${hoverClass} ${index !== globalEducation.length - 1 ? `border-b ${borderClass}` : ''}`}>
                <div className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center`}>
                  <Star className={`w-6 h-6 text-${item.color}-500`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm">{item.country}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${item.color}-100 text-${item.color}-700`}>Success Story</span>
                  </div>
                  <p className="text-sm mb-1">{item.initiative}</p>
                  <p className={`text-xs ${mutedTextClass}`}>Impact: {item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}