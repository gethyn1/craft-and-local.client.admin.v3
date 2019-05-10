import { combineReducers } from 'redux'
import { reducer as producers } from './producers'
import { reducer as producer } from './producer'
import { reducer as categories } from './categories'
import { reducer as category } from './category'
import { reducer as authenticated } from './authenticated'

const rootReducer = combineReducers({
  producers,
  producer,
  categories,
  category,
  authenticated
})

export {
  rootReducer
}
