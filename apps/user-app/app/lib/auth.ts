
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import db from "@repo/db/client";
import bcrypt from "bcrypt";

// Extend the Session and User types to include id and number
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      number?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    number?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export const authOptions: AuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) return null;

        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (isPasswordValid) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name ?? null,
              email: existingUser.email ?? null,
              number: existingUser.number,
            };
          }
          return null;
        }

        // New user signup fallback (optional)
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const newUser = await db.user.create({
          data: {
            number: credentials.phone,
            password: hashedPassword,
          },
        });

        return {
          id: newUser.id.toString(),
          name: newUser.name ?? null,
          email: newUser.email ?? null,
          number: newUser.number,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.email = user.email ?? null;
        token.number = (user as any).number ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? null;
        session.user.number = typeof token.number === "string" ? token.number : null;
      }
      return session;
    },
  },

  secret: process.env.JWT_SECRET || "secret",
};
