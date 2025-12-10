import React, { useState } from 'react';
import { MapPin } from "lucide-react";
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

const Badge = ({ className, children, ...props }) => {
  return (
    <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors text-white shadow-sm", className)} {...props}>
      {children}
    </div>
  );
};

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

const areas = [
  {
    name: "Thakur Village",
    pgs: 85,
    distance: "0.5 km from TIMSCDR",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    popular: true,
  },
  {
    name: "Samata Nagar",
    pgs: 62,
    distance: "1.2 km from TIMSCDR",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    popular: false,
  },
  {
    name: "Hanuman Nagar",
    pgs: 48,
    distance: "1.8 km from TIMSCDR",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    popular: false,
  },
  {
    name: "Kandivali East",
    pgs: 72,
    distance: "2.0 km from TIMSCDR",
    image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    popular: false,
  },
];

// --- Main Component ---

export default function PopularAreas() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Popular Areas Near TIMSCDR
          </h2>
          <p className="text-lg text-gray-600">
            Explore PG accommodations in the most convenient locations around campus
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-gray-200">
              
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Popular Badge */}
                {area.popular && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 border border-white/20 shadow-lg">
                    Most Popular
                  </Badge>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-1">{area.name}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-200">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{area.distance}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <CardContent className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Available PGs</span>
                  <span className="text-lg font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                    {area.pgs}+
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}