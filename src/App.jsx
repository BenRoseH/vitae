import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Phone from './components/Phone'
import './components/Phone.css'
import HomeScreen from './screens/Home'
import './screens/Home.css'

function App() {
  return (
    <BrowserRouter>
      <Phone>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Phone>
    </BrowserRouter>
  )
}

export default App
