import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchCategory = (id) => ({
  [CALL_API]: {
    endpoint: `/categories/${id}`,
    types: [
      types.CATEGORY_REQUESTED,
      types.CATEGORY_REQUEST_SUCCEEDED,
      types.CATEGORY_REQUEST_FAILED
    ]
  }
})

const updateField = (field) => ({
  type: types.CATEGORY_FIELD_UPDATED,
  payload: field
})

// TO DO: abstract CALL_API into factory action, or validate schema in API service
const createCategory = (id, body) => ({
  [CALL_API]: {
    endpoint: `/categories`,
    method: 'POST',
    body,
    types: [
      types.CATEGORY_CREATE_REQUESTED,
      types.CATEGORY_CREATE_REQUEST_SUCCEEDED,
      types.CATEGORY_CREATE_REQUEST_FAILED
    ],
    meta: {
      message: {
        loading: 'Creating category...',
        success: 'Category created successfully!!',
        error: 'Sorry .. there was an error creating the category'
      }
    }
  }
})

// TO DO: abstract CALL_API into factory action, or validate schema in API service
const saveCategory = (id, body) => ({
  [CALL_API]: {
    endpoint: `/categories/${id}`,
    method: 'POST',
    body,
    types: [
      types.CATEGORY_UPDATE_REQUESTED,
      types.CATEGORY_UPDATE_REQUEST_SUCCEEDED,
      types.CATEGORY_UPDATE_REQUEST_FAILED
    ],
    meta: {
      message: {
        loading: 'Saving category...',
        success: 'Category saved successfully!!',
        error: 'Sorry .. there was an error saving the category'
      }
    }
  }
})

export {
  fetchCategory,
  updateField,
  createCategory,
  saveCategory
}
