import React from 'react'
import { Box } from '@mui/material'
import NavBar from './NavBar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const AboutPage = ({ drinks, searchedDrinks, setSearchedDrinks }) => {
  return (
    <Box className="mainContainer">
      <NavBar drinks={drinks} setSearchedDrinks={setSearchedDrinks} />
      <Box className="drinkDisplay">
        <Box
          component="img"
          sx={{
            // height: 200,
            width: 250,
            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="Irresistibulls"
          src="\irresistibulls.jpeg"
        />
        <Typography variant="h2" color="#357EC7" component="div">
          Irresistibull Cocktails
        </Typography>
        <Typography variant="body1" component="div">
          Welcome to Irrestibull Cocktails. We started this project back in 2020
          during the COVID-19 lockdown as something fun to do. Over the years we
          have added and dropped drinks from the list. Most of these we created
          in house based on our particular tastes and preferences.
        </Typography>
        <Divider variant="middle" sx={{ mb: 2 }} />
        <Typography variant="h4" component="div">
          Mix It!
        </Typography>
      </Box>
    </Box>
  )
}
export default AboutPage
