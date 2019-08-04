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

const entityHandlers = {
  [types.READ_CATEGORY_SUCCEEDED]: (state, action) => {
    return action.payload
  },
  [types.CATEGORY_RESET]: (state, action) => {
    return null
  },
  [authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]: () => {
    return null
  }
}

const pendingEntityUpdatesHandlers = {
  [types.CATEGORY_FIELD_UPDATED]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [types.UPDATE_CATEGORY_SUCCEEDED]: () => ({})
}

const reducer = combineReducers({
  entity: createReducer(null, entityHandlers),
  pendingEntityUpdates: createReducer({}, pendingEntityUpdatesHandlers),
  meta: createCrudMetaReducer({
    create: types.CREATE,
    read: types.READ,
    update: types.UPDATE,
    remove: types.REMOVE
  })
})

export {
  entityHandlers,
  pendingEntityUpdatesHandlers,
  reducer
}
