import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { apiService } from './api-service'

const producers = (state = [], action) => {
  return state
}

const preloadedState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    producers
  }),
  preloadedState,
  composeEnhancers(
    applyMiddleware(apiService)
  )
)

export {
  store
}
