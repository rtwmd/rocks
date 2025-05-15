import { useEffect, useState } from 'react'
import useLoadData from '../hooks/useLoadData'
import { sortSearch } from '../utils/sortSearch'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Skeleton from '@mui/material/Skeleton'
import DrinkCard from './DrinkCard'
import NavBar from './NavBar'
import Footer from './Footer'
import Typography from '@mui/material/Typography'
import { Fab, Fade } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function ScrollTop(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )
    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      })
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  )
}

export default function DrinkList(props) {
  const boozeBase = {
    vodka: { variant: 'outlined', key: 'VODKA' },
    gin: { variant: 'outlined', key: 'GIN' },
    tequila: { variant: 'outlined', key: 'TEQUILA' },
    whiskey: { variant: 'outlined', key: 'WHISKEY' },
    sparkling: { variant: 'outlined', key: 'SPARKLING' },
  }
  const [searchedDrinks, setSearchedDrinks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [filterParams, setFilterParams] = useState({
    category: 'ALL',
    booze: boozeBase,
    sortOrder: 'NEW',
    searchTerm: '',
  })
  const { isLoading, error, status, message, data } = useLoadData('ALL')

  const resetFilterParams = () => {
    setFilterParams({
      category: 'ALL',
      booze: boozeBase,
      sortOrder: 'NEW',
      searchTerm: '',
    })
  }

  const handleFilterButtons = (params) => {
    setFilterParams(params)
    setSearchedDrinks(sortSearch({ ...filterParams, drinks: data }))
  }

  const contentDisplay = () => {
    console.log('isLoading', isLoading)
    console.log('isLoaded', isLoaded)
    console.log('>0', searchedDrinks.length > 0)
    console.log('<1', searchedDrinks.length < 1)
    console.log('data', data)

    if (!isLoaded && !isLoading && searchedDrinks.length > 0) {
      setIsLoaded(true)
    }

    if (isLoaded) {
      if (searchedDrinks.length > 0) {
        console.log('!isLoading && searchedDrinks.length > 0')
        return (
          <>
            {searchedDrinks.map((drink) => (
              <Grid key={drink.id}>
                <DrinkCard drink={drink} />
              </Grid>
            ))}
          </>
        )
      } else if (searchedDrinks.length < 1) {
        console.log('!isLoading && searchedDrinks.length < 1')
        return (
          <Typography variant="h4" color="warning">
            No Drinks Found
          </Typography>
        )
      }
    } else if (error) {
      console.log(`ERROR: Status ${status}. ${message}`)
      return (
        <Typography variant="h4" color="error">
          Error loading cocktail menu
        </Typography>
      )
    } else {
      console.log('skeleton')
      return (
        <>
          <Skeleton variant="rounded" width={300} height={150} sx={{ m: 1 }} />
          <Skeleton variant="rounded" width={300} height={150} sx={{ m: 1 }} />
          <Skeleton variant="rounded" width={300} height={150} sx={{ m: 1 }} />
          <Skeleton variant="rounded" width={300} height={150} sx={{ m: 1 }} />
        </>
      )
    }
  }

  useEffect(() => {
    setSearchedDrinks(sortSearch({ ...filterParams, drinks: data }))
  }, [data])

  return (
    <Box className="mainContainer">
      <div id="back-to-top-anchor"></div>
      <NavBar
        drinks={data}
        setSearchedDrinks={setSearchedDrinks}
        filterParams={filterParams}
        resetFilterParams={resetFilterParams}
        handleFilterButtons={handleFilterButtons}
      />
      <Box className="drinkDisplay">
        <Grid
          key={'mainGrid'}
          container
          spacing={2}
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {contentDisplay()}
        </Grid>
      </Box>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <Footer />
    </Box>
  )
}
