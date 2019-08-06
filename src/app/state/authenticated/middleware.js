import { history } from '../../history'
import { AUTHENTICATE_USER_SUCCEEDED } from './types'

const handleLogin = (store) => (next) => (action) => {
  if (action.type === AUTHENTICATE_USER_SUCCEEDED) {
    history.push('/locations', {})
  }

  next(action)
}

const middleware = [handleLogin]

export {
  handleLogin,
  middleware
}
