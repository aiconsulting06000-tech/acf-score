'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ACFRadarChart from '@/components/ACFRadarChart'
import Link from 'next/link'

interface DiagnosticResults {
  globalScore: number
  sovereigntyScore: number
  ds: number
  dd: number
  dt: number
  dtr: number
  level: string
  marketPercentile: number
  priorities: Array<{ title: string; description: string; urgency: 'critical' | 'high' | 'medium' }>
  completedAt: string
  companyName?: string
  sector?: string
}

function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const r = (size - 20) / 2
  const c = 2 * Math.PI * r
  const fill = c - (c * score / 100)
  const color = score >= 75 ? '#22c55e' : score >= 55 ? '#c9a84c' : score >= 30 ? '#f97316' : '#ef4444'
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{transform:'rotate(-90deg)'}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="12"
        strokeDasharray={c} strokeDashoffset={fill} strokeLinecap="round"
        style={{filter:`drop-shadow(0 0 8px ${color}60)`,transition:'stroke-dashoffset 1s ease'}}/>
    </svg>
  )
}

const urgencyConfig = {
  critical: { label: 'Critique', color: '#ef4444', bg: 'rgba(239,68,68,.1)', border: 'rgba(239,68,68,.25)' },
  high: { label: 'Élevée', color: '#f97316', bg: 'rgba(249,115,22,.1)', border: 'rgba(249,115,22,.25)' },
  medium: { label: 'Moyenne', color: '#c9a84c', bg: 'rgba(201,168,76,.1)', border: 'rgba(201,168,76,.25)' },
}

