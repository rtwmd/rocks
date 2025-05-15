import { IconButton, TextField, Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import CancelIcon from '@mui/icons-material/Cancel'

export default function SearchBar({
  filterParams,
  handleFilterButtons,
  showSearchBar,
  setShowSearchBar,
}) {
  var searchBar = ''

  const handleSearchInput = (event) => {
    handleFilterButtons({ ...filterParams, searchTerm: event.target.value })
  }
  const handleCancelSearch = () => {
    setShowSearchBar(false)
    handleFilterButtons({ ...filterParams, searchTerm: '' })
  }

  if (showSearchBar) {
    searchBar = (
      <Box>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            id="search-field"
            variant="filled"
            size="small"
            label="Enter Search Text"
            value={filterParams.searchTerm || ''}
            onChange={handleSearchInput}
          />
          <IconButton color="primary" onClick={() => handleCancelSearch()}>
            <CancelIcon />
          </IconButton>
        </Grid>
      </Box>
    )
  }

  return searchBar
}
