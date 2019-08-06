import { history } from '../../history'
import { CREATE_LOCATION_SUCCEEDED } from './types'

const handleLocationCreated = (store) => (next) => (action) => {
  if (action.type === CREATE_LOCATION_SUCCEEDED) {
    history.push(`/locations/${action.payload.id}`, {})
  }

  next(action)
}

const middleware = [handleLocationCreated]

export {
  handleLocationCreated,
  middleware
}
