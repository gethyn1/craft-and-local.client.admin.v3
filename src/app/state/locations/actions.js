import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchLocations = () => ({
  [CALL_API]: {
    endpoint: '/locations',
    types: types.READ
  }
})

export {
  fetchLocations
}
