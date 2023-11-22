const getCurrentTime = () => {
  const timestamp = Date.now();
  const offset = new Date().getTimezoneOffset();
  const localTime = new Date(timestamp - offset * 60000);
  const formattedLocalTime = localTime.toISOString().split("T")[0];

  return formattedLocalTime;
};

export default getCurrentTime;
