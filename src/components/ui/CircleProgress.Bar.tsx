import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import React from "react";
import { useTheme } from "next-themes";

const CircleProgressBar = ({ value }: { value: number }) => {
  const { theme } = useTheme();
  return (
    <div style={{ width: 40 }}>
      <CircularProgressbar
        className="h-12 w-12 m-0"
        value={value}
        maxValue={1}
        text={`${parseInt((value * 100).toFixed(0))}%`}
        styles={buildStyles({
          textColor: theme === "dark" ? "#e2e8f0" : "#0f172a",
          trailColor: theme === "dark" ? "#0f172a" : "#e2e8f0",
          pathColor: theme === "dark" ? "#e2e8f0" : "#0f172a",
        })}
      />
    </div>
  );
};

export default CircleProgressBar;
