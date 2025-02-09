import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { sortSearch } from '../utils/sortSearch'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import LiquorIcon from '@mui/icons-material/Liquor'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import WestIcon from '@mui/icons-material/West'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import PetsIcon from '@mui/icons-material/Pets'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid2'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Breadcrumbs from '@mui/material/Breadcrumbs'

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
  const [sortOrder, setSortOrder] = React.useState('')
  const [searchType, setSearchType] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  var subsetMessage = ''

  React.useEffect(() => {
    setSearchTerm(sessionStorage.getItem('searchString') || '')
    setSortOrder(sessionStorage.getItem('sortOrder') || 'NEW')
    setSearchType(sessionStorage.getItem('searchType') || 'ALL')
  }, [])

  React.useEffect(() => {
    setSearchedDrinks(sortSearch(sortOrder, searchTerm, drinks, searchType))
  }, [sortOrder, searchTerm, searchType])

  const handleSetSortOrder = (sortValue) => {
    setSortOrder(sortValue)
    sessionStorage.setItem('sortOrder', sortValue)
  }

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value)
    sessionStorage.setItem('searchString', event.target.value)
  }

  const handleDrawerSearchButton = (userValue) => {
    setSearchType('ALL')
    setSearchTerm(userValue)
    sessionStorage.setItem('searchType', 'ALL')
    sessionStorage.setItem('searchString', userValue)
  }

  const handleCategoryChange = (categoryType, searchValue = '') => {
    setSearchType(categoryType)
    setSearchTerm(searchValue)
    sessionStorage.setItem('searchType', 'ALL')
    sessionStorage.setItem('searchString', searchValue)
  }

  const setCheckIcon = (sortOption) => {
    if (sortOption === sortOrder) {
      return (
        <IconButton edge="end" sx={{ p: 0, m: 0 }}>
          <WestIcon fontSize="inherit" />
        </IconButton>
      )
    }
    return ''
  }

  const setBreadCrumbs = () => {
    var crumb = ''
    if (searchType === 'ALL') {
      return ''
    }

    if (searchType === 'ASH') {
      crumb = "Ashley's Favorites"
    } else if (searchType === 'HOUSE') {
      crumb = 'House Favorites'
    } else if (searchType === 'DOG') {
      crumb = 'The Irresistibulls'
    }

    return (
      <Box className="drinkDisplay">
        <Grid key={'mainGrid'} container sx={{ ml: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              style={{ cursor: 'pointer' }}
              onClick={() => handleDrawerSearchButton('')}
            >
              All Drinks
            </Link>
            <Typography sx={{ color: 'text.primary' }}>{crumb}</Typography>
          </Breadcrumbs>
        </Grid>
      </Box>
    )
  }

  const DrawerList = (
    <Box sx={{ width: 180 }} role="presentation" onClick={toggleDrawer(false)}>
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
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleSetSortOrder('NEW')}>
            <ListItemText primary="Newest First" />
            {setCheckIcon('NEW')}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleSetSortOrder('AZ')}>
            <ListItemText primary="A to Z" />
            {setCheckIcon('AZ')}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleSetSortOrder('ZA')}>
            <ListItemText primary="Z to A" />
            {setCheckIcon('ZA')}
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleDrawerSearchButton('')}>
            <ListItemText primary="All Drinks" />
            <IconButton edge="end" sx={{ p: 0, m: 0 }} sx={{ p: 0, m: 0 }}>
              <LiquorIcon fontSize="small" sx={{ color: 'darkgreen' }} />
            </IconButton>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleCategoryChange('ASH')}>
            <ListItemText primary="Ashley's Faves" />
            <IconButton edge="end" sx={{ p: 0, m: 0 }}>
              <FavoriteIcon fontSize="small" sx={{ color: 'pink' }} />
            </IconButton>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleCategoryChange('DOG')}>
            <ListItemText primary="Irresistibulls" />
            <IconButton edge="end" sx={{ p: 0, m: 0 }}>
              <PetsIcon fontSize="small" sx={{ color: 'brown' }} />
            </IconButton>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleCategoryChange('HOUSE')}>
            <ListItemText primary="House Faves" />
            <IconButton edge="end" sx={{ p: 0, m: 0 }}>
              <HomeIcon fontSize="small" sx={{ color: '#357EC7' }} />
            </IconButton>
          </ListItemButton>
        </ListItem>
        {['Martini', 'Rocks', 'Cosmo', 'Margarita'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleDrawerSearchButton(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Vodka', 'Gin', 'Tequila', 'Whiskey', 'Sparkling'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleDrawerSearchButton(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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
            aria-label="Open menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
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
            onClick={() => handleDrawerSearchButton('')}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {setBreadCrumbs()}
    </Box>
  )
}
