const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to format the date
function formatDate(mDBDate: Date | string) {
  if (mDBDate === "") return "";
  const date = new Date(mDBDate.toString());
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export default formatDate;
