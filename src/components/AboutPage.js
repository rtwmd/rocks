import React from 'react'
// import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'

export default function AboutPage() {
  //   let navigate = useNavigate()

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
      <Card sx={{ minWidth: 275, maxWidth: 800 }}>
        <CardMedia
          component="img"
          //   height="140"
          image="irresistibulls.jpeg"
          alt="bulldog picture"
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography variant="h4" color="#357EC7" component="div">
            Irresistibull Cocktails
          </Typography>
          <Typography variant="body1" component="div">
            Welcome to Irrestibull Cocktails. We started this project back in
            2020 during the COVID-19 lockdown as something fun to do. Over the
            years we have added and dropped drinks from the list. Most of these
            we created in house based on our particular tastes and preferences.
          </Typography>
          <Divider variant="middle" sx={{ my: 2 }} />
          <Typography variant="h5" color="#357EC7" component="div">
            The Irresistibulls
          </Typography>
          <Typography variant="body1" component="div">
            The site theme is inspired by The Irresistibulls, our squad of
            English Bulldogs. Feel free to check them out on Instagram{' '}
            <Link
              href="https://www.instagram.com/the_irresistibulls/"
              underline="none"
            >
              @the_irresistibulls
            </Link>
            .
          </Typography>
          <CardActions disableSpacing sx={{ paddingLeft: 0 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ paddingLeft: 0 }}
              size="medium"
            >
              Back to the main menu
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  )
}
