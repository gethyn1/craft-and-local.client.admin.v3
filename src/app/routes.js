import { store } from './store'
import { producers, producer, categories, category } from './state'

const handleImportError = (error) => console.log('Error importing route:', error)

const routes = [
  {
    path: '/',
    action: () => {
      console.log('Homepage route action')
      store.dispatch({
        type: 'HOMEPAGE_ACTION'
      })
    },
    component: import('./views/pages/homepage').then(({ Homepage }) => Homepage, handleImportError)
  },
  {
    path: '/dashboard',
    action: () => {
      console.log('Dashboard route action')
    },
    component: import('./views/pages/dashboard').then(({ Dashboard }) => Dashboard, handleImportError)
  },
  {
    path: '/producers',
    action: () => {
      store.dispatch(producers.actions.fetchProducers())
    },
    component: import('./views/pages/producers').then(({ Producers }) => Producers, handleImportError)
  },
  {
    path: '/producers/:userId',
    action: ({ match }) => {
      store.dispatch(producer.actions.fetchProducer(match.userId))
      store.dispatch(categories.actions.fetchCategories())
    },
    component: import('./views/pages/producer').then(({ Producer }) => Producer, handleImportError)
  },
  {
    path: '/categories',
    action: () => {
      store.dispatch(categories.actions.fetchCategories())
    },
    component: import('./views/pages/categories').then(({ Categories }) => Categories, handleImportError)
  },
  {
    path: '/categories/create',
    action: () => {},
    component: import('./views/pages/category').then(({ Category }) => Category, handleImportError)
  },
  {
    path: '/categories/:id',
    action: ({ match }) => {
      store.dispatch(category.actions.fetchCategory(match.id))
    },
    component: import('./views/pages/category').then(({ Category }) => Category, handleImportError)
  },
  {
    path: '/error',
    action: () => {
      console.log('Error route action')
    },
    component: import('./views/pages/not-found').then(({ NotFound }) => NotFound, handleImportError)
  }
]

export {
  routes
}
