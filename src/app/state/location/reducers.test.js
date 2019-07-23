import test from 'tape'
import { entityHandlers, pendingEntityUpdatesHandlers } from './reducers'
import * as types from './types'
import * as authenticated from '../authenticated'

test('Location reducer resets state on unauthorised request', (t) => {
  const result = entityHandlers[authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]()
  const expected = null
  t.deepEqual(result, expected, 'it resets state on unauthorised request')
  t.end()
})

test('Location reducer sets entity on read success', (t) => {
  const location = { title: 'location 1' }

  const action = {
    payload: location
  }
  const result = entityHandlers[types.READ_LOCATION_SUCCEEDED](undefined, action)
  const expected = location
  t.deepEqual(result, expected, 'it sets entity on read success')
  t.end()
})

test('Location pending update reducer stores updated fields', (t) => {
  const state = { title: 'location 1' }

  const action = {
    payload: {
      categories: ['some-category']
    }
  }

  const result = pendingEntityUpdatesHandlers[types.LOCATION_FIELD_UPDATED](state, action)

  const expected = {
    title: 'location 1',
    categories: ['some-category']
  }

  t.deepEqual(result, expected, 'it stores updated fields')
  t.end()
})

test('Location pending update reducer resets state on update  success', (t) => {
  const state = { title: 'location 1' }

  const result = pendingEntityUpdatesHandlers[types.UPDATE_LOCATION_SUCCEEDED](state)
  const expected = {}
  t.deepEqual(result, expected, 'it resets state on update  success')
  t.end()
})
