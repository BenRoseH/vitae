import { useEffect, useState } from 'react'
import './RaidOverlay.css'

const TYPE_CONFIG = {
  'TERRAIN': { bg: 'var(--blue)',   color: 'var(--white)' },
  'DÉFI':    { bg: 'var(--yellow)', color: '#000' },
  'SOCIAL':  { bg: 'var(--pink)',   color: '#000' },
}

const VALIDATION_DISPLAY = {
  'GPS':         { icon: '📍', label: 'GPS tracé' },
  'QR Code':     { icon: '📱', label: 'QR Code partenaire' },
  'Déclaratif':  { icon: '🤝', label: 'Déclaratif' },
}

export default function RaidOverlay({ raid, isLocked, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const { bg, color } = TYPE_CONFIG[raid.type] ?? TYPE_CONFIG['TERRAIN']
  const validation = VALIDATION_DISPLAY[raid.validation] ?? { icon: '📍', label: raid.validation }

  return (
    <div className="ov-container">
      <div className={`ov-backdrop${visible ? ' ov-backdrop--in' : ''}`} onClick={handleClose} />

      <div className={`ov-panel${visible ? ' ov-panel--in' : ''}`}>
        <div className="ov-scroll">

          {/* Handle */}
          <div className="ov-handle-wrap">
            <div className="ov-handle" />
          </div>

          {/* Header */}
          <div className="ov-header">
            <div className="ov-badges">
              <span className="ov-type" style={{ background: bg, color }}>{raid.type}</span>
              <span className="ov-duration">{raid.duree}</span>
            </div>
            <h2 className="ov-title">{raid.titre}</h2>
            <p className="ov-subtitle">{raid.description}</p>
          </div>

          {/* Objectif */}
          <section className="ov-section">
            <span className="ov-section-label">OBJECTIF</span>
            <p className="ov-text">{raid.objectif}</p>
            {raid.type === 'TERRAIN' && (
              <div className="ov-map">
                <span>📍 Tracé GPS — 8,4 km</span>
              </div>
            )}
          </section>

          {/* Validation */}
          <section className="ov-section">
            <span className="ov-section-label">VALIDATION</span>
            <div className="ov-validation-row">
              <span>{validation.icon}</span>
              <span className="ov-text">{validation.label}</span>
            </div>
            {raid.recompenseReelle && (
              <div className="ov-partner">
                <div className="ov-partner-logo" />
                <span className="ov-partner-name">{raid.recompenseReelle.partenaire}</span>
              </div>
            )}
          </section>

          {/* Aptitudes */}
          <section className="ov-section">
            <span className="ov-section-label">APTITUDES REQUISES</span>
            <div className="ov-apt-list">
              {raid.aptitudes.map(a => {
                const ok = a.actuel >= a.requis
                const diff = a.requis - a.actuel
                return (
                  <div key={a.nom} className="ov-apt-row">
                    <span className="ov-apt-emoji">{a.emoji}</span>
                    <span className="ov-apt-name">{a.nom}</span>
                    <span className="ov-apt-levels">Niv. {a.requis} requis · actuel {a.actuel}</span>
                    {ok
                      ? <span className="ov-apt-ok">✓</span>
                      : <span className="ov-apt-fail">−{diff} niv.</span>
                    }
                  </div>
                )
              })}
            </div>
          </section>

          {/* Alliés */}
          {raid.social && (
            <section className="ov-section">
              <span className="ov-section-label">ALLIÉS</span>
              <div className="ov-allies">
                {Array.from({ length: raid.alliesRequis }).map((_, i) => (
                  <div key={i} className={`ov-ally${i < raid.alliesActuels ? ' ov-ally--filled' : ''}`} />
                ))}
              </div>
              <button className="ov-invite-btn">Inviter des alliés</button>
            </section>
          )}

          {/* Récompenses */}
          <section className="ov-section">
            <span className="ov-section-label">RÉCOMPENSES</span>
            <div className="ov-reward-app">
              <span className="ov-reward-skin">🎮 {raid.recompenseApp.skin}</span>
              <span className="ov-reward-xp">+{raid.recompenseApp.xp} XP</span>
            </div>
            {raid.recompenseReelle && (
              <div className="ov-reward-real">
                <div className="ov-reward-real-top">
                  <span>🎁</span>
                  <span className="ov-reward-real-partner">{raid.recompenseReelle.partenaire}</span>
                  <span className="ov-reward-real-value">{raid.recompenseReelle.valeur}</span>
                </div>
                <p className="ov-reward-real-mention">QR Code généré à la completion</p>
              </div>
            )}
          </section>

        </div>

        {/* Footer fixe */}
        <div className="ov-footer">
          {isLocked ? (
            <button className="ov-btn ov-btn--disabled">Aptitudes insuffisantes — continue à t'entraîner</button>
          ) : raid.social ? (
            <button className="ov-btn ov-btn--yellow">Créer un groupe</button>
          ) : (
            <button className="ov-btn ov-btn--blue">Lancer le Raid</button>
          )}
        </div>
      </div>
    </div>
  )
}
