import { combineReducers } from 'redux'
import { path, isNil } from 'ramda'
import { createReducer, createCrudMetaReducer } from '../create-reducer'
import * as types from './types'

/**
 * State shape
 * {
 *   entities: Array,
 *   authenticate: {
 *     isAuthenticated: boolean,
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
    return action.payload
  }
}

const isAuthenticated = {
  [types.AUTHENTICATE_USER_SUCCEEDED]: (state, action) => {
    return true
  },
  [types.AUTHENTICATE_USER_REQUESTED]: (state, action) => {
    return false
  },
  [types.AUTHENTICATE_USER_FAILED]: (state, action) => {
    return false
  },
  [types.LOGOUT_USER_SUCCEEDED]: (state, action) => {
    return false
  },
  [types.VALIDATE_USER_SUCCEEDED]: (state, action) => {
    const isAuthenticated = path(['payload', 'isAuthenticated'], action)
    return isNil(isAuthenticated) ? false : isAuthenticated
  }
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  // TODO: refactor `createCrudMetaReducer` so validate does not require nested `meta.read` property
  authenticate: combineReducers({
    isAuthenticated: createReducer(false, isAuthenticated),
    meta: createCrudMetaReducer({ read: types.AUTHENTICATE_USER })
  }),
  validate: combineReducers({
    meta: createCrudMetaReducer({ read: types.VALIDATE_USER })
  })
})

export {
  reducer
}
