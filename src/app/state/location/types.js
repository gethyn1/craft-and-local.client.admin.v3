const namespace = 'location'

export const CREATE_LOCATION_REQUESTED = `${namespace}/CREATE_LOCATION_REQUESTED`
export const CREATE_LOCATION_SUCCEEDED = `${namespace}/CREATE_LOCATION_SUCCEEDED`
export const CREATE_LOCATION_FAILED = `${namespace}/CREATE_LOCATION_FAILED`

export const READ_LOCATION_REQUESTED = `${namespace}/READ_LOCATION_REQUESTED`
export const READ_LOCATION_SUCCEEDED = `${namespace}/READ_LOCATION_SUCCEEDED`
export const READ_LOCATION_FAILED = `${namespace}/READ_LOCATION_FAILED`

export const UPDATE_LOCATION_REQUESTED = `${namespace}/UPDATE_LOCATION_REQUESTED`
export const UPDATE_LOCATION_SUCCEEDED = `${namespace}/UPDATE_LOCATION_SUCCEEDED`
export const UPDATE_LOCATION_FAILED = `${namespace}/UPDATE_LOCATION_FAILED`

export const REMOVE_LOCATION_REQUESTED = `${namespace}/REMOVE_LOCATION_REQUESTED`
export const REMOVE_LOCATION_SUCCEEDED = `${namespace}/REMOVE_LOCATION_SUCCEEDED`
export const REMOVE_LOCATION_FAILED = `${namespace}/REMOVE_LOCATION_FAILED`

export const CREATE = [CREATE_LOCATION_REQUESTED, CREATE_LOCATION_SUCCEEDED, CREATE_LOCATION_FAILED]
export const READ = [READ_LOCATION_REQUESTED, READ_LOCATION_SUCCEEDED, READ_LOCATION_FAILED]
export const UPDATE = [UPDATE_LOCATION_REQUESTED, UPDATE_LOCATION_SUCCEEDED, UPDATE_LOCATION_FAILED]
export const REMOVE = [REMOVE_LOCATION_REQUESTED, REMOVE_LOCATION_SUCCEEDED, REMOVE_LOCATION_FAILED]

export const LOCATION_FIELD_UPDATED = `${namespace}/LOCATION_FIELD_UPDATED`

export const LOCATION_RESET = `${namespace}/LOCATION_RESET`