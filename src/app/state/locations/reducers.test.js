import test from 'tape'
import { entityHandlers } from './reducers'
import * as types from './types'
import * as authenticated from '../authenticated'

test('Locations reducer resets state on unauthorised request', (t) => {
  const result = entityHandlers[authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]()
  const expected = []
  t.deepEqual(result, expected, 'it resets state on unauthorised request')
  t.end()
})

test('Locations reducer sets entity on read success', (t) => {
  const locations = ['category 1', 'category 2']

  const action = {
    payload: locations
  }
  const result = entityHandlers[types.READ_LOCATIONS_SUCCEEDED]([], action)
  const expected = locations
  t.deepEqual(result, expected, 'it sets entity on read success')
  t.end()
})
