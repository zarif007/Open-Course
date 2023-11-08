"use client";

import React, { useState } from "react";
import ActivityCalendar, {
  Activity as IActivityHeatmap,
  ColorScale,
  ThemeInput,
  Level,
} from "react-activity-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import LargeHeading from "../ui/LargeHeading";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { useAppSelector } from "@/redux/store";
import { IActivity } from "@/types/actvity";
import getCurrentTime from "@/utils/getCurrentTime";

const populateDates = (
  startDate: string,
  endDate: string
): IActivityHeatmap[] => {
  const dates: IActivityHeatmap[] = [];

  const start = new Date(startDate);
  const end = new Date(endDate);
  const date = new Date(start);

  while (date <= end) {
    dates.push({
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0,
    });
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const HeatmapContrib = () => {
  const signedInUser = useAppSelector(
    (state) => state.signedInUserReducer.value.signedInUser
  );

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activitiesForHeatmap, setActivitiesForHeatmap] = useState<
    IActivityHeatmap[]
  >([]);

  const formatActivities = (activities: IActivity[]) => {
    const updated: IActivityHeatmap[] = populateDates(
      "2023-01-01",
      "2023-12-31"
    );

    const activityMap = new Map<string, IActivityHeatmap>();

    activities.map((activity) => {
      const date = activity.date as string;
      const count = activityMap.get(date.slice(0, 10))?.count ?? 0;
      activityMap.set(date.slice(0, 10) as string, {
        date: date.slice(0, 10) as string,
        count: count + 1,
        level: Math.min(count + 1, 4) as Level,
      });
    });

    activityMap.forEach((activity) => {
      updated.push(activity);
    });
    setActivitiesForHeatmap(updated);
  };

  useQuery({
    queryKey: [`heat-map-data-${signedInUser?.id}`],
    enabled: !!signedInUser?.id,
    queryFn: async () => {
      const { data } = await (
        await fetch(`${nextApiEndPoint}/activity/${signedInUser?.id}`)
      ).json();

      setActivities(data);
      formatActivities(data);
    },
  });

  const { theme } = useTheme();

  console.log(getCurrentTime());

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
        data={activitiesForHeatmap}
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
