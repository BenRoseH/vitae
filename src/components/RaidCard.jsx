import { useState } from 'react'
import RaidOverlay from './RaidOverlay'
import './RaidCard.css'

const TYPE_CONFIG = {
  'TERRAIN': { bg: 'var(--blue)',   color: 'var(--white)' },
  'DÉFI':    { bg: 'var(--yellow)', color: '#000' },
  'SOCIAL':  { bg: 'var(--pink)',   color: '#000' },
}

export default function RaidCard({ raid }) {
  const [open, setOpen] = useState(false)
  const isLocked = raid.aptitudes.some(a => a.actuel < a.requis)
  const { bg, color } = TYPE_CONFIG[raid.type] ?? TYPE_CONFIG['TERRAIN']

  return (
    <>
      <div className="raid-card" onClick={() => setOpen(true)}>

        <div className="rc-header">
          <span className="rc-type" style={{ background: bg, color }}>{raid.type}</span>
          <span className="rc-duration">{raid.duree}</span>
        </div>

        <h3 className="rc-title">{raid.titre}</h3>
        <p className="rc-desc">{raid.description}</p>

        <div className="rc-aptitudes">
          {raid.aptitudes.map(a => {
            const ok = a.actuel >= a.requis
            return (
              <span key={a.nom} className={`rc-apt${ok ? '' : ' rc-apt--fail'}`}>
                {!ok && '🔒'}{a.emoji} {a.nom.slice(0, 3).toUpperCase()} {a.requis}
              </span>
            )
          })}
        </div>

        {raid.social && (
          <div className="rc-social">
            <span className="rc-social-label">{raid.alliesActuels}/{raid.alliesRequis} alliés</span>
            <div className="rc-social-track">
              <div className="rc-social-fill" style={{ width: `${(raid.alliesActuels / raid.alliesRequis) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="rc-footer">
          <span className="rc-reward">
            🎁 {raid.recompenseReelle ? raid.recompenseReelle.valeur + ' ' + raid.recompenseReelle.partenaire : raid.recompenseApp.skin}
          </span>
          <span className="rc-xp">+{raid.recompenseApp.xp} XP</span>
        </div>

        {isLocked && (
          <div className="rc-locked-overlay">
            <span className="rc-locked-icon">🔒</span>
            <span className="rc-locked-label">Aptitudes insuffisantes</span>
          </div>
        )}
      </div>

      {open && <RaidOverlay raid={raid} isLocked={isLocked} onClose={() => setOpen(false)} />}
    </>
  )
}
