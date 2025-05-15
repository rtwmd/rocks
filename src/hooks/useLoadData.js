import { useState, useEffect } from 'react'

export default function useLoadData(loadType) {
  const [state, setState] = useState({
    isLoading: true,
    error: false,
    status: null,
    message: '',
    data: null,
  })

  const mapIngredients = (barmenu, barstock) => {
    // Create a lookup dictionary for barstock items
    const stockLookup = barstock.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})

    // Process each drink in the barmenu
    return barmenu.map((drink) => {
      const updatedComponents = drink.components.map((component) => {
        const stockItem = stockLookup[component.item]
        if (stockItem) {
          return {
            ...component,
            longname: stockItem.longname,
            url: stockItem.url,
            category: stockItem.category,
          }
        }
        return component
      })

      const ingredientsList = updatedComponents
        .map((component) => stockLookup[component.item]?.shortname)
        .filter(Boolean)

      return {
        ...drink,
        components: updatedComponents,
        ingredients: ingredientsList.join(', '),
      }
    })
  }

  useEffect(() => {
    const fetchDrinks = async () => {
      setState({
        isLoading: true,
        error: false,
        status: null,
        message: '',
        data: null,
      })

      // Load the drink menu items
      try {
        const menuResponse = await fetch(
          `${process.env.PUBLIC_URL}/barmenu.json`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        )

        if (!menuResponse.ok) {
          setState({
            isLoading: false,
            error: true,
            status: menuResponse.status,
            message: menuResponse.statusText,
            data: null,
          })
          return
        }
        // Load the components

        const componentResponse = await fetch(
          `${process.env.PUBLIC_URL}/barstock.json`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        )

        if (!componentResponse.ok) {
          setState({
            isLoading: false,
            error: true,
            status: componentResponse.status,
            message: componentResponse.statusText,
            data: null,
          })
          return
        }

        const menu = await menuResponse.json()
        const components = await componentResponse.json()
        const drinks = mapIngredients(menu, components)

        if (loadType === 'ALL') {
          const sortedData = drinks.sort((a, b) =>
            b.created.localeCompare(a.created)
          )
          setState({
            isLoading: false,
            error: false,
            status: 200,
            message: 'Success',
            data: sortedData,
          })
        } else {
          const singleDrink = drinks.find((d) => d.slug === loadType)
          if (singleDrink) {
            setState({
              isLoading: false,
              error: false,
              status: 200,
              message: 'Success',
              data: singleDrink,
            })
          } else {
            setState({
              isLoading: false,
              error: true,
              status: 404,
              message: `Drink with slug ${loadType} not found.`,
              data: null,
            })
          }
        }
      } catch (err) {
        setState({
          isLoading: false,
          error: true,
          status: 999,
          message: err.message,
          data: null,
        })
      }
    }

    fetchDrinks()
  }, [loadType])

  return state
}
