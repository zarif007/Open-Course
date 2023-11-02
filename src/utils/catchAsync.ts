import createHttpError from "http-errors";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

const catchAsync =
  (fn: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      fn(req, res);
    } catch (error) {
      errorHandler(error, res);
    }
  };

// Shape of the response when an error is thrown
interface ErrorResponse {
  error: {
    message: string;
    err?: any; // Sent for unhandled errors reulting in 500
  };
  status?: number; // Sent for unhandled errors reulting in 500
}

function errorHandler(err: unknown, res: NextApiResponse<ErrorResponse>) {
  // Errors with statusCode >= 500 are should not be exposed
  if (createHttpError.isHttpError(err) && err.expose) {
    // Handle all errors thrown by http-errors module
    return res.status(err.statusCode).json({ error: { message: err.message } });
  } else if (err instanceof ValidationError) {
    // Handle yup validation errors
    return res.status(400).json({ error: { message: err.errors.join(", ") } });
  } else {
    // default to 500 server error
    console.error(err);
    return res.status(500).json({
      error: { message: "Internal Server Error", err: err },
      status: createHttpError.isHttpError(err) ? err.statusCode : 500,
    });
  }
}

export default catchAsync;
