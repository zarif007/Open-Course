import React from "react";
import ConfettiExplosion from "react-confetti-explosion";

const Confetti = ({ isExploding }: { isExploding: boolean }) => {
  return (
    <>
      {isExploding && (
        <ConfettiExplosion
          force={0.5}
          duration={3000}
          particleCount={350}
          width={5000}
        />
      )}
    </>
  );
};

export default Confetti;
