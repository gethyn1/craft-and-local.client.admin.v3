import { message } from 'antd'
import { path, equals } from 'ramda'
import { authenticated } from '../state'

const API_BASE = 'http://localhost:5000'
const CALL_API = 'CALL_API'
const UNAUTHORISED = 401

const handleStatusCode = (dispatch) => (response) => {
  if (equals(response.status, UNAUTHORISED)) {
    dispatch({
      type: authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED
    })
  }

  return Promise.resolve(response)
}

// TO DO: General tidy up and refactor
// TO DO: test API service
const apiService = (store) => (next) => (action) => {
  const apiType = action[CALL_API]

  if (typeof apiType === 'undefined') {
    return next(action)
  }

  const { types, endpoint, method, body, meta } = apiType
  const [requestType, successType, failureType] = types

  const loadingMessage = path(['message', 'loading'], meta)
  const successMessage = path(['message', 'success'], meta)
  const errorMessage = path(['message', 'error'], meta)

  next({ type: requestType })

  const hideLoadingMessage = loadingMessage ? message.loading(loadingMessage, 0) : () => {}

  return fetch(
    `${API_BASE}${endpoint}`,
    {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body)
    })
    .then(handleStatusCode(store.dispatch))
    .then((response) => {
      console.log('Response status:', response.status)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return response.json()
    })
    .then((json) => {
      hideLoadingMessage()
      successMessage && message.success(successMessage)
      return next({ type: successType, payload: path(['data'], json) })
    })
    .catch((error) => {
      console.log(error)
      hideLoadingMessage()
      errorMessage && message.error(errorMessage)
      return next({ type: failureType, error: true })
    })
}

export {
  CALL_API,
  handleStatusCode,
  apiService
}
