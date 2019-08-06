import { combineReducers } from 'redux'
import { reducer as locations } from './locations'
import { reducer as location } from './location'
import { reducer as categories } from './categories'
import { reducer as category } from './category'
import { reducer as authenticated } from './authenticated'
import { reducer as geocoding } from './geocoding'

const rootReducer = combineReducers({
  locations,
  location,
  categories,
  category,
  // TODO: rename `authenticated` to `user`
  authenticated,
  geocoding
})

export {
  rootReducer
}
