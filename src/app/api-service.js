const API_BASE = 'http://localhost:5000'
const CALL_API = 'CALL_API'

const apiService = (store) => (next) => (action) => {
  const apiType = action[CALL_API]

  if (typeof apiType === 'undefined') {
    return next(action)
  }

  console.log('api service')

  const { types, endpoint } = apiType
  const [requestType, successType, failureType] = types

  next({ type: requestType, payload: 'test' })

  return window.fetch(`${API_BASE}${endpoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return response.json()
    })
    .then((result) => {
      if (!result.statusCode === 200) {
        throw new Error(`Server error ${result.statusCode}`)
      }

      next({ type: successType, payload: result.data })
    })
    .catch((error) => next({ type: failureType, error: true, payload: error }))
}

export {
  apiService
}
