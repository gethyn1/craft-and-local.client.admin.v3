import { combineReducers } from 'redux'
import { reducer as producers } from './producers'
import { reducer as producer } from './producer'
import { reducer as categories } from './categories'
import { reducer as category } from './category'

const rootReducer = combineReducers({
  producers,
  producer,
  categories,
  category
})

export {
  rootReducer
}
