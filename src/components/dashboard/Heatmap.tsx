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
import { useTheme } from 'next-themes';
import { useQuery } from '@tanstack/react-query';
import { nextApiEndPoint } from '@/utils/apiEndpoints';
import { IActivity } from '@/types/actvity';
import getCurrentTime from '@/utils/getCurrentTime';
import Link from 'next/link';
import Points from '../ui/Points';
import HeatmapSkeleton from '../skeletons/Heatmap.Skeleton';
import { IUser } from '@/types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

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
  const [selectedYear, setSelectedYear] = useState<string>('current');

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

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    activities.forEach((activity) => {
      const year = new Date(activity.date as string).getFullYear().toString();
      years.add(year);
    });

    const currentYear = new Date().getFullYear().toString();
    years.add(currentYear);

    return [
      'current',
      ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
    ];
  }, [activities]);

  const getDateRange = useCallback((year: string) => {
    const currentDate =
      getCurrentTime() ?? new Date().toISOString().slice(0, 10);

    if (year === 'current') {
      const endDate = currentDate;
      const startDate = endDate.replace(/^(\d{4})/, (match, year) =>
        String(parseInt(year) - 1)
      );
      return { startDate, endDate };
    } else {
      return {
        startDate: `${year}-01-01`,
        endDate: `${year}-12-31`,
      };
    }
  }, []);

  const activitiesForHeatmap = useMemo(() => {
    const { startDate, endDate } = getDateRange(selectedYear);
    const updated = populateDates(startDate, endDate);

    const activityMap = new Map<string, IActivityHeatmap>();

    updated.forEach((item) => {
      activityMap.set(item.date, item);
    });

    activities.forEach((activity) => {
      const date = activity.date as string;
      const activityDate = new Date(date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (activityDate >= start && activityDate <= end) {
        const existing = activityMap.get(date);
        if (existing) {
          const newCount = existing.count + 1;
          activityMap.set(date, {
            date: date,
            count: newCount,
            level: Math.min(newCount, 4) as Level,
          });
        }
      }
    });

    return Array.from(activityMap.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [activities, selectedYear, getDateRange]);

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
    <div className="w-full">
      <div className="mb-4 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            {selectedYear === 'current' ? 'Last 12 months' : selectedYear}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {availableYears.map((year) => (
              <DropdownMenuItem
                key={year}
                onClick={() => setSelectedYear(year)}
                className={
                  selectedYear === year ? 'bg-gray-100 dark:bg-gray-900' : ''
                }
              >
                {year === 'current' ? 'Last 12 months' : year}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full overflow-x-auto flex justify-center items-center">
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
      </div>

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
