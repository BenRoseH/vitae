import { useState } from 'react'
import { Star, Activity, Flame, Zap, Shield, Leaf, Plus, Minus, Lock } from 'lucide-react'
import './CharacterScreen.css'

const INITIAL_STATS = [
  { name: 'Endurance', icon: Activity, level: 3, baseLevel: 3, max: 10, cost: 80,  color: '#FF4309' },
  { name: 'Force',     icon: Flame,    level: 2, baseLevel: 2, max: 10, cost: 100, color: '#7C3AED' },
  { name: 'Vitesse',   icon: Zap,      level: 4, baseLevel: 4, max: 10, cost: 60,  color: '#0EA5E9' },
  { name: 'Mental',    icon: Shield,   level: 1, baseLevel: 1, max: 10, cost: 120, color: '#16A34A' },
  { name: 'Nutrition', icon: Leaf,     level: 2, baseLevel: 2, max: 10, cost: 90,  color: '#D97706' },
]

const INITIAL_COSMETICS = [
  { id: 1, name: 'Casque Flame',   category: 'Tête',   cost: 120, unlocked: true  },
  { id: 2, name: 'Visière Pro',    category: 'Tête',   cost: 200, unlocked: false },
  { id: 3, name: 'Jersey Orange',  category: 'Haut',   cost: 80,  unlocked: true  },
  { id: 4, name: 'Veste Elite',    category: 'Haut',   cost: 300, unlocked: false },
  { id: 5, name: 'Short Runner',   category: 'Bas',    cost: 80,  unlocked: true  },
  { id: 6, name: 'Legging Carbon', category: 'Bas',    cost: 180, unlocked: false },
  { id: 7, name: 'Air Max Vitae',  category: 'Pieds',  cost: 250, unlocked: false },
  { id: 8, name: 'Boost Trainer',  category: 'Pieds',  cost: 150, unlocked: false },
  { id: 9, name: 'Montre Pulse',   category: 'Extras', cost: 100, unlocked: false },
]

const TABS = ['Aptitudes', 'Vestiaire']

export default function CharacterScreen() {
  const [points, setPoints]       = useState(242)
  const [stats, setStats]         = useState(INITIAL_STATS)
  const [cosmetics, setCosmetics] = useState(INITIAL_COSMETICS)
  const [activeTab, setActiveTab] = useState('Aptitudes')

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

  function unlock(id) {
    const item = cosmetics.find(c => c.id === id)
    if (!item || item.unlocked || points < item.cost) return
    setPoints(p => p - item.cost)
    setCosmetics(prev => prev.map(c => c.id === id ? { ...c, unlocked: true } : c))
  }

  const categories = [...new Set(INITIAL_COSMETICS.map(c => c.category))]

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
        <video
          className="char-avatar"
          src="/perso-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="char-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`char-tab${activeTab === tab ? ' char-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Aptitudes' && (
        <div className="char-stats">
          {stats.map(({ name, icon: Icon, level, baseLevel, max, cost, color }) => {
            const canUpgrade   = points >= cost && level < max
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
      )}

      {activeTab === 'Vestiaire' && (
        <div className="char-vestiaire">
          {categories.map(cat => (
            <div key={cat}>
              <div className="char-section-label">{cat}</div>
              <div className="vest-grid">
                {cosmetics.filter(c => c.category === cat).map(item => (
                  <div
                    key={item.id}
                    className={`glass vest-card${item.unlocked ? ' vest-card--owned' : ''}`}
                    onClick={() => unlock(item.id)}
                  >
                    <div className="vest-icon">
                      {item.unlocked ? (
                        <div className="vest-owned-dot" />
                      ) : (
                        <Lock size={16} color="#aaa" />
                      )}
                    </div>
                    <span className="vest-name">{item.name}</span>
                    {!item.unlocked && (
                      <span className="vest-cost"><Star size={10} />{item.cost}</span>
                    )}
                    {item.unlocked && (
                      <span className="vest-badge">Débloqué</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
