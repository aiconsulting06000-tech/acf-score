import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function QuiSommesNousPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .qs{background:#050c1a;color:#fff;font-family:'Inter',sans-serif;min-height:100vh}
        .qs-hero{background:linear-gradient(160deg,#071122,#050c1a);border-bottom:1px solid rgba(201,168,76,.18);padding:72px 0 60px}
        .qs-w{max-width:920px;margin:0 auto;padding:0 40px}
        .qs-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.25);color:#c9a84c;padding:6px 14px;border-radius:100px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:22px}
        .qs-h1{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(28px,4vw,46px);line-height:1.1;color:#fff;margin-bottom:12px}
        .qs-h1 .g{color:#c9a84c}
        .qs-sub{font-size:16px;color:#9db0c8;line-height:1.65;max-width:620px}

        .qs-sec{padding:64px 0 80px}
        .qs-bio{background:#071122;border:1px solid rgba(201,168,76,.2);border-radius:16px;padding:48px;margin-bottom:40px;display:grid;grid-template-columns:auto 1fr;gap:36px;align-items:start}
        .qs-avatar{width:80px;height:80px;border-radius:14px;background:linear-gradient(135deg,#c9a84c,#e8c96a);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:28px;color:#050c1a;flex-shrink:0}
        .qs-bio-name{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:24px;color:#fff;margin-bottom:4px}
        .qs-bio-role{font-size:13px;color:#c9a84c;font-family:'JetBrains Mono',monospace;letter-spacing:.06em;margin-bottom:16px}
        .qs-bio-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
        .qs-tag{background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);color:#c9a84c;padding:4px 10px;border-radius:4px;font-size:10px;font-weight:600;letter-spacing:.06em;font-family:'JetBrains Mono',monospace}
        .qs-bio-text{font-size:15px;color:#9db0c8;line-height:1.8}
        .qs-bio-text p{margin-bottom:14px}
        .qs-bio-text p:last-child{margin-bottom:0}
        .qs-bio-text strong{color:#e2eaf5}

        .qs-company{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:14px;padding:40px;margin-bottom:28px}
        .qs-sh{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:#fff;margin-bottom:16px}
        .qs-body{font-size:15px;color:#9db0c8;line-height:1.8;margin-bottom:20px}
        .qs-body strong{color:#e2eaf5}

        .qs-vals{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}
        .qs-val{background:#050c1a;border:1px solid rgba(201,168,76,.15);border-radius:10px;padding:24px}
        .qs-val-ico{color:#c9a84c;margin-bottom:12px}
        .qs-val-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:#fff;margin-bottom:6px}
        .qs-val-desc{font-size:13px;color:#6b7fa0;line-height:1.6}

        .qs-mentions{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:14px;padding:36px}
        .qs-mention-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px}
        .qs-mention-item{font-size:13px;color:#9db0c8;line-height:1.7}
        .qs-mention-item strong{color:#c9a84c;display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;font-family:'Space Grotesk',sans-serif}

        .qs-cta{background:linear-gradient(135deg,#0d1f3c,#071122);border:1px solid rgba(201,168,76,.22);border-radius:14px;padding:48px;text-align:center;margin-top:40px}
        .qs-cta-title{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(22px,3vw,30px);color:#fff;margin-bottom:12px}
        .qs-cta-sub{font-size:15px;color:#9db0c8;margin-bottom:28px;line-height:1.6}
        .qs-cta-row{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}
        .qs-btn-g{background:#c9a84c;color:#050c1a;padding:13px 28px;border-radius:7px;font-weight:700;font-size:13px;text-decoration:none;transition:.2s;font-family:'Space Grotesk',sans-serif}
        .qs-btn-g:hover{background:#e8c96a;box-shadow:0 5px 24px rgba(201,168,76,.35);color:#050c1a}
        .qs-btn-o{border:1px solid rgba(201,168,76,.3);color:#9db0c8;padding:13px 24px;border-radius:7px;font-weight:500;font-size:13px;text-decoration:none;transition:.2s}
        .qs-btn-o:hover{border-color:#c9a84c;color:#c9a84c}

        @media(max-width:768px){.qs-w{padding:0 20px}.qs-bio{grid-template-columns:1fr;gap:20px}.qs-vals{grid-template-columns:1fr}.qs-mention-grid{grid-template-columns:1fr}.qs-sec{padding:48px 0 60px}.qs-company,.qs-mentions,.qs-bio{padding:24px}.qs-cta{padding:32px 20px}}
      `}</style>

      <div className="qs">
        <Header />

        <section className="qs-hero">
          <div className="qs-w">
            <div className="qs-badge">À propos</div>
            <h1 className="qs-h1">Qui sommes-<span className="g">nous</span> ?</h1>
            <p className="qs-sub">L'équipe derrière le Score ACF® et la méthodologie Agentic Commerce Framework®.</p>
          </div>
        </section>

        <section className="qs-sec">
          <div className="qs-w">
            <div className="qs-bio">
              <div className="qs-avatar">VD</div>
              <div>
                <div className="qs-bio-name">Vincent DORANGE</div>
                <div className="qs-bio-role">Fondateur · Gouvernance Agentique · AI CONSULTING</div>
                <div className="qs-bio-tags">
                  {['ACF® Creator','AI Governance','E-commerce Expert','Auteur'].map(t=><span key={t} className="qs-tag">{t}</span>)}
                </div>
                <div className="qs-bio-text">
                  <p>Vincent DORANGE est un expert en e-commerce, en transformation digitale et gouvernance de l'intelligence artificielle. Fort de plus de 25 ans d'expérience dans le e-commerce et la stratégie digitale, il a observé de nombreuses entreprises perdre le contrôle de leur activité face à l'automatisation croissante.</p>
                  <p>En 2025, face à l'émergence des agents IA autonomes, il crée l'<strong>Agentic Commerce Framework® (ACF®)</strong> : le premier cadre méthodologique structurant la gouvernance des organisations dans l'ère agentique. Ce framework est aujourd'hui la base du Score ACF® et de l'accompagnement proposé par AI CONSULTING et ses partenaires.</p>
                  <p>Basé à Nice, il intervient auprès de PME, ETI et grands groupes pour structurer leur transition vers une économie agentique maîtrisée.</p>
                </div>
              </div>
            </div>

            <div className="qs-company">
              <div className="qs-sh">AI CONSULTING</div>
              <p className="qs-body">
                AI CONSULTING est un cabinet de conseil spécialisé dans l'intelligence artificielle, notamment dans les automatisations et agents IA avec un focus sur la gouvernance agentique. Nous accompagnons les organisations dans leur transition vers une <strong>utilisation souveraine et maîtrisée des agents IA autonomes</strong>.
              </p>
              <p className="qs-body"> 
                Notre approche est pragmatique et opérationnelle : nous ne théorisons pas l'IA, nous structurons votre capacité à la gouverner. Nos interventions s'appuient essentiellement sur la méthodologie ACF®.
              </p>
              <div className="qs-vals">
                <div className="qs-val">
                  <div className="qs-val-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                  <div className="qs-val-title">Souveraineté d'abord</div>
                  <p className="qs-val-desc">Votre contrôle stratégique sur les décisions automatisées est non-négociable.</p>
                </div>
                <div className="qs-val">
                  <div className="qs-val-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
                  <div className="qs-val-title">Pragmatisme opérationnel</div>
                  <p className="qs-val-desc">Des recommandations actionnables dans les 30 jours, pas de théorie abstraite.</p>
                </div>
                <div className="qs-val">
                  <div className="qs-val-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div>
                  <div className="qs-val-title">Transparence totale</div>
                  <p className="qs-val-desc">Méthodologie documentée, scoring explicable, résultats vérifiables.</p>
                </div>
              </div>
            </div>

            <div className="qs-mentions">
              <div className="qs-sh">Mentions légales</div>
              <div className="qs-mention-grid">
                <div className="qs-mention-item"><strong>Dénomination</strong>AI CONSULTING</div>
                <div className="qs-mention-item"><strong>Forme juridique</strong>SAS</div>
                <div className="qs-mention-item"><strong>Siège social</strong>38 Bis Boulevard Victor Hugo, 06000 Nice, France</div>
                <div className="qs-mention-item"><strong>RCS Nice</strong>909116329</div>
                <div className="qs-mention-item"><strong>N° TVA intracommunautaire</strong>FR96909116329</div>
                <div className="qs-mention-item"><strong>Directeur de publication</strong>Vincent DORANGE</div>
                <div className="qs-mention-item"><strong>Hébergeur</strong>Vercel Inc., 340 Pine Street, Suite 1440, San Francisco, CA 94104</div>
                <div className="qs-mention-item"><strong>Contact</strong>Formulaire de contact disponible sur ce site</div>
              </div>
            </div>

            <div className="qs-cta">
              <div className="qs-cta-title">Travaillons ensemble</div>
              <p className="qs-cta-sub">Que vous souhaitiez un diagnostic, un accompagnement ou un partenariat, parlons-en.</p>
              <div className="qs-cta-row">
                <Link href="/contact" className="qs-btn-g">Prendre contact →</Link>
                <Link href="/calculator" className="qs-btn-o">Voir le diagnostic</Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
