const getCurrentTime = () => {
  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toISOString().split("T")[0];

  return formattedDate;
};

export default getCurrentTime;
