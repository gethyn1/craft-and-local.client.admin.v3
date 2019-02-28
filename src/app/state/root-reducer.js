import { combineReducers } from 'redux'
import { producers } from './producers'

const rootReducer = combineReducers({
  producers: producers.reducer
})

export {
  rootReducer
}
