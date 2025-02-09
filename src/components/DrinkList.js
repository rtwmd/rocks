import { useEffect, useState } from 'react'
import useLoadDrink from '../hooks/useLoadDrink'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Skeleton from '@mui/material/Skeleton'
import DrinkCard from './DrinkCard'
import NavBar from './NavBar'

export default function DrinkList() {
  const [searchedDrinks, setSearchedDrinks] = useState([])
  const { isLoading, error, status, message, data } = useLoadDrink('ALL')

  const recallFilteredDrinks = (filterTerm) => {
    if (data) {
      const search = data.filter(
        (drink) =>
          drink.tags
            .flat()
            .join(' ')
            .toLowerCase()
            .includes(filterTerm.toLowerCase()) ||
          drink.ingredients.toLowerCase().includes(filterTerm.toLowerCase()) ||
          drink.title.toLowerCase().includes(filterTerm.toLowerCase())
      )
      setSearchedDrinks(search)
    }
  }

  useEffect(() => {
    recallFilteredDrinks(sessionStorage.getItem('searchString') || '')
  }, [data])

  var content = (
    <>
      <Skeleton variant="rounded" width={300} height={150} sx={{ m: 1 }} />
      <Skeleton variant="rounded" width={300} height={150} sx={{ m: 1 }} />
      <Skeleton variant="rounded" width={300} height={150} sx={{ m: 1 }} />
      <Skeleton variant="rounded" width={300} height={150} sx={{ m: 1 }} />
    </>
  )

  if (!isLoading && data) {
    content = (
      <>
        {searchedDrinks.map((drink) => (
          <Grid key={drink.id}>
            <DrinkCard drink={drink} />
          </Grid>
        ))}
      </>
    )
  } else if (error) {
    console.log(`ERROR: Status ${status}. ${message}`)
    content = <h1>Error loading cocktail menu.</h1>
  }

  return (
    <Box className="mainContainer">
      <NavBar drinks={data} setSearchedDrinks={setSearchedDrinks} />
      <Box className="drinkDisplay">
        <Grid
          key={'mainGrid'}
          container
          spacing={2}
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {content}
        </Grid>
      </Box>
    </Box>
  )
}
