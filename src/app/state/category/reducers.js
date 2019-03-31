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
  [types.READ_CATEGORY_SUCCEEDED]: (state, action) => {
    return action.payload.category
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
  meta: combineReducers({
    create: createFetchMetaReducer({ types: types.CREATE }),
    read: createFetchMetaReducer({ types: types.READ }),
    update: createFetchMetaReducer({ types: types.UPDATE }),
    remove: createFetchMetaReducer({ types: types.REMOVE })
  })
})

export {
  reducer
}
