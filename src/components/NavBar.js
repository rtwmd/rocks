import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import LocalBar from '@mui/icons-material/LocalBar'
import SearchIcon from '@mui/icons-material/Search'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function NavBar({ drinks, setSearchedDrinks }) {
  const [searchTerm, setSearchTerm] = React.useState(' ')
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  React.useEffect(() => {
    setSearchTerm(sessionStorage.getItem('searchString') || '')
  }, [])

  const handleSearchInput = (event) => {
    const search = drinks.filter(
      (drink) =>
        drink.tags
          .flat()
          .join(' ')
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        drink.ingredients
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        drink.title.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearchTerm(event.target.value)
    sessionStorage.setItem('searchString', event.target.value)
    setSearchedDrinks(search)
  }

  const handleDrawerSearchButton = (userValue) => () => {
    if (userValue == 'All Drinks') {
      setSearchTerm('')
      sessionStorage.setItem('searchString', '')
      setSearchedDrinks(drinks)
    } else {
      const search = drinks.filter((drink) =>
        drink.category
          .flat()
          .join(' ')
          .toLowerCase()
          .includes(userValue.toLowerCase())
      )
      setSearchTerm(userValue)
      sessionStorage.setItem('searchString', userValue)
      setSearchedDrinks(search)
    }
  }

  const handleAshleyFavs = () => {
    const search = drinks.filter((drink) => drink.ashleyfav == true)
    setSearchTerm('')
    sessionStorage.setItem('searchString', '')
    setSearchedDrinks(search)
  }
  const handleHouseFavs = () => {
    const search = drinks.filter((drink) => drink.housefav == true)
    setSearchTerm('')
    sessionStorage.setItem('searchString', '')
    setSearchedDrinks(search)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['All Drinks', 'Martini', 'Rocks', 'Cosmo', 'Margarita'].map(
          (text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleDrawerSearchButton(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={handleAshleyFavs}>
            <ListItemText primary="Ashley's Faves 🩵" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleHouseFavs}>
            <ListItemText primary="House Faves 💙" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Vodka', 'Gin', 'Tequila', 'Whiskey', 'Sparkling'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleDrawerSearchButton(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              component={RouterLink}
              to="/about"
              underline="none"
              color="textPrimary"
            >
              <ListItemText primary="About" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="martini glass"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <LocalBar />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Irresistibull Cocktails
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchInput}
              value={searchTerm}
            />
          </Search>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="clear search"
            sx={{ ml: 1 }}
            onClick={handleDrawerSearchButton('')}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
