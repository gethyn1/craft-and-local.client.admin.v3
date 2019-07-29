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

const entityHandlers = {
  [types.ADDRESS_LOOKUP_SUCCEEDED]: (state, action) => {
    return action.payload
  }
}

const reducer = combineReducers({
  entities: createReducer([], entityHandlers),
  meta: createCrudMetaReducer({
    read: types.ADDRESS_LOOKUP
  })
})

export {
  entityHandlers,
  reducer
}
