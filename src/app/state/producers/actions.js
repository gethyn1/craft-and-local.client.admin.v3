import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const fetchProducers = () => ({
  [CALL_API]: {
    endpoint: '/producers',
    types: types.READ
  }
})

export {
  fetchProducers
}
