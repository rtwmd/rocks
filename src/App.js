import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DrinkList from './components/DrinkList'
import DrinkPage from './components/DrinkPage'

function App() {
  const [drinks, setDrinks] = React.useState()
  const [searchedDrinks, setSearchedDrinks] = React.useState([])

  React.useEffect(() => {
    const loadContent = () => {
      try {
        const drinkData = require('./data/cocktails.json')

        if (drinkData) {
          setDrinks(drinkData)
          let sortedData = drinkData.sort(function (a, b) {
            var textA = a.title.toLowerCase()
            var textB = b.title.toLowerCase()
            return textA < textB ? -1 : textA > textB ? 1 : 0
          })
          setSearchedDrinks(sortedData)
          sessionStorage.setItem('searchString', '')
        } else {
          throw new Error('Cocktail menu not found')
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    loadContent()
  }, [])

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <DrinkList
              drinks={drinks}
              searchedDrinks={searchedDrinks}
              setSearchedDrinks={setSearchedDrinks}
            />
          }
        />
        <Route path="/cocktail/:slug" element={<DrinkPage drinks={drinks} />} />
      </Routes>
    </Router>
  )
}

export default App
