import { Star, Trophy, Signal, Wifi, BatteryFull, Home, Wallet, PieChart, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function HomeScreen() {
  const navigate = useNavigate()

  return (
    <>
      {/* Avatar */}
      <div className="avatar-layer">
        <img className="avatar-img" src="/vitae-avatar.png" alt="Avatar VITAE" />
      </div>

      {/* Quest card — au-dessus de l'avatar */}
      <div className="quest-sheet glass">
        <div className="qs-title">ENDURANCE</div>
        <div className="qs-desc">Marche 30 minutes par jour<br />pendant 1 semaine</div>
        <div className="qs-footer">
          <div className="pts-badge">
            <Star size={16} color="#1A1A1A" />
            112
          </div>
          <div className="go-btn">GO</div>
        </div>
      </div>

      {/* UI overlay */}
      <div className="ui">
        {/* Status bar */}
        <div className="sbar">
          <span>9:41</span>
          <div className="sbar-r">
            <Signal size={14} />
            <Wifi size={14} />
            <BatteryFull size={16} />
          </div>
        </div>

        {/* Stat cards */}
        <div className="stat-row">
          <div className="glass stat-card">
            <div className="glass-icon"><Star size={24} /></div>
            <div className="glass-info">
              <span className="gl-label">Points</span>
              <span className="gl-val">8,420</span>
            </div>
          </div>
          <div className="glass stat-card">
            <div className="glass-icon"><Trophy size={24} /></div>
            <div className="glass-info">
              <span className="gl-label">Rank</span>
              <span className="gl-val">#28</span>
            </div>
          </div>
        </div>

        <div className="spacer" />

        {/* Bottom nav */}
        <div className="bnav glass">
          <div className="nav-pill">
            <Home size={18} />
            Home
          </div>
          <div className="nav-ico" onClick={() => navigate('/test')}><Wallet size={22} /></div>
          <div className="nav-ico" onClick={() => navigate('/quetes')}><PieChart size={22} /></div>
          <div className="nav-ico" onClick={() => navigate('/profil')}><User size={22} /></div>
        </div>
      </div>
    </>
  )
}
