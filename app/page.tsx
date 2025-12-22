"use client"

import Footer from "@/components/footer"
import HelloSection from "@/components/hero-section"
import AppSection from "@/components/landing/AppSection"
import { BankingScaleHero } from "@/components/landing/BankingScaleHero"
import { FAQSection } from "@/components/landing/FAQSection"
import CTASection from "@/components/landing/finisher"
import SmsHero from "@/components/landing/hello-section"
import PricingSection from "@/components/landing/PricingSection"
import SchoolFeaturesSection from "@/components/landing/SchoolFeaturesSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import LogoCloud from "@/components/logo-cloud"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <main className="w-full  bg-gradient-to-b from-gray-50 to-gray-100">
      <SmsHero />
      <LogoCloud/>
      <SchoolFeaturesSection />
      <TestimonialsSection />
      <AppSection />
      <BankingScaleHero />
      <PricingSection />
      <FAQSection />
      <CTASection />
      {/* <HelloSection />
      <StatsSection /> */}
      <Footer />
    </main>
  )
}
