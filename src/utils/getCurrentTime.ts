import currentLocalTime from "./currentLocalTime";

const getCurrentTime = () => {
  const formattedLocalTime = currentLocalTime().toISOString().split("T")[0];

  return formattedLocalTime;
};

export default getCurrentTime;
