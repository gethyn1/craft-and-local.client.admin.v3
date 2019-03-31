import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchCategories = () => ({
  [CALL_API]: {
    endpoint: '/categories',
    types: types.READ
  }
})

export {
  fetchCategories
}
