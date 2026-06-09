import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import * as crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Harvest Accounts",
      credentials: {
        email: { label: "Email Address", type: "email", placeholder: "admin@harvestnepal.org" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password credentials.");
        }

        // Connect via driver adapter prisma client
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("No administrative user registered with this email.");
        }

        const hashed = hashPassword(credentials.password);
        if (user.password !== hashed) {
          throw new Error("Incorrect secure password.");
        }

        // Return user session object containing role and details
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login", // Redirect to custom clean login page
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days active session duration
  },
  secret: process.env.NEXTAUTH_SECRET || "harvest-nepal-super-secret-key-2026",
};
