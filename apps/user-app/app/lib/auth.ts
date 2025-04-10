import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import prisma from "../../../../packages/db/src";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        number: {
          label: "Phone number",
          type: "text",
          placeholder: "111100000",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.number || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { number: credentials.number },
          });
          if (!user) return null;

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password!
          );
          if (isValidPassword) {
            return {
              id: user.id.toString(),
              number: user.number || null,
              name: user.name,
            };
          }
        } catch (error) {
          console.log("Authentication error:", error);
          return null;
        }

        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "credentials") return true;
      else if (account?.provider === "github") {
        try {
          const exisingUser = await prisma.user.findUnique({
            where: { githubId: account.providerAccountId },
          });

          if (!exisingUser) {
            const newUser = await prisma.user.create({
              data: {
                githubId: account.providerAccountId,
                name: profile?.name,
                email: profile?.email,
              },
            });
            user.id = newUser.id.toString();
          } else {
            user.id = exisingUser?.id.toString();
          }
        } catch (error) {
          console.log("Github Signin error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.sub = user.id;
      }
      if (account) {
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, user, token }: any) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.accountId = token.providerAccountId || null;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback:", { url, baseUrl })
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  debug:true,
};
