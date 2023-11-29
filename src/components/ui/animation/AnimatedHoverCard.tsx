"use client";

import React, { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

const AnimatedHoverCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid w-full place-content-center">
      <TiltCard>{children}</TiltCard>
    </div>
  );
};

const TiltCard = ({ children }: { children: ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e: any) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-96 rounded-xl grid place-content-center mx-auto"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute h-full inset-4 grid place-content-center rounded-xl shadow-lg mx-auto"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedHoverCard;
