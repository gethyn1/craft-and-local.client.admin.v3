import test from 'tape'
import sinon from 'sinon'
import { handleStatusCode } from './api-service'
import { authenticated } from '../state'

test('API service handleStatusCode() dispatches action for unauthenticated request', async (t) => {
  const dispatch = sinon.spy()
  const response = {
    status: 401
  }

  const expectedAction = {
    type: authenticated.types.UNAUTHENTICATED_ENDPOINT_REQUESTED
  }

  await handleStatusCode(dispatch)(response)
  t.equal(dispatch.calledWith(expectedAction), true, 'it dispatches action for unauthenticated request')
  t.end()
})

test('API service handleStatusCode() does not dispatch action for successful request', async (t) => {
  const dispatch = sinon.spy()
  const response = {
    status: 200
  }

  await handleStatusCode(dispatch)(response)
  t.equal(dispatch.called, false, 'it does not dispatch action for successful request')
  t.end()
})
