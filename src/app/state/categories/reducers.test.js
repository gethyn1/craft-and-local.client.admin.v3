import test from 'tape'
import { entityHandlers } from './reducers'
import * as types from './types'
import * as authenticated from '../authenticated'

test('Categories reducer resets state on unauthorised request', (t) => {
  const result = entityHandlers[authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]()
  const expected = []
  t.deepEqual(result, expected, 'it resets state on unauthorised request')
  t.end()
})

test('Categories reducer sets entity on read success', (t) => {
  const categories = ['category 1', 'category 2']

  const action = {
    payload: {
      categories
    }
  }
  const result = entityHandlers[types.READ_CATEGORIES_SUCCEEDED]([], action)
  const expected = categories
  t.deepEqual(result, expected, 'it sets entity on read success')
  t.end()
})
