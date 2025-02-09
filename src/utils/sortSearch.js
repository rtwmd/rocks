export function sortSearch(sortOrder, searchTerm, drinks, searchType = 'ALL') {
  var sortedData = []
  var filteredData = drinks

  if (!drinks) {
    return []
  }

  // Filter by search type
  if (searchType === 'ASH') {
    filteredData = drinks.filter((drink) => drink.ashleyfav == true)
  } else if (searchType === 'HOUSE') {
    filteredData = drinks.filter((drink) => drink.housefav == true)
  } else if (searchType === 'CATEGORY') {
    filteredData = drinks.filter((drink) =>
      drink.category
        .flat()
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  } else if (searchType === 'DOG') {
    filteredData = drinks.filter((drink) =>
      drink.category.flat().join(' ').toLowerCase().includes('irresistibulls')
    )
  }

  // Apply search criteria
  const searchedData = filteredData.filter(
    (drink) =>
      drink.tags
        .flat()
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      drink.ingredients.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.category
        .flat()
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )

  // Sort data if data present
  if (searchedData) {
    if (sortOrder === 'AZ') {
      sortedData = searchedData.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder === 'ZA') {
      sortedData = searchedData.sort((a, b) => b.title.localeCompare(a.title))
    } else {
      sortedData = searchedData.sort((a, b) =>
        b.created.localeCompare(a.created)
      )
    }
    return sortedData
  } else {
    return searchedData
  }
}
