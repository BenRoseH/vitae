import { Home, Wallet, PieChart, User } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const TABS = [
  { path: '/',      icon: Home,     label: 'Home' },
  { path: '/test',  icon: Wallet,   label: null },
  { path: '/quetes',icon: PieChart, label: null },
  { path: '/profil',icon: User,     label: null },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="bnav glass">
      {TABS.map(({ path, icon: Icon, label }) => {
        const active = pathname === path
        return active && label ? (
          <div key={path} className="nav-pill" onClick={() => navigate(path)}>
            <Icon size={18} />
            {label}
          </div>
        ) : (
          <div key={path} className={`nav-ico${active ? ' nav-ico--active' : ''}`} onClick={() => navigate(path)}>
            <Icon size={22} />
          </div>
        )
      })}
    </div>
  )
}
