import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

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

export {
  fetchProducers
}
