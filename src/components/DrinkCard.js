// import React from 'react'
// import { Link } from 'react-router-dom'

// const DrinkCard = ({ drink }) => {
//   return (
//     <div className="drink-card">
//       <h2>{drink.title}</h2>
//       <p>{drink.ingredients}</p>
//       <Link to={`/cocktail/${drink.slug}`}>Read More</Link>
//     </div>
//   )
// }

// export default DrinkCard

import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

export default function DrinkCard({ drink }) {
  return (
    <Link
      underline="none"
      component={RouterLink}
      to={`/cocktail/${drink.slug}`}
    >
      <Card
        raised
        key={drink.id}
        sx={{ width: 350, borderRadius: '10px' }}
        style={{ display: 'flex' }}
      >
        <CardActionArea>
          {/* <CardMedia
          component="img"
          height="140"
          image="src/assets/img/savannah_sunday.png"
          alt="drink picture"
          sx={{ objectFit: 'contain' }}
        /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" color="#357EC7">
              {drink.title}
            </Typography>
            <Divider variant="middle" sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              {drink.ingredients}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
