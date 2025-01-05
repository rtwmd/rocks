import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function DrinkPage({ drinks }) {
  const { slug } = useParams()
  let navigate = useNavigate()

  const drink = drinks.find((d) => d.slug === slug)

  if (drink) {
    var backstory = ''
    var content = ''
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
              sx={{ paddingLeft: 0 }}
              size="small"
              onClick={() => navigate(-1)}
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
          Irresistibull Cocktails
        </Typography>
      </AppBar>
      {content}
    </Box>
  )
}