export default function ResultsPage() {
  const [results, setResults] = useState<DiagnosticResults | null>(null)
  const [showPDF, setShowPDF] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('acf_results')
    if (saved) {
      try { setResults(JSON.parse(saved)) } catch {}
    }
  }, [])

  if (!results) return (
    <>
      <style>{`
        .rp-empty{background:#050c1a;min-height:100vh;color:#fff;font-family:'Inter',sans-serif}
        .rp-empty-inner{max-width:600px;margin:0 auto;padding:120px 40px;text-align:center}
        .rp-empty-ico{width:64px;height:64px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;color:#c9a84c}
        .rp-empty-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:24px;color:#fff;margin-bottom:10px}
        .rp-empty-sub{font-size:15px;color:#9db0c8;margin-bottom:32px;line-height:1.65}
        .rp-btn-g{background:#c9a84c;color:#050c1a;padding:13px 28px;border-radius:7px;font-weight:700;font-size:14px;text-decoration:none;font-family:'Space Grotesk',sans-serif;display:inline-block;transition:.2s}
        .rp-btn-g:hover{background:#e8c96a;color:#050c1a}
      `}</style>
      <div className="rp-empty">
        <Header />
        <div className="rp-empty-inner">
          <div className="rp-empty-ico"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
          <div className="rp-empty-title">Aucun résultat disponible</div>
          <p className="rp-empty-sub">Vous n'avez pas encore effectué de diagnostic ACF®. Calculez votre score maintenant pour voir vos résultats ici.</p>
          <Link href="/calculator" className="rp-btn-g">Démarrer le diagnostic →</Link>
        </div>
      </div>
    </>
  )

  const levelColors: Record<string, string> = {
    'Souverain': '#22c55e', 'Avancé': '#22c55e', 'Structuré': '#c9a84c', 'Fragile': '#f97316', 'Critique': '#ef4444'
  }
  const lc = levelColors[results.level] || '#c9a84c'
  const dims = [
    { label: 'DS — Dépendance Structurelle', val: results.ds, max: 100 },
    { label: 'DD — Dépendance Données', val: results.dd, max: 100 },
    { label: 'DT — Dépendance Trafic', val: results.dt, max: 100 },
    { label: 'DTr — Dépendance Trésorerie', val: Math.round(results.dtr * 100 / 60), max: 100 },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .rp{background:#050c1a;color:#fff;font-family:'Inter',sans-serif;min-height:100vh}
        .rp-hero{background:linear-gradient(160deg,#071122,#050c1a);border-bottom:1px solid rgba(201,168,76,.18);padding:60px 0}
        .rp-w{max-width:1100px;margin:0 auto;padding:0 40px}
        .rp-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.25);color:#c9a84c;padding:6px 14px;border-radius:100px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:24px}
        .rp-hero-grid{display:grid;grid-template-columns:auto 1fr;gap:40px;align-items:center}
        .rp-score-wrap{position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .rp-score-inner{position:absolute;text-align:center}
        .rp-score-num{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:36px;line-height:1}
        .rp-score-lbl{font-size:11px;color:#9db0c8;margin-top:2px}
        .rp-level{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:5px;font-size:12px;font-weight:600;font-family:'JetBrains Mono',monospace;letter-spacing:.06em;margin-bottom:12px}
        .rp-h1{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(24px,3.5vw,36px);color:#fff;margin-bottom:8px;line-height:1.15}
        .rp-meta{font-size:13px;color:#6b7fa0;margin-bottom:20px}
        .rp-hero-btns{display:flex;gap:12px;flex-wrap:wrap}
        .rp-btn-g{background:#c9a84c;color:#050c1a;padding:11px 24px;border-radius:7px;font-weight:700;font-size:13px;text-decoration:none;transition:.2s;font-family:'Space Grotesk',sans-serif;display:inline-block;border:none;cursor:pointer}
        .rp-btn-g:hover{background:#e8c96a;box-shadow:0 5px 24px rgba(201,168,76,.35);color:#050c1a}
        .rp-btn-o{border:1px solid rgba(201,168,76,.3);color:#9db0c8;padding:11px 20px;border-radius:7px;font-weight:500;font-size:13px;text-decoration:none;transition:.2s;background:transparent;cursor:pointer}
        .rp-btn-o:hover{border-color:#c9a84c;color:#c9a84c}

        .rp-sec{padding:60px 0}
        .rp-grid2{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-bottom:28px}
        .rp-card{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:14px;padding:32px}
        .rp-card-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:#fff;margin-bottom:20px;display:flex;align-items:center;gap:8px}
        .rp-card-title span{font-size:10px;color:#c9a84c;background:rgba(201,168,76,.1);padding:3px 8px;border-radius:3px;font-family:'JetBrains Mono',monospace;letter-spacing:.06em}

        .rp-dim{margin-bottom:16px}
        .rp-dim:last-child{margin-bottom:0}
        .rp-dim-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .rp-dim-label{font-size:13px;color:#9db0c8}
        .rp-dim-val{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px}
        .rp-bar{height:6px;background:rgba(255,255,255,.07);border-radius:3px;overflow:hidden}
        .rp-bar-fill{height:100%;border-radius:3px;transition:width .8s ease}

        .rp-sov{display:flex;align-items:center;gap:20px}
        .rp-sov-ring{flex-shrink:0}
        .rp-sov-body{flex:1}
        .rp-sov-val{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:40px;color:#c9a84c;line-height:1;margin-bottom:4px}
        .rp-sov-lbl{font-size:13px;color:#9db0c8;line-height:1.6}

        .rp-market{display:flex;flex-direction:column;gap:16px}
        .rp-pct{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:48px;color:#c9a84c;line-height:1}
        .rp-pct-sub{font-size:14px;color:#9db0c8;line-height:1.6}
        .rp-mbar{height:10px;background:rgba(255,255,255,.07);border-radius:5px;overflow:hidden;margin:4px 0}
        .rp-mfill{height:100%;background:linear-gradient(90deg,#c9a84c,#e8c96a);border-radius:5px;transition:width 1s ease}

        .rp-priorities{display:flex;flex-direction:column;gap:16px;margin-top:20px}
        .rp-prio{border-radius:10px;padding:20px 22px;display:flex;gap:16px;align-items:flex-start}
        .rp-prio-badge{padding:3px 10px;border-radius:4px;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;white-space:nowrap;margin-top:2px}
        .rp-prio-title{font-weight:600;font-size:14.5px;color:#fff;margin-bottom:4px}
        .rp-prio-desc{font-size:13px;color:#9db0c8;line-height:1.6}

        .rp-cta{background:linear-gradient(135deg,#0d1f3c,#071122);border:1px solid rgba(201,168,76,.22);border-radius:14px;padding:48px;text-align:center;margin-top:16px}
        .rp-cta-title{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(22px,3vw,30px);color:#fff;margin-bottom:12px}
        .rp-cta-sub{font-size:15px;color:#9db0c8;margin-bottom:28px}
        .rp-cta-row{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}

        @media(max-width:900px){.rp-grid2{grid-template-columns:1fr}.rp-hero-grid{grid-template-columns:1fr}}
        @media(max-width:560px){.rp-w{padding:0 20px}.rp-sec{padding:40px 0}.rp-card{padding:22px}.rp-cta{padding:32px 20px}.rp-hero{padding:40px 0}}
      `}</style>

      <div className="rp">
        <Header />

        {/* HERO SCORE */}
        <section className="rp-hero">
          <div className="rp-w">
            <div className="rp-badge">Résultats · {new Date(results.completedAt).toLocaleDateString('fr-FR')}</div>
            <div className="rp-hero-grid">
              <div className="rp-score-wrap">
                <ScoreRing score={results.globalScore} size={160}/>
                <div className="rp-score-inner">
                  <div className="rp-score-num" style={{color:lc}}>{results.globalScore}</div>
                  <div className="rp-score-lbl">/100</div>
                </div>
              </div>
              <div>
                <div className="rp-level" style={{color:lc, background:`${lc}18`, border:`1px solid ${lc}40`}}>
                  Niveau {results.level}
                </div>
                <h1 className="rp-h1">Votre Score ACF® : {results.globalScore}/100</h1>
                <p className="rp-meta">
                  {results.companyName && <><strong style={{color:'#e2eaf5'}}>{results.companyName}</strong> · </>}
                  {results.sector && <>{results.sector} · </>}
                  Mieux que {results.marketPercentile}% du marché
                </p>
                <div className="rp-hero-btns">
                  <button className="rp-btn-g" onClick={() => setShowPDF(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',marginRight:'6px'}}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Télécharger PDF
                  </button>
                  <Link href="/calculator" className="rp-btn-o">Refaire le diagnostic</Link>
                  <Link href="/contact" className="rp-btn-o">Parler à un expert</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS */}
        <section className="rp-sec">
          <div className="rp-w">
            <div className="rp-grid2">
              {/* 4 DIMENSIONS */}
              <div className="rp-card">
                <div className="rp-card-title">Analyse par dimension <span>4 couches ACF®</span></div>
                {dims.map(d => {
                  const pct = Math.round((1 - d.val/d.max) * 100)
                  const barColor = pct >= 75 ? '#22c55e' : pct >= 55 ? '#c9a84c' : pct >= 30 ? '#f97316' : '#ef4444'
                  return (
                    <div key={d.label} className="rp-dim">
                      <div className="rp-dim-top">
                        <span className="rp-dim-label">{d.label}</span>
                        <span className="rp-dim-val" style={{color:barColor}}>{pct}/100</span>
                      </div>
                      <div className="rp-bar"><div className="rp-bar-fill" style={{width:`${pct}%`,background:barColor}}/></div>
                    </div>
                  )
                })}
              </div>

              {/* RADAR */}
              <div className="rp-card">
                <div className="rp-card-title">Profil de gouvernance <span>Radar ACF®</span></div>
                <ACFRadarChart ds={results.ds} dd={results.dd} dt={results.dt} dtr={results.dtr}/>
              </div>
            </div>

            <div className="rp-grid2">
              {/* SOVEREIGNTY */}
              <div className="rp-card">
                <div className="rp-card-title">Score de Souveraineté <span>Indépendance</span></div>
                <div className="rp-sov">
                  <div className="rp-sov-ring">
                    <ScoreRing score={results.sovereigntyScore} size={100}/>
                  </div>
                  <div className="rp-sov-body">
                    <div className="rp-sov-val">{results.sovereigntyScore}<span style={{fontSize:'20px',color:'#6b7fa0'}}>/100</span></div>
                    <p className="rp-sov-lbl">Mesure votre indépendance opérationnelle face aux plateformes, fournisseurs et dépendances critiques.</p>
                  </div>
                </div>
              </div>

              {/* MARKET */}
              <div className="rp-card">
                <div className="rp-card-title">Positionnement marché <span>Benchmark sectoriel</span></div>
                <div className="rp-market">
                  <div>
                    <div className="rp-pct">{results.marketPercentile}<span style={{fontSize:'24px',color:'#6b7fa0'}}>%</span></div>
                    <p className="rp-pct-sub">des entreprises ont un score ACF® <strong style={{color:'#e2eaf5'}}>inférieur</strong> au vôtre</p>
                  </div>
                  <div>
                    <div className="rp-mbar"><div className="rp-mfill" style={{width:`${results.marketPercentile}%`}}/></div>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'#4a5a72',marginTop:'4px'}}>
                      <span>Bas du marché</span><span>Haut du marché</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRIORITIES */}
            <div className="rp-card" style={{marginBottom:'28px'}}>
              <div className="rp-card-title">3 Actions prioritaires <span>Plan d'action</span></div>
              <div className="rp-priorities">
                {results.priorities.map((p, i) => {
                  const cfg = urgencyConfig[p.urgency]
                  return (
                    <div key={i} className="rp-prio" style={{background:cfg.bg, border:`1px solid ${cfg.border}`}}>
                      <span className="rp-prio-badge" style={{color:cfg.color, background:`${cfg.color}18`, border:`1px solid ${cfg.color}30`}}>{cfg.label}</span>
                      <div>
                        <div className="rp-prio-title">{p.title}</div>
                        <p className="rp-prio-desc">{p.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="rp-cta">
              <div className="rp-cta-title">
                {results.globalScore < 55
                  ? 'Votre score nécessite un accompagnement structuré'
                  : results.globalScore < 75
                  ? 'Optimisez votre gouvernance avec nos experts'
                  : 'Maintenez votre niveau d\'excellence'}
              </div>
              <p className="rp-cta-sub">
                {results.globalScore < 55
                  ? 'Un score sous 55 expose votre organisation à des risques existentiels. Parlons d\'un plan d\'action immédiat.'
                  : results.globalScore < 75
                  ? 'Des ateliers ciblés peuvent vous faire gagner 15-20 points en 3 mois. Contactez-nous.'
                  : 'Un suivi trimestriel vous permet de rester au niveau de référence dans votre secteur.'}
              </p>
              <div className="rp-cta-row">
                <Link href="/contact" className="rp-btn-g">Parler à un expert →</Link>
                <Link href="/calculator" className="rp-btn-o">Refaire le diagnostic</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
