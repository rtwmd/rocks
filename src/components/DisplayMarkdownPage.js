import React from 'react'
import ReactGA from 'react-ga4'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import MarkdownRenderer from './MarkdownRenderer'
import Footer from './Footer'
import NavBarSubPage from './NavBarSubPage'

export default function DisplayMarkdownPage({ props, mdFileName, crumb }) {
  const mdFile = `/md/${mdFileName}.md`

  React.useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: mdFileName,
      title: `${crumb} page`,
    })
  }, [])

  return (
    <Box className="mainContainer" sx={{ flexGrow: 1 }}>
      <NavBarSubPage />
      <div id="#back-to-top-anchor"></div>
      <Box className="drinkDisplay">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            component={RouterLink}
            to={'/'}
            underline="hover"
            color="inherit"
            style={{ cursor: 'pointer' }}
          >
            {sessionStorage.getItem('crumb') || 'All Drinks'}
          </Link>
          <Typography sx={{ color: 'text.primary' }}>{crumb}</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ px: 2 }}>
        <MarkdownRenderer file={mdFile} />
      </Box>
      <Footer />
    </Box>
  )
}
