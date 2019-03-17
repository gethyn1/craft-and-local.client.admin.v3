import { combineReducers } from 'redux'
import { createReducer, createFetchMetaReducer } from '../create-reducer'
import * as types from './types'

/**
 * State shape
 * {
 *   entity: Array,
 *   pendingEntityUpdates: Object,
 *   meta: Object<Fetch Meta>
 * }
 */

const entityHandlers = {
  [types.PRODUCER_REQUEST_SUCCEEDED]: (state, action) => {
    return action.payload.producer
  }
}

const pendingEntityUpdatesHandlers = {
  [types.PRODUCER_FIELD_UPDATED]: (state, action) => ({
    ...state,
    [action.payload.key]: action.payload.value
  }),
  [types.PRODUCER_PERSIST_REQUEST_SUCCEEDED]: (state, action) => ({})
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  pendingEntityUpdates: createReducer({}, pendingEntityUpdatesHandlers),
  meta: combineReducers({
    read: createFetchMetaReducer({ types: [
      // TO DO: indicate that these are GET requests .. maybe??
      types.PRODUCER_REQUESTED,
      types.PRODUCER_REQUEST_SUCCEEDED,
      types.PRODUCER_REQUEST_FAILED
    ] }),
    update: createFetchMetaReducer({ types: [
      // TO DO: indicate that these are GET requests .. maybe??
      types.PRODUCER_PERSIST_REQUESTED,
      types.PRODUCER_PERSIST_REQUEST_SUCCEEDED,
      types.PRODUCER_PERSIST_REQUEST_FAILED
    ] })
  })
})

export {
  reducer
}
