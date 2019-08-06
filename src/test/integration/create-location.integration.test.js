import test from 'tape'
import fetchMock from 'fetch-mock'
import sinon from 'sinon'
import { integrationTest } from './page-helpers'
import { history } from '../../app/history'

const PATH = '/locations/create'

const location = {
  id: '1',
  title: 'Mama’s Little Bakery'
}

const categories = [{
  id: '1',
  title: 'Bakery',
  slug: 'bakery'
}, {
  id: '2',
  title: 'Cakes',
  slug: 'cakes'
}]

test('Before', (t) => {
  fetchMock.get('http://localhost:5000/authenticate/validate', { data: { isAuthenticated: true } })
  fetchMock.get('http://localhost:5000/categories', { data: categories })
  fetchMock.post('http://localhost:5000/locations', { data: location })
  sinon.spy(history, 'push')
  t.pass('Setup mock location responses')
  t.end()
})

integrationTest('Create location page', PATH, async (t, app) => {
  try {
    const locationPage = await app.locationPage()
    const titleField = locationPage.getTitleField()
    const getSubmitButton = locationPage.getSubmitButton()
    const form = locationPage.getForm()

    t.equal(getSubmitButton.length === 1, true, 'there is a single submit button')
    titleField.instance().value = 'Mama’s Little Bakery'
    titleField.simulate('change')
    // Simulating click event on submit button to submit form is not supported by enzyme, so have to simulate submit event on form
    // https://github.com/airbnb/enzyme/issues/308
    form.simulate('submit')

    const postFetchSpy = fetchMock.calls()[1][1]
    t.equal(postFetchSpy.method, 'POST', 'it calls the locations endpoint with POST method')
    t.deepEqual(
      JSON.parse(postFetchSpy.body),
      { 'title': 'Mama’s Little Bakery' },
      'it calls the locations endpoint with the correct body'
    )

    // Need to wait for next tick as no async code to await for checking redirect
    setTimeout(() => {
      t.equal(history.push.getCall(0).args[0], '/locations/1', 'it redirects to location page on location creation')
      t.end()
    }, 0)
  } catch (error) {
    t.fail('Location page integration test failed:', error)
  }
})

test('After', (t) => {
  fetchMock.restore()
  history.push.restore()
  t.pass('Restore location mocks')
  t.end()
})
