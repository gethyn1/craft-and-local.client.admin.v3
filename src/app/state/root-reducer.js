import { combineReducers } from 'redux'
import { reducer as producers } from './producers'
import { reducer as producer } from './producer'
import { reducer as categories } from './categories'

const rootReducer = combineReducers({
  producers,
  producer,
  categories
})

export {
  rootReducer
}
