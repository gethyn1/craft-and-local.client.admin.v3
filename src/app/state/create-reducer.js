import { combineReducers } from 'redux'
import { isNil } from 'ramda'

const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

const createFetchMetaReducer = ({ types }) => {
  if (isNil(types)) {
    return null
  }

  const initialState = {
    isLoading: false,
    hasLoaded: false,
    hasErrored: false
  }

  const [requested, succeeded, failed] = types

  return createReducer(initialState, {
    [requested]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        hasLoaded: false,
        hasErrored: false
      }
    },
    [succeeded]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        hasLoaded: true,
        hasErrored: false
      }
    },
    [failed]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        hasLoaded: false,
        hasErrored: true
      }
    }
  })
}

// TO DO: test createCrudMetaReducer()
const createCrudMetaReducer = ({ create, read, update, remove }) => {
  return combineReducers({
    create: createFetchMetaReducer({ types: create }),
    read: createFetchMetaReducer({ types: read }),
    update: createFetchMetaReducer({ types: update }),
    remove: createFetchMetaReducer({ types: remove })
  })
}

export {
  createReducer,
  createFetchMetaReducer,
  createCrudMetaReducer
}
