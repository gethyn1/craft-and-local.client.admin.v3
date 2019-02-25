import { store } from './store'
import { Dashboard } from './views/pages/dashboard'
import { Homepage } from './views/pages/homepage'
import { NotFound } from './views/pages/not-found'

const CALL_API = 'CALL_API'

const routes = [
  {
    path: '/',
    action: () => {
      console.log('Homepage route action')
      store.dispatch({
        type: 'HOMEPAGE_ACTION'
      })
    },
    component: Homepage
  },
  {
    path: '/dashboard',
    action: () => {
      console.log('Dashboard route action')
      store.dispatch({
        [CALL_API]: {
          endpoint: '/producers',
          types: ['PRODUCERS_REQUESTED', 'PRODUCERS_REQUEST_SUCCEEDED', 'PRODUCERS_REQUEST_FAILED']
        }
      })
    },
    component: Dashboard
  },
  {
    path: '/error',
    action: () => {
      console.log('Error route action')
    },
    component: NotFound
  }
]

export {
  routes
}
