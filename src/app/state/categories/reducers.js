import { combineReducers } from 'redux'
import { createReducer, createCrudMetaReducer } from '../create-reducer'
import * as types from './types'
import * as authenticated from '../authenticated'
import * as category from '../category'

/**
 * State shape
 * {
 *   entities: Array,
 *   meta: {
 *     read: Object<Fetch Meta>
 *   }
 * }
 */

const INITIAL_STATE = []

const entityHandlers = {
  [types.READ_CATEGORIES_SUCCEEDED]: (state, action) => {
    return action.payload
  },
  [authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]: () => {
    return INITIAL_STATE
  },
  [category.types.REMOVE_CATEGORY_SUCCEEDED]: (state, action) => {
    return state.filter(category => category.id !== action.payload.id)
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
