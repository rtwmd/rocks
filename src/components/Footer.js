import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import Grid from '@mui/material/Grid2'
import InstagramIcon from '@mui/icons-material/Instagram'

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.600', py: 1 }}>
      <Grid
        maxWidth="lg"
        container
        spacing={2}
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="whitesmoke" align="left">
          {'Copyright © '}
          {new Date().getFullYear()}
          {' The Irresistibulls '}
        </Typography>
        <Link
          href="https://www.instagram.com/the_irresistibulls/"
          underline="none"
          color="whitesmoke"
        >
          <InstagramIcon size="small" />
        </Link>
      </Grid>
    </Box>
  )
}

export default Footer
