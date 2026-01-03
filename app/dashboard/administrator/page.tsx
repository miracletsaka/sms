"use client"

import { Card } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import {
  ArrowUpRight,
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
import { useSearchParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import { Institution } from "@/generated/prisma"
import EducationHeroCarousel from "@/components/dashboard/hello"
import EducationStories from "@/components/dashboard/EducationalStories"
import SchoolManagementDashboard from "@/components/dashboard/SchoolManagementDashboard"
import SMSFooter from "@/components/dashboard/dashboard-footer"

const revenueData = [
  { month: "Jan", income: 45000, expenses: 32000 },
  { month: "Feb", income: 52000, expenses: 35000 },
  { month: "Mar", income: 48000, expenses: 33000 },
  { month: "Apr", income: 61000, expenses: 38000 },
  { month: "May", income: 55000, expenses: 36000 },
  { month: "Jun", income: 67000, expenses: 40000 },
]

export default function AdminDashboard() {

  const searchParams = useSearchParams();
  const institutionId = searchParams.get('q');
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!institutionId) {
    window.location.href = "/choose-school";
    return null;
  }

  useEffect(() => {

    if (!institutionId) {
      setInstitution(null);
      return;
    }

    const fetchInstitution = async () => {
      setIsLoading(true);
      setError(null);
      try {
 
        const res = await fetch(`/api/institution?id=${institutionId}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch institution data');
        }
        
        const data: Institution = await res.json();

        console.log("institution",data)
        setInstitution(data);

      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitution();
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <EducationHeroCarousel />
      <EducationStories />
      <SchoolManagementDashboard />
      <SMSFooter />
      {/* Performance and Financial */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial summary */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200 p-6 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: "Cambria, serif" }}>
                Financial Overview
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: "Cambria, serif" }}>
                Income vs Expenses (6 months)
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              Profit
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontFamily: "Cambria, serif", fontSize: 12 }} />
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
              <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
