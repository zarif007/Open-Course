import NextAuth from "next-auth";
import { authOptions } from "./options";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
