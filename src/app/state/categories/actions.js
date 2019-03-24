import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchCategories = () => ({
  [CALL_API]: {
    endpoint: '/categories',
    types: [
      types.CATEGORIES_REQUESTED,
      types.CATEGORIES_REQUEST_SUCCEEDED,
      types.CATEGORIES_REQUEST_FAILED
    ]
  }
})

export {
  fetchCategories
}
