import { Trophy, Signal, Wifi, BatteryFull, Star } from 'lucide-react'
import ChallengeCard from '../components/ChallengeCard'
import './Home.css'

export default function HomeScreen() {

  return (
    <>
      {/* Avatar */}
      <div className="avatar-layer">
        <img className="avatar-img" src="/vitae-avatar.png" alt="Avatar VITAE" />
      </div>

      {/* Quest card — au-dessus de l'avatar */}
      <div className="quest-sheet">
        <ChallengeCard />
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
      </div>
    </>
  )
}
