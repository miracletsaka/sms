import React, { useState } from 'react';
import { Check } from 'lucide-react';

type PlanLevel = "free" | "basic" | "premium" | "enterprise";

interface PricingFeature {
  name: string;
  included: PlanLevel | "all";
}

interface PricingPlan {
  name: string;
  level: PlanLevel;
  price: {
    monthly: number;
    yearly: number;
  };
  popular?: boolean;
}

const features: PricingFeature[] = [
  { name: "Up to 50 students", included: "free" },
  { name: "Basic grade recording", included: "free" },
  { name: "Email notifications", included: "free" },
  { name: "Community support", included: "free" },
  { name: "Up to 200 students", included: "basic" },
  { name: "Advanced grade management", included: "basic" },
  { name: "Attendance tracking", included: "basic" },
  { name: "Parent portal access", included: "basic" },
  { name: "Email & chat support", included: "basic" },
  { name: "Up to 1,000 students", included: "premium" },
  { name: "AI-powered analytics", included: "premium" },
  { name: "Fee collection & invoicing", included: "premium" },
  { name: "Library management system", included: "premium" },
  { name: "Custom report generation", included: "premium" },
  { name: "Priority support", included: "premium" },
  { name: "Unlimited students", included: "enterprise" },
  { name: "Custom AI model training", included: "enterprise" },
  { name: "Multi-campus management", included: "enterprise" },
  { name: "Dedicated account manager", included: "enterprise" },
  { name: "24/7 phone support", included: "enterprise" },
  { name: "API access", included: "all" },
  { name: "Mobile app access", included: "all" },
  { name: "Data encryption & security", included: "all" },
];

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    level: "free",
  },
  {
    name: "Basic",
    price: { monthly: 45000, yearly: 450000 },
    level: "basic",
  },
  {
    name: "Premium",
    price: { monthly: 149000, yearly: 1490 },
    level: "premium",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 399000, yearly: 3990000 },
    level: "enterprise",
  },
];

function shouldShowCheck(included: PricingFeature["included"], level: PlanLevel): boolean {
  if (included === "all") return true;
  if (included === "enterprise" && level === "enterprise") return true;
  if (included === "premium" && (level === "premium" || level === "enterprise")) return true;
  if (included === "basic" && (level === "basic" || level === "premium" || level === "enterprise")) return true;
  if (included === "free") return true;
  return false;
}

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanLevel>("premium");

  return (
    <section className="">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4" style={{
            fontFamily: "'Sora', sans-serif",
            letterSpacing: '-0.02em'
          }}>
            Choose Your Plan
          </h2>
          <p className="text-sm lg:text-base font-bold text-gray-600 max-w-2xl mx-auto mb-5 "
              style={{
                fontFamily: "'Inter', -apple-system, sans-serif",
                letterSpacing: '-0.02em',
                lineHeight: '1.3',
              
              }}>
            Get started with SMS's school management platform. All plans include mobile app access, 
            data encryption, and API integration for seamless workflow automation.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-200 rounded-full p-1">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all MK{
                !isYearly 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all MK{
                isYearly 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs text-green-600 font-bold">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelectedPlan(plan.level)}
              className={`relative p-6 rounded-2xl text-left transition-all border-2 MK{
                selectedPlan === plan.level
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300 bg-white"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">
                    MK{isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-xs text-gray-700 font-bold">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
              </div>
              <div
                className={`w-full py-3 px-4 rounded-full text-sm font-bold transition-all text-center MK{
                  selectedPlan === plan.level 
                    ? "bg-indigo-500 text-white" 
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {selectedPlan === plan.level ? "Selected" : "Select Plan"}
              </div>
            </button>
          ))}
        </div>

        {/* Features Table */}
        <div className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Table Header */}
              <div className="flex items-center p-6 bg-gray-100 border-b-2 border-gray-200">
                <div className="flex-1">
                  <h3 className="text-lg font-black text-gray-900">Features Comparison</h3>
                </div>
                <div className="flex items-center gap-6">
                  {plans.map((plan) => (
                    <div key={plan.level} className="w-24 text-center text-sm font-bold text-gray-900">
                      {plan.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Rows */}
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`flex items-center p-4 transition-colors MK{
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } MK{
                    feature.included === selectedPlan ? "bg-indigo-50" : ""
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-xs text-gray-700 font-bold">{feature.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    {plans.map((plan) => (
                      <div key={plan.level} className="w-24 flex justify-center">
                        {shouldShowCheck(feature.included, plan.level) ? (
                          <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <span className="text-gray-300 text-lg">-</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="bg-indigo-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-600 transition-all hover:scale-105 shadow-lg">
            Get started with {plans.find((p) => p.level === selectedPlan)?.name} Plan
          </button>
          <p className="text-xs text-gray-700 font-bold mt-4">
            * All plans come with a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>

      {/* Font Loading */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@900&display=swap');
      `}</style>
    </section>
  );
}