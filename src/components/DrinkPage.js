import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function DrinkPage({ drinks }) {
  const { slug } = useParams()
  const [drink, setDrink] = React.useState('')

  const loadDrink = () => {
    if (drinks) {
      setDrink(drinks.find((d) => d.slug === slug))
    }
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
              console.error('Bar must be closed. Did not find drink.')
              return ''
            } else {
              throw new Error('Network response was not ok')
            }
          }
          return response.json()
        })
        .then((drinkData) => {
          setDrink(drinkData.find((d) => d.slug === slug))
        })
    } catch (error) {
      console.log('ERROR: ', error.message)
    }
  }

  React.useEffect(() => {
    loadDrink()
  }, [])

  if (drink) {
    var backstory = ''
    var content = ''
    var drinkImage = ''
    if (drink.imageFile) {
      const imageFile = '/img/' + drink.imageFile
      drinkImage = (
        <CardMedia
          component="img"
          width="300"
          image={imageFile}
          // alt="cocktail photo"
          alt={drink.imageFile}
          sx={{ mb: 1, objectFit: 'contain' }}
        />
      )
    }
    if (drink.backstory) {
      backstory = (
        <>
          <Divider variant="middle" sx={{ mb: 2, mt: 2 }} />
          <Typography variant="h6" component="div">
            Drink Trivia
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {drink.backstory}
          </Typography>
        </>
      )
    }
    content = (
      <Card sx={{ minWidth: 275, maxWidth: 400 }}>
        <CardContent>
          {drinkImage}
          <Typography variant="h4" color="#357EC7" component="div">
            {drink.title}
          </Typography>

          <Typography variant="body1" component="div">
            <ul>
              {drink.components.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Typography>
          <Divider variant="middle" sx={{ mb: 2 }} />
          <Typography variant="h6" component="div">
            Mix It!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {drink.instructions}
          </Typography>
          {backstory}
          <CardActions disableSpacing sx={{ paddingLeft: 0 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ paddingLeft: 0 }}
              size="medium"
            >
              Back to the menu
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    )
  } else {
    content = <Card sx={{ minWidth: 275, maxWidth: 400 }}>Drink Not Found</Card>
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ textAlign: 'center', flexGrow: 1 }}
        >
          <Link component={RouterLink} to="/" underline="none" color="white">
            Irresistibull Cocktails
          </Link>
        </Typography>
      </AppBar>
      {content}
    </Box>
  )
}
