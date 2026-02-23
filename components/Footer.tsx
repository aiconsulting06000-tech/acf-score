import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <style>{`
        .af{background:#071122;border-top:1px solid rgba(201,168,76,.18);padding:56px 0 28px;font-family:'Inter',sans-serif}
        .af-w{max-width:1320px;margin:0 auto;padding:0 32px}
        .af-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:48px;margin-bottom:48px}
        .af-logo{display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:16px}
        .af-badge{width:32px;height:32px;background:#c9a84c;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:11px;color:#050c1a}
        .af-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px;color:#fff;line-height:1.2}
        .af-sub{font-size:9px;color:#c9a84c;letter-spacing:.1em;text-transform:uppercase}
        .af-desc{font-size:13px;color:#6b7fa0;line-height:1.7;margin-bottom:20px;max-width:280px}
        .af-std{display:inline-flex;align-items:center;gap:6px;color:#c9a84c;font-size:11px;font-family:'JetBrains Mono',monospace;text-decoration:none;letter-spacing:.06em;padding:7px 12px;border:1px solid rgba(201,168,76,.25);border-radius:5px;transition:.2s}
        .af-std:hover{background:rgba(201,168,76,.08);border-color:rgba(201,168,76,.5)}
        .af-title{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:10px;color:#c9a84c;letter-spacing:.12em;text-transform:uppercase;margin-bottom:16px}
        .af-links{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px}
        .af-links a{color:#6b7fa0;text-decoration:none;font-size:13px;transition:color .2s}
        .af-links a:hover{color:#c9a84c}
        .af-addr{font-size:12px;color:#6b7fa0;line-height:1.9}
        .af-addr strong{color:#9db0c8;display:block;margin-bottom:6px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-family:'Space Grotesk',sans-serif}
        .af-bot{border-top:1px solid rgba(255,255,255,.06);padding-top:24px;display:flex;flex-direction:column;gap:4px;align-items:center;text-align:center}
        .af-copy{font-size:11.5px;color:#4a5a72;line-height:1.6}
        .af-copy strong{color:#6b7fa0}
        @media(max-width:900px){.af-grid{grid-template-columns:1fr 1fr;gap:32px}}
        @media(max-width:560px){.af-grid{grid-template-columns:1fr}.af-w{padding:0 20px}}
      `}</style>

      <footer className="af">
        <div className="af-w">
          <div className="af-grid">
            <div>
              <Link href="/" className="af-logo">
                <div className="af-badge">ACF</div>
                <div>
                  <div className="af-name">ACF Score®</div>
                  <div className="af-sub">Sovereignty Diagnostic</div>
                </div>
              </Link>
              <p className="af-desc">L'outil de diagnostic officiel de l'Agentic Commerce Framework®. Gratuit, immédiat, actionnable. Mesurez la robustesse de votre gouvernance en 10 minutes.</p>
              <Link href="https://acfstandard.vercel.app/en" target="_blank" className="af-std">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                ACF STANDARD →
              </Link>
            </div>

            <div>
              <div className="af-title">Navigation</div>
              <ul className="af-links">
                <li><Link href="/">Accueil</Link></li>
                <li><Link href="/calculator">Calculateur</Link></li>
                <li><Link href="/pourquoi">Pourquoi ACF®</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <div className="af-title">Légal</div>
              <ul className="af-links">
                <li><Link href="/mentions-legales">Mentions légales</Link></li>
                <li><Link href="/cgu">CGU</Link></li>
                <li><Link href="/confidentialite">Confidentialité</Link></li>
                <li><Link href="/qui-sommes-nous">Qui sommes-nous</Link></li>
              </ul>
            </div>

            <div>
              <div className="af-title">AI CONSULTING</div>
              <div className="af-addr">
                <strong>Adresse</strong>
                38 Bis Boulevard Victor Hugo<br/>
                06000 Nice, France<br/><br/>
                RCS Nice : 909116329<br/>
                TVA : FR96909116329
              </div>
            </div>
          </div>

          <div className="af-bot">
            <p className="af-copy">Agentic Commerce Framework® (ACF®) — Méthodologie propriétaire développée par <strong>Vincent DORANGE</strong></p>
            <p className="af-copy">© {new Date().getFullYear()} AI CONSULTING. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
