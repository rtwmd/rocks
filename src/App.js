import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DrinkList from './components/DrinkList'
import DrinkPage from './components/DrinkPage'

function App() {
  const [drinks, setDrinks] = React.useState()
  const [searchedDrinks, setSearchedDrinks] = React.useState([])

  const loadContent = () => {
    try {
      fetch('cocktails.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              // Handle 404 Not Found
              console.error('Drink menu file not found')
              return ''
            } else {
              throw new Error('Network response was not ok')
            }
          }
          return response.json()
        })
        .then((drinkData) => {
          setDrinks(drinkData)
          if (drinkData) {
            let sortedData = drinkData.sort(function (a, b) {
              var textA = a.title.toLowerCase()
              var textB = b.title.toLowerCase()
              return textA < textB ? -1 : textA > textB ? 1 : 0
            })
            setSearchedDrinks(sortedData)
          }
          sessionStorage.setItem('searchString', '')
        })
    } catch (error) {
      console.log('ERROR: ', error.message)
    }
  }
  React.useEffect(() => {
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
