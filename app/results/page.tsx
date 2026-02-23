'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ACFRadarChart from '@/components/charts/ACFRadarChart'
import Link from 'next/link'
import { calculerResultatsACF, ACFFormData, ACFResults } from '@/lib/acf-calculations'
import { downloadPDF } from '@/lib/pdf-generator'

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

function getLevelFromScore(score: number): string {
  if (score >= 80) return 'Souverain'
  if (score >= 65) return 'Avancé'
  if (score >= 45) return 'Structuré'
  if (score >= 25) return 'Fragile'
  return 'Critique'
}

function getMarketPercentile(score: number): number {
  if (score >= 80) return 95
  if (score >= 70) return 85
  if (score >= 60) return 72
  if (score >= 50) return 57
  if (score >= 40) return 42
  if (score >= 30) return 28
  if (score >= 20) return 15
  return 8
}

const urgencyConfig = {
  critical: { label: 'Critique', color: '#ef4444', bg: 'rgba(239,68,68,.1)',  border: 'rgba(239,68,68,.25)' },
  high:     { label: 'Élevée',   color: '#f97316', bg: 'rgba(249,115,22,.1)', border: 'rgba(249,115,22,.25)' },
  medium:   { label: 'Moyenne',  color: '#c9a84c', bg: 'rgba(201,168,76,.1)', border: 'rgba(201,168,76,.25)' },
}

