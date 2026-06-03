import ChallengeCard from '../components/ChallengeCard'
import './TestScreen.css'

export default function TestScreen() {
  return (
    <div className="test-screen">
      <div className="ts-header">
        <h2 className="ts-title">Composants</h2>
      </div>

      <div className="ts-section">
        <p className="ts-label">ChallengeCard</p>
        <ChallengeCard />
        <ChallengeCard
          category="Force"
          categoryColor="#7C3AED"
          title="Iron Week"
          description="3 séances de musculation en 7 jours. Chaque séance dure au moins 45 min."
          points={380}
          duration="7 jours"
        />
        <ChallengeCard
          category="Nutrition"
          categoryColor="#16A34A"
          title="Clean Eating"
          description="Mange 5 fruits et légumes par jour pendant 5 jours consécutifs."
          points={150}
          duration="5 jours"
        />
      </div>
    </div>
  )
}
