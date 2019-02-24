import { pathEq } from 'ramda'

const getRoute = (routes, pathname) => routes.find(pathEq(['path'], pathname))

const resolve = (routes, location) => {
  const route = getRoute(routes, location.pathname)

  if (!route) {
    throw new Error('Route not Found')
  }

  route.action()
  return route.component
}

const router = {
  resolve
}

export {
  router
}
