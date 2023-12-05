import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import GitHubProvider from 'next-auth/providers/github';
import { connectToDB } from '@/lib/connectToMongoose';
import User from '@/lib/models/user.model';
import CredentialProvider from 'next-auth/providers/credentials';

const scopes = ['identify'].join(' ');

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: '', placeholder: '' },
        password: { label: '', placeholder: '' },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        try {
          await connectToDB();

          const user = await User.findOne({ email: credentials?.email });

          return user;
        } catch {
          return null;
        }
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      authorization: { params: { scope: scopes } },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
};
