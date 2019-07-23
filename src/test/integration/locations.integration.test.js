import test from 'tape'
import sinon from 'sinon'
import fetchMock from 'fetch-mock'
import { integrationTest } from './page-helpers'
import { history } from '../../app/history'

const PATH = '/locations'

const locations = [{
  id: '1',
  title: 'First location'
}, {
  id: '2',
  title: 'Second location'
}, {
  id: '3',
  title: 'Third location'
}]

test('Before', (t) => {
  fetchMock.get('http://localhost:5000/authenticate/validate', { data: { isAuthenticated: true } })
  fetchMock.get('http://localhost:5000/locations', { data: locations })
  sinon.spy(history, 'push')
  t.pass('Setup mock locations responses')
  t.end()
})

integrationTest('View list of locations', PATH, async (t, app) => {
  try {
    const locationsPage = await app.locationsPage()
    const locations = locationsPage.getLocations()
    const location = locations.first()

    location.find('a').simulate('click')

    t.equal(fetchMock.called(/locations/), true, 'it calls the locations endpoint')
    t.equal(locations.length, 3, 'it renders the correct number of locations')
    t.equal(location.text().includes('First location'), true, 'it renders a location title')
    t.equal(history.push.getCall(0).args[0], '/locations/1', 'it calls the location endpoint on location click')
    t.end()
  } catch (error) {
    t.fail('Locations page integration test failed:', error)
  }
})

test('After', (t) => {
  fetchMock.restore()
  history.push.restore()
  t.pass('Restore locations mocks')
  t.end()
})
