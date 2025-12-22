"use client"

import { useState } from "react"
import { MenuItem } from "./menu-item"
import { MobileMenu } from "./mobile-menu"
import { Sparkles, Building2, DollarSign, Menu, X } from "lucide-react"
import Link from "next/link"

const ProductItem = ({
  title,
  description,
  href,
  imageQuery,
  bgColor,
}: {
  title: string
  description: string
  href: string
  imageQuery: string
  bgColor: string
}) => {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300 h-full"
    >
      <div className={`absolute inset-0 ${bgColor} opacity-90`} />
      <img
        src={`/.jpg?height=200&width=300&query=${imageQuery}`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
      />
      <div className="relative p-4 h-full flex flex-col justify-end">
        <h4 className="text-sm font-bold mb-1 text-white group-hover:translate-x-1 transition-transform">
          {title}
        </h4>
        <p className="text-xs text-white/90 leading-relaxed">{description}</p>
      </div>
    </a>
  )
}

const SimpleLink = ({
  title,
  description,
  href,
  imageQuery,
  bgColor,
}: {
  title: string
  description?: string
  href: string
  imageQuery: string
  bgColor: string
}) => {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
    >
      <div className={`shrink-0 w-12 h-12 rounded-lg ${bgColor} overflow-hidden relative`}>
        <img
          src={`/.jpg?height=100&width=100&query=${imageQuery}`}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </div>
        {description && <div className="text-xs text-gray-500 mt-0.5">{description}</div>}
      </div>
    </a>
  )
}

export function Navigation() {
  const [active, setActive] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="bg-indigo-100/80 text-gray-400 text-[7px] font-bold backdrop-blur-sm py-3 px-4 text-center relative border-b border-indigo-200/50">
        <span>
          How schools are saving 10+ hours per week with our all-in-one school management system.
        </span>
        <button className="ml-3 bg-indigo-500 px-4 py-1.5 rounded-full text-white hover:bg-indigo-600 transition-colors">
          See How
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-gray-700">
          ✕
        </button>
      </div>

      <nav
        className="flex items-center text-xs font-bold text-gray-400 justify-between px-4 md:px-8 relative z-50"
        onMouseLeave={() => setActive(null)}
      >
        <div className="flex items-center gap-8">
          <div className="font-bold text-gray-900">
            <img src="/sms.png" alt="School Management System Logo" className="w-18 h-auto" />
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <MenuItem setActive={setActive} active={active} item="Platform">
              <div className="grid grid-cols-2 gap-3 p-4 w-[640px]">
                <ProductItem
                  title="Student Management"
                  href="#"
                  imageQuery="student information system dashboard"
                  bgColor="bg-gradient-to-br from-purple-600 to-indigo-600"
                  description="Manage student records, profiles, and enrollment"
                />
                <ProductItem
                  title="Attendance Tracking"
                  href="#"
                  imageQuery="school attendance dashboard"
                  bgColor="bg-gradient-to-br from-pink-600 to-rose-600"
                  description="Daily attendance for students and teachers"
                />
                <ProductItem
                  title="Exams & Grading"
                  href="#"
                  imageQuery="exam results management system"
                  bgColor="bg-gradient-to-br from-blue-600 to-cyan-600"
                  description="Create exams, record scores, and generate reports"
                />
                <ProductItem
                  title="Fees & Billing"
                  href="#"
                  imageQuery="school fee management system"
                  bgColor="bg-gradient-to-br from-emerald-600 to-teal-600"
                  description="Track fees, payments, and outstanding balances"
                />
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Solutions">
              <div className="flex flex-col gap-2 p-4 w-[340px]">
                <SimpleLink
                  title="Primary Schools"
                  description="Simplify daily school operations"
                  href="#"
                  imageQuery="primary school classroom"
                  bgColor="bg-gradient-to-br from-orange-400 to-pink-500"
                />
                <SimpleLink
                  title="Secondary Schools"
                  description="Manage academics at scale"
                  href="#"
                  imageQuery="secondary school students"
                  bgColor="bg-gradient-to-br from-blue-500 to-indigo-600"
                />
                <SimpleLink
                  title="Colleges & Institutes"
                  description="Advanced academic administration"
                  href="#"
                  imageQuery="college campus management system"
                  bgColor="bg-gradient-to-br from-green-500 to-emerald-600"
                />
                <SimpleLink
                  title="International Schools"
                  description="Multi-campus & multi-curriculum support"
                  href="#"
                  imageQuery="international school classroom"
                  bgColor="bg-gradient-to-br from-purple-500 to-pink-600"
                />
              </div>
            </MenuItem>

            <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              AI Insights
            </button>

            <MenuItem setActive={setActive} active={active} item="Integrations">
              <div className="flex flex-col gap-3 p-4 w-[380px]">
                <ProductItem
                  title="Parent Communication API"
                  href="#"
                  imageQuery="school parent communication app"
                  bgColor="bg-gradient-to-br from-slate-700 to-gray-900"
                  description="Send notifications, SMS, and announcements"
                />
                <ProductItem
                  title="Reporting API"
                  href="#"
                  imageQuery="education analytics dashboard"
                  bgColor="bg-gradient-to-br from-violet-600 to-purple-700"
                  description="Export academic and financial reports"
                />
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Resources">
              <div className="grid grid-cols-2 gap-4 p-4 w-[540px]">
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-semibold text-gray-400 px-2 mb-1">LEARN</div>
                  <SimpleLink
                    title="School Admin Blog"
                    description="Best practices & guides"
                    href="#"
                    imageQuery="school administration blog"
                    bgColor="bg-gradient-to-br from-amber-400 to-orange-500"
                  />
                  <SimpleLink
                    title="Training Videos"
                    description="Platform walkthroughs"
                    href="#"
                    imageQuery="software training video"
                    bgColor="bg-gradient-to-br from-red-500 to-pink-600"
                  />
                  <SimpleLink
                    title="Support Center"
                    description="Help for admins & teachers"
                    href="#"
                    imageQuery="education support center"
                    bgColor="bg-gradient-to-br from-cyan-500 to-blue-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-semibold text-gray-400 px-2 mb-1">COMPANY</div>
                  <SimpleLink
                    title="About the Platform"
                    description="Our mission in education"
                    href="#"
                    imageQuery="education technology team"
                    bgColor="bg-gradient-to-br from-indigo-500 to-purple-600"
                  />
                  <SimpleLink
                    title="Careers"
                    description="Build the future of education"
                    href="#"
                    imageQuery="edtech office workspace"
                    bgColor="bg-gradient-to-br from-teal-500 to-green-600"
                  />
                </div>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Pricing">
              <div className="flex flex-col gap-3 p-4 w-[320px]">
                <a
                  href="#"
                  className="group relative overflow-hidden p-5 rounded-xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-gray-900">School Plan</h4>
                    <DollarSign className="w-5 h-5 text-indigo-500" />
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Everything a school needs</p>
                  <div className="text-lg font-bold text-indigo-600">From $29/mo</div>
                </a>

                <a
                  href="#"
                  className="group relative overflow-hidden p-5 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-gray-900">Multi-Campus</h4>
                    <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-600 mb-2">For large institutions</p>
                  <div className="text-lg font-bold text-gray-900">Custom Pricing</div>
                </a>
              </div>
            </MenuItem>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Book a Demo
          </Link>
          <Link href="/login" className="hover:text-gray-900 transition-colors">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
        </button>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
