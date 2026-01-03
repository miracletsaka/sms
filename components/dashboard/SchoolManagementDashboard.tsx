import React, { useState } from 'react';
import { Card } from "@/components/ui/card"
import {
  TrendingUp,
  Award,
} from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from "recharts"
const SchoolManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('teachers');

  const tabs = [
    { id: 'teachers', label: 'Teachers' },
    { id: 'students', label: 'Students' },
    { id: 'classes', label: 'Classes' },
    { id: 'departments', label: 'Departments' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'performance', label: 'Performance' }
  ];

  const classDistribution = [
    { grade: "Grade 1-3", count: 320, color: "#3b82f6" },
    { grade: "Grade 4-6", count: 380, color: "#8b5cf6" },
    { grade: "Grade 7-9", count: 290, color: "#10b981" },
    { grade: "Grade 10-12", count: 244, color: "#f59e0b" },
  ]

  const teachersData = {
    total: 156,
    departments: [
      { name: 'Mathematics', count: 24, status: 'active', avgExperience: '8.5 years' },
      { name: 'Science', count: 28, status: 'active', avgExperience: '7.2 years' },
      { name: 'English', count: 22, status: 'active', avgExperience: '9.1 years' },
      { name: 'Social Studies', count: 18, status: 'active', avgExperience: '6.8 years' },
      { name: 'Physical Education', count: 12, status: 'active', avgExperience: '5.4 years' },
      { name: 'Arts', count: 15, status: 'active', avgExperience: '7.9 years' },
      { name: 'Music', count: 10, status: 'active', avgExperience: '10.2 years' },
      { name: 'Computer Science', count: 14, status: 'active', avgExperience: '4.6 years' },
      { name: 'Languages', count: 13, status: 'active', avgExperience: '8.8 years' }
    ],
    qualifications: [
      { level: 'PhD', count: 28 },
      { level: 'Masters', count: 89 },
      { level: 'Bachelors', count: 39 }
    ],
    contracts: [
      { type: 'Full-time', count: 132 },
      { type: 'Part-time', count: 18 },
      { type: 'Contract', count: 6 }
    ]
  };

  const studentsData = {
    total: 2847,
    byGrade: [
      { grade: 'Grade 1', students: 245, classes: 8, capacity: '95%' },
      { grade: 'Grade 2', students: 238, classes: 8, capacity: '92%' },
      { grade: 'Grade 3', students: 242, classes: 8, capacity: '94%' },
      { grade: 'Grade 4', students: 251, classes: 8, capacity: '97%' },
      { grade: 'Grade 5', students: 239, classes: 8, capacity: '93%' },
      { grade: 'Grade 6', students: 248, classes: 8, capacity: '96%' },
      { grade: 'Grade 7', students: 244, classes: 8, capacity: '95%' },
      { grade: 'Grade 8', students: 235, classes: 8, capacity: '91%' },
      { grade: 'Grade 9', students: 229, classes: 7, capacity: '89%' },
      { grade: 'Grade 10', students: 222, classes: 7, capacity: '86%' },
      { grade: 'Grade 11', students: 231, classes: 7, capacity: '90%' },
      { grade: 'Grade 12', students: 223, classes: 7, capacity: '87%' }
    ],
    demographics: [
      { category: 'Male', count: 1456, percentage: '51%' },
      { category: 'Female', count: 1391, percentage: '49%' }
    ],
    enrollment: [
      { status: 'Active', count: 2789 },
      { status: 'On Leave', count: 43 },
      { status: 'Transferred', count: 15 }
    ]
  };

  const attendanceData = [
  { day: "Mon", rate: 92 },
  { day: "Tue", rate: 95 },
  { day: "Wed", rate: 88 },
  { day: "Thu", rate: 94 },
  { day: "Fri", rate: 90 },
]

  const classesData = {
    total: 94,
    schedule: [
      { section: 'Primary (Grades 1-5)', classes: 40, avgSize: 30, sessions: 'Morning' },
      { section: 'Middle (Grades 6-8)', classes: 24, avgSize: 31, sessions: 'Morning' },
      { section: 'High (Grades 9-12)', classes: 30, avgSize: 29, sessions: 'Morning & Afternoon' }
    ],
    subjects: [
      { name: 'Core Subjects', classes: 376, hours: '1,880/week' },
      { name: 'Electives', classes: 142, hours: '568/week' },
      { name: 'Extracurricular', classes: 89, hours: '267/week' }
    ],
    classrooms: [
      { type: 'Standard Classroom', count: 68, status: 'occupied' },
      { type: 'Science Lab', count: 8, status: 'occupied' },
      { type: 'Computer Lab', count: 6, status: 'occupied' },
      { type: 'Art Studio', count: 4, status: 'occupied' },
      { type: 'Music Room', count: 3, status: 'occupied' },
      { type: 'Multipurpose', count: 5, status: 'occupied' }
    ]
  };

  const departmentsData = {
    total: 12,
    academic: [
      { name: 'Mathematics Department', staff: 24, head: 'Dr. Sarah Mitchell', budget: '$245,000' },
      { name: 'Science Department', staff: 28, head: 'Prof. James Chen', budget: '$298,000' },
      { name: 'Humanities Department', staff: 35, head: 'Dr. Emily Rodriguez', budget: '$312,000' },
      { name: 'Languages Department', staff: 19, head: 'Ms. Maria Santos', budget: '$189,000' },
      { name: 'Arts Department', staff: 18, head: 'Mr. David Thompson', budget: '$156,000' },
      { name: 'Physical Education', staff: 12, head: 'Coach Robert Williams', budget: '$134,000' }
    ],
    administrative: [
      { name: 'Administration', staff: 15, head: 'Principal Karen Johnson' },
      { name: 'Student Affairs', staff: 8, head: 'Dr. Michael Brown' },
      { name: 'IT Services', staff: 6, head: 'Mr. Alex Kumar' },
      { name: 'Facilities Management', staff: 22, head: 'Mr. Thomas Anderson' },
      { name: 'Library Services', staff: 7, head: 'Ms. Jennifer Lee' },
      { name: 'Counseling Services', staff: 9, head: 'Dr. Patricia Martinez' }
    ]
  };

  const facilitiesData = {
    buildings: [
      { name: 'Main Academic Building', floors: 4, rooms: 45, status: 'operational', capacity: '1,200 students' },
      { name: 'Science & Technology Wing', floors: 3, rooms: 24, status: 'operational', capacity: '600 students' },
      { name: 'Arts & Culture Center', floors: 2, rooms: 18, status: 'operational', capacity: '400 students' },
      { name: 'Sports Complex', floors: 2, rooms: 12, status: 'operational', capacity: '500 students' },
      { name: 'Administration Block', floors: 3, rooms: 28, status: 'operational', capacity: 'Staff only' }
    ],
    amenities: [
      { name: 'Library', area: '3,500 sq ft', capacity: '200 students', status: 'available' },
      { name: 'Auditorium', area: '5,200 sq ft', capacity: '800 seats', status: 'available' },
      { name: 'Cafeteria', area: '4,800 sq ft', capacity: '600 students', status: 'available' },
      { name: 'Indoor Sports Hall', area: '8,000 sq ft', capacity: '300 students', status: 'available' },
      { name: 'Swimming Pool', area: '2,500 sq ft', capacity: '50 students', status: 'available' },
      { name: 'Science Labs', area: '6,400 sq ft', capacity: '240 students', status: 'available' },
      { name: 'Computer Labs', area: '3,600 sq ft', capacity: '180 students', status: 'available' },
      { name: 'Medical Center', area: '1,200 sq ft', capacity: '25 students', status: 'available' }
    ],
    outdoor: [
      { name: 'Football Field', status: 'available' },
      { name: 'Basketball Courts (3)', status: 'available' },
      { name: 'Tennis Courts (2)', status: 'available' },
      { name: 'Track & Field', status: 'available' },
      { name: 'Playground Areas (4)', status: 'available' }
    ]
  };

  const performanceData = {
    academic: [
      { metric: 'Overall GPA Average', value: '3.42', trend: '+0.08', period: 'vs last year' },
      { metric: 'Graduation Rate', value: '96.8%', trend: '+2.1%', period: 'vs last year' },
      { metric: 'College Acceptance', value: '89.4%', trend: '+3.7%', period: 'vs last year' },
      { metric: 'Attendance Rate', value: '94.2%', trend: '+1.3%', period: 'vs last year' }
    ],
    achievements: [
      { category: 'National Math Olympiad', awards: 'Gold: 3, Silver: 7, Bronze: 12', year: '2024' },
      { category: 'Science Fair Awards', awards: '1st Place: 5, 2nd Place: 8', year: '2024' },
      { category: 'Sports Championships', awards: 'State: 4, Regional: 9', year: '2024' },
      { category: 'Arts Competitions', awards: 'Gold: 6, Silver: 11', year: '2024' },
      { category: 'Debate Competitions', awards: 'Winners: 8, Finalists: 14', year: '2024' }
    ],
    standardizedTests: [
      { test: 'SAT Average', score: '1,285', percentile: '87th', benchmark: 'Above national avg' },
      { test: 'ACT Average', score: '28.4', percentile: '89th', benchmark: 'Above national avg' },
      { test: 'State Assessment', score: '82.6%', percentile: '91st', benchmark: 'Exemplary' }
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'teachers':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Total Teachers</p>
                <p className="text-3xl font-bold text-gray-800">{teachersData.total}</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Avg Experience</p>
                <p className="text-3xl font-bold text-gray-800">7.6 yrs</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Student-Teacher Ratio</p>
                <p className="text-3xl font-bold text-gray-800">18:1</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-600 uppercase">Department Distribution</h3>
                <span className="text-xs font-bold text-gray-400">{teachersData.departments.length} Departments</span>
              </div>
              <div className="space-y-2">
                {teachersData.departments.map((dept, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">{dept.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-gray-500">{dept.avgExperience}</span>
                      <span className="text-xs font-bold text-gray-600">{dept.count} teachers</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">{dept.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Qualifications</h3>
                <div className="space-y-2">
                  {teachersData.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs font-bold text-gray-700">{qual.level}</span>
                      <span className="text-xs font-bold text-gray-600">{qual.count} teachers</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Employment Type</h3>
                <div className="space-y-2">
                  {teachersData.contracts.map((contract, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs font-bold text-gray-700">{contract.type}</span>
                      <span className="text-xs font-bold text-gray-600">{contract.count} teachers</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-800">{studentsData.total}</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Active Enrollment</p>
                <p className="text-3xl font-bold text-gray-800">98%</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Avg Class Size</p>
                <p className="text-3xl font-bold text-gray-800">30</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-600 uppercase">Grade Level Distribution</h3>
                <span className="text-xs font-bold text-gray-400">{studentsData.byGrade.length} Grade Levels</span>
              </div>
              <div className="space-y-2">
                {studentsData.byGrade.map((grade, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">{grade.grade}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-gray-500">{grade.classes} classes</span>
                      <span className="text-xs font-bold text-gray-600">{grade.students} students</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">{grade.capacity} capacity</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Demographics</h3>
                <div className="space-y-2">
                  {studentsData.demographics.map((demo, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs font-bold text-gray-700">{demo.category}</span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-600 block">{demo.count} students</span>
                        <span className="text-xs text-gray-500">{demo.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Enrollment Status</h3>
                <div className="space-y-2">
                  {studentsData.enrollment.map((enroll, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs font-bold text-gray-700">{enroll.status}</span>
                      <span className="text-xs font-bold text-gray-600">{enroll.count} students</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
             <Card className="bg-transparent border-none p-6 shadow-none transition-all lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-600 mb-1 uppercase" style={{ fontFamily: "Cambria, serif" }}>
                Weekly Attendance Rate
              </h3>
              <p className="text-xs font-bold text-gray-600" style={{ fontFamily: "Cambria, serif" }}>
                Average attendance across all classes
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" style={{ fontFamily: "Cambria, serif", fontSize: 12 }} />
              <YAxis stroke="#6b7280" style={{ fontFamily: "Cambria, serif", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontFamily: "Cambria, serif",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRate)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
          </div>
        );

      case 'classes':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Total Classes</p>
                <p className="text-3xl font-bold text-gray-800">{classesData.total}</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Weekly Sessions</p>
                <p className="text-3xl font-bold text-gray-800">607</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Total Hours/Week</p>
                <p className="text-3xl font-bold text-gray-800">2,715</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Schedule Overview</h3>
              <div className="space-y-2">
                {classesData.schedule.map((schedule, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">{schedule.section}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-gray-500">Avg size: {schedule.avgSize}</span>
                      <span className="text-xs font-bold text-gray-600">{schedule.classes} classes</span>
                      <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-bold">{schedule.sessions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Subject Categories</h3>
              <div className="space-y-2">
                {classesData.subjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs font-bold text-gray-700">{subject.name}</span>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-gray-500">{subject.hours}</span>
                      <span className="text-xs font-bold text-gray-600">{subject.classes} sessions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Classroom Utilization</h3>
              <div className="space-y-2">
                {classesData.classrooms.map((room, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs font-bold text-gray-700">{room.type}</span>
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-bold text-gray-600">{room.count} rooms</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold capitalize">{room.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                    {/* Class distribution */}
        <Card className="bg-transparent border-none p-6 shadow-none transition-all">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-600 mb-1 uppercase" style={{ fontFamily: "Cambria, serif" }}>
              Class Distribution
            </h3>
            <p className="text-xs font-bold text-gray-600" style={{ fontFamily: "Cambria, serif" }}>
              Students by grade level
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={classDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {classDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  fontFamily: "Cambria, serif",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {classDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-700" style={{ fontFamily: "Cambria, serif" }}>
                    {item.grade}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900" style={{ fontFamily: "Cambria, serif" }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </Card>
          </div>
        );

      case 'departments':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Total Departments</p>
                <p className="text-3xl font-bold text-gray-800">{departmentsData.total}</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Academic Depts</p>
                <p className="text-3xl font-bold text-gray-800">{departmentsData.academic.length}</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Admin Depts</p>
                <p className="text-3xl font-bold text-gray-800">{departmentsData.administrative.length}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Academic Departments</h3>
              <div className="space-y-2">
                {departmentsData.academic.map((dept, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-bold text-gray-700">{dept.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-600">{dept.staff} staff</span>
                    </div>
                    <div className="flex items-center justify-between pl-5">
                      <span className="text-xs text-gray-500">Head: {dept.head}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold">{dept.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Administrative Departments</h3>
              <div className="space-y-2">
                {departmentsData.administrative.map((dept, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-xs font-bold text-gray-700">{dept.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-600">{dept.staff} staff</span>
                    </div>
                    <div className="pl-5">
                      <span className="text-xs text-gray-500">Head: {dept.head}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'facilities':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Buildings</p>
                <p className="text-3xl font-bold text-gray-800">{facilitiesData.buildings.length}</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Indoor Amenities</p>
                <p className="text-3xl font-bold text-gray-800">{facilitiesData.amenities.length}</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Outdoor Facilities</p>
                <p className="text-3xl font-bold text-gray-800">{facilitiesData.outdoor.length}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Building Infrastructure</h3>
              <div className="space-y-2">
                {facilitiesData.buildings.map((building, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-xs font-bold text-gray-700">{building.name}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold capitalize">{building.status}</span>
                    </div>
                    <div className="flex items-center justify-between pl-5">
                      <span className="text-xs text-gray-500">{building.floors} floors • {building.rooms} rooms</span>
                      <span className="text-xs font-bold text-gray-600">{building.capacity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Indoor Amenities</h3>
              <div className="space-y-2">
                {facilitiesData.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">{amenity.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-gray-500">{amenity.area}</span>
                      <span className="text-xs text-gray-500">{amenity.capacity}</span>
                      <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full font-bold capitalize">{amenity.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Outdoor Facilities</h3>
              <div className="space-y-2">
                {facilitiesData.outdoor.map((outdoor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">{outdoor.name}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold capitalize">{outdoor.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {performanceData.academic.map((metric, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-1">{metric.metric}</p>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-bold text-green-600">{metric.trend}</span>
                    <span className="text-xs text-gray-500">{metric.period}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Academic Achievements (2024)</h3>
              <div className="space-y-2">
                {performanceData.achievements.map((achievement, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-gray-700">{achievement.category}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded font-bold">{achievement.year}</span>
                    </div>
                    <div className="pl-7">
                      <span className="text-xs text-gray-600">{achievement.awards}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-600 uppercase mb-4">Standardized Test Performance</h3>
              <div className="space-y-2">
                {performanceData.standardizedTests.map((test, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-xs font-bold text-gray-700">{test.test}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{test.score}</span>
                    </div>
                    <div className="flex items-center justify-between pl-5">
                      <span className="text-xs text-gray-500">{test.percentile} percentile</span>
                      <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded font-bold">{test.benchmark}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="mb-8">
        <h1 className="text-sm font-bold text-gray-600 mb-2">School Management System</h1>
        <p className="text-xs font-bold text-gray-400 max-w-2xl">
          Comprehensive overview of institutional operations across {tabs.length} key areas, managing 2,847 students, 156 teachers, and 94 classes with state-of-the-art facilities and exceptional academic performance.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default SchoolManagementDashboard;