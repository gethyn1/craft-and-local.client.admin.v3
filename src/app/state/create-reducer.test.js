import test from 'tape'
import sinon from 'sinon'
import { createReducer, createFetchMetaReducer } from './create-reducer'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAIL = 'FAIL'

const types = [REQUEST, SUCCESS, FAIL]
const state = 'some state'
const stateFromHandler = 'state from handler'
const successHandler = sinon.stub().returns(stateFromHandler)
const initialState = 'initial state'

const handlers = {
  [SUCCESS]: successHandler
}

test('createReducer() returns a function', (t) => {
  const result = typeof createReducer(null, null)
  const expected = 'function'
  t.equal(result, expected, 'returns a function')
  t.end()
})

test('createReducer() returns default state if no state defined', (t) => {
  const result = createReducer(initialState, handlers)(undefined, { type: 'NOT_MY_ACTION_TYPE' })
  const expected = initialState
  t.equal(result, expected, 'returns default state if no state defined')
  t.end()
})

test('createReducer() returns state if action type handler does not exist', (t) => {
  const result = createReducer(initialState, handlers)(state, { type: 'NOT_MY_ACTION_TYPE' })
  const expected = state
  t.equal(result, expected, 'returns state if action type handler does not exist')
  t.end()
})

test('createReducer() returns result of the action type handler', (t) => {
  const result = createReducer(initialState, handlers)(state, { type: SUCCESS })
  const expected = stateFromHandler
  t.equal(successHandler.calledOnce, true, 'calls the correct handler handler')
  t.equal(result, expected, 'returns result of the action type handler')
  t.end()
})

test('createFetchMetaReducer() returns correct state for REQUEST action type', (t) => {
  const result = createFetchMetaReducer({ types })({}, { type: REQUEST })
  const expected = {
    isLoading: true,
    hasLoaded: false,
    hasErrored: false
  }
  t.deepEqual(result, expected, 'returns correct state for REQUEST action type')
  t.end()
})

test('createFetchMetaReducer() returns correct state for SUCCESS action type', (t) => {
  const result = createFetchMetaReducer({ types })({}, { type: SUCCESS })
  const expected = {
    isLoading: false,
    hasLoaded: true,
    hasErrored: false
  }
  t.deepEqual(result, expected, 'returns correct state for SUCCESS action type')
  t.end()
})

test('createFetchMetaReducer() returns correct state for FAIL action type', (t) => {
  const result = createFetchMetaReducer({ types })({}, { type: FAIL })
  const expected = {
    isLoading: false,
    hasLoaded: false,
    hasErrored: true
  }
  t.deepEqual(result, expected, 'returns correct state for FAIL action type')
  t.end()
})