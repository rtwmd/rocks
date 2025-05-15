import { useState, useEffect } from 'react'
import {
  ButtonGroup,
  Button,
  Dialog,
  Typography,
  DialogContent,
  Divider,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import PetsIcon from '@mui/icons-material/Pets'
import LiquorIcon from '@mui/icons-material/Liquor'

export default function FilterDialog({
  onClose,
  open,
  handleFilterButtons,
  filterParams,
  resetFilterParams,
}) {
  const [categoryButtons, setCategoryButtons] = useState({
    all:
      filterParams.category === 'ALL'
        ? { variant: 'contained', color: 'white' }
        : { variant: 'outlined', color: 'darkgreen' },
    ash:
      filterParams.category === 'ASH'
        ? { variant: 'contained', color: 'white' }
        : { variant: 'outlined', color: 'pink' },
    dog:
      filterParams.category === 'DOG'
        ? { variant: 'contained', color: 'white' }
        : { variant: 'outlined', color: 'brown' },
    house:
      filterParams.category === 'HOUSE'
        ? { variant: 'contained', color: 'white' }
        : { variant: 'outlined', color: '#357EC7' },
  })
  const [sortButtons, setSortButtons] = useState({
    new: filterParams.sortOrder === 'NEW' ? 'contained' : 'outlined',
    az: filterParams.sortOrder === 'AZ' ? 'contained' : 'outlined',
    za: filterParams.sortOrder === 'ZA' ? 'contained' : 'outlined',
  })

  const toggleBoozeButtons = (value) => {
    if (!value) {
      return
    }
    var boozeList = filterParams.booze
    if (boozeList.vodka.key === value) {
      if (boozeList.vodka.variant === 'outlined') {
        boozeList.vodka.variant = 'contained'
      } else {
        boozeList.vodka.variant = 'outlined'
      }
    } else if (boozeList.gin.key === value) {
      if (boozeList.gin.variant === 'outlined') {
        boozeList.gin.variant = 'contained'
      } else {
        boozeList.gin.variant = 'outlined'
      }
    } else if (boozeList.tequila.key === value) {
      if (boozeList.tequila.variant === 'outlined') {
        boozeList.tequila.variant = 'contained'
      } else {
        boozeList.tequila.variant = 'outlined'
      }
    } else if (boozeList.whiskey.key === value) {
      if (boozeList.whiskey.variant === 'outlined') {
        boozeList.whiskey.variant = 'contained'
      } else {
        boozeList.whiskey.variant = 'outlined'
      }
    } else if (boozeList.sparkling.key === value) {
      if (boozeList.sparkling.variant === 'outlined') {
        boozeList.sparkling.variant = 'contained'
      } else {
        boozeList.sparkling.variant = 'outlined'
      }
    }
    handleFilterButtons({ ...filterParams, booze: boozeList })
  }

  useEffect(() => {
    setCategoryButtons({
      all:
        filterParams.category === 'ALL'
          ? { variant: 'contained', color: 'white' }
          : { variant: 'outlined', color: 'darkgreen' },
      ash:
        filterParams.category === 'ASH'
          ? { variant: 'contained', color: 'white' }
          : { variant: 'outlined', color: 'pink' },
      dog:
        filterParams.category === 'DOG'
          ? { variant: 'contained', color: 'white' }
          : { variant: 'outlined', color: 'brown' },
      house:
        filterParams.category === 'HOUSE'
          ? { variant: 'contained', color: 'white' }
          : { variant: 'outlined', color: '#357EC7' },
    })
    setSortButtons({
      new: filterParams.sortOrder === 'NEW' ? 'contained' : 'outlined',
      az: filterParams.sortOrder === 'AZ' ? 'contained' : 'outlined',
      za: filterParams.sortOrder === 'ZA' ? 'contained' : 'outlined',
    })
    toggleBoozeButtons()
  }, [filterParams])

  const handleClose = () => {
    onClose()
  }
  const handleCategoryChange = (value) => {
    handleFilterButtons({ ...filterParams, category: value })
  }
  const handleSortChange = (value) => {
    handleFilterButtons({ ...filterParams, sortOrder: value })
  }
  const handleReset = () => {
    resetFilterParams()
  }

  return (
    <Dialog open={open}>
      <DialogContent sx={{ background: 'whitesmoke', mt: 1 }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mx: 1, mb: 1 }}
        >
          <Typography variant="h6">Irresistibull Favorites</Typography>
          <ButtonGroup
            key="category"
            orientation="vertical"
            size="small"
            aria-label="Category group"
          >
            <Button
              variant={categoryButtons.all.variant}
              onClick={() => handleCategoryChange('ALL')}
              startIcon={
                <LiquorIcon
                  fontSize="small"
                  sx={{ color: categoryButtons.all.color }}
                />
              }
            >
              All Drinks
            </Button>
            <Button
              variant={categoryButtons.ash.variant}
              onClick={() => handleCategoryChange('ASH')}
              startIcon={
                <FavoriteIcon
                  fontSize="small"
                  sx={{ color: categoryButtons.ash.color }}
                />
              }
            >
              Ashley's Favorites
            </Button>
            <Button
              variant={categoryButtons.dog.variant}
              onClick={() => handleCategoryChange('DOG')}
              startIcon={
                <PetsIcon
                  fontSize="small"
                  sx={{ color: categoryButtons.dog.color }}
                />
              }
            >
              Irresistibulls
            </Button>
            <Button
              variant={categoryButtons.house.variant}
              onClick={() => handleCategoryChange('HOUSE')}
              startIcon={
                <HomeIcon
                  fontSize="small"
                  sx={{ color: categoryButtons.house.color }}
                />
              }
            >
              House Favorites
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mx: 1, mb: 1 }}
        >
          <Typography variant="h6">Select Booze Type</Typography>
          <Grid
            container
            key="booze"
            aria-label="Booze type group"
            spacing={1}
            sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Button
              key="VODKA"
              size="small"
              variant={filterParams.booze.vodka.variant}
              onClick={() => toggleBoozeButtons('VODKA')}
            >
              Vodka
            </Button>
            <Button
              key="GIN"
              size="small"
              variant={filterParams.booze.gin.variant}
              onClick={() => toggleBoozeButtons('GIN')}
            >
              Gin
            </Button>
            <Button
              key="TEQUILA"
              size="small"
              variant={filterParams.booze.tequila.variant}
              onClick={() => toggleBoozeButtons('TEQUILA')}
            >
              Tequila
            </Button>
            <Button
              key="WHISKEY"
              size="small"
              variant={filterParams.booze.whiskey.variant}
              onClick={() => toggleBoozeButtons('WHISKEY')}
            >
              Whiskey
            </Button>
            <Button
              key="SPARKLING"
              size="small"
              variant={filterParams.booze.sparkling.variant}
              onClick={() => toggleBoozeButtons('SPARKLING')}
            >
              Sparking Wine
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mx: 1, mb: 1 }}
        >
          <Typography variant="h6">Sort Order</Typography>
          <ButtonGroup
            key="sortGroup"
            size="small"
            aria-label="Sort button group"
          >
            <Button
              key="NEW"
              variant={sortButtons.new}
              onClick={() => handleSortChange('NEW')}
            >
              Newest First
            </Button>
            <Button
              key="AZ"
              variant={sortButtons.az}
              onClick={() => handleSortChange('AZ')}
            >
              A {'\u2192'} Z
            </Button>
            <Button
              key="ZA"
              variant={sortButtons.za}
              onClick={() => handleSortChange('ZA')}
            >
              Z {'\u2192'} A
            </Button>
          </ButtonGroup>
        </Grid>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Grid container sx={{ my: 2, justifyContent: 'space-around' }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleReset()}
          >
            Clear Filters
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleClose()}
          >
            Accept
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
