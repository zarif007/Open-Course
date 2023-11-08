function formatCurrentDate(dateString: string): string | null {
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

export default formatCurrentDate;
