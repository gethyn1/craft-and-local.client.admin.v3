import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchProducer = (id) => ({
  [CALL_API]: {
    endpoint: `/producers/${id}`,
    types: [
      types.PRODUCER_REQUESTED,
      types.PRODUCER_REQUEST_SUCCEEDED,
      types.PRODUCER_REQUEST_FAILED
    ]
  }
})

export {
  fetchProducer
}
