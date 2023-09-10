export const v1MainEndpoint =
  "https://msv0yca780.execute-api.us-west-2.amazonaws.com/api/v1";

export const nextApiEndPoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://open-course.vercel.app/api";
