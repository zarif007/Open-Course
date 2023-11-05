"use client";

import React from "react";
import ActivityCalendar, {
  Activity,
  ThemeInput,
} from "react-activity-calendar";
import TooltipComponent from "../ui/TooltipComponent";
import LargeHeading from "../ui/LargeHeading";
import { useTheme } from "next-themes";

const HeatmapContrib = () => {
  const data: Activity[] = [
    {
      date: "2023-01-01",
      count: 16,
      level: 2,
    },
    {
      date: "2023-02-20",
      count: 16,
      level: 2,
    },
    {
      date: "2023-01-20",
      count: 16,
      level: 2,
    },
    {
      date: "2023-02-20",
      count: 16,
      level: 1,
    },
    {
      date: "2023-03-20",
      count: 16,
      level: 2,
    },
    {
      date: "2023-04-20",
      count: 16,
      level: 4,
    },
    {
      date: "2023-12-31",
      count: 16,
      level: 4,
    },
  ];

  const { theme } = useTheme();

  const explicitTheme: ThemeInput = {
    light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
    dark: [
      theme === "dark" ? "#f1f5f9" : "#020617",
      "#fda4af",
      "#f43f5e",
      "#be123c",
      "#881337",
    ],
  };
  return (
    <div>
      <LargeHeading
        size="sm"
        className="my-3 underline decoration-rose-500 decoration-4"
      >
        Activities
      </LargeHeading>
      <ActivityCalendar
        data={data}
        theme={explicitTheme}
        renderBlock={(block, activity) => {
          return <>{block}</>;
        }}
      />
    </div>
  );
};

export default HeatmapContrib;
