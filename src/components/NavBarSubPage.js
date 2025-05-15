import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { Menu, MenuItem } from '@mui/material'
import Link from '@mui/material/Link'

export default function NavBarSubPage() {
  const [anchorElMore, setAnchorElMore] = React.useState(null)
  const navigate = useNavigate()

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <Link color="inherit" underline="none" href="/">
              Irresistibull Cocktails
            </Link>
          </Typography>

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
            <MenuItem onClick={() => handleMoreMenuChoice('/')}>
              Drink Menu
            </MenuItem>
            <MenuItem onClick={() => handleMoreMenuChoice('/about')}>
              About
            </MenuItem>
            <MenuItem onClick={() => handleMoreMenuChoice('/basics')}>
              Bar Basics
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
