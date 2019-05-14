import test from 'tape'
import { entityHandlers, pendingEntityUpdatesHandlers } from './reducers'
import * as types from './types'
import * as authenticated from '../authenticated'

test('Category reducer resets state on unauthorised request', (t) => {
  const result = entityHandlers[authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED]()
  const expected = null
  t.deepEqual(result, expected, 'it resets state on unauthorised request')
  t.end()
})

test('Category reducer sets entity on read success', (t) => {
  const category = { title: 'category 1' }

  const action = {
    payload: {
      category
    }
  }
  const result = entityHandlers[types.READ_CATEGORY_SUCCEEDED](undefined, action)
  const expected = category
  t.deepEqual(result, expected, 'it sets entity on read success')
  t.end()
})

test('Category pending update reducer stores updated fields', (t) => {
  const state = { title: 'category 1' }

  const action = {
    payload: {
      slug: 'some-slug'
    }
  }

  const result = pendingEntityUpdatesHandlers[types.CATEGORY_FIELD_UPDATED](state, action)

  const expected = {
    title: 'category 1',
    slug: 'some-slug'
  }

  t.deepEqual(result, expected, 'it stores updated fields')
  t.end()
})

test('Category pending update reducer resets state on update  success', (t) => {
  const state = { title: 'category 1' }

  const result = pendingEntityUpdatesHandlers[types.UPDATE_CATEGORY_SUCCEEDED](state)
  const expected = {}
  t.deepEqual(result, expected, 'it resets state on update  success')
  t.end()
})
