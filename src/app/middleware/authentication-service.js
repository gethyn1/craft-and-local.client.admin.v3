import { __, compose, path, includes } from 'ramda'
import { authenticated } from '../state'
import { history } from '../history'

const {
  LOGOUT_USER_SUCCEEDED,
  UNAUTHENTICATED_ENDPOINT_REQUESTED
} = authenticated.types

const isUnauthenticatedRequest = compose(
  includes(__, [LOGOUT_USER_SUCCEEDED, UNAUTHENTICATED_ENDPOINT_REQUESTED]),
  path(['type'])
)

const authenticationService = (store) => (next) => (action) => {
  if (isUnauthenticatedRequest(action)) {
    store.dispatch(authenticated.actions.validateUser())
    history.push('/login', {})
  }

  next(action)
}

module.exports = {
  authenticationService
}
