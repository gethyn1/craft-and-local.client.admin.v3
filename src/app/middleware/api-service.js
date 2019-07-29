import { message } from 'antd'
import { path, equals } from 'ramda'
import { getCookie } from './cookies'
import { authenticated } from '../state'

const API_BASE = 'http://localhost:5000'
const CALL_API = 'CALL_API'
const UNAUTHORISED = 401

// TODO handle 500 and 404 response
const handleStatusCode = (dispatch) => (response) => {
  if (equals(response.status, UNAUTHORISED)) {
    dispatch({
      type: authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED
    })
  }

  return Promise.resolve(response)
}

const transformResponse = (json, adapter = path(['data'])) => adapter(json)

const buildRequestBody = ({ method, body, unauthenticatedRequest }) => ({
  method: method || 'GET',
  headers: {
    ...(!unauthenticatedRequest && { 'Content-Type': 'application/json' }),
    ...(!unauthenticatedRequest && { 'CSRF-Token': getCookie(document.cookie, 'XSRF-TOKEN') })
  },
  mode: 'cors',
  ...(!unauthenticatedRequest && { credentials: 'include' }),
  body: JSON.stringify(body)
})

// TODO: General tidy up and refactor
// TODO: test API service
const apiService = (store) => (next) => (action) => {
  const apiType = action[CALL_API]

  if (typeof apiType === 'undefined') {
    return next(action)
  }

  const { types, endpoint, meta, url, adapter } = apiType
  const [requestType, successType, failureType] = types

  const loadingMessage = path(['message', 'loading'], meta)
  const successMessage = path(['message', 'success'], meta)
  const errorMessage = path(['message', 'error'], meta)

  next({ type: requestType })

  const hideLoadingMessage = loadingMessage ? message.loading(loadingMessage, 0) : () => {}

  const requestUrl = url || `${API_BASE}${endpoint}`

  return fetch(requestUrl, buildRequestBody(apiType))
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
      return next({ type: successType, payload: transformResponse(json, adapter) })
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
  apiService,
  buildRequestBody
}
