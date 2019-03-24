const namespace = 'producer'

// TO DO: abstract async action types creation
const PRODUCER_REQUESTED = `${namespace}/PRODUCER_REQUESTED`
const PRODUCER_REQUEST_SUCCEEDED = `${namespace}/PRODUCER_REQUEST_SUCCEEDED`
const PRODUCER_REQUEST_FAILED = `${namespace}/PRODUCER_REQUEST_FAILED`

const PRODUCER_FIELD_UPDATED = `${namespace}/PRODUCER_FIELD_UPDATED`

const PRODUCER_UPDATE_REQUESTED = `${namespace}/PRODUCER_UPDATE_REQUESTED`
const PRODUCER_UPDATE_REQUEST_SUCCEEDED = `${namespace}/PRODUCER_UPDATE_REQUEST_SUCCEEDED`
const PRODUCER_UPDATE_REQUEST_FAILED = `${namespace}/PRODUCER_UPDATE_REQUEST_FAILED`

export {
  PRODUCER_REQUESTED,
  PRODUCER_REQUEST_SUCCEEDED,
  PRODUCER_REQUEST_FAILED,
  PRODUCER_FIELD_UPDATED,
  PRODUCER_UPDATE_REQUESTED,
  PRODUCER_UPDATE_REQUEST_SUCCEEDED,
  PRODUCER_UPDATE_REQUEST_FAILED
}