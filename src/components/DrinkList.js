import React from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import DrinkCard from './DrinkCard'
import NavBar from './NavBar'

const DrinkList = ({ drinks, searchedDrinks, setSearchedDrinks }) => {
  var content = ''

  if (drinks) {
    content = (
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
        {searchedDrinks.map((drink) => (
          <Grid key={drink.id}>
            <DrinkCard drink={drink} />
          </Grid>
        ))}
      </Grid>
    )
  } else {
    content = <h1>Cocktail Menu Not Found</h1>
  }
  return (
    <Box className="mainContainer">
      <NavBar drinks={drinks} setSearchedDrinks={setSearchedDrinks} />
      <Box className="drinkDisplay">{content}</Box>
    </Box>
  )
}

export default DrinkList

// xs={12} sm={6} md={4} lg={3} xl={2}
