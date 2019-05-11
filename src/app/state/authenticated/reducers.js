import { combineReducers } from 'redux'
import { createReducer, createCrudMetaReducer } from '../create-reducer'
import * as types from './types'

/**
 * State shape
 * {
 *   entities: Array,
 *   meta: {
 *     read: Object<Fetch Meta>
 *   }
 * }
 */

// TODO don't add password to the store
const entityHandlers = {
  [types.AUTHENTICATE_USER_SUCCEEDED]: (state, action) => {
    return action.payload.user
  }
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  meta: createCrudMetaReducer({ read: types.AUTHENTICATE_USER })
})

export {
  reducer
}
