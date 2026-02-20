export interface Article {
  slug: string
  titre: string
  description: string
  date: string
  dateISO: string
  categorie: string
  image: string
  imageAlt: string
  tempsLecture: string
  contenu: Section[]
}

export interface Section {
  type: 'intro' | 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'quote' | 'cta' | 'encadre'
  texte?: string
  items?: string[]
  auteur?: string
  titre?: string
}

export const articles: Article[] = [
  // ─────────────────────────────────────────────
  // ARTICLE 1
  // ─────────────────────────────────────────────
  {
    slug: 'economie-agents-ia-2026',
    titre: "L'économie des agents IA : ce qui change pour votre entreprise en 2026",
    description: "Les agents IA autonomes transforment le commerce. Découvrez comment vous préparer à cette révolution et maintenir votre souveraineté.",
    date: "15 février 2026",
    dateISO: "2026-02-15",
    categorie: "Tendances",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Intelligence artificielle et agents autonomes",
    tempsLecture: "8 min",
    contenu: [
      {
        type: 'intro',
        texte: "En 2026, l'économie des agents IA n'est plus une projection futuriste : c'est le quotidien de milliers d'entreprises. Des agents autonomes négocient des contrats, gèrent des stocks, répondent aux clients et optimisent des campagnes marketing sans intervention humaine. Cette transformation soulève une question fondamentale : qui décide vraiment dans votre entreprise ?"
      },
      {
        type: 'h2',
        texte: "Qu'est-ce qu'un agent IA autonome ?"
      },
      {
        type: 'p',
        texte: "Un agent IA autonome est un système capable de percevoir son environnement, de prendre des décisions et d'agir pour atteindre des objectifs définis, sans supervision humaine constante. Contrairement aux chatbots ou aux outils d'automatisation classiques, un agent peut enchaîner des actions complexes, appeler d'autres services, s'adapter à des situations imprévues et apprendre de ses erreurs."
      },
      {
        type: 'p',
        texte: "Les exemples concrets abondent déjà : un agent de repricing qui ajuste vos prix en temps réel selon la concurrence, un agent de SAV qui traite 80 % des demandes clients sans escalade humaine, ou encore un agent d'achat qui sélectionne et commande automatiquement chez vos fournisseurs selon vos seuils de stock."
      },
      {
        type: 'h2',
        texte: "Les 5 ruptures majeures de 2026"
      },
      {
        type: 'h3',
        texte: "1. La délégation de décision à grande échelle"
      },
      {
        type: 'p',
        texte: "Pour la première fois dans l'histoire du commerce, des décisions à fort impact économique sont prises sans approbation humaine. Un agent peut dépenser des dizaines de milliers d'euros en publicité, modifier des conditions tarifaires ou rompre une relation fournisseur de manière autonome. La question n'est plus « l'IA peut-elle le faire ? » mais « avons-nous défini ce qu'elle a le droit de faire ? »"
      },
      {
        type: 'h3',
        texte: "2. L'émergence des orchestrateurs multi-agents"
      },
      {
        type: 'p',
        texte: "Les entreprises les plus avancées ne déploient plus un seul agent, mais des écosystèmes où plusieurs agents collaborent. Un agent « chef de projet » peut coordonner un agent rédacteur, un agent SEO et un agent de publication pour produire et diffuser du contenu de manière entièrement automatisée. Cette complexification crée de nouveaux risques de dérive et de perte de contrôle."
      },
      {
        type: 'h3',
        texte: "3. La dépendance aux plateformes tierces"
      },
      {
        type: 'p',
        texte: "La plupart des agents IA reposent sur des API externes : OpenAI, Anthropic, Google, des marketplaces tierces, des outils SaaS. Chaque dépendance est un point de vulnérabilité : une modification de conditions d'utilisation, une panne ou une hausse de tarifs peut paralyser votre chaîne de valeur agentique du jour au lendemain."
      },
      {
        type: 'h3',
        texte: "4. Le brouillage des responsabilités"
      },
      {
        type: 'p',
        texte: "Quand un agent commet une erreur — une campagne mal ciblée qui coûte des milliers d'euros, une réponse client inappropriée — qui est responsable ? Le développeur qui a créé l'agent ? Le manager qui a validé son déploiement ? Le fournisseur de l'IA sous-jacente ? L'absence de cadre de gouvernance clair expose les entreprises à des risques juridiques et réputationnels inédits."
      },
      {
        type: 'h3',
        texte: "5. La compétition agentique"
      },
      {
        type: 'p',
        texte: "Vos concurrents déploient aussi des agents. Sur les marchés où les prix sont négociés en temps réel (e-commerce, publicité programmatique, achat de mots-clés), ce sont désormais des agents qui s'affrontent entre eux. Votre capacité à gouverner efficacement vos agents devient un avantage concurrentiel direct."
      },
      {
        type: 'h2',
        texte: "Ce que cela signifie concrètement pour votre entreprise"
      },
      {
        type: 'ul',
        items: [
          "Vos processus métier doivent être documentés et traduits en politiques de décision compréhensibles par des agents IA",
          "Chaque agent déployé doit avoir un périmètre d'action défini, des limites claires et un mécanisme de supervision humaine",
          "Votre dépendance aux fournisseurs d'IA doit être auditée et des alternatives identifiées pour les fonctions critiques",
          "Vos équipes doivent être formées à travailler avec des agents : comment les piloter, les corriger et les arrêter si nécessaire",
          "Un cadre de gouvernance agentique doit être établi avant que les problèmes n'arrivent, pas après"
        ]
      },
      {
        type: 'quote',
        texte: "Les entreprises qui prospèreront dans l'économie agentique ne seront pas celles qui déploient le plus d'agents, mais celles qui maintiennent la maîtrise de leurs décisions stratégiques.",
        auteur: "Vincent DORANGE, créateur du framework ACF®"
      },
      {
        type: 'h2',
        texte: "Comment évaluer votre maturité agentique ?"
      },
      {
        type: 'p',
        texte: "Le Score ACF® (Agentic Commerce Framework) a été conçu précisément pour répondre à cette question. En évaluant 4 dimensions clés — Gouvernance & Souveraineté, Politique de Décision, Système d'Agents et Supervision — il vous donne une image précise de votre maturité et identifie vos points de fragilité prioritaires."
      },
      {
        type: 'p',
        texte: "Un score en dessous de 40 points signale une dépendance critique à des tiers et une absence de mécanismes de contrôle. Entre 40 et 70, vous êtes dans une zone intermédiaire avec des axes d'amélioration identifiables. Au-delà de 70, vous disposez d'une gouvernance agentique robuste qui vous protège et vous donne un avantage concurrentiel durable."
      },
      {
        type: 'cta',
        texte: "Évaluez votre maturité agentique en 10 minutes"
      },
      {
        type: 'encadre',
        titre: "À retenir",
        texte: "L'économie des agents IA crée de formidables opportunités d'efficacité et de compétitivité. Mais elle crée aussi de nouveaux risques que peu d'entreprises ont anticipés. La gouvernance agentique n'est plus optionnelle : c'est le prérequis pour tirer parti de l'IA sans en subir les dérives."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ARTICLE 2
  // ─────────────────────────────────────────────
  {
    slug: 'ai-act-europeen-conformite',
    titre: "AI Act européen : ce que vous devez savoir pour rester conforme",
    description: "L'AI Act impose de nouvelles obligations sur les systèmes IA à haut risque. Guide pratique pour les entreprises qui utilisent des agents autonomes.",
    date: "10 février 2026",
    dateISO: "2026-02-10",
    categorie: "Réglementation",
    image: "/AI_ACT.jpg",
    imageAlt: "Drapeaux européens - AI Act",
    tempsLecture: "10 min",
    contenu: [
      {
        type: 'intro',
        texte: "Entré en vigueur en août 2024 et s'appliquant progressivement jusqu'en 2026, l'AI Act européen est le premier cadre réglementaire mondial sur l'intelligence artificielle. Pour les entreprises qui utilisent des agents IA autonomes dans leurs opérations commerciales, la mise en conformité n'est plus une option : c'est une obligation légale avec des sanctions pouvant atteindre 35 millions d'euros ou 7 % du chiffre d'affaires mondial."
      },
      {
        type: 'h2',
        texte: "Le principe fondateur : une approche par niveau de risque"
      },
      {
        type: 'p',
        texte: "L'AI Act ne réglemente pas l'IA en bloc : il distingue quatre niveaux de risque, chacun associé à des obligations différentes. Comprendre dans quelle catégorie se situent vos agents est la première étape indispensable."
      },
      {
        type: 'ul',
        items: [
          "Risque inacceptable : IA interdites (manipulation subliminale, scoring social, reconnaissance faciale en temps réel dans les espaces publics)",
          "Risque élevé : obligations strictes (systèmes de recrutement, crédit, infrastructure critique, éducation) — enregistrement obligatoire dans la base de données EU",
          "Risque limité : obligations de transparence (chatbots, deepfakes) — l'utilisateur doit savoir qu'il interagit avec une IA",
          "Risque minimal : aucune obligation spécifique (filtres anti-spam, jeux vidéo, IA de recommandation simple)"
        ]
      },
      {
        type: 'h2',
        texte: "Vos agents IA entrent-ils dans la catégorie 'haut risque' ?"
      },
      {
        type: 'p',
        texte: "La question mérite un examen sérieux. Si votre agent IA influence des décisions ayant un impact significatif sur des personnes — accès à un service, conditions de prix personnalisées, sélection de candidats, gestion des réclamations — il peut être considéré à haut risque."
      },
      {
        type: 'h3',
        texte: "Cas concrets à haut risque"
      },
      {
        type: 'ul',
        items: [
          "Agent de scoring client qui segmente vos prospects et décide qui reçoit une offre premium",
          "Agent RH qui présélectionne des CV ou planifie des entretiens de manière autonome",
          "Agent de crédit ou d'évaluation de solvabilité pour des offres de financement",
          "Agent de tarification dynamique qui adapte les prix selon le profil utilisateur détecté",
          "Agent de modération qui décide de bannir ou restreindre l'accès de comptes"
        ]
      },
      {
        type: 'h2',
        texte: "Les obligations concrètes pour les systèmes à haut risque"
      },
      {
        type: 'h3',
        texte: "1. Documentation technique et gestion des risques"
      },
      {
        type: 'p',
        texte: "Vous devez documenter précisément comment fonctionne votre agent : ses données d'entraînement, ses paramètres de décision, ses limites connues et les risques identifiés. Cette documentation doit être maintenue à jour et disponible pour les autorités de contrôle."
      },
      {
        type: 'h3',
        texte: "2. Traçabilité et journalisation"
      },
      {
        type: 'p',
        texte: "Chaque décision significative d'un agent à haut risque doit être enregistrée avec suffisamment de détail pour permettre une reconstitution a posteriori. Qui a décidé quoi, sur quelle base, à quel moment ? Cette exigence de logs structurés est souvent sous-estimée lors du déploiement d'agents."
      },
      {
        type: 'h3',
        texte: "3. Supervision humaine obligatoire"
      },
      {
        type: 'p',
        texte: "L'un des piliers de l'AI Act est le maintien d'un contrôle humain effectif sur les décisions à fort impact. Cela ne signifie pas qu'un humain doit valider chaque action, mais que des mécanismes permettant d'intervenir, de corriger ou d'arrêter le système doivent exister et être testés régulièrement."
      },
      {
        type: 'h3',
        texte: "4. Tests de robustesse et de précision"
      },
      {
        type: 'p',
        texte: "Vos agents à haut risque doivent être testés pour démontrer leur précision, leur robustesse face à des données inattendues et leur résistance aux tentatives de manipulation. Ces tests doivent être documentés et renouvelés lors de chaque mise à jour significative."
      },
      {
        type: 'h3',
        texte: "5. Transparence envers les utilisateurs"
      },
      {
        type: 'p',
        texte: "Les personnes affectées par des décisions automatisées doivent en être informées et, pour les décisions significatives, avoir le droit de demander une révision humaine. Cette exigence s'articule avec les droits existants du RGPD."
      },
      {
        type: 'h2',
        texte: "Le calendrier d'application"
      },
      {
        type: 'ul',
        items: [
          "Août 2024 : Entrée en vigueur — interdiction des IA à risque inacceptable",
          "Août 2025 : Application aux modèles d'IA à usage général (GPAI), dont les grands modèles de langage",
          "Août 2026 : Application complète aux systèmes à haut risque — échéance critique pour votre mise en conformité",
          "2027 : Extension aux systèmes IA embarqués dans des produits réglementés (dispositifs médicaux, équipements industriels)"
        ]
      },
      {
        type: 'quote',
        texte: "La conformité à l'AI Act n'est pas un frein à l'innovation : c'est le cadre qui rend l'innovation durable et crédible aux yeux de vos clients et partenaires.",
        auteur: "Vincent DORANGE, AI CONSULTING"
      },
      {
        type: 'h2',
        texte: "Par où commencer votre mise en conformité ?"
      },
      {
        type: 'ol',
        items: [
          "Inventoriez tous les systèmes IA utilisés dans votre entreprise, y compris les outils tiers qui intègrent de l'IA",
          "Classifiez-les selon les niveaux de risque de l'AI Act avec l'aide d'un expert si nécessaire",
          "Pour les systèmes à haut risque, engagez une démarche de documentation et de mise en place de la supervision humaine",
          "Nommez un responsable de la conformité IA dans votre organisation",
          "Évaluez votre gouvernance agentique globale avec le Score ACF® pour identifier vos lacunes prioritaires"
        ]
      },
      {
        type: 'encadre',
        titre: "Sanctions prévues",
        texte: "Les violations des obligations pour les systèmes à haut risque exposent à des amendes allant jusqu'à 15 millions d'euros ou 3 % du chiffre d'affaires mondial (le plus élevé des deux). Pour les violations les plus graves (utilisation d'IA interdites), les amendes montent à 35 millions d'euros ou 7 % du CA."
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ARTICLE 3
  // ─────────────────────────────────────────────
  {
    slug: 'calculer-score-souverainete-acf',
    titre: "Comment calculer votre Score de Souveraineté ACF® ?",
    description: "Méthodologie détaillée pour mesurer votre indépendance vis-à-vis des plateformes tierces et reprendre le contrôle de votre destin commercial.",
    date: "5 février 2026",
    dateISO: "2026-02-05",
    categorie: "Méthodologie",
    image: "/FRAMEWORK.jpg",
    imageAlt: "Calculateur Score ACF®",
    tempsLecture: "12 min",
    contenu: [
      {
        type: 'intro',
        texte: "Le Score ACF® (Agentic Commerce Framework) est un outil de diagnostic qui mesure la souveraineté opérationnelle d'une entreprise dans l'économie des agents IA. Contrairement aux évaluations de maturité digitale classiques, il se concentre spécifiquement sur votre capacité à contrôler vos agents, à maintenir votre indépendance vis-à-vis des plateformes tierces et à gérer les risques liés à l'autonomie algorithmique."
      },
      {
        type: 'h2',
        texte: "Pourquoi mesurer la souveraineté plutôt que la performance ?"
      },
      {
        type: 'p',
        texte: "La plupart des indicateurs de performance IA mesurent l'efficacité : taux de conversion, temps de traitement, coût par acquisition. Ces métriques sont précieuses, mais elles ne disent rien sur votre vulnérabilité. Une entreprise peut avoir des agents très performants aujourd'hui et être complètement déstabilisée demain par un changement de politique d'un fournisseur clé."
      },
      {
        type: 'p',
        texte: "La souveraineté mesure autre chose : votre capacité à rester maître de vos décisions stratégiques même si votre environnement technologique ou réglementaire change. C'est un indicateur de résilience à long terme."
      },
      {
        type: 'h2',
        texte: "Les 4 dimensions du Score ACF®"
      },
      {
        type: 'h3',
        texte: "Dimension 1 : Gouvernance & Souveraineté (25 points)"
      },
      {
        type: 'p',
        texte: "Cette dimension évalue votre capacité à définir et à faire respecter des règles de gouvernance pour vos agents. Elle mesure l'existence de politiques claires sur ce que vos agents peuvent et ne peuvent pas décider, votre niveau de dépendance aux plateformes tierces et votre capacité à substituer un fournisseur sans rupture opérationnelle."
      },
      {
        type: 'ul',
        items: [
          "Existence d'une charte de gouvernance agentique formalisée",
          "Pourcentage de décisions commerciales critiques sous contrôle agent sans validation humaine",
          "Nombre de fournisseurs IA sans alternative identifiée",
          "Délai estimé pour migrer vers un fournisseur alternatif en cas de besoin",
          "Propriété et portabilité de vos données d'entraînement"
        ]
      },
      {
        type: 'h3',
        texte: "Dimension 2 : Politique de Décision (25 points)"
      },
      {
        type: 'p',
        texte: "Cette dimension évalue la clarté et la rigueur des règles qui définissent le comportement de vos agents. Des agents efficaces mais dont les règles de décision sont floues ou non documentées représentent un risque élevé. On mesure ici la précision avec laquelle vous avez traduit votre stratégie commerciale en paramètres compréhensibles par des systèmes IA."
      },
      {
        type: 'ul',
        items: [
          "Documentation des politiques de pricing automatisé et de leurs limites",
          "Existence de règles éthiques encodées (non-discrimination, limites de personnalisation)",
          "Processus de révision et de mise à jour des politiques de décision",
          "Traçabilité des modifications de paramètres et de leurs impacts",
          "Gestion des cas d'exception et des situations hors périmètre"
        ]
      },
      {
        type: 'h3',
        texte: "Dimension 3 : Système d'Agents (25 points)"
      },
      {
        type: 'p',
        texte: "Cette dimension évalue la maturité technique de votre écosystème d'agents. Elle va au-delà du simple déploiement pour mesurer l'architecture, la résilience et la sécurité de vos agents en production. Un agent performant en conditions normales peut être catastrophiquement fragile face à des données aberrantes ou à des tentatives de manipulation."
      },
      {
        type: 'ul',
        items: [
          "Architecture multi-agents et gestion des interactions entre agents",
          "Mécanismes de détection d'anomalies et d'alertes automatiques",
          "Tests de robustesse réguliers (simulations de pannes, données adversariales)",
          "Gestion des accès et sécurité des clés API et credentials",
          "Capacité à auditer les décisions passées (logs structurés, durée de rétention)"
        ]
      },
      {
        type: 'h3',
        texte: "Dimension 4 : Supervision Humaine (25 points)"
      },
      {
        type: 'p',
        texte: "Cette dimension est souvent la plus négligée. Elle évalue votre capacité effective à superviser, corriger et si nécessaire arrêter vos agents. Le paradoxe de l'automatisation est que plus les agents sont efficaces, moins les humains ont de pratique pour intervenir en cas de problème. La supervision doit être organisée et testée régulièrement."
      },
      {
        type: 'ul',
        items: [
          "Existence de tableaux de bord de supervision en temps réel",
          "Procédures documentées pour l'escalade et l'intervention humaine",
          "Kill switch opérationnel et testé régulièrement",
          "Formation des équipes à l'intervention sur les agents en production",
          "Révisions périodiques des décisions automatisées (audits aléatoires)"
        ]
      },
      {
        type: 'h2',
        texte: "Comment interpréter votre score ?"
      },
      {
        type: 'ul',
        items: [
          "0-30 points : Zone critique — dépendances excessives et absence de contrôle. Risque opérationnel et réglementaire élevé",
          "31-50 points : Zone de vigilance — des bases existent mais des lacunes importantes subsistent sur 1 ou plusieurs dimensions",
          "51-70 points : Zone intermédiaire — bonne maturité générale avec des axes d'amélioration identifiés et priorisables",
          "71-85 points : Zone avancée — gouvernance robuste, quelques optimisations à apporter pour atteindre l'excellence",
          "86-100 points : Zone d'excellence — modèle de référence avec une souveraineté agentique complète"
        ]
      },
      {
        type: 'quote',
        texte: "Le Score ACF® n'est pas un examen qu'on passe ou qu'on rate. C'est une boussole qui vous indique dans quelle direction vous devez progresser pour rester souverain dans l'économie des agents.",
        auteur: "Vincent DORANGE, créateur du framework ACF®"
      },
      {
        type: 'h2',
        texte: "La méthode de calcul pas à pas"
      },
      {
        type: 'ol',
        items: [
          "Répondez aux 20 questions du calculateur ACF® (environ 10 minutes)",
          "Chaque question est pondérée selon son impact sur votre souveraineté réelle",
          "Votre score par dimension est calculé automatiquement",
          "Un rapport personnalisé identifie vos 3 priorités d'amélioration les plus impactantes",
          "Une estimation du gain de points atteignable à 6 mois vous est fournie"
        ]
      },
      {
        type: 'cta',
        texte: "Calculer mon Score ACF® maintenant"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ARTICLE 4
  // ─────────────────────────────────────────────
  {
    slug: '4-couches-gouvernance-agentique',
    titre: "Les 4 couches de gouvernance agentique expliquées",
    description: "Gouvernance & Souveraineté, Politique de Décision, Système d'Agents, Supervision : décryptage du framework ACF® couche par couche.",
    date: "1er février 2026",
    dateISO: "2026-02-01",
    categorie: "Framework",
    image: "/DATA.png",
    imageAlt: "Architecture en couches et gouvernance",
    tempsLecture: "9 min",
    contenu: [
      {
        type: 'intro',
        texte: "Le framework ACF® repose sur un modèle en 4 couches interdépendantes, inspiré des architectures de sécurité informatique mais appliqué à la gouvernance des agents IA. Chaque couche remplit une fonction spécifique et s'appuie sur la solidité des couches inférieures. Comprendre ce modèle, c'est comprendre comment construire une gouvernance agentique à la fois rigoureuse et opérationnelle."
      },
      {
        type: 'h2',
        texte: "La logique des couches : du stratégique à l'opérationnel"
      },
      {
        type: 'p',
        texte: "Le modèle ACF® emprunte à la pensée militaire et à l'architecture logicielle un principe fondamental : les décisions les plus importantes doivent être prises au niveau le plus élevé, et les couches inférieures n'ont d'autonomie que dans le périmètre défini par les couches supérieures. Un agent ne peut pas décider ce que la politique de décision n'autorise pas. La politique de décision ne peut pas outrepasser la gouvernance. Et la supervision surveille que tout cela est respecté."
      },
      {
        type: 'h2',
        texte: "Couche 1 : Gouvernance & Souveraineté"
      },
      {
        type: 'p',
        texte: "C'est la couche fondatrice, celle où se définissent les règles du jeu. La gouvernance agentique répond à une question essentielle : qui a le droit de décider quoi dans votre organisation, et dans quelle mesure peut-on déléguer cette décision à un agent ?"
      },
      {
        type: 'p',
        texte: "La souveraineté, quant à elle, concerne votre indépendance vis-à-vis des plateformes et fournisseurs externes. Une entreprise souveraine peut changer de fournisseur d'IA sans que ses opérations s'effondrent. Elle possède ses données, comprend ses algorithmes et n'est pas captive d'un écosystème propriétaire."
      },
      {
        type: 'ul',
        items: [
          "Définir la liste des décisions qui ne peuvent jamais être automatisées (réservées à des humains)",
          "Cartographier toutes les dépendances technologiques et identifier des alternatives pour les critiques",
          "Établir la charte éthique qui s'impose à tous les agents de l'organisation",
          "Définir les seuils au-delà desquels un agent doit obligatoirement escalader vers un humain",
          "Garantir la portabilité et la propriété des données utilisées par les agents"
        ]
      },
      {
        type: 'h2',
        texte: "Couche 2 : Politique de Décision"
      },
      {
        type: 'p',
        texte: "Si la gouvernance définit les règles générales, la politique de décision les traduit en instructions précises pour chaque agent. C'est le niveau où votre stratégie commerciale devient algorithme. C'est aussi le niveau le plus technique et souvent le moins formalisé dans les entreprises qui déploient des agents sans méthode."
      },
      {
        type: 'p',
        texte: "Une bonne politique de décision ne se contente pas de dire « l'agent peut ajuster les prix ». Elle précise : dans quelle fourchette, selon quels critères, avec quelle fréquence maximale, en excluant quels segments de clients, et avec quel mécanisme de rollback si les résultats sont aberrants."
      },
      {
        type: 'ul',
        items: [
          "Règles de pricing : bornes min/max, critères d'ajustement, exclusions",
          "Règles de communication : ton autorisé, sujets interdits, escalade obligatoire",
          "Règles d'achat et de dépense : plafonds, fournisseurs approuvés, conditions",
          "Règles de segmentation : critères autorisés, critères interdits (âge, genre, origine...)",
          "Gestion des exceptions : que fait l'agent face à une situation non prévue ?"
        ]
      },
      {
        type: 'h2',
        texte: "Couche 3 : Système d'Agents"
      },
      {
        type: 'p',
        texte: "C'est la couche technique : l'architecture réelle de vos agents, leurs interactions, leur infrastructure. Un système d'agents bien conçu est modulaire, résilient et observable. Modulaire signifie que chaque agent a un périmètre clairement défini. Résilient signifie qu'une panne d'un agent n'entraîne pas l'effondrement du système. Observable signifie que vous pouvez voir ce que font vos agents en temps réel."
      },
      {
        type: 'p',
        texte: "Dans les organisations avancées, le système d'agents comprend un orchestrateur qui coordonne plusieurs agents spécialisés. Cet orchestrateur est lui-même gouverné par la politique de décision et soumis à la supervision. La complexité de ces architectures multi-agents est l'un des principaux défis de 2026."
      },
      {
        type: 'ul',
        items: [
          "Architecture : agents spécialisés vs agents généralistes, orchestration",
          "Sécurité : gestion des credentials, isolation des environnements, protection contre les injections",
          "Logs et traçabilité : enregistrement structuré de chaque action et décision",
          "Tests : tests unitaires des agents, tests d'intégration, simulations de charge et de stress",
          "Déploiement : versioning des agents, rollback rapide, environnements de staging"
        ]
      },
      {
        type: 'h2',
        texte: "Couche 4 : Supervision Humaine"
      },
      {
        type: 'p',
        texte: "La supervision est la couche qui boucle le système. Elle permet aux humains de rester informés, d'intervenir quand nécessaire et d'améliorer continuellement les autres couches. Sans supervision effective, les 3 premières couches sont des déclarations d'intention sans garantie d'application."
      },
      {
        type: 'p',
        texte: "La supervision ne signifie pas approuver chaque décision — cela annulerait tout le bénéfice de l'automatisation. Elle signifie avoir la visibilité nécessaire pour détecter les dérives, les mécanismes pour intervenir rapidement et les processus pour tirer des leçons de chaque incident."
      },
      {
        type: 'ul',
        items: [
          "Tableaux de bord temps réel : KPIs des agents, alertes d'anomalies, visualisation des décisions",
          "Audits aléatoires : révision périodique d'un échantillon de décisions automatisées",
          "Kill switch : mécanisme d'arrêt d'urgence testé et opérationnel",
          "Post-mortems : analyse structurée de chaque incident ou décision aberrante",
          "Amélioration continue : feedback loop entre supervision et mise à jour des politiques"
        ]
      },
      {
        type: 'quote',
        texte: "Un framework de gouvernance agentique sans supervision effective, c'est comme avoir un code de la route sans forces de l'ordre. Les règles existent sur le papier, mais rien ne garantit qu'elles sont respectées.",
        auteur: "Vincent DORANGE, AI CONSULTING"
      },
      {
        type: 'h2',
        texte: "L'interdépendance des couches : pourquoi on ne peut pas en sauter une"
      },
      {
        type: 'p',
        texte: "La tentation est forte de commencer par la couche 3 (déployer des agents) sans avoir formalisé les couches 1 et 2. C'est la trajectoire la plus commune et la plus risquée. Des agents performants mais non gouvernés créent une illusion de maîtrise qui peut masquer des risques considérables."
      },
      {
        type: 'p',
        texte: "Le Score ACF® mesure précisément la solidité de chaque couche et leurs interactions. Une entreprise avec 20/25 sur la couche technique mais 5/25 sur la gouvernance n'est pas une entreprise avancée : c'est une entreprise avec un potentiel de dérive important."
      },
      {
        type: 'cta',
        texte: "Évaluer la solidité de mes 4 couches"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ARTICLE 5
  // ─────────────────────────────────────────────
  {
    slug: 'cas-pratique-32-78-points-acf',
    titre: "Cas illustratif : De 32 à 78 points ACF® en 6 mois",
    description: "Scénario fictif d'un e-commerçant type qui restructure sa gouvernance agentique et réduit ses dépendances critiques. Les étapes, obstacles et résultats typiques d'une transformation réussie.",
    date: "28 janvier 2026",
    dateISO: "2026-01-28",
    categorie: "Cas client",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Graphique de progression et résultats",
    tempsLecture: "11 min",
    contenu: [
      {
        type: 'intro',
        texte: "Pour illustrer concrètement ce que représente une montée en maturité ACF®, voici le parcours fictif d'un e-commerçant type — appelons-le 'MaisonPlus' — spécialisé dans la décoration haut de gamme avec 4 M€ de CA annuel. Ce scénario synthétise les patterns observés sur plusieurs accompagnements réels et illustre les étapes, les difficultés et les gains typiques d'une transformation sur 6 mois."
      },
      {
        type: 'h2',
        texte: "Le diagnostic initial : un e-commerçant surexposé"
      },
      {
        type: 'p',
        texte: "MaisonPlus était un exemple typique d'entreprise ayant adopté massivement les outils IA sans cadre de gouvernance. En 18 mois, la société avait déployé une dizaine d'agents ou outils automatisés : repricing dynamique, génération de fiches produits, SAV automatisé, campagnes publicitaires pilotées par algorithme et recommandations personnalisées."
      },
      {
        type: 'p',
        texte: "La performance opérationnelle était au rendez-vous : taux de conversion en hausse de 34 %, coût de traitement SAV divisé par 3. Mais le Score ACF® révélait une réalité bien plus fragile."
      },
      {
        type: 'h3',
        texte: "Les scores par dimension au départ"
      },
      {
        type: 'ul',
        items: [
          "Gouvernance & Souveraineté : 6/25 — Pas de charte, 100 % des données chez des tiers, aucune alternative fournisseur identifiée",
          "Politique de Décision : 8/25 — Règles de repricing non documentées, pas de garde-fous éthiques, aucun plafond de dépense publicitaire",
          "Système d'Agents : 11/25 — Agents déployés sans logs structurés, pas de tests réguliers, credentials partagés",
          "Supervision Humaine : 7/25 — Aucun tableau de bord de supervision, pas de kill switch, équipe non formée à l'intervention"
        ]
      },
      {
        type: 'h2',
        texte: "Le plan de transformation : 3 phases sur 6 mois"
      },
      {
        type: 'h3',
        texte: "Phase 1 (mois 1-2) : Mettre le feu sous contrôle"
      },
      {
        type: 'p',
        texte: "La priorité absolue était d'adresser les risques immédiats avant de penser à l'optimisation. MaisonPlus a d'abord documenté tous ses agents et outils automatisés dans un registre centralisé — une simple spreadsheet au départ. Pour chaque agent : qui l'a déployé, quel est son périmètre d'action, quelles décisions peut-il prendre, qui est responsable."
      },
      {
        type: 'p',
        texte: "Ensuite, l'équipe technique a mis en place des plafonds d'urgence sur les agents les plus exposés : le repricing ne peut pas dépasser -30 % ou +20 % du prix catalogue sans validation humaine, et les dépenses publicitaires automatiques sont plafonnées à 500 €/jour par campaign. Simple mais efficace."
      },
      {
        type: 'p',
        texte: "Enfin, un kill switch manuel a été créé pour chaque agent : un bouton dans le dashboard d'administration qui coupe immédiatement l'agent et revient au mode manuel. Testés et documentés pour chaque membre de l'équipe concernée."
      },
      {
        type: 'h3',
        texte: "Phase 2 (mois 3-4) : Formaliser la gouvernance"
      },
      {
        type: 'p',
        texte: "MaisonPlus a rédigé sa première Charte de Gouvernance Agentique — un document de 8 pages qui définit les types de décisions délégables aux agents, les règles éthiques non négociables (pas de discrimination par origine, pas de pricing différencié selon le profil socio-économique détecté), et les processus d'escalade."
      },
      {
        type: 'p',
        texte: "En parallèle, la politique de repricing a été formalisée en 23 règles précises, documentées et versionnées. Chaque modification doit être tracée avec le nom de l'auteur, la date et la justification. Ce travail a pris 3 semaines mais a révélé plusieurs règles contradictoires qui n'avaient jamais été détectées."
      },
      {
        type: 'h3',
        texte: "Phase 3 (mois 5-6) : Construire la résilience long terme"
      },
      {
        type: 'p',
        texte: "La dernière phase a été consacrée à réduire les dépendances critiques. MaisonPlus a identifié 3 fournisseurs pour lesquels aucune alternative n'était prête. Pour chacun, un plan de migration a été préparé (pas forcément exécuté, mais prêt à être déclenché). La portabilité des données a été négociée contractuellement avec le principal fournisseur IA."
      },
      {
        type: 'p',
        texte: "Un tableau de bord de supervision a été développé en interne : 12 KPIs clés des agents, mis à jour en temps réel, avec des seuils d'alerte automatiques. Une réunion hebdomadaire de 30 minutes a été instituée pour réviser les alertes de la semaine et décider des ajustements."
      },
      {
        type: 'h2',
        texte: "Les résultats à 6 mois"
      },
      {
        type: 'h3',
        texte: "Score ACF® : de 32 à 78 points"
      },
      {
        type: 'ul',
        items: [
          "Gouvernance & Souveraineté : 6 → 19/25 (+13 points)",
          "Politique de Décision : 8 → 21/25 (+13 points)",
          "Système d'Agents : 11 → 20/25 (+9 points)",
          "Supervision Humaine : 7 → 18/25 (+11 points)"
        ]
      },
      {
        type: 'h3',
        texte: "Impacts opérationnels concrets"
      },
      {
        type: 'ul',
        items: [
          "Un incident de repricing aberrant détecté et corrigé en 8 minutes grâce au nouveau système d'alerte (avant : l'incident aurait duré des heures sans être détecté)",
          "Migration d'un fournisseur IA réalisée en 4 jours grâce aux plans de migration préparés (coût évité estimé : 35 000 €)",
          "Réduction de 28 % des dépenses publicitaires automatiques sans perte de performance grâce aux plafonds rationalisés",
          "Conformité AI Act avancée : MaisonPlus est en bonne voie pour l'échéance d'août 2026"
        ]
      },
      {
        type: 'quote',
        texte: "On pensait que mettre en place une gouvernance allait ralentir nos agents. En réalité, ça les a rendus plus efficaces parce qu'on a éliminé des règles contradictoires et on a gagné en confiance pour aller plus loin dans l'automatisation.",
        auteur: "Directeur e-commerce, MaisonPlus"
      },
      {
        type: 'h2',
        texte: "Les 3 leçons clés à retenir"
      },
      {
        type: 'ol',
        items: [
          "Commencez par l'urgence : avant toute chose, identifiez vos 3 risques les plus critiques et mettez des garde-fous immédiats, même imparfaits",
          "La documentation n'est pas une bureaucratie : formaliser les règles de vos agents prend du temps mais révèle des incohérences invisibles et crée une base pour progresser",
          "La gouvernance accélère l'innovation : paradoxalement, un cadre clair permet d'aller plus loin dans l'automatisation avec plus de confiance et moins de risques"
        ]
      },
      {
        type: 'cta',
        texte: "Calculer mon score de départ"
      }
    ]
  },

  // ─────────────────────────────────────────────
  // ARTICLE 6
  // ─────────────────────────────────────────────
  {
    slug: 'kill-switch-arret-urgence-agents-ia',
    titre: "Kill switch : Pourquoi et comment implémenter un mécanisme d'arrêt d'urgence",
    description: "Guide technique pour mettre en place un kill switch efficace et le tester régulièrement pour garder le contrôle de vos agents IA.",
    date: "20 janvier 2026",
    dateISO: "2026-01-20",
    categorie: "Technique",
    image: "/KILL.jpg",
    imageAlt: "Bouton d'arrêt d'urgence - Kill switch",
    tempsLecture: "13 min",
    contenu: [
      {
        type: 'intro',
        texte: "Un kill switch est le mécanisme qui permet d'arrêter immédiatement un agent IA en cas de comportement anormal ou de risque. C'est l'équivalent du bouton d'arrêt d'urgence sur une machine industrielle. Pourtant, dans la grande majorité des déploiements d'agents IA que nous auditons, soit le kill switch n'existe pas, soit il existe mais n'a jamais été testé, soit il est documenté mais personne ne sait vraiment comment l'actionner en situation de stress. Ce guide vous explique comment faire mieux."
      },
      {
        type: 'h2',
        texte: "Pourquoi le kill switch est-il indispensable ?"
      },
      {
        type: 'p',
        texte: "Les agents IA peuvent mal se comporter pour des raisons très variées : données d'entrée aberrantes, changement de comportement d'une API externe, tentative d'injection malveillante, bug dans une mise à jour, ou simple dérive progressive des résultats. Dans tous ces cas, la capacité à stopper l'agent rapidement est critique."
      },
      {
        type: 'ul',
        items: [
          "L'AI Act européen l'exige explicitement pour les systèmes à haut risque (Article 9)",
          "Un agent de repricing défaillant peut provoquer des pertes financières importantes en quelques heures",
          "Un agent de communication qui dérive peut causer des dommages réputationnels irréversibles",
          "Sans kill switch, un incident mineur peut devenir catastrophique par amplification autonome",
          "La capacité à prouver que vous pouvez arrêter vos agents est un élément clé de confiance pour vos partenaires et clients"
        ]
      },
      {
        type: 'h2',
        texte: "Les 3 niveaux d'un kill switch efficace"
      },
      {
        type: 'h3',
        texte: "Niveau 1 : L'arrêt d'urgence global"
      },
      {
        type: 'p',
        texte: "C'est le bouton rouge. Il coupe immédiatement tous les agents et revient à un mode manuel complet. Indispensable pour les scénarios catastrophiques, mais brutal : il faut prévoir le mode dégradé (quels processus fonctionnent sans agents ?) et s'assurer que les équipes peuvent opérer sans automatisation le temps de résoudre le problème."
      },
      {
        type: 'p',
        texte: "Techniquement, cela peut être implémenté via une feature flag globale, un circuit breaker au niveau de l'infrastructure, ou simplement la révocation des clés API des agents. L'important est que l'action soit simple (idéalement un clic), rapide (effet en moins de 30 secondes) et connue de toute l'équipe concernée."
      },
      {
        type: 'h3',
        texte: "Niveau 2 : L'arrêt par agent ou par fonction"
      },
      {
        type: 'p',
        texte: "Plus granulaire, ce niveau permet de stopper un agent spécifique sans impacter les autres. Un problème avec l'agent de repricing ne devrait pas couper le SAV automatisé. Cette granularité est particulièrement importante pour les systèmes multi-agents où les interdépendances peuvent être complexes."
      },
      {
        type: 'h3',
        texte: "Niveau 3 : La mise en pause avec fallback"
      },
      {
        type: 'p',
        texte: "Le niveau le plus sophistiqué : l'agent se met en pause, mais une logique de fallback prend le relais automatiquement. Par exemple, si l'agent de repricing est suspendu, les prix reviennent automatiquement aux valeurs du catalogue standard. Ou si le SAV automatisé est arrêté, les demandes sont redirigées vers la file d'attente de support humain avec une notification automatique à l'équipe."
      },
      {
        type: 'h2',
        texte: "Guide d'implémentation étape par étape"
      },
      {
        type: 'h3',
        texte: "Étape 1 : Cartographier vos agents et leurs actions"
      },
      {
        type: 'p',
        texte: "Avant d'implémenter quoi que ce soit, vous devez avoir une liste exhaustive de tous vos agents, de toutes les actions irréversibles qu'ils peuvent effectuer (envoyer un email, passer une commande, modifier un prix, débiter un compte) et des systèmes en aval qui dépendent de chaque agent."
      },
      {
        type: 'h3',
        texte: "Étape 2 : Définir les modes dégradés"
      },
      {
        type: 'p',
        texte: "Pour chaque agent, définissez ce qui se passe quand il est arrêté. Les options sont : revenir au mode manuel complet (quelqu'un prend le relais), revenir à des valeurs par défaut statiques (prix catalogue, réponses standardisées), ou basculer vers un agent de fallback simplifié. Cette réflexion révèle souvent des dépendances non documentées."
      },
      {
        type: 'h3',
        texte: "Étape 3 : Implémenter les mécanismes techniques"
      },
      {
        type: 'p',
        texte: "Concrètement, les options techniques les plus courantes sont les feature flags (un simple booléen en base de données que l'agent vérifie avant chaque action), les circuit breakers (qui coupent automatiquement si un seuil d'erreur est dépassé), les webhooks de contrôle (une API interne que l'agent consulte pour savoir s'il est autorisé à agir), ou simplement la révocation de clés API."
      },
      {
        type: 'h3',
        texte: "Étape 4 : Créer l'interface de contrôle"
      },
      {
        type: 'p',
        texte: "Le kill switch doit être accessible en quelques secondes, y compris depuis un mobile, y compris par quelqu'un qui n'est pas l'auteur du système. Un dashboard d'administration simple avec le statut de chaque agent et des boutons d'arrêt clairs est largement suffisant. L'interface doit demander une confirmation mais pas imposer une authentification longue en situation d'urgence."
      },
      {
        type: 'h3',
        texte: "Étape 5 : Documenter et former"
      },
      {
        type: 'p',
        texte: "La documentation doit répondre à : qui peut actionner le kill switch (liste nominative avec accès), comment (procédure en 3 étapes max), dans quels cas (critères de déclenchement), et quoi faire ensuite (mode dégradé, communication interne, analyse post-incident). Cette documentation doit être affichée physiquement dans les bureaux et disponible offline."
      },
      {
        type: 'h2',
        texte: "Les tests : l'étape que tout le monde oublie"
      },
      {
        type: 'p',
        texte: "Un kill switch non testé est un faux sentiment de sécurité. Il faut tester régulièrement, dans des conditions qui se rapprochent des conditions réelles."
      },
      {
        type: 'ul',
        items: [
          "Test mensuel en environnement de staging : arrêt complet et redémarrage, vérification du fallback",
          "Test trimestriel en production (hors heures de pointe) : arrêt d'un agent non critique et observation du comportement réel du système",
          "Test annuel de scénario catastrophe : simulation complète d'un incident majeur avec toutes les équipes concernées",
          "Post-mortem après chaque test : qu'est-ce qui a fonctionné comme prévu ? Qu'est-ce qui a surpris ?"
        ]
      },
      {
        type: 'quote',
        texte: "Un kill switch non testé n'est pas un mécanisme de sécurité. C'est une illusion de contrôle. La vraie sécurité s'acquiert par la répétition, pas par la documentation.",
        auteur: "Vincent DORANGE, AI CONSULTING"
      },
      {
        type: 'h2',
        texte: "Checklist de maturité du kill switch"
      },
      {
        type: 'ul',
        items: [
          "☐ Tous les agents sont inventoriés avec leurs actions irréversibles documentées",
          "☐ Un kill switch de niveau 1 (global) existe et est actionnable en moins de 30 secondes",
          "☐ Des kill switches de niveau 2 existent pour chaque agent critique",
          "☐ Les modes dégradés sont définis et testés pour chaque agent",
          "☐ Au moins 3 personnes savent comment actionner le kill switch",
          "☐ La procédure est documentée et disponible offline",
          "☐ Le kill switch a été testé en production dans les 3 derniers mois",
          "☐ Un post-mortem a été rédigé après le dernier test"
        ]
      },
      {
        type: 'p',
        texte: "Si vous cochez moins de 5 cases sur 8, votre entreprise est exposée à des risques opérationnels significatifs. Le Score ACF® inclut l'évaluation de votre kill switch dans sa dimension Supervision Humaine."
      },
      {
        type: 'cta',
        texte: "Évaluer ma capacité de supervision"
      }
    ]
  }
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getAllSlugs(): string[] {
  return articles.map(a => a.slug)
}
