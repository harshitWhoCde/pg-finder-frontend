// src/components/HeroSection.jsx
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { MapPin, Star, IndianRupee, Users, Search, ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 1. Import your existing Button if you have one, or keep this definition
// import { Button } from "./ui/button"; 
// If you don't have a button file, use the one provided below in the "Helper Components" section.

// --- Helper Functions & Components for this section ---

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Minimal Button (Use this if you don't import your own)
const Button = React.forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700",
  };
  const sizes = {
    default: "h-12 px-6 py-3",
    icon: "h-10 w-10",
  };
  return (
    <button
      ref={ref}
      className={cn("inline-flex items-center justify-center rounded-xl text-base font-medium transition-all", variants[variant], sizes[size], className)}
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
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} {...props} />;
};

// --- Select Component (Internal Logic) ---
const SelectContext = createContext({});

const Select = ({ children, onValueChange, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || "");
  const [label, setLabel] = useState(""); 
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ open, setOpen, value, setValue, label, setLabel, onValueChange }}>
      <div ref={containerRef} className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ className, children }) => {
  const { open, setOpen } = useContext(SelectContext);
  return (
    <button onClick={() => setOpen(!open)} className={cn("flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-base text-gray-700 hover:bg-gray-100 transition-colors", className)}>
      {children} <ChevronDown className="h-5 w-5 text-gray-400" />
    </button>
  );
};

const SelectValue = ({ placeholder }) => {
  const { label } = useContext(SelectContext);
  return <span className={cn("block truncate text-left", !label && "text-gray-400")}>{label || placeholder}</span>;
};

const SelectContent = ({ children, className }) => {
  const { open } = useContext(SelectContext);
  if (!open) return null;
  return (
    <div className={cn("absolute z-50 min-w-[8rem] overflow-hidden rounded-xl border border-gray-100 bg-white text-gray-950 shadow-xl mt-2 w-full", className)}>
      <div className="p-1">{children}</div>
    </div>
  );
};

const SelectItem = ({ value: itemValue, children, className }) => {
  const { setValue, setOpen, setLabel, value, onValueChange } = useContext(SelectContext);
  const handleSelect = () => {
    setValue(itemValue);
    setLabel(children);
    setOpen(false);
    if (onValueChange) onValueChange(itemValue);
  };
  // Sync label if value matches default
  useEffect(() => { if (value === itemValue) setLabel(children); }, [value, itemValue, children, setLabel]);

  return (
    <div onClick={handleSelect} className={cn("relative flex w-full cursor-pointer select-none items-center rounded-lg py-2.5 pl-9 pr-3 text-sm hover:bg-gray-50", className)}>
      <span className="absolute left-3 flex h-3.5 w-3.5 items-center justify-center">
        {value === itemValue && <Check className="h-4 w-4 text-blue-600" />}
      </span>
      <span className="truncate">{children}</span>
    </div>
  );
};

// --- Main Component ---

export default function HeroSection() {
  return (
    <section id="home" className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Content */}
          <div className="space-y-10 relative z-10 pt-4">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Find PGs Near TIMSCDR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-purple-600">
                  Easily
                </span>
              </h1>
              <p className="text-xl text-gray-500 max-w-lg font-normal">
                Verified and trusted accommodations for TIMSCDR students only
              </p>
            </div>

            {/* Search Card */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-2 sm:p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400 pl-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kandivali">Kandivali East</SelectItem>
                      <SelectItem value="thakur">Thakur Village</SelectItem>
                      <SelectItem value="malad">Malad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-400 pl-1 flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4" /> Budget
                  </label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-8k">₹5,000 - ₹8,000</SelectItem>
                      <SelectItem value="8-12k">₹8,000 - ₹12,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 pl-1 flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="h-12 border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl font-normal">Boys</Button>
                  <Button variant="outline" className="h-12 border-gray-200 text-gray-600 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50/50 rounded-xl font-normal">Girls</Button>
                  <Button variant="outline" className="h-12 border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50/50 rounded-xl font-normal">Any</Button>
                </div>
              </div>

              <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all duration-300 transform hover:-translate-y-0.5">
                <Search className="w-5 h-5 mr-2" /> Search PGs
              </Button>
            </div>

            <div className="flex items-center gap-8 pl-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">200+ PGs Listed</div>
                  <div className="text-xs text-gray-500">In Kandivali Area</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                 <div>
                  <div className="text-sm font-semibold text-gray-900">100% Verified</div>
                  <div className="text-xs text-gray-500">For Student Safety</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative pt-8 lg:pt-0 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[3rem] transform rotate-3 scale-95 opacity-50 -z-10"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1080"
              alt="TIMSCDR Campus"
              className="relative rounded-[2rem] shadow-2xl w-full h-[650px] object-cover border-8 border-white"
            />
            
            {/* Floating Cards */}
            <div className="absolute top-12 -right-8 bg-white rounded-2xl shadow-xl p-4 z-20 max-w-[200px]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Near TIMSCDR</div>
                  <div className="text-xs text-gray-500 font-medium">Within 2km</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-16 -left-8 bg-white rounded-2xl shadow-xl p-4 z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-200 shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Safe & Verified</div>
                  <div className="text-xs text-gray-500 font-medium">All PGs checked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}