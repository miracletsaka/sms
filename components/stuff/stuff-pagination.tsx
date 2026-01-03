import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Download, Mail, Phone, MoreVertical, Edit, Trash2, Eye, UserPlus } from 'lucide-react';
import { Prisma } from '@/generated/prisma';

type StaffMember = Prisma.RoleOnInstitutionToUserAssignedDepGetPayload<{
    include:{
      user:{
        include:{
          institutions:{
            include:{
              department:{
                include:{
                  department:true
                }
              }
            }
          }
        }
      },
      department:{
        include:{
          department:true
        }
      },
      role:{
        include:{
          role:true
        }
      }
    }
}>

export default function StaffMembersList({ 
  staffMembers,
  institutionId
 }: {
  staffMembers : StaffMember[]
  institutionId:string
 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [animate, setAnimate] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Filter staff members
  const filteredStaff = staffMembers.filter(member => {
    const matchesSearch = member.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.role.role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = 
      filterDepartment === "All" || 
      member.department.flatMap(dep => dep.department.name).includes(filterDepartment);
    return matchesSearch && matchesDepartment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStaff = filteredStaff.slice(startIndex, endIndex);

  // Get unique departments
  const departments = [
  "All",
  ...new Set(
    staffMembers.flatMap(member => 
      member.department.flatMap(dep => dep.department.name)
    )
  )
];


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilter = (dept) => {
    setFilterDepartment(dept);
    setCurrentPage(1);
  };

  console.log("track dep",currentStaff)

  return (
    <div>
        {/* Header */}
        <div className="mb-1">
             {/* Search and Filter Bar */}
          <div className="p-2 shadow bg-white">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, role, or email..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-teal-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterDepartment}
                  onChange={(e) => handleFilter(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-teal-400 focus:outline-none transition-colors appearance-none cursor-pointer min-w-[200px]"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

              </div>

              {/* Export Button */}
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl border border-gray-700 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Staff Cards */}
        <div className="space-y-1 mb-8">
          {currentStaff.map((member, index) => (
            <div
              key={member.user.id}
              className={`bg-white shadow overflow-hidden`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-2">
                <div className="flex items-center gap-6">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-1">{member.user.firstName} {member.user.lastName}</h3>
                        <p className="text-teal-400 text-xs font-bold">{member.role.role.name}</p>
                      </div>
                      <div className="gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          member.user.isActive === true
                            ? 'bg-teal-400/20 text-teal-400' 
                            : 'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {member.user.isActive ? "Active": "Inactive"}
                        </span>
                      </div>
                    </div>

                    <div className="gap-4 text-xs text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                         {member.user.institutions
                          .find(inst => inst.id === institutionId)
                          ?.department.map((dep, index) => (
                            <span key={dep.id || index}>{dep.department.name}</span>
                          ))
                        }
                      </div>
                      {member.user.email && 
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {member.user.email}
                      </div>}
                      {member.user.phone && 
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {member.user.phone}
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="">
            {/* Page Info */}
            <div className="text-gray-400">
              Showing <span className="text-white font-semibold">{startIndex + 1}</span> to{' '}
              <span className="text-white font-semibold">{Math.min(endIndex, filteredStaff.length)}</span> of{' '}
              <span className="text-white font-semibold">{filteredStaff.length}</span> staff members
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center text-xs gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 transition-all ${
                  currentPage === 1
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-teal-400 hover:text-gray-900'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 font-bold transition-all ${
                      currentPage === i + 1
                        ? 'bg-teal-400 text-gray-900'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-teal-400 hover:text-gray-900'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredStaff.length === 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 shadow-xl text-center">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-sm font-bold text-white mb-2">No staff members found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
  );
}