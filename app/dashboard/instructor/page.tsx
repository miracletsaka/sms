"use client"

import React, { useState } from 'react';
import { Home, FolderOpen, Plus, Grid3x3, List, Search, Users, Share2, Trash2, MoreHorizontal, ChevronRight, ChevronDown, BookOpen, GraduationCap, FileText, Calendar } from 'lucide-react';

export default function InstructorDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'courses': true,
    'assignments': true
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleFolder = (folderId: string) => {
     // add proper types
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const folders = [
    {
      id: 'courses',
      name: 'My Courses',
      items: 4,
      size: '2.4 GB',
      thumbnail: 'grid',
      images: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=150&fit=crop'
      ]
    },
    {
      id: 'assignments',
      name: 'Assignments',
      items: 6,
      size: '856 MB',
      thumbnail: 'gantt',
      images: []
    }
  ];

  const assets = [
    {
      id: 1,
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
      duration: '45:20',
      selected: false
    },
    {
      id: 2,
      type: 'document',
      thumbnail: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=250&fit=crop',
      version: 'v2',
      selected: false
    },
    {
      id: 3,
      type: 'audio',
      thumbnail: null,
      selected: false
    }
  ];

  const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverClass = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const sidebarClass = isDarkMode ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} flex`}>
      {/* Sidebar */}
      <div className={`w-64 ${sidebarClass} border-r ${borderClass} flex flex-col`}>
        {/* Top Navigation */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Home className="w-5 h-5" />
            <FolderOpen className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className={mutedTextClass}>All Projects</span>
            <ChevronRight className="w-4 h-4" />
            <span>Instructor Portal</span>
          </div>
        </div>

        {/* Assets Section */}
        <div className="p-4 border-b ${borderClass}">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Assets</h3>
            <button className="p-1 rounded hover:bg-gray-700">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            <div className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer`}>
              <FolderOpen className="w-4 h-4" />
              <span className="text-sm">Instructor Portal</span>
            </div>
            
            <div className="ml-4 space-y-1">
              <button
                onClick={() => toggleFolder('courses')}
                className={`flex items-center gap-2 p-2 rounded ${hoverClass} w-full text-left`}
              >
                {expandedFolders.courses ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">My Courses</span>
              </button>
              
              <button
                onClick={() => toggleFolder('assignments')}
                className={`flex items-center gap-2 p-2 rounded ${hoverClass} w-full text-left`}
              >
                {expandedFolders.assignments ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <FileText className="w-4 h-4" />
                <span className="text-sm">Assignments</span>
              </button>
            </div>

            <div className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer`}>
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Recently Deleted</span>
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="p-4 border-b ${borderClass}">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Collections</h3>
            <button className="p-1 rounded hover:bg-gray-700">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Share Links */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">Share Links</h3>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-gray-700">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-700">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer`}>
            <List className="w-4 h-4" />
            <span className="text-sm">All Share Links</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto p-4 border-t ${borderClass}">
          <div className={`flex items-center gap-2 p-2 rounded ${hoverClass} cursor-pointer`}>
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm">Student Progress</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className={`${cardBgClass} border-b ${borderClass} p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : hoverClass}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-500 text-white' : hoverClass}`}
            >
              <List className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className={mutedTextClass}>Fields</span>
              <span>1 Visible</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={mutedTextClass}>Sorted by</span>
              <span>Custom</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className={`p-2 rounded ${hoverClass}`}>
              <Search className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded ${hoverClass}`}>
              <Plus className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded ${hoverClass}`}>
              <Users className="w-5 h-5" />
            </button>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded ${hoverClass}`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Folders Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm">2 Folders • 172 MB</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className={`${cardBgClass} border ${borderClass} rounded-xl p-4 ${hoverClass} cursor-pointer transition-all`}
                >
                  {/* Folder Thumbnail */}
                  <div className="mb-3 rounded-lg overflow-hidden bg-gray-700 h-32">
                    {folder.thumbnail === 'grid' && folder.images.length > 0 ? (
                      <div className="grid grid-cols-2 gap-1 h-full p-1">
                        {folder.images.map((img, idx) => (
                          <div key={idx} className="rounded overflow-hidden">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="w-full h-16 bg-gray-600 rounded mx-4">
                          <div className="grid grid-cols-12 gap-1 p-2">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div key={i} className="h-2 bg-indigo-400 rounded-sm" style={{ gridColumn: `span ${Math.floor(Math.random() * 3) + 1}` }}></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Folder Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm mb-1">{folder.name}</h3>
                      <p className={`text-xs ${mutedTextClass}`}>{folder.items} Items</p>
                    </div>
                    <button className={`p-1 rounded ${hoverClass}`}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assets Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm">3 Assets • 862 MB</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className={`${cardBgClass} border ${borderClass} rounded-xl overflow-hidden ${hoverClass} cursor-pointer transition-all relative`}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                  </div>
                  {asset.version && (
                    <div className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold">
                      {asset.version}
                    </div>
                  )}
                  
                  {asset.type === 'audio' ? (
                    <div className="h-48 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
                      <div className="flex gap-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div key={i} className="w-1 bg-green-400 rounded-full" style={{ height: `${Math.random() * 60 + 20}px` }}></div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img src={asset.thumbnail as string} alt="" className="w-full h-48 object-cover" />
                      {asset.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                          {asset.duration}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={`text-xs ${mutedTextClass} mt-4`}>
              5 Items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}