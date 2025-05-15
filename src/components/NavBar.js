import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { sortSearch } from '../utils/sortSearch'
import SearchBar from './SearchBar'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Grid from '@mui/material/Grid2'
import { Menu, MenuItem } from '@mui/material'
import FilterDialog from './FilterDialog'

export default function NavBar({
  drinks,
  setSearchedDrinks,
  filterParams,
  resetFilterParams,
  handleFilterButtons,
}) {
  const [anchorElMore, setAnchorElMore] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState(' ')
  const [openDialog, setOpenDialog] = React.useState(false)
  const [showSearchBar, setShowSearchBar] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    setSearchedDrinks(sortSearch({ ...filterParams, drinks: drinks }))
  }, [filterParams, searchTerm])

  const handleClose = () => {
    setAnchorElMore(null)
  }
  const handleMoreMenuChoice = (pageName) => {
    setAnchorElMore(null)
    navigate(pageName)
  }
  const handleMoreMenu = (event) => {
    setAnchorElMore(event.currentTarget)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const setBreadCrumbs = () => {
    var crumb = ''
    if (filterParams.category === 'ASH') {
      crumb = "Ashley's Favorites"
    } else if (filterParams.category === 'HOUSE') {
      crumb = 'House Favorites'
    } else if (filterParams.category === 'DOG') {
      crumb = 'The Irresistibulls'
    } else {
      return ''
    }

    return (
      <Box className="drinkDisplay">
        <Grid
          key={'mainGrid'}
          container
          spacing={0}
          direction="column"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            pb: 0,
          }}
        >
          <Typography component="div" variant="h6" color="#357EC7">
            {crumb}
          </Typography>
        </Grid>
      </Box>
    )
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Irresistibull Cocktails
          </Typography>

          <IconButton
            color="inherit"
            aria-label="Open search"
            onClick={() => setShowSearchBar(true)}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Open filter"
            onClick={() => handleOpenDialog()}
          >
            <FilterAltIcon />
          </IconButton>

          <FilterDialog
            onClose={handleCloseDialog}
            open={openDialog}
            handleFilterButtons={handleFilterButtons}
            filterParams={filterParams}
            resetFilterParams={resetFilterParams}
          />

          <IconButton
            color="inherit"
            aria-label="Open more menu"
            onClick={handleMoreMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-moreMenu"
            anchorEl={anchorElMore}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElMore)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMoreMenuChoice('/about')}>
              About
            </MenuItem>
            <MenuItem onClick={() => handleMoreMenuChoice('/basics')}>
              Bar Basics
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <SearchBar
        filterParams={filterParams}
        handleFilterButtons={handleFilterButtons}
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      />
      {setBreadCrumbs()}
    </Box>
  )
}
