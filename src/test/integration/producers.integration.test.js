import test from 'tape'
import sinon from 'sinon'
import fetchMock from 'fetch-mock'
import { integrationTest } from './page-helpers'
import { history } from '../../app/history'

const PATH = '/producers'

const producers = [{
  id: '1',
  title: 'First producer',
  userId: 'firstproducer'
}, {
  id: '2',
  title: 'Second producer',
  userId: 'secondproducer'
}, {
  id: '3',
  title: 'Third producer',
  userId: 'thirdproducer'
}]

test('Before', (t) => {
  fetchMock.get('http://localhost:5000/authenticate/validate', { data: { isAuthenticated: true } })
  fetchMock.get('http://localhost:5000/producers', { data: producers })
  sinon.spy(history, 'push')
  t.pass('Setup mock producers responses')
  t.end()
})

integrationTest('View list of producers', PATH, async (t, app) => {
  try {
    const producersPage = await app.producersPage()
    const producers = producersPage.getProducers()
    const category = producers.first()

    category.find('a').simulate('click')

    t.equal(fetchMock.called(/producers/), true, 'it calls the producers endpoint')
    t.equal(producers.length, 3, 'it renders the correct number of producers')
    t.equal(category.text().includes('First producer'), true, 'it renders a producer title')
    t.equal(history.push.getCall(0).args[0], '/producers/firstproducer', 'it calls the producer endpoint on producer click')
    t.end()
  } catch (error) {
    t.fail('Producers page integration test failed:', error)
  }
})

test('After', (t) => {
  fetchMock.restore()
  history.push.restore()
  t.pass('Restore producers mocks')
  t.end()
})
