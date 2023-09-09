const pick = (query: URLSearchParams, list: string[]) => {
  const findObj: any = {};

  list.map((item) => {
    if (query.get(item)) {
      findObj[item] = query.get(item);
    }
  });

  return findObj;
};

export default pick;
