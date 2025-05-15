import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import ReactGA from 'react-ga4'
import useLoadData from '../hooks/useLoadData'
import Skeleton from '@mui/material/Skeleton'
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
import Footer from './Footer'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import NavBarSubPage from './NavBarSubPage'

export default function DrinkPage() {
  const { slug } = useParams()
  const { isLoading, error, status, message, data } = useLoadData(slug)

  var crumb = ''
  var crumbLead = sessionStorage.getItem('crumb') || 'All Drinks'
  var backstory = ''
  var subs = ''
  var content = <Skeleton variant="rounded" width={350} height={250} />
  var errorText =
    'A drink by that name was not found on the Irresistibull Cocktail menu.'

  React.useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: `/${slug}`,
      title: slug,
    })
  }, [])

  const formatIngredientListItem = (item) => {
    if (item.url) {
      return (
        <>
          <Typography>
            {`${item.amount} `}
            <Link href={item.url} underline="hover">
              {item.longname}
            </Link>
          </Typography>
        </>
      )
    } else {
      return `${item.amount} ${item.longname}`
    }
  }

  if (error) {
    if (message == 'Not Found') {
      errorText = 'Error loading the cocktail menu.'
    }
    console.log(`ERROR: Status ${status}. ${message}`)
    content = (
      <Card>
        <CardContent>
          <Typography variant="h4" component="div">
            {errorText}
          </Typography>
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
  } else if (data) {
    crumb = data.title
    const imageFile = data.imageFile || '_default.jpg'
    const drinkImage = (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardMedia
          component="img"
          image={`${process.env.PUBLIC_URL}/img/` + imageFile}
          alt={imageFile}
          sx={{ mb: 1, objectFit: 'contain', maxWidth: 400 }}
        />
      </Box>
    )

    if (data.backstory) {
      backstory = (
        <>
          <Divider variant="middle" sx={{ mb: 2, mt: 2 }} />
          <Typography variant="h5" component="div">
            Drink Trivia
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data.backstory}
          </Typography>
        </>
      )
    }

    if (data.subs) {
      subs = (
        <>
          <Divider variant="middle" sx={{ mb: 2, mt: 2 }} />
          <Typography variant="h5" component="div">
            Options
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data.subs}
          </Typography>
        </>
      )
    }

    content = (
      <Card
        style={{ backgroundColor: 'whitesmoke' }}
        sx={{ minWidth: 275, maxWidth: 800 }}
      >
        <Breadcrumbs sx={{ mt: 1, ml: 2 }} aria-label="breadcrumb">
          <Link
            component={RouterLink}
            to={'/'}
            underline="hover"
            color="inherit"
            style={{ cursor: 'pointer' }}
          >
            {crumbLead}
          </Link>
          <Typography sx={{ color: 'text.primary' }}>{crumb}</Typography>
        </Breadcrumbs>

        <CardContent>
          {drinkImage}
          <Typography variant="h4" color="#357EC7" component="div">
            {data.title}
          </Typography>

          <Typography variant="body1" component="div">
            <ul>
              {data.components.map((item, idx) => (
                <li key={idx}>{formatIngredientListItem(item)}</li>
              ))}
            </ul>
          </Typography>
          <Divider variant="middle" sx={{ mb: 2 }} />
          <Typography variant="h5" component="div">
            Mix It!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data.instructions}
          </Typography>
          {subs}
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
  }

  return (
    <Box className="drinkPage" sx={{ flexGrow: 1 }}>
      {/* <AppBar position="static">
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
      </AppBar> */}
      <NavBarSubPage />
      {content}
      <Footer />
    </Box>
  )
}
