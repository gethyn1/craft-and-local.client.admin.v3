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
    ...action.payload
  }),
  [types.PRODUCER_UPDATE_REQUEST_SUCCEEDED]: () => ({})
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  pendingEntityUpdates: createReducer({}, pendingEntityUpdatesHandlers),
  meta: combineReducers({
    read: createFetchMetaReducer({ types: [
      types.PRODUCER_REQUESTED,
      types.PRODUCER_REQUEST_SUCCEEDED,
      types.PRODUCER_REQUEST_FAILED
    ] }),
    update: createFetchMetaReducer({ types: [
      types.PRODUCER_UPDATE_REQUESTED,
      types.PRODUCER_UPDATE_REQUEST_SUCCEEDED,
      types.PRODUCER_UPDATE_REQUEST_FAILED
    ] })
  })
})

export {
  reducer
}
