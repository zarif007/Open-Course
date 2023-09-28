import NextAuth from "next-auth";
import { authOptions } from "./options";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    async signIn(user) {
      try {
        // Make the axios request
        await axios.put(`${nextApiEndPoint}/user`, user);

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
