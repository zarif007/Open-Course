function formatCurrentDate(dateString: string): string | null {
  const dateMatch = dateString.match(
    /(\w+), (\w+) (\d{1,2}), (\d{4}) at (\d+:\d+:\d+ [APM]+) (GMT|UTC)[+-]\d+/
  );

  if (!dateMatch) {
    console.log(dateString);
    return null; // Parsing failed
  }

  const [, dayOfWeek, month, day, year, time, timezone] = dateMatch;

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

  // You can use other components like dayOfWeek, time, timezone as needed

  return formattedDate;
}

export default formatCurrentDate;
