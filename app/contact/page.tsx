'use client'
import { useState, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

declare global { interface Window { turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => void } } }

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', subject: '', message: '', urgent: false })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const captchaRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const body = new FormData()
    Object.entries(formData).forEach(([k,v]) => body.append(k, String(v)))
    files.forEach(f => body.append('files', f))
    try {
      const r = await fetch('/api/contact', { method: 'POST', body })
      if (r.ok) { setStatus('ok') } else { const d = await r.json(); setErrMsg(d.error||'Erreur'); setStatus('err') }
    } catch { setErrMsg('Erreur réseau'); setStatus('err') }
  }

  const up = (k: string, v: string|boolean) => setFormData(p => ({...p,[k]:v}))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .ct{background:#050c1a;color:#fff;font-family:'Inter',sans-serif;min-height:100vh}
        .ct-hero{background:linear-gradient(160deg,#071122,#050c1a);border-bottom:1px solid rgba(201,168,76,.18);padding:72px 0 60px}
        .ct-w{max-width:1100px;margin:0 auto;padding:0 40px}
        .ct-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.25);color:#c9a84c;padding:6px 14px;border-radius:100px;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;margin-bottom:22px}
        .ct-h1{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:clamp(28px,4vw,46px);line-height:1.1;color:#fff;margin-bottom:12px}
        .ct-h1 .g{color:#c9a84c}
        .ct-sub{font-size:16px;color:#9db0c8;line-height:1.65}

        .ct-sec{padding:64px 0 80px}
        .ct-grid{display:grid;grid-template-columns:1fr 380px;gap:40px;align-items:start}

        .ct-form-card{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:14px;padding:40px}
        .ct-form-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:#fff;margin-bottom:28px}
        .ct-field{margin-bottom:20px}
        .ct-label{display:block;font-size:11px;font-weight:600;color:#9db0c8;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;font-family:'Space Grotesk',sans-serif}
        .ct-input{width:100%;background:#0d1f3c;border:1px solid rgba(201,168,76,.2);border-radius:8px;padding:12px 16px;color:#fff;font-size:14px;font-family:'Inter',sans-serif;transition:border-color .2s;outline:none;box-sizing:border-box}
        .ct-input:focus{border-color:#c9a84c}
        .ct-input::placeholder{color:#4a5a72}
        .ct-input option{background:#0d1f3c}
        .ct-textarea{min-height:140px;resize:vertical}
        .ct-row2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .ct-urgent{display:flex;align-items:center;gap:12px;padding:14px 16px;background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.2);border-radius:8px;cursor:pointer;transition:.2s}
        .ct-urgent:hover{border-color:rgba(239,68,68,.4)}
        .ct-urgent input{width:16px;height:16px;accent-color:#ef4444}
        .ct-urgent-lbl{font-size:13px;color:#9db0c8}
        .ct-urgent-lbl strong{color:#ef4444;display:block;font-size:12px}
        .ct-file-area{border:2px dashed rgba(201,168,76,.2);border-radius:8px;padding:20px;text-align:center;cursor:pointer;transition:.2s;position:relative}
        .ct-file-area:hover{border-color:rgba(201,168,76,.4);background:rgba(201,168,76,.04)}
        .ct-file-area input{position:absolute;inset:0;opacity:0;cursor:pointer}
        .ct-file-txt{font-size:13px;color:#6b7fa0}
        .ct-file-txt strong{color:#c9a84c}
        .ct-files-list{margin-top:10px;display:flex;flex-direction:column;gap:4px}
        .ct-file-chip{background:#0d1f3c;border:1px solid rgba(201,168,76,.15);border-radius:5px;padding:5px 10px;font-size:11px;color:#9db0c8;font-family:'JetBrains Mono',monospace}
        .ct-submit{width:100%;background:#c9a84c;color:#050c1a;padding:14px;border-radius:8px;font-weight:700;font-size:15px;border:none;cursor:pointer;transition:.2s;font-family:'Space Grotesk',sans-serif;margin-top:4px}
        .ct-submit:hover{background:#e8c96a;box-shadow:0 6px 28px rgba(201,168,76,.35)}
        .ct-submit:disabled{opacity:.6;cursor:not-allowed}

        .ct-ok{background:#071122;border:1px solid rgba(34,197,94,.3);border-radius:14px;padding:48px 40px;text-align:center}
        .ct-ok-ico{width:56px;height:56px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:#22c55e}
        .ct-ok-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:22px;color:#fff;margin-bottom:8px}
        .ct-ok-sub{font-size:14px;color:#9db0c8}

        .ct-info{display:flex;flex-direction:column;gap:20px}
        .ct-info-card{background:#071122;border:1px solid rgba(201,168,76,.18);border-radius:12px;padding:24px}
        .ct-info-title{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:#c9a84c;margin-bottom:12px;letter-spacing:.04em;text-transform:uppercase;font-size:11px}
        .ct-info-body{font-size:13px;color:#9db0c8;line-height:1.7}
        .ct-info-body strong{color:#e2eaf5}
        .ct-info-item{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05)}
        .ct-info-item:last-child{border-bottom:none;padding-bottom:0}
        .ct-info-ico{color:#c9a84c;margin-top:2px;flex-shrink:0}
        .ct-delay{background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.2);border-radius:8px;padding:14px 16px;display:flex;align-items:center;gap:10px;font-size:13px;color:#c9a84c}

        @media(max-width:900px){.ct-grid{grid-template-columns:1fr}.ct-info{order:-1}}
        @media(max-width:560px){.ct-row2{grid-template-columns:1fr}.ct-w{padding:0 20px}.ct-form-card{padding:24px}.ct-sec{padding:48px 0 60px}}
      `}</style>

      <div className="ct">
        <Header />

        <section className="ct-hero">
          <div className="ct-w">
            <div className="ct-badge">Contact</div>
            <h1 className="ct-h1">Parlons de votre <span className="g">gouvernance agentique</span></h1>
            <p className="ct-sub">Posez vos questions, discutez d'un accompagnement ou signalez un problème.</p>
          </div>
        </section>

        <section className="ct-sec">
          <div className="ct-w">
            <div className="ct-grid">
              {/* FORM */}
              <div>
                {status === 'ok' ? (
                  <div className="ct-ok">
                    <div className="ct-ok-ico">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div className="ct-ok-title">Message envoyé !</div>
                    <p className="ct-ok-sub">Nous vous répondrons sous 24h ouvrées. Vérifiez vos spams si nécessaire.</p>
                  </div>
                ) : (
                  <div className="ct-form-card">
                    <div className="ct-form-title">Envoyez-nous un message</div>
                    <form onSubmit={handleSubmit}>
                      <div className="ct-row2">
                        <div className="ct-field">
                          <label className="ct-label">Nom *</label>
                          <input className="ct-input" value={formData.name} onChange={e=>up('name',e.target.value)} placeholder="Vincent DORANGE" required/>
                        </div>
                        <div className="ct-field">
                          <label className="ct-label">Email *</label>
                          <input className="ct-input" type="email" value={formData.email} onChange={e=>up('email',e.target.value)} placeholder="vincent@ai-consulting.fr" required/>
                        </div>
                      </div>
                      <div className="ct-row2">
                        <div className="ct-field">
                          <label className="ct-label">Entreprise</label>
                          <input className="ct-input" value={formData.company} onChange={e=>up('company',e.target.value)} placeholder="AI CONSULTING"/>
                        </div>
                        <div className="ct-field">
                          <label className="ct-label">Sujet *</label>
                          <select className="ct-input" value={formData.subject} onChange={e=>up('subject',e.target.value)} required>
                            <option value="">Sélectionner...</option>
                            <option value="diagnostic">Question sur le diagnostic</option>
                            <option value="accompagnement">Accompagnement / Consulting</option>
                            <option value="partenariat">Partenariat</option>
                            <option value="presse">Presse / Médias</option>
                            <option value="technique">Problème technique</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                      </div>
                      <div className="ct-field">
                        <label className="ct-label">Message *</label>
                        <textarea className="ct-input ct-textarea" value={formData.message} onChange={e=>up('message',e.target.value)} placeholder="Décrivez votre besoin..." required/>
                      </div>
                      <div className="ct-field">
                        <label className="ct-urgent">
                          <input type="checkbox" checked={formData.urgent} onChange={e=>up('urgent',e.target.checked)}/>
                          <div className="ct-urgent-lbl">
                            <strong>Demande urgente (sous 4h)</strong>
                            Pour les situations critiques nécessitant une réponse rapide
                          </div>
                        </label>
                      </div>
                      <div className="ct-field">
                        <label className="ct-label">Fichiers joints (facultatif)</label>
                        <div className="ct-file-area">
                          <input type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg" onChange={e=>setFiles(Array.from(e.target.files||[]))}/>
                          <p className="ct-file-txt">Glissez vos fichiers ou <strong>cliquez pour choisir</strong></p>
                          <p className="ct-file-txt" style={{fontSize:'11px',marginTop:'4px'}}>PDF, Word, images — max 10 MB</p>
                        </div>
                        {files.length > 0 && (
                          <div className="ct-files-list">{files.map((f,i)=><div key={i} className="ct-file-chip">{f.name}</div>)}</div>
                        )}
                      </div>
                      <div ref={captchaRef} data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} className="cf-turnstile" style={{marginBottom:'16px'}}/>
                      {status==='err' && <p style={{color:'#ef4444',fontSize:'13px',marginBottom:'12px'}}>{errMsg}</p>}
                      <button className="ct-submit" type="submit" disabled={status==='sending'}>
                        {status==='sending' ? 'Envoi en cours...' : 'Envoyer le message →'}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="ct-info">
                <div className="ct-delay">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Réponse sous <strong style={{marginLeft:'4px'}}>24h ouvrées</strong>
                </div>

                <div className="ct-info-card">
                  <div className="ct-info-title">AI CONSULTING</div>
                  <div className="ct-info-body">
                    <div className="ct-info-item">
                      <span className="ct-info-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                      <div>38 Bis Boulevard Victor Hugo<br/>06000 Nice, France</div>
                    </div>
                    <div className="ct-info-item">
                      <span className="ct-info-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
                      <div><strong>RCS Nice :</strong> 909116329<br/><strong>TVA :</strong> FR96909116329</div>
                    </div>
                  </div>
                </div>

                <div className="ct-info-card">
                  <div className="ct-info-title">Cas d'usage fréquents</div>
                  <div className="ct-info-body">
                    {['Accompagnement post-diagnostic pour score < 55', 'Formation équipes sur l\'AI Act', 'Implémentation Framework ACF®', 'Audit governance agents IA', 'Partenariat et revente'].map((x,i)=>(
                      <div key={i} className="ct-info-item">
                        <span className="ct-info-ico" style={{fontSize:'10px',marginTop:'3px'}}>→</span>
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
