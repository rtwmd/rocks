import { useState, useEffect } from 'react'

export default function useLoadDrink(loadType) {
  const [state, setState] = useState({
    isLoading: true,
    error: false,
    status: null,
    message: '',
    data: null,
  })

  useEffect(() => {
    const fetchDrinks = async () => {
      setState({
        isLoading: true,
        error: false,
        status: null,
        message: '',
        data: null,
      })

      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/cocktails.json`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        )

        if (!response.ok) {
          setState({
            isLoading: false,
            error: true,
            status: response.status,
            message: response.statusText,
            data: null,
          })
          return
        }

        const drinks = await response.json()

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
