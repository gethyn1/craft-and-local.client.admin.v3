import test from 'tape'
import { entityHandlers } from './reducers'
import * as types from './types'
import * as authenticated from '../authenticated'

test('Producers reducer resets state on unauthorised request', (t) => {
  const result = entityHandlers[authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]()
  const expected = []
  t.deepEqual(result, expected, 'it resets state on unauthorised request')
  t.end()
})

test('Producers reducer sets entity on read success', (t) => {
  const producers = ['category 1', 'category 2']

  const action = {
    payload: producers
  }
  const result = entityHandlers[types.READ_PRODUCERS_SUCCEEDED]([], action)
  const expected = producers
  t.deepEqual(result, expected, 'it sets entity on read success')
  t.end()
})
