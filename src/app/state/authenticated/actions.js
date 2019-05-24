import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const authenticateUser = (email, password) => ({
  [CALL_API]: {
    method: 'POST',
    endpoint: '/authenticate/login',
    types: types.AUTHENTICATE_USER,
    body: {
      email,
      password
    },
    meta: {
      message: {
        loading: 'Loading...',
        success: 'Logged in successfully!!',
        error: 'Sorry .. there was an error authenticating'
      }
    }
  }
})

// TODO clear all entity state on logout
const logoutUser = () => ({
  [CALL_API]: {
    method: 'POST',
    endpoint: '/authenticate/logout',
    types: types.LOGOUT_USER,
    meta: {
      message: {
        loading: 'Loading...',
        success: 'Logged out successfully!!',
        error: 'Sorry .. there was an error logging out'
      }
    }
  }
})

const validateUser = () => ({
  [CALL_API]: {
    endpoint: '/authenticate/validate',
    types: types.VALIDATE_USER
  },
  meta: {
    message: {
      loading: 'Validating user...',
      success: 'Validated user successfully!!',
      error: 'Sorry .. there was an error validating the user'
    }
  }
})

export {
  authenticateUser,
  logoutUser,
  validateUser
}
