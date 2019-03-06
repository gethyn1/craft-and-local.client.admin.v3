import { combineReducers } from 'redux'
import { reducer as producers } from './producers'

const rootReducer = combineReducers({
  producers
})

export {
  rootReducer
}
