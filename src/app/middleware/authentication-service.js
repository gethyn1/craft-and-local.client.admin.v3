import { authenticated } from '../state'
import { history } from '../history'

const authenticationService = (store) => (next) => (action) => {
  if (action.type === authenticated.types.LOGOUT_USER_SUCCEEDED) {
    history.push('/login', {})
  }

  next(action)
}

module.exports = {
  authenticationService
}
