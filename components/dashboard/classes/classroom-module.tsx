"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, GraduationCap, Package, LayoutGrid, ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { type ClassroomModule as ClassroomModuleType, CLASSROOM_MODULE_TYPES } from "@/lib/classroom-constants"

interface Props {
  module: ClassroomModuleType
  onUpdate: (id: string, updates: Partial<ClassroomModuleType>) => void
  onSelect: (id: string) => void
  isSelected: boolean
}

export function ClassroomModule({ module, onUpdate, onSelect, isSelected }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const Icon = {
    capacity: Users,
    schedule: Calendar,
    students: GraduationCap,
    resources: Package,
    sections: LayoutGrid,
  }[module.type]

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => {
        setIsDragging(true)
        onSelect(module.id)
      }}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        onUpdate(module.id, { x: module.x + info.offset.x, y: module.y + info.offset.y })
      }}
      initial={false}
      animate={{ x: module.x, y: module.y }}
      className={cn(
        "absolute w-80 bg-white/80 backdrop-blur-md border border-neutral-200 rounded-xl shadow-sm overflow-hidden",
        isSelected && "ring-2 ring-black ring-offset-2",
        isDragging && "z-50 shadow-xl opacity-90",
      )}
      onClick={() => onSelect(module.id)}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-neutral-200">
            <Icon className="w-4 h-4 text-neutral-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-900 leading-none">{module.title}</h3>
            <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider font-mono">
              {CLASSROOM_MODULE_TYPES[module.type].label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onUpdate(module.id, { isExpanded: !module.isExpanded })
            }}
            className="p-1 hover:bg-neutral-100 rounded transition-colors"
          >
            {module.isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <GripVertical className="w-4 h-4 text-neutral-300 cursor-grab active:cursor-grabbing" />
        </div>
      </div>

      {module.isExpanded && (
        <div className="p-4 space-y-4">
          {module.type === "capacity" && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Utilization</span>
                <span className="font-medium">
                  {Math.round((module.data.currentEnrollment / module.data.maxCapacity) * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${(module.data.currentEnrollment / module.data.maxCapacity) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <p className="text-[10px] text-neutral-400 uppercase tracking-tight">Enrolled</p>
                  <p className="text-lg font-semibold">{module.data.currentEnrollment}</p>
                </div>
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                  <p className="text-[10px] text-neutral-400 uppercase tracking-tight">Capacity</p>
                  <p className="text-lg font-semibold">{module.data.maxCapacity}</p>
                </div>
              </div>
            </div>
          )}
          {/* ... other module types content ... */}
          {module.type === "schedule" && (
            <div className="space-y-2">
              {module.data.periods.map((period: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 p-2 rounded-md">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  {period}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
