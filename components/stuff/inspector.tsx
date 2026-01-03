"use client"

import { useState } from "react"
import { X, Plus, Trash2, DollarSign, Shield, Building2, GraduationCap, ArrowLeftRight, Crown } from "lucide-react"

interface InspectorProps {
  folder: any
  staff: any
  onClose: () => void
  onUpdate: (data: any) => void
}

export function Inspector({ folder, staff, onClose, onUpdate }: InspectorProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const calculateTotal = (base: number, roles: any[], departments: any[]) => {
    const roleBonus = roles.length * 5000
    const deptBonus = departments.filter((d: any) => d.isHead).length * 10000
    return base + roleBonus + deptBonus
  }

  const handleRoleToggle = (roleName: string) => {
    const exists = staff.roles.find((r: any) => r.name === roleName)
    let newRoles = [...staff.roles]
    if (exists) {
      newRoles = newRoles.filter((r: any) => r.name !== roleName)
    } else {
      newRoles.push({ id: `role-${Date.now()}`, name: roleName, permissions: 7 })
    }

    const newTotal = calculateTotal(staff.salary.baseSalary, newRoles, staff.departments)
    onUpdate({
      ...staff,
      roles: newRoles,
      salary: { ...staff.salary, total: newTotal, roleBonus: newRoles.length * 5000 },
    })
  }

  const handleDepartmentToggle = (deptName: string) => {
    const exists = staff.departments.find((d: any) => d.name === deptName)
    let newDepts = [...staff.departments]
    
    if (exists) {
      newDepts = newDepts.filter((d: any) => d.name !== deptName)
    } else {
      newDepts.push({ id: `dept-${Date.now()}`, name: deptName, isHead: false })
    }

    const newTotal = calculateTotal(staff.salary.baseSalary, staff.roles, newDepts)
    const headCount = newDepts.filter((d: any) => d.isHead).length
    onUpdate({
      ...staff,
      departments: newDepts,
      salary: { ...staff.salary, total: newTotal, departmentBonus: headCount * 10000 },
    })
  }

  const handleToggleDepartmentHead = (deptId: string) => {
    const newDepts = staff.departments.map((d: any) =>
      d.id === deptId ? { ...d, isHead: !d.isHead } : d
    )
    const headCount = newDepts.filter((d: any) => d.isHead).length
    const newTotal = calculateTotal(staff.salary.baseSalary, staff.roles, newDepts)
    
    onUpdate({
      ...staff,
      departments: newDepts,
      salary: { ...staff.salary, total: newTotal, departmentBonus: headCount * 10000 },
    })
  }

  const handleSubjectAction = (action: "add" | "remove", subjectName: string) => {
    const cleanName = subjectName.replace(/\s+Subject$/i, "")
    let newSubjects = [...staff.subjects]

    if (action === "add") {
      newSubjects.push({ id: `sub-${Date.now()}`, name: cleanName })
    } else {
      newSubjects = newSubjects.filter((s: any) => s.name !== subjectName)
    }

    onUpdate({ ...staff, subjects: newSubjects })
  }

  const handleClassAction = (action: "add" | "remove", classData: any) => {
    let newClasses = [...staff.classes]

    if (action === "add") {
      newClasses.push({
        id: `class-${Date.now()}`,
        code: classData.code,
        section: classData.section,
        capacity: classData.capacity || 30,
        enrolled: 0,
      })
    } else {
      newClasses = newClasses.filter((c: any) => c.id !== classData.id)
    }

    onUpdate({ ...staff, classes: newClasses })
  }

  const handleAddTransfer = () => {
    const newTransfer = {
      id: `trans-${Date.now()}`,
      fromDepartment: "Current Department",
      toDepartment: "New Department",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    }
    
    onUpdate({
      ...staff,
      transfers: [...staff.transfers, newTransfer],
    })
  }

  const handleRemoveTransfer = (transferId: string) => {
    onUpdate({
      ...staff,
      transfers: staff.transfers.filter((t: any) => t.id !== transferId),
    })
  }

  const handleSalaryUpdate = (value: string) => {
    const base = Number.parseFloat(value) || 0
    const newTotal = calculateTotal(base, staff.roles, staff.departments)
    onUpdate({
      ...staff,
      salary: { ...staff.salary, baseSalary: base, total: newTotal },
    })
  }

  return (
    <div className="w-[380px] bg-white border-l border-gray-100 flex flex-col h-full animate-in slide-in-from-right duration-500 shadow-2xl z-30">
      <div className="p-8 border-b border-gray-50 bg-[#FDFCF9]/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">System Inspector</h3>
          <button onClick={onClose} className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all group">
            <X className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
          </button>
        </div>

        <div
          className={`p-6 bg-gradient-to-br ${folder.color} rounded-[2rem] text-white shadow-xl shadow-black/5 relative overflow-hidden group`}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
            <folder.icon className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <folder.icon className="w-5 h-5" />
              </div>
              <span className="font-black text-lg tracking-tight italic uppercase">{folder.name}</span>
            </div>
            <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">
              Active Module • {staff.user.firstName}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {folder.id === "salary" ? (
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block">
                Base Compensation
              </label>
              <div className="relative group">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                <input
                  type="number"
                  value={staff.salary.baseSalary}
                  onChange={(e) => handleSalaryUpdate(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-2xl transition-all text-sm font-bold outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <p className="text-[9px] font-black text-emerald-600 uppercase mb-1">Role Bonus</p>
                <p className="text-lg font-black tracking-tighter text-emerald-900">
                  ${staff.salary.roleBonus.toLocaleString()}
                </p>
                <p className="text-[8px] text-emerald-600/70 mt-1">{staff.roles.length} × $5k</p>
              </div>
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <p className="text-[9px] font-black text-blue-600 uppercase mb-1">Dept Bonus</p>
                <p className="text-lg font-black tracking-tighter text-blue-900">
                  ${staff.salary.departmentBonus.toLocaleString()}
                </p>
                <p className="text-[8px] text-blue-600/70 mt-1">
                  {staff.departments.filter((d: any) => d.isHead).length} × $10k
                </p>
              </div>
            </div>
          </div>
        ) : folder.id === "roles" ? (
          <div className="space-y-4">
            {["Instructor", "Department Head", "Admin", "Finance"].map((role) => {
              const isActive = staff.roles.some((r: any) => r.name === role)
              return (
                <button
                  key={role}
                  onClick={() => handleRoleToggle(role)}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    isActive
                      ? "bg-black text-white border-black shadow-lg shadow-black/10"
                      : "bg-white border-gray-100 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Shield className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-300 group-hover:text-black"}`} />
                    <span className="text-xs font-bold uppercase tracking-widest">{role}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isActive ? "border-white bg-white/20" : "border-gray-100 group-hover:border-gray-200"
                    }`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </button>
              )
            })}
          </div>
        ) : folder.id === "departments" ? (
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">
                Assigned Departments
              </h4>
              <div className="space-y-2">
                {staff.departments.map((dept: any) => (
                  <div
                    key={dept.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">{dept.name}</span>
                      {dept.isHead && (
                        <Crown className="w-3 h-3 text-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleDepartmentHead(dept.id)}
                        className="px-2 py-1 text-[8px] font-black uppercase bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-all"
                      >
                        {dept.isHead ? "Remove Head" : "Set Head"}
                      </button>
                      <button
                        onClick={() => handleDepartmentToggle(dept.name)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Available Departments</h4>
              <div className="space-y-2">
                {["Computer Science", "Mathematics", "Physics", "Engineering", "Business Administration"]
                  .filter((d) => !staff.departments.some((dept: any) => dept.name === d))
                  .map((item) => (
                    <button
                      key={item}
                      onClick={() => handleDepartmentToggle(item)}
                      className="w-full p-4 hover:bg-gray-50 rounded-2xl border border-gray-50 hover:border-gray-200 transition-all text-left flex items-center justify-between group"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">
                        {item}
                      </span>
                      <Plus className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:scale-110 transition-all" />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ) : folder.id === "classes" ? (
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">
                Assigned Classes
              </h4>
              <div className="space-y-2">
                {staff.classes.map((cls: any) => (
                  <div
                    key={cls.id}
                    className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">
                          {cls.code} - Section {cls.section}
                        </span>
                      </div>
                      <button
                        onClick={() => handleClassAction("remove", cls)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-400 font-bold">
                        {cls.enrolled}/{cls.capacity} Students
                      </span>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500"
                          style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Available Classes</h4>
              <div className="space-y-2">
                {[
                  { code: "CS 301", section: "A", capacity: 35 },
                  { code: "MATH 201", section: "B", capacity: 40 },
                  { code: "PHY 101", section: "C", capacity: 30 },
                ]
                  .filter((c) => !staff.classes.some((cls: any) => cls.code === c.code && cls.section === c.section))
                  .map((item) => (
                    <button
                      key={`${item.code}-${item.section}`}
                      onClick={() => handleClassAction("add", item)}
                      className="w-full p-4 hover:bg-gray-50 rounded-2xl border border-gray-50 hover:border-gray-200 transition-all text-left flex items-center justify-between group"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">
                        {item.code} - Section {item.section}
                      </span>
                      <Plus className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:scale-110 transition-all" />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ) : folder.id === "transfers" ? (
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Transfer History</h4>
              <div className="space-y-3">
                {staff.transfers.map((transfer: any) => (
                  <div
                    key={transfer.id}
                    className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:bg-white hover:border-gray-200 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        transfer.status === "completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {transfer.status}
                      </span>
                      <button
                        onClick={() => handleRemoveTransfer(transfer.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-600">
                      <span className="font-bold">{transfer.fromDepartment}</span>
                      <ArrowLeftRight className="w-3 h-3" />
                      <span className="font-bold">{transfer.toDepartment}</span>
                    </div>
                    <p className="text-[9px] text-gray-400 mt-1 font-bold">{transfer.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddTransfer}
              className="w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl hover:border-black hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2 group"
            >
              <Plus className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                Add Transfer Record
              </span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">
                Current Assignments
              </h4>
              <div className="space-y-2">
                {folder.id === "subjects" &&
                  staff.subjects.map((sub: any) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all group"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">{sub.name}</span>
                      <button
                        onClick={() => handleSubjectAction("remove", sub.name)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Add to Registry</h4>
              <div className="space-y-2">
                {["Calculus", "Quantum Physics", "Digital Systems Subject"]
                  .filter((s) => !staff.subjects.some((sub: any) => sub.name === s.replace(/\s+Subject$/i, "")))
                  .map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSubjectAction("add", item)}
                      className="w-full p-4 hover:bg-gray-50 rounded-2xl border border-gray-50 hover:border-gray-200 transition-all text-left flex items-center justify-between group"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">
                        {item}
                      </span>
                      <Plus className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:scale-110 transition-all" />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-gray-50 space-y-3 bg-[#FDFCF9]/30">
        <button className="w-full px-6 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-black/5 active:scale-95">
          Commit System Edits
        </button>
        <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-widest">
          Changes are buffered to local cache
        </p>
      </div>
    </div>
  )
}
