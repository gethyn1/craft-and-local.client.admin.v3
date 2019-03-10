const API_BASE = 'http://localhost:5000'
const CALL_API = 'CALL_API'

const apiService = (store) => (next) => (action) => {
  const apiType = action[CALL_API]

  if (typeof apiType === 'undefined') {
    return next(action)
  }

  const { types, endpoint } = apiType
  const [requestType, successType, failureType] = types

  next({ type: requestType })
  console.log(`${API_BASE}${endpoint}`)
  return window.fetch(`${API_BASE}${endpoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return response.json()
    })
    .then((json) => next({ type: successType, payload: json.data }))
    .catch(() => next({ type: failureType, error: true }))
}

export {
  CALL_API,
  apiService
}
