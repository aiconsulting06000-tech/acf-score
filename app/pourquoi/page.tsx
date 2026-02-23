'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PourquoiPage() {
  const risks = [
    {
      n: 1,
      title: 'Décisions IA contraires à vos intérêts business',
      body: "Vos agents optimisent des métriques locales sans vision globale. Exemple : un agent de pricing qui maximise le volume de ventes en détruisant vos marges, ou un chatbot qui promet des délais impossibles pour améliorer la satisfaction immédiate.",
      note: "Une marketplace a perdu 1,2M€ en 3 mois car son agent de recommandation privilégiait les produits low-cost pour maximiser le taux de conversion, détruisant la marge moyenne par commande.",
      label: 'Cas réel',
    },
    {
      n: 2,
      title: 'Perte de contrôle sur votre stratégie commerciale',
      body: "Impossible de piloter ou corriger en temps réel. Vos agents prennent des milliers de micro-décisions quotidiennes qui, cumulées, redéfinissent votre positionnement marché sans validation stratégique.",
      note: "Sans kill switch ni logs détaillés, vous découvrez les dérives 2-3 semaines trop tard, quand les KPIs business s'effondrent.",
      label: 'Impact',
    },
    {
      n: 3,
      title: 'Dépendance critique aux plateformes tierces',
      body: "Si Amazon, Google ou Meta bloque votre compte, votre activité s'arrête. Sans diversification ni plan B, un incident technique ou une suspension arbitraire peut paralyser votre entreprise pendant des semaines.",
      note: "Les entreprises avec > 70% de dépendance à une plateforme mettent en moyenne 23 jours à retrouver leur CA normal après un blocage.",
      label: 'Chiffre clé',
    },
    {
      n: 4,
      title: 'Responsabilité juridique sur décisions automatisées',
      body: "Vous êtes légalement responsable de TOUTES les décisions de vos agents, même si vous n'avez aucun contrôle sur eux. L'AI Act européen impose des sanctions jusqu'à 35M€ ou 7% du CA mondial pour non-conformité.",
      note: "Traçabilité complète (3 ans minimum), surveillance humaine, mécanismes d'arrêt d'urgence, documentation des processus décisionnels.",
      label: 'Obligation légale',
    },
    {
      n: 5,
      title: 'Érosion de marge via prix et promos non maîtrisés',
      body: "Des agents de pricing dynamique qui appliquent des remises automatiques pour « rester compétitifs » peuvent détruire votre rentabilité en quelques jours. Sans seuils de sécurité, vos marges fondent silencieusement.",
      note: "Un pure player a perdu 15 points de marge brute en 2 semaines car son algorithme de pricing a sur-réagi à une guerre des prix sans plancher minimum.",
      label: 'Exemple',
    },
    {
      n: 6,
      title: "Atteinte à l'image de marque",
      body: "Vos agents peuvent prendre des décisions ou communiquer de manière non conforme à vos valeurs, votre positionnement ou votre éthique. Une seule campagne mal calibrée peut détruire des années de construction d'image.",
      note: "Chatbots donnant des réponses inappropriées, agents publicitaires ciblant des audiences sensibles, recommandations contraires à vos engagements RSE.",
      label: 'Zone de risque',
    },
    {
      n: 7,
      title: 'Incapacité à auditer ou corriger les agents IA',
      body: "Sans logs ni traçabilité, impossible de comprendre pourquoi un agent a pris telle décision, de reproduire un comportement problématique, ou de corriger une dérive. Vous pilotez à l'aveugle.",
      note: "En cas de litige client, d'audit réglementaire ou d'incident majeur, vous ne pouvez pas prouver que vos systèmes fonctionnaient correctement. Responsabilité totale engagée.",
      label: 'Conséquence',
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .pq{background:#050c1a;color:#fff;font-family:'Inter',sans-serif;min-height:100vh}
        .pq-hero{background:linear-gradient(160deg,#071122 0%,#050c1a 70%);border-bottom:1px solid rgba(201,168,76,.18);padding:80px 0 70px;position:relative;overflow:hidden}
        .pq-hero::before{content:'';position:absolute;top:-20%;right:-5%;width:500px;height:500px;background:radial-gradient(circle,rgba(239,68,68,.06) 0%,transparent 70%);pointer-events:none}
        .pq-w{max-width:1000px;margin:0 auto;padding:0 40px}
        .pq-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#ef4444;padding:6px 14px;border-radius:100px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:24px}
        .pq-h1{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(30px,4.5vw,50px);line-height:1.1;color:#fff;margin-bottom:20px}
        .pq-h1 .g{color:#c9a84c}
        .pq-sub{font-size:17px;color:#9db0c8;line-height:1.65;margin-bottom:36px;max-width:680px}
        .pq-stat-row{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);padding:10px 18px;border-radius:8px;font-size:13px;color:#9db0c8}
        .pq-stat-row strong{color:#ef4444}

        .pq-sec{padding:80px 0}
        .pq-intro{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:14px;padding:36px 40px;margin-bottom:56px}
        .pq-intro-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:22px;color:#fff;margin-bottom:12px}
        .pq-intro-body{font-size:15px;color:#9db0c8;line-height:1.75}
        .pq-intro-body strong{color:#e8c96a}

        .pq-risk{background:#071122;border:1px solid rgba(239,68,68,.2);border-radius:14px;padding:32px 36px;margin-bottom:24px;transition:.2s}
        .pq-risk:hover{border-color:rgba(239,68,68,.4)}
        .pq-risk-head{display:flex;align-items:flex-start;gap:20px;margin-bottom:16px}
        .pq-risk-n{width:40px;height:40px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:16px;color:#ef4444;flex-shrink:0}
        .pq-risk-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:19px;color:#fff;line-height:1.25;margin-top:8px}
        .pq-risk-body{font-size:14.5px;color:#9db0c8;line-height:1.75;margin-bottom:16px}
        .pq-risk-note{background:rgba(5,12,26,.6);border-left:3px solid rgba(239,68,68,.4);padding:12px 16px;border-radius:0 6px 6px 0}
        .pq-risk-note-lbl{font-size:10px;font-weight:600;color:#ef4444;letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:4px}
        .pq-risk-note-text{font-size:13px;color:#6b7fa0;line-height:1.6}

        .pq-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid rgba(201,168,76,.18);border-radius:12px;overflow:hidden;background:#071122;margin:56px 0}
        .pq-s{padding:28px;border-right:1px solid rgba(201,168,76,.12);text-align:center}
        .pq-s:last-child{border-right:none}
        .pq-s-val{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:40px;color:#c9a84c;line-height:1}
        .pq-s-lbl{font-size:12px;color:#6b7fa0;margin-top:8px;line-height:1.5}

        .pq-cta{background:linear-gradient(135deg,#0d1f3c,#071122);border:1px solid rgba(201,168,76,.25);border-radius:14px;padding:56px;text-align:center;margin-top:56px}
        .pq-cta-title{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(24px,3vw,34px);color:#fff;margin-bottom:14px}
        .pq-cta-sub{font-size:16px;color:#9db0c8;margin-bottom:32px;line-height:1.6}
        .pq-cta-row{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap}
        .pq-btn-g{background:#c9a84c;color:#050c1a;padding:14px 32px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;transition:.2s;font-family:'Space Grotesk',sans-serif;display:inline-block}
        .pq-btn-g:hover{background:#e8c96a;box-shadow:0 6px 28px rgba(201,168,76,.35);color:#050c1a}
        .pq-btn-o{border:1px solid rgba(201,168,76,.3);color:#9db0c8;padding:14px 28px;border-radius:8px;font-weight:500;font-size:14px;text-decoration:none;transition:.2s;display:inline-block}
        .pq-btn-o:hover{border-color:#c9a84c;color:#c9a84c}

        @media(max-width:768px){.pq-w{padding:0 20px}.pq-stats{grid-template-columns:1fr}.pq-s{border-right:none;border-bottom:1px solid rgba(201,168,76,.12)}.pq-s:last-child{border-bottom:none}.pq-intro,.pq-risk{padding:24px}.pq-cta{padding:36px 24px}.pq-sec{padding:56px 0}}
      `}</style>

      <div className="pq">
        <Header />

        <section className="pq-hero">
          <div className="pq-w">
            <div className="pq-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              7 Risques Critiques
            </div>
            <h1 className="pq-h1">Les 7 Risques Critiques<br/>sans <span className="g">Gouvernance Agentique</span></h1>
            <p className="pq-sub">Sans cadre structuré, vos agents IA peuvent devenir vos pires ennemis business. Voici ce qui vous attend sans l'ACF®.</p>
            <div className="pq-stat-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
              <strong>73%</strong> des entreprises utilisent des agents IA sans gouvernance formalisée
            </div>
          </div>
        </section>

        <section className="pq-sec">
          <div className="pq-w">
            <div className="pq-intro">
              <div className="pq-intro-title">Pourquoi la gouvernance agentique est critique ?</div>
              <p className="pq-intro-body">Les agents IA autonomes représentent une révolution pour votre business : optimisation en temps réel, décisions data-driven, disponibilité 24/7. Mais cette autonomie cache un risque majeur : <strong>la perte de contrôle stratégique</strong>. Sans gouvernance structurée, vos agents peuvent prendre des décisions catastrophiques tout en pensant optimiser vos KPIs.</p>
            </div>

            {risks.map(r => (
              <div key={r.n} className="pq-risk">
                <div className="pq-risk-head">
                  <div className="pq-risk-n">{r.n}</div>
                  <div className="pq-risk-title">{r.title}</div>
                </div>
                <p className="pq-risk-body">{r.body}</p>
                <div className="pq-risk-note">
                  <div className="pq-risk-note-lbl">{r.label}</div>
                  <p className="pq-risk-note-text">{r.note}</p>
                </div>
              </div>
            ))}

            <div className="pq-stats">
              <div className="pq-s"><div className="pq-s-val">73%</div><p className="pq-s-lbl">des entreprises sans gouvernance formalisée</p></div>
              <div className="pq-s"><div className="pq-s-val">€2,4M</div><p className="pq-s-lbl">de pertes moyennes par incident IA non maîtrisé</p></div>
              <div className="pq-s"><div className="pq-s-val">89%</div><p className="pq-s-lbl">des dirigeants craignent la perte de contrôle stratégique</p></div>
            </div>

            <div className="pq-cta">
              <div className="pq-cta-title">L'ACF® vous protège de ces 7 risques</div>
              <p className="pq-cta-sub">Structurez votre gouvernance agentique sur 4 couches opérationnelles. Gardez le contrôle tout en bénéficiant de l'autonomie IA.</p>
              <div className="pq-cta-row">
                <Link href="/calculator" className="pq-btn-g">Évaluer mon risque gratuitement →</Link>
                <Link href="/contact" className="pq-btn-o">Parler à un expert</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
