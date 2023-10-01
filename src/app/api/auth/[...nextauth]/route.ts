import NextAuth from "next-auth";
import { authOptions } from "./options";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/connectToMongoose";
import createSlug from "@/utils/createSlug";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user }) {
      try {
        await axios.post(`${nextApiEndPoint}/user`, {
          name: user.name,
          email: user.email,
          image: user.image,
          userName: createSlug(user.name ?? ""),
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
