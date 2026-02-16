import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

// CREDENTIALS ADMIN
const ADMIN_CREDENTIALS = {
  email: "admin@acf-score.com",
  passwordHash: "$2b$10$az3i4IXFn4gjXGu3CEb49OPYJ3BfDXBex0jIp3UBT1qJCHD23A19W"
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
