import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function DrinkCard({ drink }) {
  const imageFile = drink.imageFile || '_default.jpg'

  return (
    <Link underline="none" component={RouterLink} to={`/${drink.slug}`}>
      <Card
        sx={{
          width: 350,
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6" color="#357EC7">
              {drink.title}
            </Typography>
            <Divider variant="left" />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              {drink.ingredients}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          image={`${process.env.PUBLIC_URL}/img/` + imageFile}
          alt={imageFile}
        />
      </Card>
    </Link>
  )
}
