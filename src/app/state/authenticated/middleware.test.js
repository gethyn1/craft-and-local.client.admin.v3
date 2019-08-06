import test from 'tape'
import sinon from 'sinon'
import { handleLogin } from './middleware'
import { history } from '../../history'
import { AUTHENTICATE_USER_SUCCEEDED } from './types'

test('handleLogin() redirects to /locations on login', (t) => {
  const store = {}
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: AUTHENTICATE_USER_SUCCEEDED
  }

  handleLogin(store)(next)(action)

  t.equal(history.push.getCall(0).args[0], '/locations', 'it redirects to locations')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  history.push.restore()
  t.end()
})

test('handleLogin() does not redirect if not required', (t) => {
  const store = {}
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: 'SOME_ACTION'
  }

  handleLogin(store)(next)(action)

  t.equal(history.push.called, false, 'it does not redirect')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  history.push.restore()
  t.end()
})
