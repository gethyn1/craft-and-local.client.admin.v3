import { createStore, combineReducers } from 'redux'

const producers = (state = [], action) => {
  return state
}

const store = createStore(
  combineReducers({
    producers
  })
)

export {
  store
}
