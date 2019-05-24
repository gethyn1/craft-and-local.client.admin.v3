import { combineReducers } from 'redux'
import { createReducer, createCrudMetaReducer } from '../create-reducer'
import * as types from './types'

/**
 * State shape
 * {
 *   entities: Array,
 *   authenticate: {
 *     meta: {
 *       read: Object<Fetch Meta>
 *     }
 *   },
 *   validate: {
 *     meta: {
 *       read: Object<Fetch Meta>
 *     }
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
  // TODO: refactor `createCrudMetaReducer` so validate does not require nested `meta.read` property
  authenticate: combineReducers({
    meta: createCrudMetaReducer({ read: types.AUTHENTICATE_USER })
  }),
  validate: combineReducers({
    meta: createCrudMetaReducer({ read: types.VALIDATE_USER })
  })
})

export {
  reducer
}
