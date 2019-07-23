import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchLocation = (id) => ({
  [CALL_API]: {
    endpoint: `/locations/${id}`,
    types: types.READ
  }
})

const updateField = (field) => ({
  type: types.LOCATION_FIELD_UPDATED,
  payload: field
})

// TO DO: abstract CALL_API into factory action, or validate schema in API service
const createLocation = ({ fields }) => ({
  [CALL_API]: {
    endpoint: `/locations`,
    method: 'POST',
    body: fields,
    types: types.CREATE,
    meta: {
      message: {
        loading: 'Creating location...',
        success: 'Location created successfully!!',
        error: 'Sorry .. there was an error creating the location'
      }
    }
  }
})

// TO DO: abstract CALL_API into factory action, or validate schema in API service
const saveLocation = ({ id, fields }) => ({
  [CALL_API]: {
    endpoint: `/locations/${id}`,
    method: 'POST',
    body: fields,
    types: types.UPDATE,
    meta: {
      message: {
        loading: 'Saving location...',
        success: 'Location saved successfully!!',
        error: 'Sorry .. there was an error saving the location'
      }
    }
  }
})

const resetLocation = () => ({
  type: types.LOCATION_RESET
})

export {
  fetchLocation,
  updateField,
  createLocation,
  saveLocation,
  resetLocation
}
