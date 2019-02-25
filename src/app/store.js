import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

const producers = (state = [], action) => {
  return state
}

const preloadedState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = (store) => (next) => (action) => {
  console.log(action)
  return next(action)
}

const store = createStore(
  combineReducers({
    producers
  }),
  preloadedState,
  composeEnhancers(
    applyMiddleware(logger)
  )
)

export {
  store
}
