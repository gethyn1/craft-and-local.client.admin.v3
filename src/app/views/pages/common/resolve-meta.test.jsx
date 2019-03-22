import test from 'tape'
import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { getActiveProp, getMetaState, resolveComponentByMetaState } from './resolve-meta'

configure({ adapter: new Adapter() })

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

test('resolveComponentByMetaState() returns the correct component when loaded', (t) => {
  const Component = () => <p>My component</p>

  const props = {
    meta: {
      read: {
        isLoading: false,
        hasLoaded: true,
        hasErrored: false
      }
    }
  }

  const Result = resolveComponentByMetaState(Component)
  const wrapper = shallow(<Result {...props} />)
  t.equal(wrapper.matchesElement(<Component />), true, 'returns the correct component when loaded')
  t.end()
})

test('resolveComponentByMetaState() returns the correct component when loading', (t) => {
  const Component = () => <p>My component</p>
  const Loading = () => <p>Loading ...</p>

  const props = {
    meta: {
      read: {
        isLoading: true,
        hasLoaded: false,
        hasErrored: false
      }
    }
  }

  const Result = resolveComponentByMetaState(Component, Loading)
  const wrapper = shallow(<Result {...props} />)
  t.equal(wrapper.matchesElement(<Loading />), true, 'returns the correct component when loading')
  t.end()
})

test('resolveComponentByMetaState() returns the correct component on error', (t) => {
  const Component = () => <p>My component</p>
  const Loading = () => <p>Loading ...</p>
  const Error = () => <p>An error occured</p>

  const props = {
    meta: {
      read: {
        isLoading: false,
        hasLoaded: false,
        hasErrored: true
      }
    }
  }

  const Result = resolveComponentByMetaState(Component, Loading, Error)
  const wrapper = shallow(<Result {...props} />)
  t.equal(wrapper.matchesElement(<Error />), true, 'returns the correct component on error')
  t.end()
})
