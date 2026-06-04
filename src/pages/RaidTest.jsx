import RaidCard from '../components/RaidCard'
import './RaidTest.css'

const RAIDS = [
  {
    id: 1,
    titre: "Expédition de l'Erdre",
    type: 'TERRAIN',
    duree: 'PERMANENT',
    description: "8,4 km le long de l'Erdre depuis Nantes jusqu'au lac de Mazerolles.",
    objectif: "Complète le parcours GPS en moins de 2h. 3 checkpoints à valider en chemin.",
    validation: 'GPS',
    aptitudes: [
      { nom: 'Endurance', emoji: '🏃', requis: 2, actuel: 1 },
      { nom: 'Force',     emoji: '💪', requis: 1, actuel: 2 },
    ],
    social: false,
    recompenseApp:   { xp: 120, skin: 'Boots de Trail' },
    recompenseReelle: { partenaire: 'Prison Island Nantes', valeur: '-20%', type: 'QR Code' },
  },
  {
    id: 2,
    titre: '30 Jours Sans Sucre',
    type: 'DÉFI',
    duree: 'SAISONNIER',
    description: 'Tiens 30 jours sans sucres ajoutés et prouve ta discipline mentale.',
    objectif: 'Déclare chaque semaine ta progression. Validation communautaire à la fin du mois.',
    validation: 'Déclaratif',
    aptitudes: [
      { nom: 'Mental',     emoji: '🧠', requis: 1, actuel: 2 },
      { nom: 'Nutrition',  emoji: '🥗', requis: 2, actuel: 3 },
    ],
    social: false,
    recompenseApp:    { xp: 200, skin: 'Badge Discipline' },
    recompenseReelle: null,
  },
  {
    id: 3,
    titre: 'Escalade en Binôme',
    type: 'SOCIAL',
    duree: 'ÉVÉNEMENT',
    description: 'Grimpez ensemble 500m de dénivelé. La progression compte pour les deux.',
    objectif: "Valide 3 séances d'escalade avec ton allié en 2 semaines. QR code à chaque séance.",
    validation: 'QR Code',
    aptitudes: [
      { nom: 'Force',     emoji: '💪', requis: 2, actuel: 3 },
      { nom: 'Endurance', emoji: '🏃', requis: 1, actuel: 2 },
    ],
    social: true,
    alliesActuels: 2,
    alliesRequis: 3,
    recompenseApp:    { xp: 180, skin: 'Veste Escalade' },
    recompenseReelle: { partenaire: 'Arkose Nantes', valeur: '-15%', type: 'QR Code' },
  },
]

export default function RaidTest() {
  return (
    <div className="raid-test">
      <div className="raid-test-header">
        <h1 className="raid-test-title">Raids</h1>
      </div>
      <div className="raid-test-list">
        {RAIDS.map(raid => <RaidCard key={raid.id} raid={raid} />)}
      </div>
    </div>
  )
}
