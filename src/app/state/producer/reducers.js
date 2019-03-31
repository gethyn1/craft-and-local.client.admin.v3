import { combineReducers } from 'redux'
import { createReducer, createFetchMetaReducer } from '../create-reducer'
import * as types from './types'

/**
 * State shape
 * {
 *   entity: Array,
 *   pendingEntityUpdates: Object,
 *   meta: {
 *     read: Object<Fetch Meta>,
 *     update: Object<Fetch Meta>
 *   }
 * }
 */

const entityHandlers = {
  [types.READ_PRODUCER_SUCCEEDED]: (state, action) => {
    return action.payload.producer
  }
}

const pendingEntityUpdatesHandlers = {
  [types.PRODUCER_FIELD_UPDATED]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [types.UPDATE_PRODUCER_SUCCEEDED]: () => ({})
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  pendingEntityUpdates: createReducer({}, pendingEntityUpdatesHandlers),
  meta: combineReducers({
    read: createFetchMetaReducer({ types: types.READ }),
    update: createFetchMetaReducer({ types: types.UPDATE })
  })
})

export {
  reducer
}
