import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchCategory = (id) => ({
  [CALL_API]: {
    endpoint: `/categories/${id}`,
    types: types.READ
  }
})

const updateField = (field) => ({
  type: types.CATEGORY_FIELD_UPDATED,
  payload: field
})

const resetCategory = () => ({
  type: types.CATEGORY_RESET
})

// TO DO: abstract CALL_API into factory action, or validate schema in API service
const createCategory = ({ fields }) => ({
  [CALL_API]: {
    endpoint: `/categories`,
    method: 'POST',
    body: fields,
    types: types.CREATE,
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
const saveCategory = ({ id, fields }) => ({
  [CALL_API]: {
    endpoint: `/categories/${id}`,
    method: 'POST',
    body: fields,
    types: types.UPDATE,
    meta: {
      message: {
        loading: 'Saving category...',
        success: 'Category saved successfully!!',
        error: 'Sorry .. there was an error saving the category'
      }
    }
  }
})

// TO DO: abstract CALL_API into factory action, or validate schema in API service
const deleteCategory = (id) => ({
  [CALL_API]: {
    endpoint: `/categories/${id}`,
    method: 'DELETE',
    body: { id },
    types: types.REMOVE,
    meta: {
      message: {
        loading: 'Deleting category...',
        success: 'Category deleted successfully!!',
        error: 'Sorry .. there was an error deleting the category'
      }
    }
  }
})

export {
  fetchCategory,
  updateField,
  resetCategory,
  createCategory,
  saveCategory,
  deleteCategory
}
