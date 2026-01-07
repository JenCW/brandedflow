"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface VeteranSaluteIllustrationProps {
  onAnimationComplete?: () => void;
}

export default function VeteranSaluteIllustration({ 
  onAnimationComplete
}: VeteranSaluteIllustrationProps) {
  useEffect(() => {
    // Trigger completion after animation duration
    // SVG animations typically last 1-2 seconds
    const timer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2000); // Adjust based on your SVG animation length

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full"
      >
        <Image
          src="/images/veteran-salute.svg"
          alt="Veteran saluting"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
