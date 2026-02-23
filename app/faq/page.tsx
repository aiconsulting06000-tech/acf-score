'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const categories = [
  {
    id: 'general',
    label: 'Général',
    questions: [
      { q: "Qu'est-ce que le Score ACF® ?", a: "Le Score ACF® est un outil de diagnostic de votre gouvernance agentique. Il mesure votre niveau de souveraineté opérationnelle face aux agents IA autonomes sur 4 couches : Gouvernance, Politique, Système et Supervision. Plus votre score est élevé, plus votre organisation est résiliente face aux risques liés à l'IA autonome." },
      { q: "Qu'est-ce que l'Agentic Commerce Framework® ?", a: "L'Agentic Commerce Framework® (ACF®) est le premier cadre méthodologique de gouvernance pour les organisations utilisant des agents IA autonomes. Développé par Vincent DORANGE, il structure le contrôle humain sur les décisions automatisées tout en préservant les bénéfices de l'autonomie agentique." },
      { q: "À qui s'adresse le Score ACF® ?", a: "À tout dirigeant, DSI, Directeur de la Transformation ou Responsable Conformité d'une organisation qui utilise ou envisage d'utiliser des agents IA autonomes : chatbots décisionnels, agents de pricing, systèmes de recommandation, automatisation des achats, etc." },
      { q: "En quoi le Score ACF® est-il différent des autres outils d'audit IA ?", a: "Le Score ACF® est spécifiquement conçu pour l'ère agentique (agents autonomes) et non pour l'IA générale. Il évalue votre souveraineté opérationnelle en 4 dimensions précises, avec un scoring quantitatif et des recommandations actionnables immédiates — pas un audit de 6 mois." },
    ]
  },
  {
    id: 'diagnostic',
    label: 'Le Diagnostic',
    questions: [
      { q: "Combien de temps prend le diagnostic ?", a: "Entre 8 et 12 minutes en moyenne pour les 7 étapes. Les questions sont précises et contextuelles, sans redondance. Vous obtenez votre score et votre rapport immédiatement après la dernière étape." },
      { q: "Quelles informations dois-je préparer ?", a: "Aucune préparation nécessaire. Les questions portent sur votre organisation (secteur, taille), votre usage actuel des agents IA, et vos pratiques de gouvernance. Vous répondez sur la base de votre connaissance opérationnelle, pas de données techniques." },
      { q: "Le diagnostic est-il vraiment gratuit ?", a: "Oui, 100% gratuit, sans inscription, sans carte bancaire, sans engagement. Vous obtenez votre score et votre rapport PDF complet immédiatement, sans avoir à créer de compte." },
      { q: "Mes données sont-elles conservées ?", a: "Vos réponses sont utilisées uniquement pour calculer votre score en temps réel. Elles ne sont pas transmises à des tiers. Si vous fournissez un email, vous recevez votre rapport PDF et pouvez être contacté par notre équipe uniquement si vous le souhaitez." },
      { q: "Puis-je refaire le diagnostic plusieurs fois ?", a: "Oui, le diagnostic est réutilisable à volonté. Nous recommandons de le refaire tous les 6 mois pour mesurer votre progression, ou après un changement majeur dans votre usage des agents IA." },
    ]
  },
  {
    id: 'score',
    label: 'Le Score',
    questions: [
      { q: "Comment le score est-il calculé ?", a: "Le Score ACF® est calculé sur 100 points en évaluant 4 dimensions : DS (Dépendance Structurelle), DD (Dépendance aux Données), DT (Dépendance au Trafic) et DTr (Dépendance à la Trésorerie). Chaque dimension analyse votre exposition aux risques spécifiques de l'économie agentique." },
      { q: "Que signifient les niveaux de score ?", a: "0-30 points : Niveau Critique — risques existentiels immédiats. 30-55 : Niveau Fragile — vulnérabilités majeures à corriger. 55-75 : Niveau Structuré — bases solides, optimisations nécessaires. 75-90 : Niveau Avancé — gouvernance robuste. 90-100 : Niveau Souverain — modèle de référence." },
      { q: "Mon score peut-il évoluer dans le temps ?", a: "Absolument. Le score reflète l'état de votre gouvernance à un instant T. Chaque amélioration de vos processus, chaque politique mise en place, chaque audit réalisé améliore mécaniquement votre score. Les entreprises suivies par AI CONSULTING gagnent en moyenne 18 points en 6 mois." },
      { q: "Comment se positionner par rapport au marché ?", a: "Le rapport inclut votre positionnement par rapport à notre base de données sectorielle. Vous voyez si vous êtes au-dessus, dans la moyenne, ou en retard par rapport aux entreprises de votre secteur et taille." },
    ]
  },
  {
    id: 'apres',
    label: 'Après le Diagnostic',
    questions: [
      { q: "Que contient le rapport PDF ?", a: "Le rapport PDF complet inclut : votre score détaillé par dimension, votre positionnement sectoriel, l'analyse de vos 3 risques prioritaires, 3 actions recommandées avec niveaux d'urgence, un plan de mise en œuvre sur 90 jours, et des ressources pour approfondir chaque point." },
      { q: "Que faire après avoir obtenu mon score ?", a: "Commencez par les 3 actions prioritaires identifiées dans votre rapport. Pour les scores inférieurs à 55/100, nous recommandons un accompagnement structuré. Pour les scores entre 55 et 75, des ateliers ciblés suffisent généralement. Pour les scores > 75, un suivi trimestriel maintient votre niveau." },
      { q: "Proposez-vous un accompagnement après le diagnostic ?", a: "Oui. AI CONSULTING propose des accompagnements sur mesure : ateliers de mise en conformité, implémentation du Framework ACF®, formation des équipes, audits approfondis. Contactez-nous via le formulaire de contact pour discuter de vos besoins spécifiques." },
      { q: "Le Score ACF® est-il reconnu réglementairement ?", a: "Le Score ACF® est aligné avec les exigences de l'AI Act européen et du RGPD. Il n'a pas de valeur de certification officielle, mais sert de base documentaire solide pour démontrer une démarche proactive de conformité IA lors d'audits réglementaires." },
    ]
  },
  {
    id: 'technique',
    label: 'Technique & Sécurité',
    questions: [
      { q: "Sur quelle technologie repose le calculateur ?", a: "Le calculateur est développé avec Next.js et TypeScript, hébergé sur Vercel. Le calcul du score est effectué côté serveur. Aucune donnée sensible n'est stockée sans consentement explicite." },
      { q: "L'outil fonctionne-t-il sur mobile ?", a: "Oui, le calculateur est entièrement responsive et optimisé pour mobile. L'expérience est identique sur desktop, tablette et smartphone." },
      { q: "Puis-je intégrer l'outil dans mon intranet ?", a: "Nous proposons des licences entreprise pour intégration interne. Contactez-nous pour une démonstration et discuter des modalités d'intégration adaptées à votre environnement technique." },
    ]
  },
]

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button className={`faq-btn${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-ico">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      {open && <div className="faq-ans">{a}</div>}
    </div>
  )
}

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .fq{background:#050c1a;color:#fff;font-family:'Inter',sans-serif;min-height:100vh}
        .fq-hero{background:linear-gradient(160deg,#071122,#050c1a);border-bottom:1px solid rgba(201,168,76,.18);padding:72px 0 60px}
        .fq-w{max-width:860px;margin:0 auto;padding:0 40px}
        .fq-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.25);color:#c9a84c;padding:6px 14px;border-radius:100px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:22px}
        .fq-h1{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(28px,4vw,46px);line-height:1.1;color:#fff;margin-bottom:14px}
        .fq-h1 .g{color:#c9a84c}
        .fq-sub{font-size:16px;color:#9db0c8;line-height:1.65;max-width:600px}

        .fq-sec{padding:64px 0 80px}
        .fq-tabs{display:flex;gap:0;border:1px solid rgba(201,168,76,.18);border-radius:10px;overflow:hidden;margin-bottom:48px;background:#071122}
        .fq-tab{flex:1;padding:13px 16px;background:transparent;border:none;cursor:pointer;font-size:12px;font-weight:600;color:#6b7fa0;transition:.2s;font-family:'Space Grotesk',sans-serif;letter-spacing:.03em;border-right:1px solid rgba(201,168,76,.12)}
        .fq-tab:last-child{border-right:none}
        .fq-tab:hover{color:#c9a84c;background:rgba(201,168,76,.05)}
        .fq-tab.on{color:#c9a84c;background:rgba(201,168,76,.1)}

        .fq-group{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:12px;overflow:hidden;margin-bottom:16px}
        .fq-group-title{padding:18px 24px 16px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:#c9a84c;border-bottom:1px solid rgba(201,168,76,.12);letter-spacing:.04em;text-transform:uppercase;font-size:11px}
        .fq-items{padding:0 24px}

        .faq-item{border-bottom:1px solid rgba(255,255,255,.05)}
        .faq-item:last-child{border-bottom:none}
        .faq-btn{width:100%;display:flex;align-items:flex-start;justify-content:space-between;text-align:left;padding:18px 0;background:transparent;border:none;cursor:pointer;color:#e2eaf5;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:14.5px;line-height:1.45;gap:16px;transition:color .2s}
        .faq-btn:hover{color:#c9a84c}
        .faq-btn.open{color:#c9a84c}
        .faq-ico{flex-shrink:0;width:22px;height:22px;border:1px solid rgba(201,168,76,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#c9a84c;transition:.25s;margin-top:1px}
        .faq-btn.open .faq-ico{transform:rotate(45deg);background:rgba(201,168,76,.12)}
        .faq-ans{padding:0 0 18px;color:#9db0c8;font-size:14px;line-height:1.75;max-width:720px}

        .fq-count{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:rgba(201,168,76,.15);border-radius:50%;font-size:10px;font-weight:700;color:#c9a84c;margin-left:6px}

        .fq-cta{background:#071122;border:1px solid rgba(201,168,76,.2);border-radius:14px;padding:48px;text-align:center;margin-top:40px}
        .fq-cta-title{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(22px,3vw,30px);color:#fff;margin-bottom:12px}
        .fq-cta-sub{font-size:15px;color:#9db0c8;margin-bottom:28px}
        .fq-cta-row{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}
        .fq-btn-g{background:#c9a84c;color:#050c1a;padding:13px 28px;border-radius:7px;font-weight:700;font-size:13px;text-decoration:none;transition:.2s;font-family:'Space Grotesk',sans-serif}
        .fq-btn-g:hover{background:#e8c96a;box-shadow:0 5px 24px rgba(201,168,76,.35);color:#050c1a}
        .fq-btn-o{border:1px solid rgba(201,168,76,.3);color:#9db0c8;padding:13px 24px;border-radius:7px;font-weight:500;font-size:13px;text-decoration:none;transition:.2s}
        .fq-btn-o:hover{border-color:#c9a84c;color:#c9a84c}

        @media(max-width:768px){.fq-w{padding:0 20px}.fq-tabs{flex-direction:column}.fq-tab{border-right:none;border-bottom:1px solid rgba(201,168,76,.12)}.fq-tab:last-child{border-bottom:none}.fq-cta{padding:28px 20px}.fq-sec{padding:48px 0 60px}}
      `}</style>

      <div className="fq">
        <Header />

        <section className="fq-hero">
          <div className="fq-w">
            <div className="fq-badge">FAQ — {categories.reduce((a,c)=>a+c.questions.length,0)} questions</div>
            <h1 className="fq-h1">Questions <span className="g">fréquentes</span></h1>
            <p className="fq-sub">Tout ce que vous devez savoir sur le Score ACF® et la gouvernance agentique.</p>
          </div>
        </section>

        <section className="fq-sec">
          <div className="fq-w">
            <div className="fq-tabs">
              {categories.map(c => (
                <button key={c.id} className={`fq-tab${activeTab===c.id?' on':''}`} onClick={()=>setActiveTab(c.id)}>
                  {c.label}
                  <span className="fq-count">{c.questions.length}</span>
                </button>
              ))}
            </div>

            {categories.filter(c=>c.id===activeTab).map(cat => (
              <div key={cat.id} className="fq-group">
                <div className="fq-group-title">{cat.label} — {cat.questions.length} questions</div>
                <div className="fq-items">
                  {cat.questions.map((faq,i) => <Accordion key={i} q={faq.q} a={faq.a}/>)}
                </div>
              </div>
            ))}

            <div className="fq-cta">
              <div className="fq-cta-title">Une question sans réponse ?</div>
              <p className="fq-cta-sub">Notre équipe répond sous 24h ouvrées.</p>
              <div className="fq-cta-row">
                <Link href="/contact" className="fq-btn-g">Contacter l'équipe →</Link>
                <Link href="/calculator" className="fq-btn-o">Calculer mon score</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
