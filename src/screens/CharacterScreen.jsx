import { useState } from 'react'
import { Star, Activity, Flame, Zap, Shield, Leaf, Plus, Minus } from 'lucide-react'
import './CharacterScreen.css'

const INITIAL_STATS = [
  { name: 'Endurance', icon: Activity, level: 3, baseLevel: 3, max: 10, cost: 80,  color: '#FF4309' },
  { name: 'Force',     icon: Flame,    level: 2, baseLevel: 2, max: 10, cost: 100, color: '#7C3AED' },
  { name: 'Vitesse',   icon: Zap,      level: 4, baseLevel: 4, max: 10, cost: 60,  color: '#0EA5E9' },
  { name: 'Mental',    icon: Shield,   level: 1, baseLevel: 1, max: 10, cost: 120, color: '#16A34A' },
  { name: 'Nutrition', icon: Leaf,     level: 2, baseLevel: 2, max: 10, cost: 90,  color: '#D97706' },
]

const ACCESSORIES = [
  { slot: 'Casque',     equipped: false },
  { slot: 'Haut',       equipped: true  },
  { slot: 'Bas',        equipped: true  },
  { slot: 'Chaussures', equipped: false },
  { slot: 'Montre',     equipped: false },
  { slot: 'Badge',      equipped: true  },
]

export default function CharacterScreen() {
  const [points, setPoints] = useState(242)
  const [stats, setStats] = useState(INITIAL_STATS)

  function upgrade(name) {
    const stat = stats.find(s => s.name === name)
    if (!stat || stat.level >= stat.max || points < stat.cost) return
    setPoints(p => p - stat.cost)
    setStats(prev => prev.map(s => s.name === name ? { ...s, level: s.level + 1 } : s))
  }

  function downgrade(name) {
    const stat = stats.find(s => s.name === name)
    if (!stat || stat.level <= stat.baseLevel) return
    setPoints(p => p + stat.cost)
    setStats(prev => prev.map(s => s.name === name ? { ...s, level: s.level - 1 } : s))
  }

  return (
    <div className="char-screen">

      <div className="char-header">
        <h1 className="char-title">Mon Perso</h1>
        <div className="char-pts glass">
          <Star size={13} />
          {points.toLocaleString('fr-FR')} pts
        </div>
      </div>

      <div className="char-avatar-wrap">
        <img src="/vitae-avatar.png" alt="Avatar" className="char-avatar" />
      </div>

      <div className="char-section-label">Aptitudes</div>
      <div className="char-stats">
        {stats.map(({ name, icon: Icon, level, baseLevel, max, cost, color }) => {
          const canUpgrade = points >= cost && level < max
          const canDowngrade = level > baseLevel
          return (
            <div key={name} className="glass char-stat-card">
              <div className="csc-icon" style={{ '--stat-color': color }}>
                <Icon size={18} />
              </div>
              <div className="csc-body">
                <div className="csc-top">
                  <span className="csc-name">{name}</span>
                  <span className="csc-level">Niv. {level}</span>
                </div>
                <div className="csc-bar">
                  <div className="csc-fill" style={{ width: `${(level / max) * 100}%`, background: color }} />
                </div>
              </div>
              <div className="csc-upgrade">
                <span className="csc-cost"><Star size={10} />{cost}</span>
                <div className="csc-btns">
                  {canDowngrade && (
                    <button className="csc-btn csc-btn--minus" onClick={() => downgrade(name)}>
                      <Minus size={14} />
                    </button>
                  )}
                  <button
                    className={`csc-btn${!canUpgrade ? ' csc-btn--disabled' : ''}`}
                    onClick={() => upgrade(name)}
                    disabled={!canUpgrade}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="char-section-label">Accessoires</div>
      <div className="char-accessories">
        {ACCESSORIES.map(({ slot, equipped }) => (
          <div key={slot} className={`glass char-acc-slot${equipped ? ' char-acc--equipped' : ''}`}>
            <div className="acc-dot" />
            <span className="acc-label">{slot}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
