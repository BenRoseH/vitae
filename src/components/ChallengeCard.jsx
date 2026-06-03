import { Star, Clock, Zap } from 'lucide-react'
import './ChallengeCard.css'

export default function ChallengeCard({
  category = 'Endurance',
  categoryColor = '#FF4309',
  title = 'Run & Burn',
  description = 'Cours 5 km en moins de 30 minutes trois fois cette semaine.',
  points = 240,
  duration = '7 jours',
}) {
  return (
    <div className="challenge-card glass">
      <div className="cc-category" style={{ '--cat-color': categoryColor }}>
        <Zap size={11} />
        {category}
      </div>

      <div className="cc-body">
        <h3 className="cc-title">{title}</h3>
        <p className="cc-desc">{description}</p>
      </div>

      <div className="cc-footer">
        <div className="cc-meta">
          <div className="cc-meta-item">
            <Star size={13} />
            {points} pts
          </div>
          <div className="cc-meta-item">
            <Clock size={13} />
            {duration}
          </div>
        </div>
        <div className="cc-cta">Rejoindre</div>
      </div>
    </div>
  )
}
