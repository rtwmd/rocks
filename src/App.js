import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import ReactGA from 'react-ga4'
import DrinkList from './components/DrinkList'
import DrinkPage from './components/DrinkPage'
import AboutPage from './components/AboutPage'

export default function App() {
  React.useEffect(() => {
    ReactGA.initialize('G-YV33W21D2W')
  }, [])

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<DrinkList />} />
        <Route path="/:slug" element={<DrinkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
