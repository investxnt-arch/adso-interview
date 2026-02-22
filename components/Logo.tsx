'use client';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  return (
    <motion.div
      className={`font-bold ${sizes[size]} tracking-tighter logo`}
      animate={{
        textShadow: [
          '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff',
          '0 0 10px #f0f, 0 0 20px #f0f, 0 0 40px #f0f',
          '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff'
        ]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <span className="text-[#FFE500]">ADSO</span>
      <span className="text-[#00FFD1]">TUBE</span>
    </motion.div>
  );
}