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
  [types.CATEGORY_REQUEST_SUCCEEDED]: (state, action) => {
    return action.payload.category
  }
}

const pendingEntityUpdatesHandlers = {
  [types.CATEGORY_FIELD_UPDATED]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [types.CATEGORY_UPDATE_REQUEST_SUCCEEDED]: () => ({})
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  pendingEntityUpdates: createReducer({}, pendingEntityUpdatesHandlers),
  meta: combineReducers({
    create: createFetchMetaReducer({ types: [
      types.CATEGORY_CREATE_REQUESTED,
      types.CATEGORY_CREATE_REQUEST_SUCCEEDED,
      types.CATEGORY_CREATE_REQUEST_FAILED
    ] }),
    read: createFetchMetaReducer({ types: [
      types.CATEGORY_REQUESTED,
      types.CATEGORY_REQUEST_SUCCEEDED,
      types.CATEGORY_REQUEST_FAILED
    ] }),
    update: createFetchMetaReducer({ types: [
      types.CATEGORY_UPDATE_REQUESTED,
      types.CATEGORY_UPDATE_REQUEST_SUCCEEDED,
      types.CATEGORY_UPDATE_REQUEST_FAILED
    ] })
  })
})

export {
  reducer
}
