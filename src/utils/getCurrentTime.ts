import { parse } from "date-fns";

interface IDateTimeFormatOptions {
  localeMatcher?: "best fit" | "lookup";
  weekday?: "long" | "short" | "narrow";
  era?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
  formatMatcher?: "best fit" | "basic";
  hour12?: boolean;
  timeZone?: string;
}

function formatDate(dateString: string): string | null {
  const dateMatch = dateString.match(
    /(\w+), (\w+) (\d+), (\d+) at (\d+:\d+:\d+ [APM]+) GMT[+-]\d+/
  );
  if (!dateMatch) {
    return null; // Parsing failed
  }

  const [, dayOfWeek, month, day, year, time] = dateMatch;

  const months: { [key: string]: string } = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  // Format the date in 'YYYY-MM-DD' format
  const formattedDate = `${year}-${months[month]}-${day.padStart(2, "0")}`;
  return formattedDate;
}

const getCurrentTime = () => {
  const date = new Date();
  const options = {
    timeZoneName: "short",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  } as IDateTimeFormatOptions;
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const dateString = formatter.format(date);

  return formatDate(dateString) ?? new Date().toString();
};

export default getCurrentTime;
