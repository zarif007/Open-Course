const currentLocalTime = () => {
  const timestamp = Date.now();
  const offset = new Date().getTimezoneOffset();
  const localTime = new Date(timestamp - offset * 60000);

  return localTime;
};

export default currentLocalTime;
