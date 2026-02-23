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
      className={`font-bold ${sizes[size]} tracking-tighter`}
      animate={{
        textShadow: [
          '0 0 5px #00FFD1, 0 0 10px #00FFD1, 0 0 20px #00FFD1',
          '0 0 10px #FF006E, 0 0 20px #FF006E, 0 0 40px #FF006E',
          '0 0 5px #00FFD1, 0 0 10px #00FFD1, 0 0 20px #00FFD1'
        ]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <span className="text-[#FFE500]">ADSO</span>
      <span className="text-[#00FFD1]">TUBE</span>
    </motion.div>
  );
}