export default function ResultsPage() {
  const [formData, setFormData] = useState<ACFFormData | null>(null)
  const [results, setResults] = useState<ACFResults | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('acf_results')
    if (saved) {
      try {
        // Cas 1 : données encodées (format actuel du calculator)
        const decoded = decodeURIComponent(saved)
        const parsed: ACFFormData = JSON.parse(decoded)
        setFormData(parsed)
        setResults(calculerResultatsACF(parsed))
      } catch {
        try {
          // Cas 2 : données brutes non encodées (ancien format)
          const parsed: ACFFormData = JSON.parse(saved)
          setFormData(parsed)
          setResults(calculerResultatsACF(parsed))
        } catch {}
      }
    }
    setLoading(false)
  }, [])

  if (loading) return (
    <div style={{background:'#050c1a',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#c9a84c',fontFamily:'Space Grotesk,sans-serif'}}>
      Calcul en cours…
    </div>
  )

  if (!results || !formData) return (
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
          <div className="rp-empty-ico">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </div>
          <div className="rp-empty-title">Aucun résultat disponible</div>
          <p className="rp-empty-sub">Vous n'avez pas encore effectué de diagnostic ACF®. Calculez votre score maintenant pour voir vos résultats ici.</p>
          <Link href="/calculator" className="rp-btn-g">Démarrer le diagnostic →</Link>
        </div>
      </div>
    </>
  )

  const level = getLevelFromScore(results.scoreGlobal)
  const marketPercentile = getMarketPercentile(results.scoreGlobal)
  const levelColors: Record<string, string> = {
    Souverain: '#22c55e', Avancé: '#22c55e', Structuré: '#c9a84c', Fragile: '#f97316', Critique: '#ef4444'
  }
  const lc = levelColors[level] || '#c9a84c'

  const secteurLabels: Record<string, string> = {
    ecommerce: 'E-commerce / Retail', services: 'Services B2B', industrie: 'Industrie',
    tech: 'Tech / SaaS', finance: 'Finance / Assurance', autre: 'Autre secteur'
  }

  const couches = [
    { label: 'Gouvernance',  score: results.scoreCouche1 },
    { label: 'Politique',    score: results.scoreCouche2 },
    { label: 'Système',      score: results.scoreCouche3 },
    { label: 'Supervision',  score: results.scoreCouche4 },
  ]

  const priorities = results.priorites.map((p, i) => ({
    title: p.titre,
    description: p.description,
    urgency: (i === 0 && results.scoreGlobal < 40 ? 'critical'
            : i === 0 ? 'high'
            : i === 1 ? 'high'
            : 'medium') as 'critical' | 'high' | 'medium'
  }))

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
        .rp-couches{display:flex;flex-direction:column;gap:14px}
        .rp-couche{display:flex;flex-direction:column;gap:6px}
        .rp-couche-top{display:flex;justify-content:space-between;align-items:center}
        .rp-couche-label{font-size:13px;color:#9db0c8}
        .rp-couche-val{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px}
        .rp-bar{height:6px;background:rgba(255,255,255,.07);border-radius:3px;overflow:hidden}
        .rp-bar-fill{height:100%;border-radius:3px;transition:width .8s ease}
        .rp-sov{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
        .rp-sov-val{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:40px;color:#c9a84c;line-height:1;margin-bottom:6px}
        .rp-sov-lbl{font-size:13px;color:#9db0c8;line-height:1.6}
        .rp-sov-interp{font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:.06em;padding:3px 10px;border-radius:4px;display:inline-block;margin-top:8px}
        .rp-mat-num{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:44px;color:#c9a84c;line-height:1;margin-bottom:4px}
        .rp-mat-lbl{font-size:14px;color:#e2eaf5;font-weight:600;margin-bottom:6px}
        .rp-mat-desc{font-size:13px;color:#9db0c8;line-height:1.6;margin-bottom:16px}
        .rp-mbar{height:8px;background:rgba(255,255,255,.07);border-radius:4px;overflow:hidden;margin:6px 0}
        .rp-mfill{height:100%;background:linear-gradient(90deg,#c9a84c,#e8c96a);border-radius:4px}
        .rp-priorities{display:flex;flex-direction:column;gap:14px;margin-top:8px}
        .rp-prio{border-radius:10px;padding:18px 20px;display:flex;gap:14px;align-items:flex-start}
        .rp-prio-badge{padding:3px 10px;border-radius:4px;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;white-space:nowrap;margin-top:2px;flex-shrink:0}
        .rp-prio-title{font-weight:600;font-size:14px;color:#fff;margin-bottom:4px}
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

        <section className="rp-hero">
          <div className="rp-w">
            <div className="rp-badge">Résultats · {new Date().toLocaleDateString('fr-FR')}</div>
            <div className="rp-hero-grid">
              <div className="rp-score-wrap">
                <ScoreRing score={results.scoreGlobal} size={160}/>
                <div className="rp-score-inner">
                  <div className="rp-score-num" style={{color:lc}}>{results.scoreGlobal}</div>
                  <div className="rp-score-lbl">/100</div>
                </div>
              </div>
              <div>
                <div className="rp-level" style={{color:lc, background:`${lc}18`, border:`1px solid ${lc}40`}}>
                  Niveau {level}
                </div>
                <h1 className="rp-h1">Votre Score ACF® : {results.scoreGlobal}/100</h1>
                <p className="rp-meta">
                  {formData.secteur && <>{secteurLabels[formData.secteur] || formData.secteur} · </>}
                  {results.interpretationGlobale} · Mieux que {marketPercentile}% du marché
                </p>
                <div className="rp-hero-btns">
                  <button className="rp-btn-g" onClick={() => downloadPDF(results, formData)}>
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

        <section className="rp-sec">
          <div className="rp-w">

            <div className="rp-grid2">
              {/* 4 COUCHES */}
              <div className="rp-card">
                <div className="rp-card-title">Analyse par couche ACF® <span>4 couches</span></div>
                <div className="rp-couches">
                  {couches.map(c => {
                    const pct = Math.round((c.score / 25) * 100)
                    const barColor = pct >= 75 ? '#22c55e' : pct >= 50 ? '#c9a84c' : pct >= 25 ? '#f97316' : '#ef4444'
                    return (
                      <div key={c.label} className="rp-couche">
                        <div className="rp-couche-top">
                          <span className="rp-couche-label">{c.label}</span>
                          <span className="rp-couche-val" style={{color:barColor}}>{c.score}/25</span>
                        </div>
                        <div className="rp-bar"><div className="rp-bar-fill" style={{width:`${pct}%`, background:barColor}}/></div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* RADAR */}
              <div className="rp-card">
                <div className="rp-card-title">Profil de gouvernance <span>Radar ACF®</span></div>
                <ACFRadarChart
                  ds={formData.dependanceStructurelle}
                  dd={formData.dependanceDonnees}
                  dt={formData.dependanceTrafic}
                  dtr={formData.joursBloquesCA}
                />
              </div>
            </div>

            <div className="rp-grid2">
              {/* SOUVERAINETÉ */}
              <div className="rp-card">
                <div className="rp-card-title">Score de Souveraineté <span>Indépendance</span></div>
                <div className="rp-sov">
                  <div style={{position:'relative',flexShrink:0}}>
                    <ScoreRing score={results.scoreSouverainete} size={100}/>
                    <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
                      <div style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:800,fontSize:'18px',color:'#c9a84c',lineHeight:1}}>{Math.round(results.scoreSouverainete)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="rp-sov-val">{results.scoreSouverainete.toFixed(1)}<span style={{fontSize:'18px',color:'#6b7fa0'}}>/100</span></div>
                    <p className="rp-sov-lbl">Mesure votre indépendance opérationnelle face aux plateformes tierces et dépendances critiques.</p>
                    <div className="rp-sov-interp" style={{
                      color: results.scoreSouverainete >= 60 ? '#22c55e' : results.scoreSouverainete >= 40 ? '#f97316' : '#ef4444',
                      background: results.scoreSouverainete >= 60 ? 'rgba(34,197,94,.1)' : results.scoreSouverainete >= 40 ? 'rgba(249,115,22,.1)' : 'rgba(239,68,68,.1)',
                    }}>
                      {results.interpretationSouverainete}
                    </div>
                  </div>
                </div>
              </div>

              {/* MATURITÉ */}
              <div className="rp-card">
                <div className="rp-card-title">Maturité agentique <span>Niveau {results.niveauMaturite}/3</span></div>
                <div className="rp-mat-num">{results.niveauMaturite}<span style={{fontSize:'22px',color:'#6b7fa0'}}>/3</span></div>
                <div className="rp-mat-lbl">{results.interpretationMaturite}</div>
                <p className="rp-mat-desc">
                  {results.niveauMaturite === 0 && "Systèmes à règles fixes. Pas d'apprentissage autonome."}
                  {results.niveauMaturite === 1 && "Vos agents proposent, les humains valident. Bonne base pour évoluer."}
                  {results.niveauMaturite === 2 && "Niveau cible recommandé. Agents décident dans un cadre supervisé."}
                  {results.niveauMaturite === 3 && "Niveau avancé — une gouvernance maximale est indispensable."}
                </p>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                  <span style={{fontSize:'12px',color:'#9db0c8'}}>Positionnement marché</span>
                  <span style={{fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:'13px',color:'#c9a84c'}}>Top {100-marketPercentile}%</span>
                </div>
                <div className="rp-mbar"><div className="rp-mfill" style={{width:`${marketPercentile}%`}}/></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'#4a5a72',marginTop:'3px'}}>
                  <span>Bas du marché</span><span>Haut du marché</span>
                </div>
              </div>
            </div>

            {/* PRIORITIES */}
            <div className="rp-card" style={{marginBottom:'28px'}}>
              <div className="rp-card-title">3 Actions prioritaires <span>Plan d'action</span></div>
              <div className="rp-priorities">
                {priorities.map((p, i) => {
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

            {/* RECOMMANDATIONS */}
            {results.recommandations.length > 0 && (
              <div className="rp-card" style={{marginBottom:'28px'}}>
                <div className="rp-card-title">Recommandations <span>{results.recommandations.length} points</span></div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {results.recommandations.map((r, i) => (
                    <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'12px 16px',background:'rgba(201,168,76,.04)',border:'1px solid rgba(201,168,76,.1)',borderRadius:'8px'}}>
                      <div style={{width:'20px',height:'20px',background:'rgba(201,168,76,.15)',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Space Grotesk,sans-serif',fontWeight:700,fontSize:'11px',color:'#c9a84c',flexShrink:0,marginTop:'1px'}}>{i+1}</div>
                      <span style={{fontSize:'13.5px',color:'#9db0c8',lineHeight:'1.6'}}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rp-cta">
              <div className="rp-cta-title">
                {results.scoreGlobal < 45 ? 'Votre score nécessite un accompagnement structuré'
                 : results.scoreGlobal < 70 ? 'Optimisez votre gouvernance avec nos experts'
                 : "Maintenez votre niveau d'excellence"}
              </div>
              <p className="rp-cta-sub">
                {results.scoreGlobal < 45
                  ? "Un score sous 45 expose votre organisation à des risques existentiels. Parlons d'un plan d'action immédiat."
                  : results.scoreGlobal < 70
                  ? "Des ateliers ciblés peuvent vous faire gagner 15–20 points en 3 mois. Contactez-nous."
                  : "Un suivi trimestriel vous permet de rester au niveau de référence dans votre secteur."}
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
