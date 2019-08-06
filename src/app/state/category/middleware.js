import { history } from '../../history'
import { CREATE_CATEGORY_SUCCEEDED } from './types'

const handleCategoryCreated = (store) => (next) => (action) => {
  if (action.type === CREATE_CATEGORY_SUCCEEDED) {
    history.push(`/categories/${action.payload.id}`, {})
  }

  next(action)
}

const middleware = [handleCategoryCreated]

export {
  handleCategoryCreated,
  middleware
}
