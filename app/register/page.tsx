"use client";

import Footer from "@/components/footer";
import { Navigation } from "@/components/nav/navigation";
import RegisterPage from "@/components/register";

export default function page() {
  return (
    <div className="bg-gray-100">
      <Navigation />
      <RegisterPage />
      <Footer />
    </div>
  )
}