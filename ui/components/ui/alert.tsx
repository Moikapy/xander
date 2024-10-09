import React from 'react';

// Alert Component
export const Alert = ({ children, variant = "default" }) => (
  <div className={`p-4 rounded-lg ${variant === "destructive" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
    {children}
  </div>
);

export const AlertTitle = ({ children }) => (
  <h5 className="font-medium mb-1">{children}</h5>
);

export const AlertDescription = ({ children }) => (
  <p>{children}</p>
);

// Button Component
export const Button = ({ children, type = "button", disabled, onClick }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`px-4 py-2 rounded bg-blue-500 text-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
  >
    {children}
  </button>
);

// Input Component
export const Input = ({ type = "text", value, onChange, placeholder, disabled, className }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`border rounded px-3 py-2 w-full ${disabled ? 'bg-gray-100' : 'bg-white'} ${className}`}
  />
);

// Card Components
export const Card = ({ children, className }) => (
  <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-xl font-semibold">{children}</h3>
);

export const CardContent = ({ children, className }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

export const CardFooter = ({ children }) => (
  <div className="px-6 py-4 border-t">{children}</div>
);
