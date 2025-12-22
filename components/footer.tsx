import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white rounded-t-3xl ">
      <div className="max-w-5xl mx-auto px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-12">
                        {/* Social Icons */}
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full text-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full text-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full text-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full text-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full text-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
          {/* Column 1 - Product */}
          <div>
            <h3 className="text-sm text-gray-500 font-bold">Product</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-gray-700 font-bold">Pricing</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Features</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Integrations</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Demo</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Mobile App</a></li>
            </ul>
          </div>

          {/* Column 2 - Solutions */}
          <div>
            <h3 className="text-sm text-gray-500 font-bold">Solutions</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-gray-700 font-bold">K-12 Schools</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Universities</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Training Centers</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Online Learning</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Enterprise</a></li>
            </ul>
          </div>

          {/* Column 3 - Features */}
          <div>
            <h3 className="text-sm text-gray-500 font-bold">Features</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-gray-700 font-bold">Student Portal</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Grade Management</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Attendance Tracking</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Fee Collection</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Library System</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Reports</a></li>
            </ul>
          </div>

          {/* Column 4 - Resources */}
          <div>
            <h3 className="text-sm text-gray-500 font-bold">Resources</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-gray-700 font-bold">Documentation</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">API Reference</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Video Tutorials</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Webinars</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Case Studies</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Blog</a></li>
            </ul>
          </div>

          {/* Column 5 - Company */}
          <div>
            <h3 className="text-sm text-gray-500 font-bold">Company</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-gray-700 font-bold">About Us</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Careers</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Press</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Partners</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Contact</a></li>
            </ul>
          </div>

          {/* Column 6 - Support */}
          <div>
            <h3 className="text-sm text-gray-500 font-bold">Support</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-xs text-gray-700 font-bold">Help Center</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Contact Support</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">System Status</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Security</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Privacy Policy</a></li>
              <li><a href="#" className="text-xs text-gray-700 font-bold">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left Side - Language & Social */}

            {/* Right Side - Logo & Copyright */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-bold">© Copyright {new Date().getFullYear()} SMS</span>
              </div>
            </div>
          </div>

        {/* Large Logo at Bottom */}
        <div className="mt-16 flex justify-center">
          <div className="text-center">
            <h1 className="text-6xl max-w-5xl mx-auto lg:text-[180px] font-black text-[#1a1a1a] px-10 lg:px-0 leading-none tracking-tighter" style={{
              fontFamily: "'Sora', sans-serif",
              letterSpacing: '-0.05em'
            }}>
              SCHOOL
            </h1>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="text-center">
            <h1 className="text-4xl max-w-5xl mx-auto lg:text-[80px] font-black text-[#1a1a1a] px-10 lg:px-0 leading-none tracking-tighter" style={{
              fontFamily: "'Sora', sans-serif",
              letterSpacing: '-0.05em'
            }}>
              MANAGEMENT
            </h1>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="text-center">
            <h1 className="text-6xl max-w-5xl mx-auto lg:text-[180px] font-black text-[#1a1a1a] px-10 lg:px-0 leading-none tracking-tighter" style={{
              fontFamily: "'Sora', sans-serif",
              letterSpacing: '-0.05em'
            }}>
              SYSTEM
            </h1>
          </div>
        </div>
      </div>

      {/* Font Loading */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@900&display=swap');
      `}</style>
    </footer>
  );
}