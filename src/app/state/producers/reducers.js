import { combineReducers } from 'redux'
import { createReducer, createFetchMetaReducer } from '../create-reducer'
import * as types from './types'

/**
 * State shape
 * {
 *   entities: Array,
 *   meta: Object<Fetch Meta>
 * }
 */

const entityHandlers = {
  [types.PRODUCERS_REQUEST_SUCCEEDED]: (state, action) => {
    return action.payload.producers
  }
}

const reducer = combineReducers({
  entities: createReducer([], entityHandlers),
  meta: combineReducers({
    read: createFetchMetaReducer({ types: [
      // TO DO: indicate that these are GET requests .. maybe??
      types.PRODUCERS_REQUESTED,
      types.PRODUCERS_REQUEST_SUCCEEDED,
      types.PRODUCERS_REQUEST_FAILED
    ] })
  })
})

export {
  reducer
}
