const pick = (query: URLSearchParams, list: string[], returnArray: boolean) => {
  const findObj: any = {};

  list.map((item) => {
    if (query.get(item)) {
      if (query.get(item)?.split(",")) {
        console.log(query.get(item)?.split(","));
      }
      findObj[item] = returnArray
        ? query.get(item)?.split(",")
        : query.get(item);
    }
  });

  return findObj;
};

export default pick;
