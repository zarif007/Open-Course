"use client";

import React from "react";
import ActivityCalendar, {
  Activity,
  ColorScale,
  ThemeInput,
} from "react-activity-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import LargeHeading from "../ui/LargeHeading";
import { useTheme } from "next-themes";

const HeatmapContrib = () => {
  const data: Activity[] = [
    {
      date: "2023-01-01",
      count: 1,
      level: 2,
    },
    {
      date: "2023-02-20",
      count: 3,
      level: 2,
    },
    {
      date: "2023-01-20",
      count: 4,
      level: 2,
    },
    {
      date: "2023-02-20",
      count: 10,
      level: 1,
    },
    {
      date: "2023-03-20",
      count: 0,
      level: 2,
    },
    {
      date: "2023-04-20",
      count: 0,
      level: 4,
    },
    {
      date: "2023-12-31",
      count: 0,
      level: 4,
    },
  ];

  const { theme } = useTheme();

  const colors: ColorScale = [
    theme === "dark" ? "#f1f5f9" : "#020617",
    "#fda4af",
    "#f43f5e",
    "#be123c",
    "#881337",
  ];

  const explicitTheme: ThemeInput = {
    light: colors,
    dark: colors,
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
        eventHandlers={{
          onClick: (event) => (activity) => {
            alert(JSON.stringify(activity));
          },
        }}
        renderBlock={(block, activity) => {
          return React.cloneElement(block, {
            "data-tooltip-id": "react-tooltip",
            "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
          });
        }}
      />
      <ReactTooltip id="react-tooltip" />
    </div>
  );
};

export default HeatmapContrib;
