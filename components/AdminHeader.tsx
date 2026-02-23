'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminHeader() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/contacts', label: 'Contacts' },
    { href: '/admin/diagnostics', label: 'Diagnostics' },
    { href: '/admin/stats', label: 'Stats' },
  ]

  return (
    <>
      <style>{`
        .adh{background:#071122;border-bottom:1px solid rgba(201,168,76,.2);padding:0;font-family:'Inter',sans-serif}
        .adh-w{max-width:1320px;margin:0 auto;padding:0 32px;display:flex;align-items:center;height:56px;gap:20px}
        .adh-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;margin-right:8px}
        .adh-badge{width:30px;height:30px;background:#c9a84c;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:10px;color:#050c1a}
        .adh-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:#fff}
        .adh-admin-tag{font-size:10px;color:#c9a84c;background:rgba(201,168,76,.12);border:1px solid rgba(201,168,76,.2);padding:2px 8px;border-radius:3px;font-family:'JetBrains Mono',monospace;letter-spacing:.06em}
        .adh-nav{display:flex;align-items:center;gap:2px}
        .adh-link{color:#9db0c8;text-decoration:none;font-size:13px;font-weight:500;padding:6px 12px;border-radius:5px;transition:.2s}
        .adh-link:hover,.adh-link.on{color:#c9a84c;background:rgba(201,168,76,.08)}
        .adh-sep{flex:1}
        .adh-user{display:flex;align-items:center;gap:12px}
        .adh-user-info{text-align:right}
        .adh-user-name{font-size:13px;font-weight:600;color:#e2eaf5}
        .adh-user-email{font-size:11px;color:#6b7fa0}
        .adh-signout{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#9db0c8;padding:7px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:500;transition:.2s;font-family:'Inter',sans-serif}
        .adh-signout:hover{background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.3);color:#ef4444}
        @media(max-width:768px){.adh-user-info{display:none}}
      `}</style>
      <div className="adh">
        <div className="adh-w">
          <Link href="/admin" className="adh-logo">
            <div className="adh-badge">ACF</div>
            <span className="adh-title">Admin</span>
            <span className="adh-admin-tag">ADMIN</span>
          </Link>

          <nav className="adh-nav">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className={`adh-link${pathname===item.href?' on':''}`}>{item.label}</Link>
            ))}
          </nav>

          <div className="adh-sep"/>

          {session?.user && (
            <div className="adh-user">
              <div className="adh-user-info">
                <div className="adh-user-name">{session.user.name}</div>
                <div className="adh-user-email">{session.user.email}</div>
              </div>
              <button className="adh-signout" onClick={() => signOut({ callbackUrl: '/admin/login' })}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
