import test from 'tape'
import { entityHandlers, pendingEntityUpdatesHandlers } from './reducers'
import * as types from './types'
import * as authenticated from '../authenticated'

test('Producer reducer resets state on unauthorised request', (t) => {
  const result = entityHandlers[authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]()
  const expected = null
  t.deepEqual(result, expected, 'it resets state on unauthorised request')
  t.end()
})

test('Producer reducer sets entity on read success', (t) => {
  const producer = { title: 'producer 1' }

  const action = {
    payload: {
      producer
    }
  }
  const result = entityHandlers[types.READ_PRODUCER_SUCCEEDED](undefined, action)
  const expected = producer
  t.deepEqual(result, expected, 'it sets entity on read success')
  t.end()
})

test('Producer pending update reducer stores updated fields', (t) => {
  const state = { title: 'producer 1' }

  const action = {
    payload: {
      categories: ['some-category']
    }
  }

  const result = pendingEntityUpdatesHandlers[types.PRODUCER_FIELD_UPDATED](state, action)

  const expected = {
    title: 'producer 1',
    categories: ['some-category']
  }

  t.deepEqual(result, expected, 'it stores updated fields')
  t.end()
})

test('Producer pending update reducer resets state on update  success', (t) => {
  const state = { title: 'producer 1' }

  const result = pendingEntityUpdatesHandlers[types.UPDATE_PRODUCER_SUCCEEDED](state)
  const expected = {}
  t.deepEqual(result, expected, 'it resets state on update  success')
  t.end()
})
