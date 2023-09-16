import next, { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const apiReqWrapper = async (
  fn: NextApiHandler,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await fn(req, res);
  } catch (error) {
    return error;
  }
};

export default apiReqWrapper;
