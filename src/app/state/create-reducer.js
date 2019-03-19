function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

const createFetchMetaReducer = ({ types }) => {
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

export {
  createReducer,
  createFetchMetaReducer
}
