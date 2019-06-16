import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchProducer = (id) => ({
  [CALL_API]: {
    endpoint: `/producers/${id}`,
    types: types.READ
  }
})

const updateField = (field) => ({
  type: types.PRODUCER_FIELD_UPDATED,
  payload: field
})

// TO DO: abstract CALL_API into factory action, or validate schema in API service
const createProducer = ({ fields }) => ({
  [CALL_API]: {
    endpoint: `/producers`,
    method: 'POST',
    body: fields,
    types: types.CREATE,
    meta: {
      message: {
        loading: 'Creating producer...',
        success: 'Producer created successfully!!',
        error: 'Sorry .. there was an error creating the producer'
      }
    }
  }
})

// TO DO: abstract CALL_API into factory action, or validate schema in API service
const saveProducer = ({ userId, fields }) => ({
  [CALL_API]: {
    endpoint: `/producers/${userId}`,
    method: 'POST',
    body: fields,
    types: types.UPDATE,
    meta: {
      message: {
        loading: 'Saving producer...',
        success: 'Producer saved successfully!!',
        error: 'Sorry .. there was an error saving the producer'
      }
    }
  }
})

export {
  fetchProducer,
  updateField,
  createProducer,
  saveProducer
}
