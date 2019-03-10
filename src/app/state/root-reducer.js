import { combineReducers } from 'redux'
import { reducer as producers } from './producers'
import { reducer as producer } from './producer'

const rootReducer = combineReducers({
  producers,
  producer
})

export {
  rootReducer
}
