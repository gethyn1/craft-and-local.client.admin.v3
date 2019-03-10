import { store } from './store'
import { Dashboard } from './views/pages/dashboard'
import { Producers } from './views/pages/producers'
import { Producer } from './views/pages/producer'
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
    action: () => {
      console.log('Dashboard route action')
    },
    component: Dashboard
  },
  {
    path: '/producers',
    action: () => {
      store.dispatch(producers.actions.fetchProducers())
    },
    component: Producers
  },
  {
    path: '/producers/:userId',
    action: ({ match }) => {
      console.log('Producer route action. MATCH:', match)
    },
    component: Producer
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
