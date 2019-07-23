import { combineReducers } from 'redux'
import { reducer as locations } from './locations'
import { reducer as location } from './location'
import { reducer as producers } from './producers'
import { reducer as producer } from './producer'
import { reducer as categories } from './categories'
import { reducer as category } from './category'
import { reducer as authenticated } from './authenticated'

const rootReducer = combineReducers({
  locations,
  location,
  producers,
  producer,
  categories,
  category,
  // TODO: rename `authenticated` to `user`
  authenticated
})

export {
  rootReducer
}
