'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,
  icon
}: ButtonProps) {
  const variants = {
    primary: {
      bg: 'bg-[#FFE500]',
      text: 'text-black',
      border: 'border-black',
      shadow: '#00FFD1',
      hover: 'hover:bg-[#FFE500]/90'
    },
    secondary: {
      bg: 'bg-[#00FFD1]',
      text: 'text-black',
      border: 'border-black',
      shadow: '#FF006E',
      hover: 'hover:bg-[#00FFD1]/90'
    },
    danger: {
      bg: 'bg-[#FF006E]',
      text: 'text-white',
      border: 'border-black',
      shadow: '#FFE500',
      hover: 'hover:bg-[#FF006E]/90'
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-[#00FFD1]',
      border: 'border-2 border-[#00FFD1]',
      shadow: 'transparent',
      hover: 'hover:bg-[#00FFD1]/10'
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const style = variants[variant];
  const sizeStyle = sizes[size];

  const buttonContent = (
    <motion.div
      className="flex items-center justify-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.div>
  );

  const className = `
    ${style.bg} ${style.text} ${style.border} border-4 font-mono font-bold
    ${sizeStyle} ${fullWidth ? 'w-full' : ''}
    shadow-[4px_4px_0_${style.shadow}] hover:shadow-[6px_6px_0_${style.shadow}]
    transition-all disabled:opacity-50 disabled:cursor-not-allowed
    rounded-lg ${style.hover}
  `;

  if (href) {
    return (
      <a href={href} className={`inline-block ${className}`}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {buttonContent}
    </button>
  );
}