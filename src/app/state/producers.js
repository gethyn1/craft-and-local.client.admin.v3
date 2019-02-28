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

const handlers = {
  [types.PRODUCERS_REQUEST_SUCCEEDED]: (state, action) => {
    return action.payload.producers
  }
}

const reducer = createReducer(['test'], handlers)

export const producers = {
  types,
  fetchProducers,
  reducer
}
