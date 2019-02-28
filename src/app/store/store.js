import { createStore, applyMiddleware, compose } from 'redux'
import { apiService } from '../middleware/api-service'
import { rootReducer } from '../state'

const preloadedState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(apiService)
  )
)

export {
  store
}
