import { createStore, applyMiddleware, compose } from 'redux'
import { apiService, authenticationService } from '../middleware'
import { rootReducer, category, location } from '../state'

const stateMiddleware = [...category.middleware, ...location.middleware]

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
