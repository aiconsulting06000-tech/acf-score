import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Si l'utilisateur est authentifié, continuer
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Vérifier si l'utilisateur a un token valide
        return !!token
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
)

// Protéger toutes les routes /admin/* SAUF login, forgot-password et reset-password
export const config = {
  matcher: [
    "/admin/contacts/:path*",
    "/admin/diagnostics/:path*",
    "/admin/stats/:path*",
  ]
}
