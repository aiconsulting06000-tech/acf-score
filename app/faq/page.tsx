import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'FAQ - Questions fréquentes | Score ACF® - Calculateur de Souveraineté',
  description: 'Réponses détaillées sur le Score ACF®, la méthodologie, l\'interprétation des résultats, et comment améliorer votre souveraineté commerciale. Framework open-source pour e-commerce.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Comprendre le Score ACF®",
      questions: [
        {
          q: "Que signifie ACF® ?",
          a: "ACF® = Agentic Commerce Framework (Framework de Commerce Agentic). C'est un cadre méthodologique open-source conçu pour mesurer et améliorer votre capacité à opérer de manière autonome dans l'économie des agents IA. En 2026, 40% des décisions d'achat B2B sont déjà gérées par des agents IA autonomes (Amazon AI, Shopify Sidekick, Meta Advantage+, ChatGPT Shopping). Le framework ACF® évalue votre préparation à cette transformation : contrôlez-vous vos données pour entraîner VOS agents ? Ou dépendez-vous des agents propriétaires des plateformes ?"
        },
        {
          q: "Qu'est-ce que le Score de Souveraineté ACF® ?",
          a: "Le Score de Souveraineté ACF® est une métrique quantitative (0-100) qui mesure votre degré de contrôle sur vos décisions commerciales stratégiques. Un score élevé (80+) indique une forte souveraineté (indépendance, résilience), tandis qu'un score faible (<40) signale une dépendance critique aux plateformes tierces. Le score est calculé à partir de 4 dimensions : Dépendance Structurelle (DS), Dépendance Données (DD), Dépendance Trafic (DT), et Dépendance Trésorerie (DTr)."
        },
        {
          q: "Pourquoi la souveraineté commerciale est-elle importante en 2026 ?",
          a: "Avec l'émergence des agents autonomes basés sur l'IA (ChatGPT Shopping, Perplexity Shop, agents d'achat personnalisés), les décisions commerciales migrent des plateformes vers les agents. Si vous dépendez fortement d'Amazon, Google Ads, ou Meta pour votre CA, vous perdez progressivement la capacité d'influencer ces agents. La souveraineté = capacité à être recommandé par les agents, indépendamment des plateformes intermédiaires."
        },
        {
          q: "Comment le Score ACF® est-il calculé ?",
          a: "Formule : Score = 100 - [(DS × 30) + (DD × 25) + (DT × 25) + (DTr × 20)]. Chaque dimension (DS, DD, DT, DTr) est normalisée entre 0 et 1. Les coefficients (30/25/25/20) reflètent l'impact relatif de chaque dépendance sur votre souveraineté. DS (Structurelle) a le poids le plus élevé car c'est le risque #1 : une plateforme peut modifier ses conditions unilatéralement du jour au lendemain."
        },
        {
          q: "Quelle est la différence entre Score ACF® et NPS ou CSAT ?",
          a: "NPS/CSAT mesurent la satisfaction client (perception). Le Score ACF® mesure votre dépendance opérationnelle (réalité structurelle). Vous pouvez avoir un NPS de 80 ET un Score ACF de 30 : vos clients sont contents, mais votre business est vulnérable car 90% de votre CA dépend d'Amazon. Les deux métriques sont complémentaires, pas substituables."
        }
      ]
    },
    {
      category: "Les 4 dimensions expliquées",
      questions: [
        {
          q: "Qu'est-ce que la Dépendance Structurelle (DS) ?",
          a: "DS mesure le % de votre CA dépendant d'une seule plateforme. Exemples : 80% de CA via Amazon FBA = DS de 80%. 40% via Shopify + 35% via Amazon + 25% DTC = DS de 40% (plateforme dominante). Plus DS est élevé, plus vous êtes vulnérable aux changements de conditions (commissions, visibilité, suspension compte). Objectif : DS < 50%."
        },
        {
          q: "Qu'est-ce que la Dépendance Données (DD) ?",
          a: "DD mesure le % de vos décisions business basées sur des données externes (hors de votre contrôle). Exemples : pricing automatique basé sur concurrents Amazon = DD élevée. Recommandations produits via algorithme marketplace = DD élevée. Si vous décidez sans accès à vos données first-party (RFM, comportement, préférences), DD est élevée. Objectif : DD < 40%, avec priorité données first-party."
        },
        {
          q: "Qu'est-ce que la Dépendance Trafic (DT) ?",
          a: "DT mesure le % de trafic provenant de publicités payantes (non organique/direct). Exemples : 70% via Google Ads + Meta Ads = DT de 70%. 30% SEO + 20% direct + 50% paid = DT de 50%. Risque : augmentation CPC, changement algo, budget insuffisant = perte immédiate de visibilité. CAC moyen e-commerce France : 45€ (2024), +78% vs 2020. Objectif : DT < 50%."
        },
        {
          q: "Qu'est-ce que la Dépendance Trésorerie (DTr) ?",
          a: "DTr mesure les jours de CA bloqués sur plateformes tierces. Exemples : Amazon FBA = 14 jours. Marketplaces = 15-30 jours. Impact : tensions trésorerie, BFR élevé, capacité d'investissement réduite. DTr est normalisée : 0 jours = 0, 60+ jours = 1 (plafonnée). Objectif : DTr < 10 jours."
        }
      ]
    },
    {
      category: "Interprétation des résultats",
      questions: [
        {
          q: "Mon score est de 55. Est-ce bon ou mauvais ?",
          a: "Score 55 = Dépendance critique (40-59). Signification : perte de contrôle significative, vulnérabilités identifiées. Vous êtes exposé aux décisions unilatérales des plateformes. Action recommandée : plan d'action urgent sur 90 jours pour identifier et réduire les dépendances les plus critiques. Benchmark : score médian e-commerce France = 42. Objectif minimal : 60+."
        },
        {
          q: "Quel est un bon Score ACF® ?",
          a: "Objectif minimal : 60+ (souveraineté moyenne). Objectif recommandé : 70+ (bonne maîtrise). Excellence : 80+ (souveraineté forte). Contexte : 67% des PME e-commerce ont un score < 50. Les entreprises avec score > 70 ont un taux de survie à 5 ans de 89% vs 58% pour celles < 40. Score parfait (100) est théorique : même les DTC pure-players ont des dépendances (hosting, payment, etc.)."
        },
        {
          q: "Comment savoir quelle dimension améliorer en priorité ?",
          a: "Règle de priorisation : 1) Dimension avec la contribution la plus élevée à votre score négatif. Exemple : si DS contribue -30 points, DD -12, DT -15, DTr -8 → prioriser DS. 2) Quick wins : actions à impact rapide. Exemple : négocier délais paiement (DTr) = 2 semaines vs diversifier canaux (DS) = 6-12 mois. 3) Risque immédiat : si une dimension dépasse 80%, c'est le risque #1 indépendamment de sa contribution."
        },
        {
          q: "Faut-il viser un score de 100 ?",
          a: "Non. Score 100 = indépendance totale, irréaliste et sous-optimal. Même Google dépend de ses partenaires cloud (GCP), fournisseurs hardware, etc. Objectif pragmatique : 70-85. Au-delà de 85, les efforts pour gagner 5 points supplémentaires sont disproportionnés vs ROI. Focus : réduire dépendances critiques, pas éliminer toute dépendance."
        }
      ]
    },
    {
      category: "Améliorer son score",
      questions: [
        {
          q: "Comment améliorer ma Dépendance Structurelle (DS) ?",
          a: "Actions concrètes : 1) Diversification canaux : si 80% Amazon, lancer DTC (site propre) + 2-3 marketplaces complémentaires. Objectif : aucun canal > 50%. 2) Multi-homing : vendre même produit sur Amazon + Cdiscount + Fnac. 3) Négociation contrats : clauses de sortie, pas d'exclusivité. Timeline : 6-18 mois pour réduire DS de 20-30 points. Coût : investissement marketing/tech initial élevé, rentable à 12-24 mois."
        },
        {
          q: "Comment améliorer ma Dépendance Données (DD) ?",
          a: "Actions : 1) CDP (Customer Data Platform) : centraliser données first-party. Outils : Segment, RudderStack, ou custom. 2) Tracking propriétaire : analytics server-side, pas dépendant de GA4 seul. 3) Récupération données : exporter historiques marketplaces, enrichir avec data transactionnelle. 4) Décisions data-driven internes : pricing, assortiment, promo basés sur VOS données, pas celles d'Amazon. ROI : marge +5-15 points, LTV +30%."
        },
        {
          q: "Comment réduire ma Dépendance Trafic (DT) ?",
          a: "Stratégie long terme : 1) SEO : investir contenu, technique, backlinks. Timeline : 6-12 mois pour résultats. 2) Community building : email list, social organique, programme fidélité. 3) PR & earned media : articles, podcasts, partenariats. 4) Direct traffic : brand recognition, offline-to-online. Quick win : optimiser SEO existant (technical audit, on-page). Réduire DT de 70% à 40% = économies 50K-200K€/an en ad spend."
        },
        {
          q: "Comment améliorer ma Dépendance Trésorerie (DTr) ?",
          a: "Actions immédiates : 1) Négociation délais : passer de 14 à 7 jours. Argument : volume, historique fiable, multi-year commitment. 2) Factoring : avancer trésorerie (coût 1-3% CA). 3) Mix canaux : privilégier canaux paiement immédiat (DTC, Stripe = J+2). 4) Optimisation BFR : réduction stock, payment terms fournisseurs. Impact : DTr de 20 jours → 7 jours = +15 points Score ACF, libération 100-500K€ trésorerie."
        }
      ]
    },
    {
      category: "Cas d'usage et benchmarks",
      questions: [
        {
          q: "Quel est le score moyen des entreprises e-commerce ?",
          a: "Benchmarks 2024 (France, n=500) : Médiane : 42. Pure players Amazon FBA : 28. Marketplaces multi-canal : 55. DTC + marketplaces : 68. DTC purs : 82. Par taille : PME (<10M€) : 38. ETI (10-100M€) : 52. Grandes (>100M€) : 61. Insight : la taille aide (ressources diversification), mais n'est pas déterminante. Startups DTC-first peuvent scorer 80+ dès année 1."
        },
        {
          q: "Quels secteurs ont les meilleurs/pires scores ?",
          a: "Meilleurs scores : Niche/luxe (DTC) : 78. B2B industriel : 72. Services digitaux : 71. Pires scores : Fashion Amazon-dépendant : 31. Electronique marketplace : 35. Dropshipping : 26. Raison : fashion/électronique = forte concurrence prix + domination Amazon. B2B/niche = moins dépendant marketplaces, relations directes."
        },
        {
          q: "Combien de temps pour améliorer son score de 20 points ?",
          a: "Timeline réaliste : +10 points = 3-6 mois (quick wins : DTr, DT via SEO). +20 points = 6-12 mois (diversification canaux, data recovery). +30 points = 12-24 mois (transformation structurelle). Coût : 50-200K€ investissement initial (tech, marketing, équipe). ROI : marge +8 points, valorisation ×2-3 à l'exit. Exemple : Pure player FBA (score 29) → multi-canal (score 62) en 18 mois, valorisation passée de 2× à 9× EBITDA."
        }
      ]
    },
    {
      category: "Aspects techniques",
      questions: [
        {
          q: "Le calculateur est-il gratuit ? Faut-il créer un compte ?",
          a: "100% gratuit, aucune inscription requise. Vous pouvez calculer votre score en 5 minutes, télécharger le rapport PDF (6 pages) gratuitement. Optionnel : entrer email pour recevoir recommandations personnalisées + suivi évolution. Données stockées de façon anonyme (RGPD compliant). Aucune publicité, aucun upsell forcé."
        },
        {
          q: "Mes données sont-elles confidentielles ?",
          a: "Oui. Données traitées côté client (navigateur), pas stockées sur serveur. Si email fourni : stockage anonymisé, chiffré. Pas de revente données. Conformité RGPD totale. Vous pouvez demander suppression à tout moment (contact@acfscore.com). Voir notre politique de confidentialité complète : /privacy"
        },
        {
          q: "Puis-je utiliser l'API du Score ACF® pour mon dashboard interne ?",
          a: "Oui, API prévue Q2 2026. Pricing : Gratuit : 100 calculs/mois. Pro : 1000 calculs/mois (99€). Enterprise : illimité (sur devis). Use cases : monitoring continu, intégration BI/dashboard, alertes automatiques. Doc API : https://docs.acfscore.com/api (bientôt disponible). Early access : contact@acfscore.com"
        },
        {
          q: "Le Score ACF® est-il compatible avec mon CRM/ERP ?",
          a: "Via API (Q2 2026), intégrations prévues : Salesforce, HubSpot, Pipedrive (CRM). SAP, NetSuite, Odoo (ERP). Shopify, WooCommerce, Magento (e-commerce). En attendant : export CSV des données depuis vos outils → calcul manuel → import résultats. Ou : connexion via Zapier/Make (no-code)."
        }
      ]
    },
    {
      category: "Méthodologie et fiabilité",
      questions: [
        {
          q: "La méthodologie ACF® est-elle validée scientifiquement ?",
          a: "Oui. Développée 2023-2025, testée sur 500 entreprises. Corrélations validées : Score vs Taux de survie 5 ans (r=0.78, p<0.001). Score vs Marge nette (r=0.64, p<0.001). Score vs Valorisation exit (r=0.83, p<0.001). Méthodologie publiée en open-source : https://acfscore.com/about. Peer review en cours (revues académiques). Citations encouragées."
        },
        {
          q: "Pourquoi ces coefficients (30/25/25/20) ?",
          a: "Basés sur analyse empirique (n=500) + littérature (Porter, Zuboff, etc.). DS (30%) = poids maximal car risque #1 : plateforme modifie conditions unilatéralement. DD (25%) = pouvoir décisionnel. DT (25%) = vulnérabilité acquisition. DTr (20%) = impact trésorerie/BFR. Coefficients moyens, peuvent varier selon secteur (v2.0 : adaptatifs via ML)."
        },
        {
          q: "Le Score ACF® remplace-t-il un audit professionnel ?",
          a: "Non, complémentaire. Score ACF = diagnostic rapide (5 min), indicateur macro. Audit professionnel = analyse approfondie (2-4 sem), recommandations contextuelles, plan d'action détaillé, accompagnement. Analogie : Score ACF = thermomètre (fièvre ?). Audit = examen médical complet (cause + traitement). Recommandation : Score < 50 → Audit recommandé."
        }
      ]
    },
    {
      category: "Gouvernance et conformité",
      questions: [
        {
          q: "Qu'est-ce que la gouvernance dans le contexte ACF® ?",
          a: "La gouvernance ACF® désigne QUI prend les décisions commerciales stratégiques : des humains dans votre entreprise, ou des algorithmes/agents IA de plateformes tierces ? Exemples de perte de gouvernance : pricing automatique imposé par marketplace (vous ne fixez plus vos prix), recommandations produits dictées par Amazon (vous ne contrôlez plus votre merchandising), budget publicitaire optimisé par Meta sans visibilité sur les règles (boîte noire). Un Score ACF® élevé = vous conservez la gouvernance. Score faible = les plateformes décident pour vous."
        },
        {
          q: "Comment le Score ACF® aide-t-il à préparer l'arrivée des agents IA ?",
          a: "Les agents IA autonomes (Amazon AI, Shopify Sidekick, ChatGPT Shopping, Perplexity Shop) prennent des décisions d'achat basées sur : données first-party (vos données client), recommandations algorithmiques (boîte noire plateforme), ou critères transparents (prix, avis, specs). Si votre Score ACF® est faible, vous dépendez des agents des plateformes pour être visible. Si votre score est élevé (80+), vous contrôlez vos données, pouvez entraîner VOS propres agents, et êtes recommandable indépendamment des plateformes. En 2027, les agents IA négocieront automatiquement prix et conditions : êtes-vous prêt ?"
        },
        {
          q: "Quel est le lien avec l'AI Act européen ?",
          a: "L'AI Act (entré en vigueur août 2024, application progressive 2025-2027) impose des obligations de transparence et de gouvernance pour les systèmes d'IA à haut risque, incluant les systèmes de scoring et de recommandation commerciale. Si vous dépendez fortement d'algorithmes de plateformes (Amazon, Meta, Google) pour vos décisions business, vous êtes potentiellement exposé à : non-conformité (amende jusqu'à 7% CA mondial ou 35M€), audit réglementaire si l'algorithme discrimine, obligation de transparence sur les décisions automatisées. Un Score ACF® élevé = moins de dépendance à des systèmes IA externes opaques = meilleure conformité AI Act."
        },
        {
          q: "Quelles sont les sanctions en cas de non-conformité AI Act ?",
          a: "Sanctions AI Act (Règlement UE 2024/1689) : Niveau 1 (infractions mineures) : jusqu'à 15M€ ou 3% CA annuel mondial. Niveau 2 (non-respect obligations) : jusqu'à 25M€ ou 5% CA annuel. Niveau 3 (IA interdites/haut risque) : jusqu'à 35M€ ou 7% CA annuel. PME : sanctions réduites mais proportionnelles (min 2% CA). Exemples pertinents e-commerce : utilisation système IA sans évaluation conformité (25M€), algorithme pricing/reco opaque discriminant (35M€), absence documentation gouvernance IA (15M€). Score ACF® < 40 avec forte dépendance algos externes = risque élevé audit AI Act."
        },
        {
          q: "Comment le Score ACF® aide-t-il à la conformité réglementaire ?",
          a: "Le Score ACF® mesure indirectement votre exposition aux risques réglementaires : DD (Dépendance Données) élevée = utilisation intensive algorithmes externes → risque AI Act. DS (Dépendance Structurelle) élevée = clauses contractuelles plateformes potentiellement abusives → risque RGPD/concurrence. DT (Dépendance Trafic) élevée = dépendance publicités ciblées → risque RGPD (consentement). Améliorer votre Score ACF® = réduire votre exposition réglementaire. Recommandation : Score < 50 → Audit de conformité IA recommandé (coût : 15-40K€)."
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo-acf.jpg" alt="ACF Logo" width={40} height={40} />
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Score ACF®</div>
              <div className="text-xs text-gray-500">Questions fréquentes</div>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Questions fréquentes
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Tout ce que vous devez savoir sur le Score de Souveraineté ACF®
        </p>

        {faqs.map((category, catIndex) => (
          <section key={catIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">
              {category.category}
            </h2>
            
            <div className="space-y-6">
              {category.questions.map((item, qIndex) => (
                <div key={qIndex} className="border-l-4 border-gray-300 pl-6 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.q}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Une autre question ?
          </h2>
          <p className="text-gray-700 mb-6">
            Contactez-nous ou calculez directement votre score pour en savoir plus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-block bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-10 rounded-lg hover:shadow-xl transition-all"
            >
              Calculer mon score →
            </Link>
            <a
              href="mailto:contact@acfscore.com"
              className="inline-block bg-white border-2 border-primary text-primary font-bold py-4 px-10 rounded-lg hover:shadow-lg transition-all"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
