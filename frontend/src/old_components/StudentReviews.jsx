import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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

const Button = React.forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900 text-gray-600",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-100 text-gray-400", className)} {...props}>
        <span className="text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

// --- Data ---

const reviews = [
  {
    name: "Priya Sharma",
    branch: "Computer Engineering, 3rd Year",
    rating: 5,
    review: "Found an amazing PG through this platform! It's just 10 minutes walk from TIMSCDR and the owner is very understanding. Highly recommend for fellow students.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    pg: "Lakshmi Ladies PG",
  },
  {
    name: "Rahul Desai",
    branch: "Electronics Engineering, 2nd Year",
    rating: 5,
    review: "Best decision I made! The PG is clean, safe, and the food is homely. Plus, all listings are verified which gave me peace of mind.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    pg: "Shree Sai PG",
  },
  {
    name: "Sneha Patel",
    branch: "IT Engineering, 4th Year",
    rating: 4,
    review: "Great platform for TIMSCDR students! I could filter by budget and location. Found a PG with WiFi and good food within my budget.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    pg: "Comfort Girls PG",
  },
];

// --- Main Component ---

export default function StudentReviews() {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm border border-gray-100">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">Student Verified Reviews</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            What TIMSCDR Students Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from students who found their perfect PG through our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 space-y-4">
                <Quote className="w-10 h-10 text-blue-100 fill-blue-100 absolute top-6 right-6" />
                
                <div className="flex gap-1 relative z-10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed relative z-10 min-h-[80px]">
                  "{review.review}"
                </p>

                <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.branch}</div>
                    <div className="text-xs font-medium text-blue-600 mt-0.5">@ {review.pg}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-12">
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12 hover:border-blue-500 hover:text-blue-600">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12 hover:border-blue-500 hover:text-blue-600">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}