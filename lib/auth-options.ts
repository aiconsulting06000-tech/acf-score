import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

// IMPORTANT : Changez ces credentials en production !
const ADMIN_CREDENTIALS = {
  email: "aiconsulting06000@gmail.com", // ← Mettez votre email
  passwordHash: "$2b$10$A2gdFQZWJc/AD1V69LftFu65hkZO9Jt5mjsQhz8LDZ0c0iwZAC89u"
}
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Vérifier l'email
        if (credentials.email !== ADMIN_CREDENTIALS.email) {
          return null
        }

        // Vérifier le mot de passe
        const isPasswordValid = await compare(
          credentials.password,
          ADMIN_CREDENTIALS.passwordHash
        )

        if (!isPasswordValid) {
          return null
        }

        // Authentification réussie
        return {
          id: "1",
          email: ADMIN_CREDENTIALS.email,
          name: "Admin ACF",
          role: "admin"
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 heures
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
