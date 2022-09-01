import { useNavigate } from '@tanstack/react-location'
import useLogger from 'components/Logger/use-logger'
import React from 'react'
import { routes } from 'routes'
import randomNumber from 'utils/random-number'

const RedirectEffect = () => {
  const navigate = useNavigate()
  const { log } = useLogger(RedirectEffect.name)

  const handleRedirect = () => {
    const route = routes[randomNumber(0, routes.length - 1)]
    log(`Redirecting to: ${route.path}`)
    setTimeout(() => {
      navigate({ to: `/${route.path}`, replace: false })
    }, 1500)
  }

  return <button onClick={() => handleRedirect()}>Redirect me!</button>
}

export default RedirectEffect
