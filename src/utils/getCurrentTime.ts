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

  return dateString;
};

export default getCurrentTime;
