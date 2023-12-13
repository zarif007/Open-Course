'use client';

import React, { useState, useEffect } from 'react';

const TextAppearAnimation = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation on component mount by setting isVisible to true
    setIsVisible(true);
  }, [text]);

  return (
    <div
      data-testid="cy-free-landing-title"
      className={`text-container transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {text}
    </div>
  );
};

export default TextAppearAnimation;
