import { combineReducers } from 'redux'
import { createReducer, createCrudMetaReducer } from '../create-reducer'
import * as types from './types'
import * as authenticated from '../authenticated'

/**
 * State shape
 * {
 *   entity: Array,
 *   pendingEntityUpdates: Object,
 *   meta: {
 *     read: Object<Fetch Meta>,
 *     update: Object<Fetch Meta>,
 *     remove: Object<Fetch Meta>
 *   }
 * }
 */

const INITIAL_STATE = null

const entityHandlers = {
  [types.READ_LOCATION_SUCCEEDED]: (state, action) => {
    return action.payload
  },
  [types.LOCATION_RESET]: (state, action) => {
    return INITIAL_STATE
  },
  [authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]: () => {
    return INITIAL_STATE
  }
}

const pendingEntityUpdatesHandlers = {
  [types.LOCATION_FIELD_UPDATED]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [types.UPDATE_LOCATION_SUCCEEDED]: () => ({})
}

const reducer = combineReducers({
  entity: createReducer(INITIAL_STATE, entityHandlers),
  pendingEntityUpdates: createReducer({}, pendingEntityUpdatesHandlers),
  meta: createCrudMetaReducer({
    read: types.READ,
    update: types.UPDATE
  })
})

export {
  entityHandlers,
  pendingEntityUpdatesHandlers,
  reducer
}
