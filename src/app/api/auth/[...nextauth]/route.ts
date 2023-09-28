import NextAuth from "next-auth";
import { authOptions } from "./options";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/connectToMongoose";

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
      ],
  callbacks: {
    async signIn(user) {
      try {
        // Make the axios request
        connectToDB();
        console.log(user)
        await User.findOneAndUpdate(
            user,
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );

        // Assuming the request was successful, return true
        return true;
      } catch (error) {
        // Handle any errors and return false in case of failure
        console.error(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
