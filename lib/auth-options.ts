import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

const ADMIN_CREDENTIALS = {
  email: "aiconsulting06000@gmail.com",
  passwordHash: "$2b$10$A2gdFQZWJc/AD1V69LftFu65hkZO9Jt5mjsQhz8LDZ0c0iwZAC89u"
}

export const authOptions: AuthOptions = {
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

        if (credentials.email !== ADMIN_CREDENTIALS.email) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          ADMIN_CREDENTIALS.passwordHash
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: "1",
          email: ADMIN_CREDENTIALS.email,
          name: "Admin ACF",
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
