import test from 'tape'
import sinon from 'sinon'
import { handleLocationCreated } from './middleware'
import { history } from '../../history'
import { CREATE_LOCATION_SUCCEEDED } from './types'

test('handleLocationCreated() redirects to URL for created category', (t) => {
  const store = {}
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: CREATE_LOCATION_SUCCEEDED,
    payload: {
      id: '1'
    }
  }
  handleLocationCreated(store)(next)(action)
  t.equal(history.push.getCall(0).args[0], '/locations/1', 'it redirects to URL for created location')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  history.push.restore()
  t.end()
})
