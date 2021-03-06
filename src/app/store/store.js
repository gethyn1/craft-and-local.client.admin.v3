import { createStore, applyMiddleware, compose } from 'redux'
import { apiService, authenticationService } from '../middleware'
import { authenticated, rootReducer, category, location } from '../state'

const stateMiddleware = [
  ...authenticated.middleware,
  ...category.middleware,
  ...location.middleware
]

const preloadedState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(apiService, authenticationService, ...stateMiddleware)
  )
)

export {
  store
}
