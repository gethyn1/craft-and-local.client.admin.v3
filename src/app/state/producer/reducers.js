import { combineReducers } from 'redux'
import { createReducer, createFetchMetaReducer } from '../create-reducer'
import * as types from './types'

/**
 * State shape
 * {
 *   entity: Array,
 *   meta: Object<Fetch Meta>
 * }
 */

const entityHandlers = {
  [types.PRODUCER_REQUEST_SUCCEEDED]: (state, action) => {
    return action.payload.producer
  }
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  meta: createFetchMetaReducer({ types: [
    // TO DO: indicate that these are GET requests .. maybe??
    types.PRODUCER_REQUESTED,
    types.PRODUCER_REQUEST_SUCCEEDED,
    types.PRODUCER_REQUEST_FAILED
  ] })
})

export {
  reducer
}
