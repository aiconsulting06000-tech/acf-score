'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ACFFormData } from '@/lib/acf-calculations'

export default function NewCalculatorPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 7

  const [formData, setFormData] = useState<Partial<ACFFormData>>({ typesAgents: [] })

  const handleNext = () => {
    if (step < totalSteps) { setStep(step + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }
  const handlePrev = () => {
    if (step > 1) { setStep(step - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }
  const handleSubmit = () => {
    const encodedData = encodeURIComponent(JSON.stringify(formData))
    localStorage.setItem('acf_results', encodedData)
    router.push('/results')
  }
  const upd = (field: keyof ACFFormData, value: any) => setFormData(prev => ({ ...prev, [field]: value }))
  const toggleAgent = (type: string) => {
    setFormData(prev => {
      const cur = prev.typesAgents || []
      return { ...prev, typesAgents: cur.includes(type) ? cur.filter(t => t !== type) : [...cur, type] }
    })
  }

  const progress = (step / totalSteps) * 100

  const stepMeta = [
    { n: 1, label: 'Contexte' },
    { n: 2, label: 'Maturité' },
    { n: 3, label: 'Gouvernance' },
    { n: 4, label: 'Politique' },
    { n: 5, label: 'Système' },
    { n: 6, label: 'Supervision' },
    { n: 7, label: 'Dépendances' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .calc{background:#050c1a;min-height:100vh;color:#fff;font-family:'Inter',sans-serif}

        /* PROGRESS BAR */
        .calc-prog{background:#071122;border-bottom:1px solid rgba(201,168,76,.18);padding:16px 0;position:sticky;top:68px;z-index:100}
        .calc-prog-w{max-width:860px;margin:0 auto;padding:0 40px}
        .calc-prog-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
        .calc-prog-label{font-family:'JetBrains Mono',monospace;font-size:11px;color:#6b7fa0;letter-spacing:.06em}
        .calc-prog-pct{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px;color:#c9a84c}
        .calc-prog-bar{height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden}
        .calc-prog-fill{height:100%;background:linear-gradient(90deg,#c9a84c,#e8c96a);border-radius:2px;transition:width .4s ease}

        /* STEPS NAV */
        .calc-steps{display:flex;gap:0;margin-bottom:32px;background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:10px;overflow:hidden}
        .calc-step-btn{flex:1;padding:10px 8px;background:transparent;border:none;border-right:1px solid rgba(201,168,76,.12);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;transition:.2s}
        .calc-step-btn:last-child{border-right:none}
        .calc-step-num{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:11px;transition:.2s}
        .calc-step-btn.done .calc-step-num{background:#22c55e;color:#050c1a}
        .calc-step-btn.active .calc-step-num{background:#c9a84c;color:#050c1a}
        .calc-step-btn.pending .calc-step-num{background:rgba(255,255,255,.07);color:#6b7fa0}
        .calc-step-lbl{font-size:10px;font-weight:500;transition:.2s}
        .calc-step-btn.done .calc-step-lbl{color:#22c55e}
        .calc-step-btn.active .calc-step-lbl{color:#c9a84c}
        .calc-step-btn.pending .calc-step-lbl{color:#4a5a72}

        /* CONTENT */
        .calc-w{max-width:860px;margin:0 auto;padding:40px 40px 80px}
        .calc-card{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:16px;padding:48px}
        .calc-step-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);color:#c9a84c;padding:4px 12px;border-radius:4px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:16px}
        .calc-h2{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(22px,3vw,30px);color:#fff;margin-bottom:10px}
        .calc-desc{font-size:14.5px;color:#9db0c8;line-height:1.65;margin-bottom:36px;max-width:640px}

        /* QUESTION BLOCK */
        .calc-q{background:#0d1f3c;border:1px solid rgba(201,168,76,.15);border-radius:12px;padding:28px;margin-bottom:20px}
        .calc-q-label{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:#fff;margin-bottom:6px}
        .calc-q-hint{font-size:12.5px;color:#6b7fa0;line-height:1.6;margin-bottom:20px}

        /* SELECT */
        .calc-select{width:100%;background:#071122;border:1px solid rgba(201,168,76,.2);border-radius:8px;padding:12px 16px;color:#fff;font-size:14px;font-family:'Inter',sans-serif;transition:border-color .2s;outline:none;cursor:pointer}
        .calc-select:focus{border-color:#c9a84c}
        .calc-select option{background:#071122}

        /* OPTION BUTTONS */
        .calc-opts{display:flex;flex-direction:column;gap:10px}
        .calc-opts-row{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
        .calc-opts-row3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
        .calc-opt{background:#071122;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 18px;cursor:pointer;transition:.2s;text-align:left;font-family:'Inter',sans-serif}
        .calc-opt:hover{border-color:rgba(201,168,76,.35);background:rgba(201,168,76,.04)}
        .calc-opt.on{border-color:rgba(201,168,76,.6);background:rgba(201,168,76,.08)}
        .calc-opt-title{font-weight:600;font-size:14px;color:#e2eaf5;transition:.2s;margin-bottom:3px}
        .calc-opt.on .calc-opt-title{color:#c9a84c}
        .calc-opt-desc{font-size:12px;color:#6b7fa0;line-height:1.5}
        .calc-opt-check{display:flex;align-items:flex-start;gap:12px}
        .calc-checkbox{width:18px;height:18px;border-radius:4px;border:2px solid rgba(255,255,255,.2);background:transparent;flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:1px;transition:.2s}
        .calc-opt.on .calc-checkbox{background:#c9a84c;border-color:#c9a84c}

        /* SLIDER */
        .calc-slider-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .calc-slider-val{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:28px;color:#c9a84c}
        .calc-slider-unit{font-size:14px;color:#6b7fa0;margin-left:2px}
        .calc-slider{width:100%;height:6px;-webkit-appearance:none;appearance:none;background:rgba(255,255,255,.08);border-radius:3px;outline:none;cursor:pointer;margin:8px 0}
        .calc-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:22px;height:22px;border-radius:50%;background:#c9a84c;cursor:pointer;border:3px solid #050c1a;box-shadow:0 0 12px rgba(201,168,76,.4)}
        .calc-slider::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:#c9a84c;cursor:pointer;border:3px solid #050c1a;box-shadow:0 0 12px rgba(201,168,76,.4)}
        .calc-slider-labels{display:flex;justify-content:space-between;font-size:11px;color:#4a5a72;margin-top:2px}

        /* NAV */
        .calc-nav{display:flex;justify-content:space-between;align-items:center;margin-top:40px;padding-top:32px;border-top:1px solid rgba(255,255,255,.06)}
        .calc-btn-prev{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#9db0c8;padding:12px 22px;border-radius:8px;font-weight:600;font-size:14px;cursor:pointer;transition:.2s;font-family:'Space Grotesk',sans-serif}
        .calc-btn-prev:hover{background:rgba(255,255,255,.1);color:#e2eaf5}
        .calc-btn-next{display:flex;align-items:center;gap:8px;background:#c9a84c;color:#050c1a;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;transition:.2s;border:none;font-family:'Space Grotesk',sans-serif;margin-left:auto}
        .calc-btn-next:hover{background:#e8c96a;box-shadow:0 5px 24px rgba(201,168,76,.35)}
        .calc-btn-submit{display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:15px;cursor:pointer;transition:.2s;border:none;font-family:'Space Grotesk',sans-serif;margin-left:auto}
        .calc-btn-submit:hover{box-shadow:0 5px 28px rgba(34,197,94,.35)}

        /* DIVIDER */
        .calc-div{height:1px;background:rgba(255,255,255,.06);margin:24px 0}

        @media(max-width:768px){
          .calc-w{padding:24px 20px 60px}
          .calc-card{padding:28px 24px}
          .calc-prog-w{padding:0 20px}
          .calc-steps{display:none}
          .calc-opts-row,.calc-opts-row3{grid-template-columns:1fr}
        }
      `}</style>

      <div className="calc">
        <Header />

        {/* PROGRESS */}
        <div className="calc-prog">
          <div className="calc-prog-w">
            <div className="calc-prog-top">
              <span className="calc-prog-label">ÉTAPE {step} / {totalSteps}</span>
              <span className="calc-prog-pct">{Math.round(progress)}%</span>
            </div>
            <div className="calc-prog-bar">
              <div className="calc-prog-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="calc-w">

          {/* STEP DOTS NAV */}
          <div className="calc-steps">
            {stepMeta.map(s => {
              const state = s.n < step ? 'done' : s.n === step ? 'active' : 'pending'
              return (
                <button key={s.n} className={`calc-step-btn ${state}`} onClick={() => s.n < step && setStep(s.n)}>
                  <span className="calc-step-num">
                    {s.n < step ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : s.n}
                  </span>
                  <span className="calc-step-lbl">{s.label}</span>
                </button>
              )
            })}
          </div>

          <div className="calc-card">

            {/* ─── ÉTAPE 1 : Contexte ─── */}
            {step === 1 && (
              <>
                <div className="calc-step-badge">01 / 07</div>
                <h2 className="calc-h2">Votre contexte</h2>
                <p className="calc-desc">Commençons par mieux comprendre votre organisation et votre niveau d'adoption des agents IA.</p>

                <div className="calc-q">
                  <div className="calc-q-label">Dans quel secteur opérez-vous ?</div>
                  <div className="calc-q-hint">Votre secteur influence les risques réglementaires et les benchmarks de votre Score ACF®.</div>
                  <select className="calc-select" value={formData.secteur || ''} onChange={e => upd('secteur', e.target.value)}>
                    <option value="">Sélectionner...</option>
                    <option value="ecommerce">E-commerce / Retail</option>
                    <option value="services">Services B2B</option>
                    <option value="industrie">Industrie / Manufacturing</option>
                    <option value="tech">Tech / SaaS</option>
                    <option value="finance">Finance / Assurance</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="calc-q">
                  <div className="calc-q-label">Taille de votre organisation</div>
                  <div className="calc-q-hint">Les obligations de gouvernance et les risques varient selon la taille.</div>
                  <div className="calc-opts-row">
                    {[
                      { v: 'tpe', l: 'TPE', d: '< 10 salariés' },
                      { v: 'pme', l: 'PME', d: '10–250 salariés' },
                      { v: 'eti', l: 'ETI', d: '250–5000 salariés' },
                      { v: 'ge', l: 'Grande Entreprise', d: '> 5000 salariés' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.tailleEntreprise === o.v ? ' on' : ''}`} onClick={() => upd('tailleEntreprise', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-q">
                  <div className="calc-q-label">Avez-vous des agents IA déployés ?</div>
                  <div className="calc-q-hint">Un agent IA est un système qui prend des décisions de manière autonome (pricing, recommandations, gestion de stock…).</div>
                  <div className="calc-opts-row3">
                    {[
                      { v: 'non', l: 'Non, aucun' },
                      { v: 'quelques', l: 'Oui, quelques-uns' },
                      { v: 'nombreux', l: 'Oui, nombreux' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.presenceAgentsIA === o.v ? ' on' : ''}`} onClick={() => upd('presenceAgentsIA', o.v)}>
                        <div className="calc-opt-title" style={{marginBottom:0}}>{o.l}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ─── ÉTAPE 2 : Maturité ─── */}
            {step === 2 && (
              <>
                <div className="calc-step-badge">02 / 07</div>
                <h2 className="calc-h2">Maturité agentique</h2>
                <p className="calc-desc">Évaluons le niveau d'autonomie et de gouvernance de vos agents IA.</p>

                {formData.presenceAgentsIA !== 'non' && (
                  <div className="calc-q">
                    <div className="calc-q-label">Comment fonctionnent vos agents IA ?</div>
                    <div className="calc-q-hint">Cette réponse détermine votre niveau de maturité agentique (0 à 3).</div>
                    <div className="calc-opts">
                      {[
                        { v: 'regles-fixes', l: 'Règles fixes programmées', d: "Pas d'apprentissage, intervention humaine pour toute modification" },
                        { v: 'proposent-humains-valident', l: 'Les agents proposent, les humains valident', d: 'Toute décision finale prise par un humain' },
                        { v: 'decident-cadre-strict', l: 'Les agents décident dans un cadre strict', d: 'Seuils définis, zones interdites, supervision permanente' },
                        { v: 'autonomes-apprennent', l: 'Les agents décident et apprennent de manière autonome', d: 'Large autonomie, apprentissage continu, gouvernance lourde requise' },
                      ].map(o => (
                        <button key={o.v} className={`calc-opt${formData.fonctionnementAgents === o.v ? ' on' : ''}`} onClick={() => upd('fonctionnementAgents', o.v)}>
                          <div className="calc-opt-title">{o.l}</div>
                          <div className="calc-opt-desc">{o.d}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="calc-q">
                  <div className="calc-q-label">Existe-t-il des décisions interdites aux agents ?</div>
                  <div className="calc-q-hint">Les "zones non délégables" doivent TOUJOURS rester humaines (exclusion client, destruction stock, modification CGV…).</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non, pas formalisé', d: 'Aucune liste de décisions interdites' },
                      { v: 'oui-non-verrouillees', l: 'Oui, définies mais pas protégées', d: 'Liste existe mais pas de verrouillage technique' },
                      { v: 'oui-verrouillees', l: 'Oui, définies et verrouillées', d: 'Impossible techniquement pour un agent d\'y accéder' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.zonesInterdites === o.v ? ' on' : ''}`} onClick={() => upd('zonesInterdites', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.presenceAgentsIA !== 'non' && (
                  <div className="calc-q">
                    <div className="calc-q-label">Quels types d'agents avez-vous ? (plusieurs choix)</div>
                    <div className="calc-q-hint">Cette classification structure votre gouvernance par type d'agent.</div>
                    <div className="calc-opts">
                      {[
                        { v: 'prescripteurs', l: 'Agents prescripteurs (Buyer agent)', d: 'Rufus, Shop AI, Klarna AI, AVA — recommandations produits, discovery client' },
                        { v: 'transactionnels', l: 'Agents transactionnels (Pricing)', d: 'Pricefx, PROS, Competera — pricing dynamique, promotions, négociation B2B' },
                        { v: 'operationnels', l: 'Agents opérationnels (Supply Chain)', d: 'Blue Yonder, Kinaxis, o9 — supply chain, stocks, logistique' },
                        { v: 'conformite', l: 'Agents conformité', d: 'OneTrust, TrustArc, Sift — détection fraude, RGPD, risk management' },
                        { v: 'analytiques', l: 'Agents analytiques (BI)', d: 'Tableau AI, ThoughtSpot, Qlik — BI, prévisions, A/B testing' },
                      ].map(o => {
                        const on = (formData.typesAgents || []).includes(o.v)
                        return (
                          <button key={o.v} className={`calc-opt${on ? ' on' : ''}`} onClick={() => toggleAgent(o.v)}>
                            <div className="calc-opt-check">
                              <div className="calc-checkbox">
                                {on && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#050c1a" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                              </div>
                              <div>
                                <div className="calc-opt-title">{o.l}</div>
                                <div className="calc-opt-desc">{o.d}</div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ─── ÉTAPE 3 : Gouvernance ─── */}
            {step === 3 && (
              <>
                <div className="calc-step-badge">03 / 07</div>
                <h2 className="calc-h2">Gouvernance & Souveraineté</h2>
                <p className="calc-desc">La gouvernance définit QUI décide, JUSQU'OÙ, et selon QUELS principes. C'est le socle de votre souveraineté opérationnelle.</p>

                <div className="calc-q">
                  <div className="calc-q-label">Avez-vous un comité de gouvernance IA ?</div>
                  <div className="calc-q-hint">Un comité réunit direction, technique, métier, juridique et sécurité pour prendre les décisions stratégiques sur l'autonomie agentique.</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non', d: 'Pas de comité dédié' },
                      { v: 'en-creation', l: 'En cours de création', d: 'Projet identifié, pas encore actif' },
                      { v: 'oui-actif', l: 'Oui, actif', d: 'Réunions régulières, décisions documentées' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.comiteGouvernance === o.v ? ' on' : ''}`} onClick={() => upd('comiteGouvernance', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-q">
                  <div className="calc-q-label">Existe-t-il une charte de souveraineté décisionnelle ?</div>
                  <div className="calc-q-hint">Ce document définit vos principes directeurs et vos engagements concernant l'utilisation d'agents autonomes.</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non', d: 'Pas de document' },
                      { v: 'en-redaction', l: 'En rédaction', d: 'Travail en cours' },
                      { v: 'oui-validee', l: 'Oui, validée et appliquée', d: 'Document signé, opposable' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.charteSouverainete === o.v ? ' on' : ''}`} onClick={() => upd('charteSouverainete', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ─── ÉTAPE 4 : Politique ─── */}
            {step === 4 && (
              <>
                <div className="calc-step-badge">04 / 07</div>
                <h2 className="calc-h2">Politique de décision</h2>
                <p className="calc-desc">La politique transforme vos orientations stratégiques en règles opérationnelles que vos agents peuvent exécuter.</p>

                <div className="calc-q">
                  <div className="calc-q-label">Vos objectifs business sont-ils hiérarchisés et pondérés ?</div>
                  <div className="calc-q-hint">Exemple : Rentabilité (40%), Croissance (30%), Conformité (20%), Résilience (10%). Cette hiérarchie guide les agents en cas de conflit d'objectifs.</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non, pas formalisés', d: 'Objectifs flous ou implicites' },
                      { v: 'partiellement', l: 'Partiellement', d: 'Certains objectifs définis' },
                      { v: 'oui-complet', l: 'Oui, complètement documentés', d: 'Hiérarchie claire avec pondérations' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.objectifsHierarchises === o.v ? ' on' : ''}`} onClick={() => upd('objectifsHierarchises', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-q">
                  <div className="calc-q-label">Avez-vous défini des seuils de sécurité non franchissables ?</div>
                  <div className="calc-q-hint">Exemple : prix vente minimum, remise maximum, délai paiement maximum, stock minimum. Ces garde-fous protègent votre rentabilité.</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non', d: 'Pas de seuils définis' },
                      { v: 'partiellement', l: 'Partiellement', d: 'Certains seuils pour certains agents' },
                      { v: 'oui-tous', l: 'Oui, pour tous les agents', d: 'Chaque agent a ses limites claires' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.seuilsSecurite === o.v ? ' on' : ''}`} onClick={() => upd('seuilsSecurite', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ─── ÉTAPE 5 : Système ─── */}
            {step === 5 && (
              <>
                <div className="calc-step-badge">05 / 07</div>
                <h2 className="calc-h2">Système d'agents</h2>
                <p className="calc-desc">Chaque agent doit avoir un mandat clair et un responsable humain identifié. Cela garantit l'imputabilité et la traçabilité.</p>

                <div className="calc-q">
                  <div className="calc-q-label">Chaque agent a-t-il un mandat explicite documenté ?</div>
                  <div className="calc-q-hint">Le mandat définit : objectif, données autorisées, limites opérationnelles, niveau d'autonomie, et modes de fonctionnement.</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non', d: 'Pas de documentation formelle' },
                      { v: 'partiellement', l: 'Partiellement', d: 'Certains agents documentés' },
                      { v: 'oui-tous', l: 'Oui, pour tous', d: 'Fiche mandat complète par agent' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.mandatExplicite === o.v ? ' on' : ''}`} onClick={() => upd('mandatExplicite', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-q">
                  <div className="calc-q-label">Les agents ont-ils un responsable humain identifié ?</div>
                  <div className="calc-q-hint">Ce responsable assume la décision finale en cas d'incident et valide les évolutions du mandat de l'agent.</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non', d: 'Pas de responsable attribué' },
                      { v: 'certains', l: 'Pour certains agents', d: 'Responsabilité partielle' },
                      { v: 'oui-tous', l: 'Oui, pour tous', d: 'Chaque agent a son "owner" humain' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.responsableHumain === o.v ? ' on' : ''}`} onClick={() => upd('responsableHumain', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ─── ÉTAPE 6 : Supervision ─── */}
            {step === 6 && (
              <>
                <div className="calc-step-badge">06 / 07</div>
                <h2 className="calc-h2">Exécution & Supervision</h2>
                <p className="calc-desc">La supervision garantit que vous pouvez tracer, expliquer et arrêter toute décision agentique à tout moment.</p>

                <div className="calc-q">
                  <div className="calc-q-label">Avez-vous un système d'enregistrement complet des décisions ?</div>
                  <div className="calc-q-hint">Chaque décision doit être enregistrée avec : date/heure, agent, contexte, logique, résultat. Conservation minimum : 3 ans.</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non', d: "Pas d'historique structuré" },
                      { v: 'partiel', l: 'Partiel', d: 'Certaines décisions tracées' },
                      { v: 'oui-complet', l: 'Oui, complet et pérenne', d: 'Logs structurés, rétention 3+ ans' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.systemeLogs === o.v ? ' on' : ''}`} onClick={() => upd('systemeLogs', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-q">
                  <div className="calc-q-label">Existe-t-il un mécanisme d'arrêt d'urgence pour vos agents ?</div>
                  <div className="calc-q-hint">En cas de dysfonctionnement grave, vous devez pouvoir stopper un agent en moins de 60 secondes et reprendre en mode manuel.</div>
                  <div className="calc-opts">
                    {[
                      { v: 'non', l: 'Non', d: "Pas de procédure d'arrêt" },
                      { v: 'oui-non-teste', l: 'Oui, mais pas testé', d: 'Mécanisme théorique' },
                      { v: 'oui-teste', l: 'Oui, testé régulièrement', d: 'Tests trimestriels, temps < 60s' },
                    ].map(o => (
                      <button key={o.v} className={`calc-opt${formData.mecanismeArret === o.v ? ' on' : ''}`} onClick={() => upd('mecanismeArret', o.v)}>
                        <div className="calc-opt-title">{o.l}</div>
                        <div className="calc-opt-desc">{o.d}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ─── ÉTAPE 7 : Dépendances ─── */}
            {step === 7 && (
              <>
                <div className="calc-step-badge">07 / 07 — Dernière étape</div>
                <h2 className="calc-h2">Dépendances externes</h2>
                <p className="calc-desc">Mesurons votre dépendance aux plateformes et systèmes externes. Une dépendance élevée fragilise votre souveraineté.</p>

                {[
                  {
                    field: 'dependanceStructurelle' as keyof ACFFormData,
                    label: "% CA dépendant d'agents IA de plateformes tierces",
                    hint: 'Plateformes type Amazon, Google Shopping, Meta Ads, où des agents autonomes contrôlent l\'accès à vos clients.',
                    max: 100, unit: '%',
                  },
                  {
                    field: 'dependanceDonnees' as keyof ACFFormData,
                    label: '% décisions basées sur des données externes non contrôlées',
                    hint: "Données de pricing concurrent, prévisions tierces, benchmarks externes que vous ne pouvez pas vérifier.",
                    max: 100, unit: '%',
                  },
                  {
                    field: 'dependanceTrafic' as keyof ACFFormData,
                    label: '% trafic provenant d\'agents publicitaires',
                    hint: 'Trafic via Google Ads, Meta Ads, TikTok Ads. Le reste est organique, direct ou via vos propres canaux.',
                    max: 100, unit: '%',
                  },
                  {
                    field: 'joursBloquesCA' as keyof ACFFormData,
                    label: 'Jours de CA bloqués hors de votre contrôle',
                    hint: 'Délais de paiement imposés par plateformes ou intermédiaires. Plus c\'est élevé, plus votre trésorerie est fragile.',
                    max: 90, unit: ' jours',
                  },
                ].map(({ field, label, hint, max, unit }) => {
                  const val = (formData[field] as number) || 0
                  return (
                    <div key={String(field)} className="calc-q">
                      <div className="calc-q-label">{label}</div>
                      <div className="calc-q-hint">{hint}</div>
                      <div className="calc-slider-row">
                        <span style={{fontSize:'13px',color:'#6b7fa0'}}>Valeur</span>
                        <span className="calc-slider-val">{val}<span className="calc-slider-unit">{unit}</span></span>
                      </div>
                      <input
                        type="range" min={0} max={max} value={val}
                        onChange={e => upd(field, parseInt(e.target.value))}
                        className="calc-slider"
                      />
                      <div className="calc-slider-labels"><span>0{unit}</span><span>{max}{unit}</span></div>
                    </div>
                  )
                })}
              </>
            )}

            {/* NAVIGATION */}
            <div className="calc-nav">
              {step > 1 && (
                <button className="calc-btn-prev" onClick={handlePrev}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                  Précédent
                </button>
              )}
              {step < totalSteps ? (
                <button className="calc-btn-next" onClick={handleNext}>
                  Étape suivante
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              ) : (
                <button className="calc-btn-submit" onClick={handleSubmit}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  Voir mes résultats
                </button>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
