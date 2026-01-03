
"use client";
import { useEffect, useState } from 'react';
import { Plus, Shield, Users, DollarSign, GraduationCap, BookOpen, Edit, Trash2, MoreVertical, X, Eye, Copy, Download, Search, Menu } from 'lucide-react';
import { ClientRole } from '@/types/types';
import { createRole, deleteRole, updateRole } from '@/app/actions/roles';
import { useRouter } from 'next/navigation';
import { Prisma, ROLE_STATUS } from '@/generated/prisma';

type Role = Prisma.UserRoleGetPayload<{
    include: { users: true }
}>

export default function RoleManagementDashboard({ initialRoles }: { initialRoles: Role[] }) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [newRole, setNewRole] = useState<ClientRole>({ name: '', icon: 'Users', color: 'bg-cyan-400', description: '', permissions: 0, users: 0, dateCreated: '', status: "ACTIVE" });
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setRoles(initialRoles);
  }, [initialRoles]);
  
  const router = useRouter()

  const iconMap = {
    Shield: Shield,
    Users: Users,
    DollarSign: DollarSign,
    GraduationCap: GraduationCap,
    BookOpen: BookOpen
  };

  const colorOptions = [
    'bg-cyan-400',
    'bg-lime-400',
    'bg-cyan-300',
    'bg-white',
    'bg-purple-400',
    'bg-pink-400',
    'bg-yellow-400',
    'bg-orange-400'
  ];

  const handleAddRole = async () => {
    if (!newRole.name.trim() && !newRole.description.trim()) {
        window.alert('Please fill in all required fields.');
    }

    const role : ClientRole = {
        name: newRole.name,
        icon: newRole.icon,
        color: newRole.color,
        description: newRole.description,
        users: 0,
        permissions: newRole.permissions,
        dateCreated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: "ACTIVE"
      };

      const status = await createRole(role);

      if (status === "success") {
        router.refresh()
        return;
      }
        else {
        alert("Error creating role. Please try again.");
        return;
      }
  };

  const handleEditRole = async () => {
    if (!selectedRole && !newRole.name.trim() && !newRole.description.trim()) {
        alert("please all field are required")
        return
  };

  const updatedRole = await updateRole(selectedRole?.id as string, newRole);

  if (updatedRole === "success") {
    router.refresh()
    return;
  }
    else {
    alert("Error updating role. Please try again.");
    return;
  }

}

  const openEditForm = (role:Role) => {
    setSelectedRole(role);
    setNewRole({
      name: role.name,
      icon: role.icon as string,
      color: role.color  as string,
      description: role.description,
      users: role.users.length,
      permissions: role.permissions,
      dateCreated: role.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: (role.status === "ACTIVE" ? "ACTIVE" : 'INACTIVE') as ROLE_STATUS
    });
    setShowEditForm(true);
  };

  const getFilteredRoles = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    let filtered = roles.filter(role => {
      const roleDate = new Date(role.createdAt);
      const roleYear = roleDate.getFullYear();
      const roleMonth = roleDate.getMonth();
      
      if (filterPeriod === 'year') {
        return roleYear === currentYear;
      } else if (filterPeriod === 'month') {
        return roleYear === currentYear && roleMonth === currentMonth;
      } else if (filterPeriod === 'week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return roleDate >= oneWeekAgo;
      }
      return true;
    });

    if (searchQuery.trim()) {
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredRoles = getFilteredRoles();

  const handleDeleteRole = async (id:string) => {
    if (confirm('Are you sure you want to delete this role?')) {
        const status = await deleteRole(id);
        if (status === "success") {
          setRoles(roles.filter(role => role.id !== id));
        } else {
          alert("Error deleting role. Please try again.");
        }
    }
  };

  const handleExportRole = (role:Role) => {
    const dataStr = JSON.stringify(role, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${role.name.toLowerCase().replace(/\s+/g, '_')}_role.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-black p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-400 rounded flex items-center justify-center text-black font-bold text-sm">
              VX
            </div>
            <span className="text-white font-semibold text-sm hidden sm:inline">VaultX</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <button className="hidden md:flex text-gray-400 hover:text-white text-xs items-center gap-2">
            <Users size={16} />
            Dashboard
          </button>
          <button className="hidden md:flex text-gray-400 hover:text-white text-xs items-center gap-2">
            <Shield size={16} />
            Roles
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-white text-black px-3 md:px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Add Role</span>
          </button>
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white"
          >
            <Menu size={20} />
          </button>
          <div className="hidden md:block w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden mb-4 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-slate-700">
          <button className="w-full text-left text-gray-400 hover:text-white text-xs py-2 flex items-center gap-2">
            <Users size={16} />
            Dashboard
          </button>
          <button className="w-full text-left text-gray-400 hover:text-white text-xs py-2 flex items-center gap-2">
            <Shield size={16} />
            Roles
          </button>
        </div>
      )}

      {/* Title and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <h1 className="text-white text-xl md:text-2xl font-semibold">System Roles</h1>
        
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles..."
            className="w-full bg-slate-800/50 border border-slate-700 text-white pl-11 pr-4 py-2 rounded-full text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-slate-700">
          <div className="text-gray-400 text-xs mb-1">Total Roles</div>
          <div className="text-white text-2xl font-bold">{roles.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-slate-700">
          <div className="text-gray-400 text-xs mb-1">Total Users</div>
          <div className="text-white text-2xl font-bold">{roles.reduce((acc, r) => acc + r.users.length, 0)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-slate-700">
          <div className="text-gray-400 text-xs mb-1">Active Roles</div>
          <div className="text-lime-400 text-2xl font-bold">{roles.filter(r => r.status === "ACTIVE").length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-slate-700">
          <div className="text-gray-400 text-xs mb-1">Avg Permissions</div>
          {/* <div className="text-white text-2xl font-bold">{Math.round(roles.reduce((acc, r) => acc + r.permissions, 0) / roles.length)}</div> */}
        </div>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {filteredRoles.map((role) => {
          const Icon = iconMap[role.icon];
          return (
            <div
              key={role.id}
              onClick={() => {
                setSelectedRole(role);
                setShowViewModal(true);
              }}
              className={`${role.color} rounded-3xl p-6 transition-transform hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${role.color === 'bg-white' ? 'bg-black' : 'bg-black/20'} rounded-full flex items-center justify-center`}>
                  <Icon size={20} className={role.color === 'bg-white' ? 'text-white' : 'text-black'} />
                </div>
              </div>
              <div className={`${role.color === 'bg-white' ? 'text-black' : 'text-black'}`}>
                <div className="text-xs font-medium mb-1">{role.name}</div>
                <div className="text-3xl font-bold mb-2">{role.users.length.length}</div>
                <div className="text-xs opacity-70">{role.permissions} permissions</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Role Modal */}
      {showViewModal && selectedRole && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowViewModal(false)}>
          <div className="bg-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${selectedRole.color} rounded-2xl flex items-center justify-center`}>
                  {(() => {
                    const Icon = iconMap[selectedRole.icon];
                    return <Icon size={28} className={selectedRole.color === 'bg-white' ? 'text-black' : 'text-black'} />;
                  })()}
                </div>
                <div>
                  <h2 className="text-white text-xl md:text-2xl font-bold">{selectedRole.name}</h2>
                  <span className={`text-xs ${selectedRole.status === "ACTIVE" ? 'text-lime-400' : 'text-gray-400'}`}>
                    {selectedRole.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">Total Users</div>
                <div className="text-white text-2xl font-bold">{selectedRole.users.length.length}</div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="text-gray-400 text-xs mb-1">Permissions</div>
                <div className="text-white text-2xl font-bold">{selectedRole.permissions}</div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 col-span-2 md:col-span-1">
                <div className="text-gray-400 text-xs mb-1">Created</div>
                <div className="text-white text-sm font-semibold">{selectedRole.createdAt.toDateString()}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white text-sm font-semibold mb-2">Description</h3>
              <p className="text-gray-300 text-xs leading-relaxed">{selectedRole.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  openEditForm(selectedRole);
                  setShowViewModal(false);
                }}
                className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 font-semibold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={14} />
                Edit Role
              </button>
              <button
                onClick={() => handleExportRole(selectedRole)}
                className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 font-semibold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Download size={14} />
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Role Form */}
      {(showAddForm || showEditForm) && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => { setShowAddForm(false); setShowEditForm(false); }}>
          <div className="bg-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-lg border border-slate-700 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">{showEditForm ? 'Edit Role' : 'Add New Role'}</h2>
              <button onClick={() => { setShowAddForm(false); setShowEditForm(false); }} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="text-gray-400 text-xs mb-2 block">Role Name</label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
                placeholder="Enter role name"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-xs mb-2 block">Icon</label>
              <select
                value={newRole.icon}
                onChange={(e) => setNewRole({...newRole, icon: e.target.value})}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
              >
                <option value="Users">Users</option>
                <option value="Shield">Shield</option>
                <option value="DollarSign">Dollar Sign</option>
                <option value="GraduationCap">Graduation Cap</option>
                <option value="BookOpen">Book Open</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-xs mb-2 block">Permissions Count</label>
              <input
                type="number"
                value={newRole.permissions}
                onChange={(e) => setNewRole({...newRole, permissions: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
                placeholder="Number of permissions"
                min="0"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-400 text-xs mb-2 block">Description</label>
              <textarea
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-sm border border-slate-700 focus:outline-none focus:border-cyan-400 resize-none"
                placeholder="Describe role permissions and responsibilities..."
                rows={4}
              />
            </div>

            <div className="mb-6">
              <label className="text-gray-400 text-xs mb-2 block">Color</label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewRole({...newRole, color})}
                    className={`${color} w-full h-12 rounded-xl ${newRole.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : ''}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowAddForm(false); setShowEditForm(false); }}
                className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-full text-xs font-semibold hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showEditForm ? handleEditRole : handleAddRole}
                className="flex-1 bg-lime-400 text-black px-4 py-3 rounded-full text-xs font-semibold hover:bg-lime-300 transition-colors"
              >
                {showEditForm ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roles Table */}
      <div className="bg-slate-900/50 rounded-3xl p-4 md:p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-white text-base md:text-lg font-semibold">Role Details</h2>
          <select 
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="bg-slate-800 text-white px-4 py-2 rounded-full text-xs border border-slate-700 focus:outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="all">All Time</option>
            <option value="year">This Year</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-3">
          {filteredRoles.map((role) => {
            const Icon = iconMap[role.icon];
            return (
              <div key={role.id} className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${role.color} rounded-full flex items-center justify-center`}>
                      <Icon size={18} className={role.color === 'bg-white' ? 'text-black' : 'text-black'} />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{role.name}</div>
                      <div className="text-gray-400 text-xs">{role.createdAt.toDateString()}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedRole(role);
                      setShowViewModal(true);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <Eye size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <div className="text-gray-400 text-xs">Users</div>
                    <div className="text-white text-sm font-semibold">{role.users.length}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Perms</div>
                    <div className="text-white text-sm font-semibold">{role.permissions}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Status</div>
                    <div className={`text-sm font-semibold ${role.status === "ACTIVE" ? 'text-lime-400' : 'text-gray-400'}`}>{role.status}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(role)}
                    className="flex-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="flex-1 bg-red-500/20 border border-red-500/30 text-red-300 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-slate-800">
                <th className="text-left pb-4 font-medium">Role Name</th>
                <th className="text-left pb-4 font-medium">Description</th>
                <th className="text-left pb-4 font-medium">Date Created</th>
                <th className="text-left pb-4 font-medium">Users</th>
                <th className="text-left pb-4 font-medium">Permissions</th>
                <th className="text-left pb-4 font-medium">Status</th>
                <th className="text-left pb-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role) => {
                const Icon = iconMap[role.icon];
                return (
                  <tr key={role.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${role.color} rounded-full flex items-center justify-center`}>
                          <Icon size={18} className={role.color === 'bg-white' ? 'text-black' : 'text-black'} />
                        </div>
                        <span className="text-white text-sm">{role.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-400 text-xs max-w-xs">
                      <div className="truncate">{role.description}</div>
                    </td>
                    <td className="py-4 text-gray-400 text-sm">{role.createdAt.toDateString()}</td>
                    <td className="py-4 text-white text-sm">{role.users.length}</td>
                    <td className="py-4 text-white text-sm">{role.permissions}</td>
                    <td className="py-4">
                      <span className={`${role.status === "ACTIVE" ? 'text-lime-400' : role.status === 'PENDING' ? 'text-yellow-400' : 'text-red-400'} text-sm`}>
                        {role.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedRole(role);
                            setShowViewModal(true);
                          }}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => openEditForm(role)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}