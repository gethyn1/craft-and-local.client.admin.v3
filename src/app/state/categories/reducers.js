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
  [types.READ_CATEGORIES_SUCCEEDED]: (state, action) => {
    return action.payload.categories
  }
}

const reducer = combineReducers({
  entities: createReducer([], entityHandlers),
  meta: createCrudMetaReducer({ read: types.READ })
})

export {
  reducer
}
