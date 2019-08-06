import { __, includes } from 'ramda'
import { history } from '../../history'
import { AUTHENTICATE_USER_SUCCEEDED, VALIDATE_USER_SUCCEEDED } from './types'

const isAuthenticatedType = includes(__, [AUTHENTICATE_USER_SUCCEEDED, VALIDATE_USER_SUCCEEDED])

const handleLogin = (store) => (next) => (action) => {
  if (isAuthenticatedType(action.type)) {
    history.push('/locations', {})
  }

  next(action)
}

const middleware = [handleLogin]

export {
  handleLogin,
  middleware
}
