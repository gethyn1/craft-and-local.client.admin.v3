import { store } from './store'
import { Dashboard } from './views/pages/dashboard'
import { Homepage } from './views/pages/homepage'
import { NotFound } from './views/pages/not-found'
import { producers } from './state'

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
    action: () => store.dispatch(producers.actions.fetchProducers()),
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
