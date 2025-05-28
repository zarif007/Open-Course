'use client';

import React, { useState, useMemo, useCallback } from 'react';
import ActivityCalendar, {
  Activity as IActivityHeatmap,
  ColorScale,
  ThemeInput,
  Level,
} from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import LargeHeading from '../ui/LargeHeading';
import { useTheme } from 'next-themes';
import { useQuery } from '@tanstack/react-query';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { IActivity } from '@/types/actvity';
import getCurrentTime from '@/utils/getCurrentTime';
import Link from 'next/link';
import Points from '../ui/Points';
import HeatmapSkeleton from '../skeletons/Heatmap.Skeleton';
import { IUser } from '@/types/user';

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

const Heatmap = ({ user }: { user: IUser | null }) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<{
    date: string;
    activities: Partial<IActivity>[];
  }>();

  // Memoize the fetch function to prevent unnecessary recreations
  const fetchActivities = useCallback(async () => {
    if (!user?.id) return [];
    const response = await fetch(`${nextApiEndPoint}/activity/${user.id}`);
    const { data } = await response.json();
    return data as IActivity[];
  }, [user?.id]);

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['heat-map-data', user?.id],
    queryFn: fetchActivities,
    enabled: !!user?.id,
    staleTime: 1000 * 60,
  });

  const activitiesForHeatmap = useMemo(() => {
    if (!activities.length) return [];

    const updated = populateDates(
      '2025-01-01',
      getCurrentTime() ?? '2025-12-31'
    );

    const activityMap = new Map<string, IActivityHeatmap>();

    activities.forEach((activity) => {
      const date = activity.date as string;
      const count = activityMap.get(date)?.count ?? 0;
      activityMap.set(date, {
        date: date,
        count: count + 1,
        level: Math.min(count + 1, 4) as Level,
      });
    });

    activityMap.forEach((activity) => {
      updated.push(activity);
    });

    return updated.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [activities]);

  const handleSetSelectedDate = useCallback(
    (date: string) => {
      const filteredActivities = activities
        .filter((activity) => (activity.date as string) === date)
        .map(({ date, link, type, text }) => ({ date, link, type, text }));

      setSelectedDate({ date, activities: filteredActivities });
    },
    [activities]
  );

  const colors: ColorScale = useMemo(
    () => [
      theme === 'dark' ? '#f1f5f9' : '#020617',
      '#fda4af',
      '#f43f5e',
      '#be123c',
      '#881337',
    ],
    [theme]
  );

  const explicitTheme: ThemeInput = useMemo(
    () => ({
      light: colors,
      dark: colors,
    }),
    [colors]
  );

  return (
    <div>
      {isLoading ? (
        <HeatmapSkeleton />
      ) : (
        <ActivityCalendar
          data={activitiesForHeatmap}
          theme={explicitTheme}
          eventHandlers={{
            onClick: () => (activity) => handleSetSelectedDate(activity.date),
          }}
          renderBlock={(block, activity) => {
            return React.cloneElement(block, {
              'data-tooltip-id': 'react-tooltip',
              'data-tooltip-html': `${activity.count} activities on ${activity.date}`,
            });
          }}
        />
      )}

      <ReactTooltip id="react-tooltip" />

      {selectedDate?.date && (
        <div className="border-2 border-slate-300 dark:border-gray-800 my-6 p-4 rounded">
          <p className="font-semibold">
            <span className="text-rose-500">
              {selectedDate.activities.length}
            </span>{' '}
            Activities On{' '}
            <span className="text-rose-500">{selectedDate.date}</span>
          </p>

          {selectedDate.activities.map((activity, index) => (
            <div
              key={index}
              className="my-1 text-sm flex items-center justify-between"
            >
              <Link
                className="text-blue-600 font-semibold"
                href={activity.link as string}
                target="_blank"
              >
                {activity.text}
              </Link>
              <Points points={activity.type === 'created' ? 10 : 2} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Heatmap);
