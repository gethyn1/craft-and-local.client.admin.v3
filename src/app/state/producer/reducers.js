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

const transientHandlers = {
  [types.PRODUCER_REQUEST_SUCCEEDED]: (state, action) => {
    return action.payload.producer
  },
  [types.PRODUCER_FIELD_UPDATED]: (state, action) => {
    console.log('ACTION', action)
    return {
      ...state,
      [action.payload.key]: action.payload.value
    }
  }
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  transient: createReducer(null, transientHandlers),
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
