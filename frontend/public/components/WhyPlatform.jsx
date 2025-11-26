import React from 'react';
import { GraduationCap, ShieldCheck, Image, Lock } from "lucide-react";
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Helper Functions & UI Components ---

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Card = ({ className, children, ...props }) => (
  <div className={cn("rounded-2xl border border-gray-100 bg-white text-gray-950 shadow-sm", className)} {...props}>
    {children}
  </div>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-6", className)} {...props}>
    {children}
  </div>
);

// --- Data ---

const reasons = [
  {
    icon: GraduationCap,
    title: "Only for TIMSCDR Students",
    description: "Exclusive platform designed specifically for Thakur College students. All listings are curated for student needs and budgets.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "100% Verified PGs",
    description: "Every PG is personally verified by our team. We check safety, facilities, and ensure authenticity before listing.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Image,
    title: "Real Photos & Ratings",
    description: "Actual photos from current residents, not stock images. Read honest reviews from fellow TIMSCDR students.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Lock,
    title: "Safe & Secure Listings",
    description: "Your safety is our priority. All PG owners are verified and locations are checked for security measures.",
    color: "from-orange-500 to-orange-600",
  },
];

// --- Main Component ---

export default function WhyPlatform() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Choose PG Finder - TIMSCDR?
          </h2>
          <p className="text-lg text-gray-600">
            Built by students, for students. We understand what matters to you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 space-y-4 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform shadow-lg`}>
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="grid sm:grid-cols-3 gap-8 text-center text-white divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            <div className="pt-4 sm:pt-0">
              <div className="text-4xl lg:text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100 text-lg">Verified PGs</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100 text-lg">Happy Students</div>
            </div>
            <div className="pt-8 sm:pt-0">
              <div className="text-4xl lg:text-5xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}