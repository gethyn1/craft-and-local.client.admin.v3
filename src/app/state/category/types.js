const namespace = 'category'

// TO DO: abstract async action types creation
const CATEGORY_REQUESTED = `${namespace}/CATEGORY_REQUESTED`
const CATEGORY_REQUEST_SUCCEEDED = `${namespace}/CATEGORY_REQUEST_SUCCEEDED`
const CATEGORY_REQUEST_FAILED = `${namespace}/CATEGORY_REQUEST_FAILED`

const CATEGORY_FIELD_UPDATED = `${namespace}/CATEGORY_FIELD_UPDATED`

const CATEGORY_CREATE_REQUESTED = `${namespace}/CATEGORY_CREATE_REQUESTED`
const CATEGORY_CREATE_REQUEST_SUCCEEDED = `${namespace}/CATEGORY_CREATE_REQUEST_SUCCEEDED`
const CATEGORY_CREATE_REQUEST_FAILED = `${namespace}/CATEGORY_CREATE_REQUEST_FAILED`

const CATEGORY_UPDATE_REQUESTED = `${namespace}/CATEGORY_UPDATE_REQUESTED`
const CATEGORY_UPDATE_REQUEST_SUCCEEDED = `${namespace}/CATEGORY_UPDATE_REQUEST_SUCCEEDED`
const CATEGORY_UPDATE_REQUEST_FAILED = `${namespace}/CATEGORY_UPDATE_REQUEST_FAILED`

export {
  CATEGORY_REQUESTED,
  CATEGORY_REQUEST_SUCCEEDED,
  CATEGORY_REQUEST_FAILED,
  CATEGORY_FIELD_UPDATED,
  CATEGORY_CREATE_REQUESTED,
  CATEGORY_CREATE_REQUEST_SUCCEEDED,
  CATEGORY_CREATE_REQUEST_FAILED,
  CATEGORY_UPDATE_REQUESTED,
  CATEGORY_UPDATE_REQUEST_SUCCEEDED,
  CATEGORY_UPDATE_REQUEST_FAILED
}
