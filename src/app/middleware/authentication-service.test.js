import test from 'tape'
import sinon from 'sinon'
import { authenticationService } from './authentication-service'
import { authenticated } from '../state'
import { history } from '../../app/history'

const store = {}

test('Authentication service redirects to login when user logs out', (t) => {
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: authenticated.types.LOGOUT_USER_SUCCEEDED
  }
  authenticationService(store)(next)(action)
  t.equal(history.push.getCall(0).args[0], '/login', 'it redirects to login when user logs out')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  history.push.restore()
  t.end()
})

test('Authentication service redirects to login on unauthenticated request', (t) => {
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED
  }
  authenticationService(store)(next)(action)
  t.equal(history.push.getCall(0).args[0], '/login', 'it redirects to login on unauthenticated request')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  history.push.restore()
  t.end()
})

test('Authentication service does not redirect on action', (t) => {
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: 'SOME_ACTION'
  }
  authenticationService(store)(next)(action)
  t.equal(history.push.called, false, 'it does not redirect')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  history.push.restore()
  t.end()
})
