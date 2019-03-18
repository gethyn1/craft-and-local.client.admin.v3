import { message } from 'antd'
import { path } from 'ramda'

const API_BASE = 'http://localhost:5000'
const CALL_API = 'CALL_API'

// TO DO: General tidy up and refactor
const apiService = (store) => (next) => (action) => {
  const apiType = action[CALL_API]

  if (typeof apiType === 'undefined') {
    return next(action)
  }

  const { types, endpoint, method, body, meta } = apiType
  const [requestType, successType, failureType] = types

  const loadingMessage = path(['message', 'loading'], meta)
  const successMessage =  path(['message', 'success'], meta)
  const errorMessage = path(['message', 'error'], meta)

  next({ type: requestType })

  const hideLoadingMessage = loadingMessage ? message.loading(loadingMessage, 0) : () => {}

  return window.fetch(
    `${API_BASE}${endpoint}`,
    {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      hideLoadingMessage()
      return response.json()
    })
    .then((json) => {
      successMessage && message.success(successMessage)
      return next({ type: successType, payload: json.data })
    })
    .catch(() => {
      errorMessage && message.success(errorMessage)
      return next({ type: failureType, error: true })
    })
}

export {
  CALL_API,
  apiService
}
