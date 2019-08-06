import test from 'tape'
import fetchMock from 'fetch-mock'
import sinon from 'sinon'
import { integrationTest } from './page-helpers'
import { history } from '../../app/history'

const PATH = '/categories/create'

const category = {
  id: '1',
  title: 'Korean BBQ',
  slug: 'korean-bbq'
}

test('Before', (t) => {
  fetchMock.get('http://localhost:5000/authenticate/validate', { data: { isAuthenticated: true } })
  fetchMock.post('http://localhost:5000/categories', { data: category })
  sinon.spy(history, 'push')
  t.pass('Setup mock category responses')
  t.end()
})

integrationTest('Create category page', PATH, async (t, app) => {
  try {
    const categoryPage = await app.categoryPage()
    const titleField = categoryPage.getTitleField()
    const slugField = categoryPage.getSlugField()
    const getSubmitButton = categoryPage.getSubmitButton()
    const form = categoryPage.getForm()

    t.equal(getSubmitButton.length === 1, true, 'there is a single submit button')
    titleField.instance().value = 'Korean BBQ'
    titleField.simulate('change')
    slugField.instance().value = 'korean-bbq'
    slugField.simulate('change')
    // Simulating click event on submit button to submit form is not supported by enzyme, so have to simulate submit event on form
    // https://github.com/airbnb/enzyme/issues/308
    form.simulate('submit')

    const postFetchSpy = fetchMock.calls()[0][1]
    t.equal(postFetchSpy.method, 'POST', 'it calls the categories endpoint with POST method')
    t.deepEqual(
      JSON.parse(postFetchSpy.body),
      { 'title': 'Korean BBQ', slug: 'korean-bbq' },
      'it calls the categories endpoint with the correct body'
    )

    // Need to wait for next tick as no async code to await for checking redirect
    setTimeout(() => {
      t.equal(history.push.getCall(0).args[0], '/categories/1', 'it redirects to category page on category creation')
      t.end()
    }, 0)
  } catch (error) {
    t.fail('Category page integration test failed:', error)
  }
})

test('After', (t) => {
  fetchMock.restore()
  history.push.restore()
  t.pass('Restore category mocks')
  t.end()
})
