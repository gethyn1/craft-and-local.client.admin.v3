import { combineReducers } from 'redux'
import { createReducer, createCrudMetaReducer } from '../create-reducer'
import * as types from './types'
import * as authenticated from '../authenticated'
import * as location from '../location'

/**
 * State shape
 * {
 *   entities: Array<Location>,
 *   meta: {
 *     read: Object<Fetch Meta>
 *   }
 * }
 */

const INITIAL_STATE = []

const entityHandlers = {
  [types.READ_LOCATIONS_SUCCEEDED]: (state, action) => {
    return action.payload
  },
  [authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]: () => {
    return INITIAL_STATE
  },
  [location.types.REMOVE_LOCATION_SUCCEEDED]: (state, action) => {
    return state.filter(location => location.id !== action.payload.id)
  }
}

const reducer = combineReducers({
  entities: createReducer(INITIAL_STATE, entityHandlers),
  meta: createCrudMetaReducer({ read: types.READ })
})

export {
  entityHandlers,
  reducer
}
