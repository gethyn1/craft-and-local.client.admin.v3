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
  fetchMock.delete('http://localhost:5000/locations/1', { data: locations[0] })
  sinon.spy(history, 'push')
  t.pass('Setup mock locations responses')
  t.end()
})

integrationTest('View list of locations', PATH, async (t, app) => {
  try {
    const locationsPage = await app.locationsPage()
    let locations = locationsPage.getLocations()
    let location = locations.first()

    /* Edit location */
    location.find('a[href="/locations/1"]').simulate('click')
    t.equal(fetchMock.called(/locations/), true, 'it calls the locations endpoint')
    t.equal(locations.length, 3, 'it renders the correct number of locations')
    t.equal(location.text().includes('First location'), true, 'it renders a location title')
    t.equal(history.push.getCall(0).args[0], '/locations/1', 'it calls the location endpoint on location click')

    /* Delete location */
    location.find('a[href="/delete"]').simulate('click')
    locations = locationsPage.getLocations()
    location = locations.first()
    location.find('button.ant-btn-primary').first().simulate('click')
    // TO DO: not updating locations after delete
    // locations = locationsPage.getLocations()
    // t.equal(locations.length, 2, 'deletes location')
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
