'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [hasResults, setHasResults] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setHasResults(!!localStorage.getItem('acf_results'))
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '/pourquoi', label: 'Pourquoi ACF' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <style>{`
        .ah{position:sticky;top:0;z-index:900;background:rgba(5,12,26,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(201,168,76,.2);transition:box-shadow .3s;font-family:'Inter',sans-serif}
        .ah.sc{box-shadow:0 4px 40px rgba(0,0,0,.5)}
        .ah-w{max-width:1320px;margin:0 auto;padding:0 32px;display:flex;align-items:center;height:68px;gap:24px}
        .ah-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
        .ah-badge{width:34px;height:34px;background:#c9a84c;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:12px;color:#050c1a;flex-shrink:0}
        .ah-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:#fff;line-height:1.2}
        .ah-sub{font-size:9px;color:#c9a84c;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
        .ah-nav{display:flex;align-items:center;gap:2px;margin-left:auto}
        .ah-link{color:#9db0c8;text-decoration:none;font-size:13px;font-weight:500;padding:7px 13px;border-radius:6px;transition:.2s}
        .ah-link:hover,.ah-link.on{color:#c9a84c;background:rgba(201,168,76,.08)}
        .ah-sep{color:rgba(201,168,76,.35);font-size:11px;margin:0 2px;user-select:none}
        .ah-res{color:#c9a84c;text-decoration:none;font-size:12px;font-weight:600;padding:7px 13px;border-radius:6px;border:1px solid rgba(201,168,76,.28);background:rgba(201,168,76,.06);display:flex;align-items:center;gap:6px;transition:.2s}
        .ah-res:hover{background:rgba(201,168,76,.14);border-color:rgba(201,168,76,.55)}
        .ah-std{color:#6b7fa0;text-decoration:none;font-size:11px;font-weight:500;padding:6px 11px;border-radius:6px;border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:5px;transition:.2s;letter-spacing:.02em;margin-right:2px}
        .ah-std:hover{color:#9db0c8;border-color:rgba(255,255,255,.16)}
        .ah-cta{background:#c9a84c;color:#050c1a;padding:9px 20px;border-radius:6px;font-weight:700;font-size:13px;text-decoration:none;transition:.2s;white-space:nowrap;margin-left:6px;font-family:'Space Grotesk',sans-serif}
        .ah-cta:hover{background:#e8c96a;box-shadow:0 4px 20px rgba(201,168,76,.35);color:#050c1a}
        .ah-ham{display:none;flex-direction:column;gap:5px;background:transparent;border:none;cursor:pointer;padding:6px;margin-left:auto}
        .ah-ham span{display:block;width:22px;height:2px;background:#9db0c8;border-radius:2px;transition:.3s}
        .ah-mob{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(5,12,26,.98);border-bottom:1px solid rgba(201,168,76,.2);padding:16px 24px 24px;z-index:899;flex-direction:column;gap:4px}
        .ah-mob.open{display:flex}
        .ah-mob-link{color:#9db0c8;text-decoration:none;font-size:15px;font-weight:500;padding:12px 16px;border-radius:8px;transition:.2s}
        .ah-mob-link:hover,.ah-mob-link.on{color:#c9a84c;background:rgba(201,168,76,.08)}
        .ah-mob-cta{background:#c9a84c;color:#050c1a;padding:14px 20px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;text-align:center;margin-top:8px;display:block;font-family:'Space Grotesk',sans-serif}
        @media(max-width:900px){.ah-nav{display:none}.ah-ham{display:flex}}
      `}</style>

      <header className={`ah${scrolled ? ' sc' : ''}`}>
        <div className="ah-w">
          <Link href="/" className="ah-logo">
            <div className="ah-badge">ACF</div>
            <div>
              <div className="ah-name">ACF Score®</div>
              <div className="ah-sub">Sovereignty Diagnostic</div>
            </div>
          </Link>

          <nav className="ah-nav">
            {navItems.map((item, i) => (
              <span key={item.href} style={{display:'contents'}}>
                {i > 0 && <span className="ah-sep">|</span>}
                <Link href={item.href} className={`ah-link${pathname === item.href ? ' on' : ''}`}>{item.label}</Link>
              </span>
            ))}
            <span className="ah-sep" style={{margin:'0 6px'}}>|</span>
            <Link href="https://acfstandard.vercel.app/en" target="_blank" className="ah-std">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              ACF Standard
            </Link>
            {hasResults && (
              <Link href="/results" className="ah-res">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                Mes résultats
              </Link>
            )}
            <Link href="/calculator" className="ah-cta">Calculer mon Score →</Link>
          </nav>

          <button className="ah-ham" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </header>

      <div className={`ah-mob${menuOpen ? ' open' : ''}`}>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
            className={`ah-mob-link${pathname === item.href ? ' on' : ''}`}>{item.label}</Link>
        ))}
        {hasResults && <Link href="/results" onClick={() => setMenuOpen(false)} className="ah-mob-link" style={{color:'#c9a84c'}}>Mes résultats</Link>}
        <Link href="https://acfstandard.vercel.app/en" target="_blank" className="ah-mob-link" style={{fontSize:'12px',color:'#4a5a72'}}>← ACF Standard</Link>
        <Link href="/calculator" onClick={() => setMenuOpen(false)} className="ah-mob-cta">Calculer mon Score →</Link>
      </div>
    </>
  )
}
