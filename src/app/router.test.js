import test from 'tape'
import sinon from 'sinon'
import { matchURI, resolve } from './router'

const routes = [
  {
    path: '/first',
    action: () => {},
    component: 'FirstComponent'
  },
  {
    path: '/second',
    action: () => {},
    component: 'SecondComponent'
  },
  {
    path: '/second/:paramater',
    action: () => {},
    component: 'SecondComponentWithRouteParamater'
  }
]

test('Router matchURI() returns null if no match found', (t) => {
  const result = matchURI('/path', '/mismatch')
  t.equal(result, null, 'It returns null if no match found')
  t.end()
})

test('Router matchURI() returns an object if match found', (t) => {
  const result = matchURI('/matching/:parameter', '/matching/with-parameter')
  const expected = {
    parameter: 'with-parameter'
  }

  t.deepEqual(result, expected, 'It returns an object containing parameters if match found')
  t.end()
})

test('Router matchURI() returns an object containing all match parameters', (t) => {
  const result = matchURI('/matching/:parameterOne/:parameterTwo', '/matching/one/two')
  const expected = {
    parameterOne: 'one',
    parameterTwo: 'two'
  }

  t.deepEqual(result, expected, 'It returns an object containing parameters if match found')
  t.end()
})

test('Router resolve() matches the correct route', (t) => {
  const location = {
    pathname: '/second'
  }

  const result = resolve(routes, location)
  const expected = 'SecondComponent'
  t.equal(result, expected, 'It returns the correct component')
  t.end()
})

test('Router resolve() matches the correct route with paramater', (t) => {
  const location = {
    pathname: '/second/route'
  }

  const result = resolve(routes, location)
  const expected = 'SecondComponentWithRouteParamater'
  t.equal(result, expected, 'It returns the correct component')
  t.end()
})

test('Router resolve() calls route action with the match property', (t) => {
  const action = sinon.spy()

  const contextRoutes = [
    {
      path: '/match/:this',
      action,
      component: 'Component'
    }
  ]

  const location = {
    pathname: '/match/parameter'
  }

  const expected = {
    match: {
      this: 'parameter'
    }
  }

  resolve(contextRoutes, location)

  t.equal(action.calledWith(expected), true, 'It returns the correct component')
  t.end()
})

test('Router resolve() throws an error if no matching route', (t) => {
  const location = {
    pathname: '/third'
  }

  const result = resolve.bind(null, routes, location)
  t.throws(result, /Route not found/, 'It throws an error')
  t.end()
})
