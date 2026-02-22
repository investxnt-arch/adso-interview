'use client';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[#00FFD1] text-xs font-mono tracking-wider mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full bg-black border-4 ${error ? 'border-[#FF006E]' : 'border-gray-800'} 
          text-white p-4 font-mono text-sm outline-none
          focus:border-[#00FFD1] transition-all
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-[#FF006E] text-xs font-mono mt-2">{error}</p>
      )}
    </div>
  );
}