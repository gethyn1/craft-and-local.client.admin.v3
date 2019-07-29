import test from 'tape'
import { entityHandlers } from './reducers'
import * as types from './types'

test('Geocoding reducer sets entities on address lookup success', (t) => {
  const locations = ['Boulder, Colorado', 'Chicago, Illinois']

  const action = {
    payload: locations
  }
  const result = entityHandlers[types.ADDRESS_LOOKUP_SUCCEEDED]([], action)
  const expected = locations
  t.deepEqual(result, expected, 'it sets entities on address lookup success')
  t.end()
})
