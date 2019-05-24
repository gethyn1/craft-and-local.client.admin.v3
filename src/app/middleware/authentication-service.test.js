import test from 'tape'
import sinon from 'sinon'
import { authenticationService } from './authentication-service'
import { authenticated } from '../state'
import { history } from '../../app/history'

test('Authentication service redirects to login when user logs out', (t) => {
  const dispatch = sinon.spy()
  const store = { dispatch }
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: authenticated.types.LOGOUT_USER_SUCCEEDED
  }
  authenticationService(store)(next)(action)
  t.equal(history.push.getCall(0).args[0], '/login', 'it redirects to login when user logs out')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  t.equal(dispatch.called, true, 'it calls user validation endpoint to refresh CSRF token')
  history.push.restore()
  t.end()
})

test('Authentication service redirects to login on unauthenticated request', (t) => {
  const dispatch = sinon.spy()
  const store = { dispatch }
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED
  }
  authenticationService(store)(next)(action)
  t.equal(history.push.getCall(0).args[0], '/login', 'it redirects to login on unauthenticated request')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  t.equal(dispatch.called, true, 'it calls user validation endpoint to refresh CSRF token')
  history.push.restore()
  t.end()
})

test('Authentication service does not redirect on action', (t) => {
  const dispatch = sinon.spy()
  const store = { dispatch }
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: 'SOME_ACTION'
  }
  authenticationService(store)(next)(action)
  t.equal(history.push.called, false, 'it does not redirect')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  t.equal(dispatch.called, false, 'it does not call user validation endpoint to refresh CSRF token')
  history.push.restore()
  t.end()
})
