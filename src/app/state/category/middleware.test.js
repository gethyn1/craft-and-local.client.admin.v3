import test from 'tape'
import sinon from 'sinon'
import { handleCategoryCreated } from './middleware'
import { history } from '../../history'
import { CREATE_CATEGORY_SUCCEEDED } from './types'

test('handleCategoryCreated() redirects to URL for created category', (t) => {
  const store = {}
  sinon.spy(history, 'push')
  const next = sinon.spy()
  const action = {
    type: CREATE_CATEGORY_SUCCEEDED,
    payload: {
      id: '1'
    }
  }
  handleCategoryCreated(store)(next)(action)
  t.equal(history.push.getCall(0).args[0], '/categories/1', 'it redirects to URL for created category')
  t.equal(next.calledWith(action), true, 'it calls next with action')
  history.push.restore()
  t.end()
})
