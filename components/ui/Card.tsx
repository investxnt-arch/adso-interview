'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'highlight' | 'danger';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  onClick
}: CardProps) {
  const variants = {
    default: {
      border: 'border-gray-800',
      shadow: '#00FFD1',
      bg: 'bg-[#111]'
    },
    highlight: {
      border: 'border-[#FFE500]',
      shadow: '#FF006E',
      bg: 'bg-[#111]'
    },
    danger: {
      border: 'border-[#FF006E]',
      shadow: '#FFE500',
      bg: 'bg-[#111]'
    }
  };

  const style = variants[variant];

  const cardClasses = `
    border-4 ${style.border} ${style.bg} p-6 rounded-lg
    ${hover ? 'hover:border-[#00FFD1] transition-all cursor-pointer' : ''}
    shadow-[6px_6px_0_${style.shadow}]
    ${className}
  `;

  if (onClick) {
    return (
      <motion.div
        whileHover={hover ? { scale: 1.02 } : {}}
        whileTap={hover ? { scale: 0.98 } : {}}
        className={cardClasses}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={cardClasses}>{children}</div>;
}