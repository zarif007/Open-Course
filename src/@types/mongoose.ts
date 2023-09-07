import { Mongoose } from "mongoose";

/* eslint-disable no-var */

declare global {
  var mongoose: {
    conn: Mongoose | null;
  };
}
