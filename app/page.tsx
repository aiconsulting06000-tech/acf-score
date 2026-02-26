import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .lp{background:#050c1a;color:#fff;font-family:'Inter',sans-serif}

        /* HERO */
        .lp-hero{background:linear-gradient(160deg,#071122 0%,#050c1a 65%);border-bottom:1px solid rgba(201,168,76,.18);padding:90px 0 80px;position:relative;overflow:hidden;text-align:center}
        .lp-hero::before{content:'';position:absolute;top:-30%;right:-5%;width:600px;height:600px;background:radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 70%);pointer-events:none}
        .lp-w{max-width:1320px;margin:0 auto;padding:0 40px}
        .lp-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.25);color:#c9a84c;padding:7px 16px;border-radius:100px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:28px}
        .lp-badge-dot{width:6px;height:6px;background:#c9a84c;border-radius:50%;animation:bp 2s infinite}
        @keyframes bp{0%,100%{opacity:1}50%{opacity:.3}}
        .lp-h1{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(38px,5.5vw,62px);line-height:1.07;color:#fff;margin-bottom:24px;max-width:720px;margin-left:auto;margin-right:auto}
        .lp-h1 .g{color:#c9a84c}
        .lp-sub{font-size:18px;color:#9db0c8;line-height:1.65;max-width:560px;margin:0 auto 40px}
        .lp-cta-row{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:44px;justify-content:center}
        .lp-btn-g{background:#c9a84c;color:#050c1a;padding:15px 36px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;transition:.2s;font-family:'Space Grotesk',sans-serif;display:inline-block}
        .lp-btn-g:hover{background:#e8c96a;box-shadow:0 6px 30px rgba(201,168,76,.35);color:#050c1a}
        .lp-btn-o{border:1px solid rgba(201,168,76,.3);color:#9db0c8;padding:15px 28px;border-radius:8px;font-weight:500;font-size:14px;text-decoration:none;transition:.2s;display:inline-block}
        .lp-btn-o:hover{border-color:#c9a84c;color:#c9a84c}
        .lp-pills{display:flex;gap:24px;flex-wrap:wrap;justify-content:center}
        .lp-pill{display:flex;align-items:center;gap:8px;font-size:13px;color:#6b7fa0}
        .lp-pill::before{content:'';width:5px;height:5px;background:#c9a84c;border-radius:50%;flex-shrink:0}

        /* STATS */
        .lp-stats{border-top:1px solid rgba(201,168,76,.12);border-bottom:1px solid rgba(201,168,76,.12);background:#071122}
        .lp-stats-inner{max-width:1320px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:repeat(3,1fr)}
        .lp-stat{padding:28px 32px;border-right:1px solid rgba(201,168,76,.12);text-align:center}
        .lp-stat:last-child{border-right:none}
        .lp-stat-v{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:36px;color:#c9a84c;line-height:1}
        .lp-stat-l{font-size:12px;color:#6b7fa0;margin-top:6px}

        /* SECTIONS */
        .lp-sec{padding:80px 0;text-align:center}
        .lp-sec-dark{padding:80px 0;background:#071122;border-top:1px solid rgba(201,168,76,.1);border-bottom:1px solid rgba(201,168,76,.1);text-align:center}
        .lp-sec-badge{display:inline-block;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);color:#c9a84c;padding:4px 12px;border-radius:4px;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:16px}
        .lp-sh{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(26px,3.5vw,38px);color:#fff;line-height:1.15;margin-bottom:10px}
        .lp-sh .g{color:#c9a84c}
        .lp-body{font-size:16px;color:#9db0c8;line-height:1.7;max-width:620px;margin-left:auto;margin-right:auto}
        .lp-div{width:48px;height:2px;background:linear-gradient(90deg,#c9a84c,transparent);margin:18px auto 36px}

        /* WHAT IS */
        .lp-what-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
        .lp-what-card{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:12px;padding:32px;transition:.25s;text-align:center}
        .lp-what-card:hover{border-color:rgba(201,168,76,.4);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
        .lp-what-ico{width:48px;height:48px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:#c9a84c}
        .lp-what-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:17px;color:#fff;margin-bottom:10px}
        .lp-what-desc{font-size:13.5px;color:#6b7fa0;line-height:1.65}

        /* HOW */
        .lp-how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px;text-align:center}
        .lp-how-num{width:44px;height:44px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.25);border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:18px;color:#c9a84c;margin:0 auto 16px}
        .lp-how-title{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;color:#fff;margin-bottom:6px}
        .lp-how-desc{font-size:13px;color:#6b7fa0;line-height:1.6}

        /* DELIVERABLES */
        .lp-del-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px}
        .lp-del-card{background:#050c1a;border:1px solid rgba(201,168,76,.18);border-radius:12px;padding:32px;text-align:center}
        .lp-del-ico{color:#c9a84c;margin-bottom:16px}
        .lp-del-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:17px;color:#fff;margin-bottom:8px}
        .lp-del-desc{font-size:13.5px;color:#6b7fa0;line-height:1.65}

        /* RISKS */
        .lp-risks-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:40px}
        .lp-risk{background:#050c1a;border:1px solid rgba(239,68,68,.2);border-radius:10px;padding:22px 24px;display:flex;gap:16px;transition:.2s;text-align:left}
        .lp-risk:hover{border-color:rgba(239,68,68,.4)}
        .lp-risk-n{width:30px;height:30px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:12px;color:#ef4444;flex-shrink:0;margin-top:2px}
        .lp-risk-title{font-weight:600;font-size:14px;color:#fff;margin-bottom:4px}
        .lp-risk-desc{font-size:12.5px;color:#6b7fa0;line-height:1.55}
        .lp-risk.span2{grid-column:span 2}

        /* CTA FINAL */
        .lp-cta-sec{padding:100px 0;background:radial-gradient(ellipse at center,rgba(201,168,76,.08) 0%,transparent 65%);text-align:center}
        .lp-cta-in{max-width:680px;margin:0 auto;padding:0 40px;text-align:center}
        .lp-cta-title{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(30px,4vw,44px);color:#fff;margin-bottom:16px;line-height:1.1}
        .lp-cta-sub{font-size:17px;color:#9db0c8;margin-bottom:40px;line-height:1.6}

        @media(max-width:1024px){.lp-what-grid{grid-template-columns:1fr 1fr}.lp-how-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:768px){
          .lp-hero,.lp-sec,.lp-sec-dark,.lp-cta-sec{padding:56px 0}
          .lp-w,.lp-cta-in{padding:0 20px}
          .lp-stats-inner{grid-template-columns:1fr;padding:0 20px}
          .lp-stat{border-right:none;border-bottom:1px solid rgba(201,168,76,.12);padding:20px}
          .lp-stat:last-child{border-bottom:none}
          .lp-what-grid,.lp-del-grid,.lp-risks-grid{grid-template-columns:1fr}
          .lp-how-grid{grid-template-columns:1fr}
          .lp-risk.span2{grid-column:span 1}
        }
      `}</style>

      <div className="lp">
        <Header />

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-w">
            <div className="lp-badge"><span className="lp-badge-dot"/>Gratuit · Sans inscription · Résultat immédiat</div>
            <h1 className="lp-h1">Êtes-vous prêt pour<br/>l'ère des <span className="g">agents IA</span><br/>autonomes ?</h1>
            <p className="lp-sub">Évaluez la robustesse de votre gouvernance agentique en 10 minutes. Obtenez votre Score ACF® en 7 étapes et vos recommandations personnalisées.</p>
            <div className="lp-cta-row">
              <Link href="/calculator" className="lp-btn-g">Calculer mon score gratuitement →</Link>
              <Link href="/pourquoi" className="lp-btn-o">Pourquoi c'est critique</Link>
            </div>
            <div className="lp-pills">
              <span className="lp-pill">7 étapes guidées</span>
              <span className="lp-pill">Rapport PDF complet</span>
              <span className="lp-pill">100% Gratuit</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="lp-stats">
          <div className="lp-stats-inner">
            <div className="lp-stat"><div className="lp-stat-v">73%</div><div className="lp-stat-l">des entreprises sans gouvernance formalisée</div></div>
            <div className="lp-stat"><div className="lp-stat-v">€2,4M</div><div className="lp-stat-l">de pertes moyennes par décision IA non contrôlée</div></div>
            <div className="lp-stat"><div className="lp-stat-v">89%</div><div className="lp-stat-l">des dirigeants craignent la perte de contrôle</div></div>
          </div>
        </div>

        {/* QU'EST-CE QUE L'ACF */}
        <section className="lp-sec">
          <div className="lp-w">
            <div className="lp-sec-badge">Framework</div>
            <h2 className="lp-sh">Qu'est-ce que l'<span className="g">Agentic Commerce Framework®</span> ?</h2>
            <p className="lp-body">Le premier cadre méthodologique de gouvernance pour organisations utilisant des agents IA autonomes. Structurez le contrôle, limitez les risques, restez souverain.</p>
            <div className="lp-div"/>
            <div className="lp-what-grid">
              <div className="lp-what-card">
                <div className="lp-what-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="lp-what-title">Souveraineté Opérationnelle</div>
                <p className="lp-what-desc">Gardez le contrôle de vos décisions stratégiques même lorsque des agents IA opèrent de manière autonome.</p>
              </div>
              <div className="lp-what-card">
                <div className="lp-what-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                </div>
                <div className="lp-what-title">Conformité Réglementaire</div>
                <p className="lp-what-desc">Respect du RGPD, AI Act et réglementations sectorielles avec une gouvernance structurée dès la conception.</p>
              </div>
              <div className="lp-what-card">
                <div className="lp-what-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                </div>
                <div className="lp-what-title">Performance & Résilience</div>
                <p className="lp-what-desc">Bénéficiez de l'autonomie agentique tout en maintenant votre résilience économique et stratégique.</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="lp-sec-dark">
          <div className="lp-w">
            <div className="lp-sec-badge">Processus</div>
            <h2 className="lp-sh">Comment ça <span className="g">marche</span> ?</h2>
            <p className="lp-body">7 étapes guidées, 10 minutes, résultat immédiat.</p>
            <div className="lp-div"/>
            <div className="lp-how-grid">
              {[
                {n:'01',t:'Contexte entreprise',d:'Secteur, taille, présence agents IA actuels'},
                {n:'02',t:'Niveau de maturité',d:'Fonctionnement actuel de vos agents autonomes'},
                {n:'03',t:'4 Couches ACF®',d:'Gouvernance, Politique, Système, Supervision'},
                {n:'04',t:'Dépendances critiques',d:'Fournisseurs tiers, risques de concentration'},
              ].map(s => (
                <div key={s.n}>
                  <div className="lp-how-num">{s.n}</div>
                  <div className="lp-how-title">{s.t}</div>
                  <p className="lp-how-desc">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CE QUE VOUS OBTENEZ */}
        <section className="lp-sec">
          <div className="lp-w">
            <div className="lp-sec-badge">Livrables</div>
            <h2 className="lp-sh">Ce que vous <span className="g">obtenez</span></h2>
            <p className="lp-body">Un diagnostic complet et actionnable, téléchargeable en PDF.</p>
            <div className="lp-div"/>
            <div className="lp-del-grid">
              <div className="lp-del-card">
                <div className="lp-del-ico">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                </div>
                <div className="lp-del-title">Score de Souveraineté</div>
                <p className="lp-del-desc">Mesurez votre indépendance face aux plateformes tierces et votre résilience opérationnelle.</p>
              </div>
              <div className="lp-del-card">
                <div className="lp-del-ico">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <div className="lp-del-title">Score Global ACF®</div>
                <p className="lp-del-desc">Évaluez vos 4 couches de gouvernance agentique sur 100 points avec positionnement marché.</p>
              </div>
              <div className="lp-del-card">
                <div className="lp-del-ico">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div className="lp-del-title">3 Actions Prioritaires</div>
                <p className="lp-del-desc">Plan d'action personnalisé et priorisé pour sécuriser votre transition agentique immédiatement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 RISQUES */}
        <section className="lp-sec-dark">
          <div className="lp-w">
            <div className="lp-sec-badge">Risques</div>
            <h2 className="lp-sh">Sans gouvernance, vous <span className="g">risquez</span></h2>
            <p className="lp-body">Les 7 risques critiques identifiés par l'ACF® pour les organisations sans cadre de gouvernance agentique.</p>
            <div className="lp-div"/>
            <div className="lp-risks-grid">
              {[
                {n:1,t:'Décisions IA contraires à vos intérêts business',d:"Agents qui optimisent des métriques locales sans vision globale"},
                {n:2,t:'Perte de contrôle sur votre stratégie commerciale',d:"Impossibilité de piloter ou corriger en temps réel"},
                {n:3,t:'Dépendance critique aux plateformes tierces',d:"Blocage Amazon/Google = arrêt brutal de votre activité"},
                {n:4,t:'Responsabilité juridique sur décisions automatisées',d:"Sanctions AI Act jusqu'à 35M€ ou 7% du CA mondial"},
                {n:5,t:'Érosion de marge via prix et promos non maîtrisés',d:"Destruction de rentabilité sans supervision des seuils"},
                {n:6,t:'Atteinte à l\'image de marque',d:"Actions non conformes à vos valeurs et engagements RSE"},
              ].map(r => (
                <div key={r.n} className="lp-risk">
                  <div className="lp-risk-n">{r.n}</div>
                  <div><div className="lp-risk-title">{r.t}</div><p className="lp-risk-desc">{r.d}</p></div>
                </div>
              ))}
              <div className="lp-risk span2">
                <div className="lp-risk-n">7</div>
                <div><div className="lp-risk-title">Incapacité à auditer ou corriger les agents IA</div><p className="lp-risk-desc">Sans logs ni traçabilité, impossible de comprendre les erreurs ou de se défendre en cas d'audit réglementaire.</p></div>
              </div>
            </div>
            <div style={{textAlign:'center',marginTop:'32px'}}>
              <Link href="/pourquoi" className="lp-btn-o">Découvrir les 7 risques en détail →</Link>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="lp-cta-sec">
          <div className="lp-cta-in">
            <div className="lp-sec-badge" style={{marginBottom:'24px'}}>Diagnostic gratuit</div>
            <h2 className="lp-cta-title">Calculez votre Score ACF® <span style={{color:'#c9a84c'}}>maintenant</span></h2>
            <p className="lp-cta-sub">10 minutes. Résultat immédiat. Rapport PDF téléchargeable. Aucune inscription requise.</p>
            <Link href="/calculator" className="lp-btn-g" style={{fontSize:'16px',padding:'16px 40px'}}>Démarrer le diagnostic →</Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
