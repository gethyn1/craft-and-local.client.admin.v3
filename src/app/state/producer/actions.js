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

const updateField = ({ key, value }) => ({
  type: types.PRODUCER_FIELD_UPDATED,
  payload: { key, value }
})

const saveProducer = (id, body) => ({
  [CALL_API]: {
    endpoint: `/producers/${id}`,
    method: 'POST',
    body,
    types: [
      types.PRODUCER_PERSIST_REQUESTED,
      types.PRODUCER_PERSIST_REQUEST_SUCCEEDED,
      types.PRODUCER_PERSIST_REQUEST_FAILED
    ]
  }
})

export {
  fetchProducer,
  updateField,
  saveProducer
}
