import pathToRegexp from 'path-to-regexp'

/**
 *
 * 1. Iterate over all routes
 * 2. Create a pattern for each route with pathToRegexp()
 * 3. exec() that pattern against window.location (location.pathname)
 * 4. If exec() returns a match:
 * 5. - Break the iteration
 * 7. - Construct an object from keys and the result of exec() for params
 * 6. - Call the action for the iteratee (route) passing in the params object
 * 7. - Return the component for the iteratee (route)
 */

const applyParameter = (match) => (acc, key, index) => ({
  ...acc,
  [key.name]: match[index]
})

const matchURI = (path, uri) => {
  const keys = []
  const pattern = pathToRegexp(path, keys)
  const match = pattern.exec(uri)

  if (!match) {
    return null
  }

  return keys.reduce(applyParameter(match.slice(1)), {})
}

const resolve = (routes, location) => {
  const uri = location.pathname

  for (let i = 0; i < routes.length; i++) {
    const params = matchURI(routes[i].path, uri)

    if (!params) {
      continue
    }

    routes[i].action({ match: params })
    return routes[i].component
  }

  throw new Error('Route not found')
}

const router = {
  resolve
}

export {
  matchURI,
  resolve,
  router
}
