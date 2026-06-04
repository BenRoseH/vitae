import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Phone from './components/Phone'
import './components/Phone.css'
import Navbar from './components/Navbar'
import './components/Navbar.css'
import HomeScreen from './screens/Home'
import './screens/Home.css'
import TestScreen from './screens/TestScreen'
import './screens/TestScreen.css'
import CharacterScreen from './screens/CharacterScreen'
import './screens/CharacterScreen.css'
import RaidTest from './pages/RaidTest'
import './pages/RaidTest.css'

function App() {
  return (
    <BrowserRouter>
      <Phone>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/test" element={<TestScreen />} />
          <Route path="/character" element={<CharacterScreen />} />
          <Route path="/raids" element={<RaidTest />} />
        </Routes>
        <Navbar />
      </Phone>
    </BrowserRouter>
  )
}

export default App
