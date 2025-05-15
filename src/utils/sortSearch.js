export function sortSearch(params) {
  const { sortOrder, searchTerm, drinks, category, booze } = params

  var sortedData = []
  var filteredData = drinks

  if (!drinks) {
    return []
  }

  // Filter by category first - defaults to all drinks
  if (category === 'ASH') {
    filteredData = drinks.filter((drink) => drink.ashleyfav == true)
  } else if (category === 'HOUSE') {
    filteredData = drinks.filter((drink) => drink.housefav == true)
  } else if (category === 'DOG') {
    filteredData = drinks.filter((drink) =>
      drink.category.flat().join(' ').toLowerCase().includes('irresistibulls')
    )
  }

  // Limit by booze types - multiple if present

  Object.keys(booze).forEach((key, index) => {
    if (booze[key].variant === 'contained') {
      filteredData = filteredData.filter(
        (drink) =>
          drink.ingredients
            .toLowerCase()
            .includes(booze[key].key.toLowerCase()) ||
          drink.category
            .flat()
            .join(' ')
            .toLowerCase()
            .includes(booze[key].key.toLowerCase())
      )
    }
  })

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

  // Sort data if data present - default sort is by date created
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
