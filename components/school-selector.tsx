"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Building2, Search, ArrowRight, Zap, Users, Award } from "lucide-react"
import { Institution as School } from "@/generated/prisma"


export function SchoolSelector({ defaultSchools }: { defaultSchools?: School[] }) {
  const router = useRouter()
  const [schools, setSchools] = useState<School[]>(defaultSchools ?? [])
  const [filteredSchools, setFilteredSchools] = useState<School[]>(defaultSchools ?? [])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)


  useEffect(() => {
    // Simulate loading schools
    setTimeout(() => {
      setSchools(defaultSchools ?? [])
      setFilteredSchools(defaultSchools ?? [])
      setLoading(false)
    }, 300)
  }, [defaultSchools])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSchools(schools)
    } else {
      const filtered = schools.filter(
        (school) =>
          school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredSchools(filtered)
    }
  }, [searchTerm, schools])

  const handleSelectSchool = (schoolId: string) => {
    setSelectedSchool(schoolId)
    // Navigate to enrollment page with school query parameter
    setTimeout(() => {
      router.push(`/enrollment?q=${schoolId}`)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-12 max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-semibold text-purple-600">Choose Your School</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Find Your School
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Select your school to begin the enrollment process. We&apos;ll guide you through every step to welcome you
          into our academic community.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search schools by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3 text-base border-2 border-transparent focus:border-blue-500 focus:ring-0 bg-white shadow-sm hover:shadow-md transition-shadow"
          />
        </div>
      </div>

      {/* Schools Grid */}
      <div className="w-full max-w-5xl">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-white rounded-xl border-2 border-gray-100 animate-pulse" />
            ))}
          </div>
        ) : filteredSchools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchools.map((school) => (
              <Card
                key={school.id}
                className={`p-6 cursor-pointer border-2 transition-all duration-300 hover:shadow-xl hover:border-blue-400 group ${
                  selectedSchool === school.id
                    ? "border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => handleSelectSchool(school.id)}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                  {selectedSchool === school.id && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* School Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {school.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{school.name}</p>

                {/* Stats */}
                <div className="space-y-3 mb-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">
                      <span className="font-semibold text-gray-900">{school.plan}</span> students enrolled
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">
                      Established <span className="font-semibold text-gray-900">{school.email}</span>
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full transition-all duration-300 ${
                    selectedSchool === school.id
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  } text-white font-semibold group/btn`}
                >
                  {selectedSchool === school.id ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Proceeding...
                    </>
                  ) : (
                    <>
                      Select School
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-600">No schools found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-sm text-gray-500 max-w-2xl">
        <p>
          Can&apos;t find your school?{" "}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Contact support</span> or{" "}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            request your school to be added
          </span>
          .
        </p>
      </div>
    </div>
  )
}
