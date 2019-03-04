import { combineReducers } from 'redux'
import { CALL_API } from '../middleware/api-service'
import { createReducer } from './create-reducer'

const types = {
  PRODUCERS_REQUESTED: 'producers/PRODUCERS_REQUESTED',
  PRODUCERS_REQUEST_SUCCEEDED: 'producers/PRODUCERS_REQUEST_SUCCEEDED',
  PRODUCERS_REQUEST_FAILED: 'producers/PRODUCERS_REQUEST_FAILED'
}

const fetchProducers = () => ({
  [CALL_API]: {
    endpoint: '/producers',
    types: [
      types.PRODUCERS_REQUESTED,
      types.PRODUCERS_REQUEST_SUCCEEDED,
      types.PRODUCERS_REQUEST_FAILED
    ]
  }
})

const entityHandlers = {
  [types.PRODUCERS_REQUEST_SUCCEEDED]: (state, action) => {
    return action.payload.producers
  }
}

const initialMetaState = {
  isFetching: false,
  hasLoaded: false,
  hasErrored: false
}

const metaHandlers = {
  [types.PRODUCERS_REQUESTED]: (state, action) => {
    return {
      ...state,
      isFetching: true,
      hasLoaded: false,
      hasErrored: false
    }
  },
  [types.PRODUCERS_REQUEST_SUCCEEDED]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      hasLoaded: true,
      hasErrored: false
    }
  },
  [types.PRODUCERS_REQUEST_FAILED]: (state, action) => {
    return {
      ...state,
      isFetching: false,
      hasLoaded: false,
      hasErrored: true
    }
  }
}

const reducer = combineReducers({
  entities: createReducer([], entityHandlers),
  meta: createReducer(initialMetaState, metaHandlers)
})

export const producers = {
  types,
  fetchProducers,
  reducer
}
