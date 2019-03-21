import test from 'tape'
import { getActiveProp, getMetaState } from './resolve-meta'

test('getActiveProp() returns key of first active state', (t) => {
  const state = {
    loading: false,
    loaded: true,
    error: false
  }

  const result = getActiveProp(state)
  const expected = 'loaded'
  t.equal(result, expected, 'returns key of first active state')
  t.end()
})

test('getActiveProp() returns null if no active state', (t) => {
  const state = {
    loading: false,
    loaded: false,
    error: false
  }

  const result = getActiveProp(state)
  const expected = null
  t.equal(result, expected, 'returns null if no active state')
  t.end()
})

test('getMetaState() returns active read meta state', (t) => {
  const state = {
    isLoading: false,
    hasLoaded: true,
    hasErrored: false
  }

  const result = getMetaState(state)
  const expected = 'hasLoaded'
  t.equal(result, expected, 'returns active read meta state')
  t.end()
})

test('getMetaState() returns null when no active meta state', (t) => {
  const state = {
    isLoading: false,
    hasLoaded: false,
    hasErrored: false
  }

  const result = getMetaState(state)
  const expected = null
  t.equal(result, expected, 'returns null when no active read meta state')
  t.end()
})