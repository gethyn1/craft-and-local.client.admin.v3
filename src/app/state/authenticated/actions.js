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
        error: 'Sorry .. there was an error'
      }
    }
  }
})

export {
  authenticateUser
}
