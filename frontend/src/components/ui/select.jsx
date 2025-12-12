import React from "react";
import { ChevronDown } from "lucide-react";

// 1. The Main Select Component
export const Select = ({ value, onValueChange, children }) => {
  // We clone the children to pass the 'onChange' handler to the correct 'SelectContent'
  // But for this simple implementation, we just wrap a native <select>
  // This approach is much simpler and doesn't require extra libraries.
  
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex h-12 w-full appearance-none items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-4 h-4 w-4 opacity-50 pointer-events-none" />
    </div>
  );
};

// 2. SelectTrigger (Visual only in this simple version, renders nothing but passes children)
export const SelectTrigger = ({ children }) => {
  return <>{children}</>;
};

// 3. SelectValue (Visual only, acts as placeholder or selected value display)
export const SelectValue = ({ placeholder }) => {
  return <option value="" disabled>{placeholder}</option>;
};

// 4. SelectContent (Wrapper for options)
export const SelectContent = ({ children }) => {
  return <>{children}</>;
};

// 5. SelectItem (The actual option)
export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};