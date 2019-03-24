import { combineReducers } from 'redux'
import { createReducer, createFetchMetaReducer } from '../create-reducer'
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
  [types.CATEGORIES_REQUEST_SUCCEEDED]: (state, action) => {
    return action.payload.categories
  }
}

const reducer = combineReducers({
  entities: createReducer([], entityHandlers),
  meta: combineReducers({
    read: createFetchMetaReducer({ types: [
      types.CATEGORIES_REQUESTED,
      types.CATEGORIES_REQUEST_SUCCEEDED,
      types.CATEGORIES_REQUEST_FAILED
    ] })
  })
})

export {
  reducer
}
