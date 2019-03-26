import { store } from './store'
import { Dashboard } from './views/pages/dashboard'
import { Producers } from './views/pages/producers'
import { Producer } from './views/pages/producer'
import { Categories } from './views/pages/categories'
import { Category } from './views/pages/category'
import { Homepage } from './views/pages/homepage'
import { NotFound } from './views/pages/not-found'
import { producers, producer, categories, category } from './state'

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
      store.dispatch(producer.actions.fetchProducer(match.userId))
      store.dispatch(categories.actions.fetchCategories())
    },
    component: Producer
  },
  {
    path: '/categories',
    action: () => {
      store.dispatch(categories.actions.fetchCategories())
    },
    component: Categories
  },
  {
    path: '/categories/:id',
    action: ({ match }) => {
      store.dispatch(category.actions.fetchCategory(match.id))
    },
    component: Category
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
