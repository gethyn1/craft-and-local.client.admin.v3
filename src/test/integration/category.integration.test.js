import test from 'tape'
import fetchMock from 'fetch-mock'
import { integrationTest } from './page-helpers'

const PATH = '/categories/1'

const category = {
  _id: '1',
  title: 'My category',
  slug: 'my-category'
}

test('Before', (t) => {
  fetchMock.get('http://localhost:5000/authenticate/validate', {})
  fetchMock.get('http://localhost:5000/categories/1', { data: { category } })
  fetchMock.post('http://localhost:5000/categories/1', { data: { category } })
  t.pass('Setup mock category responses')
  t.end()
})

integrationTest('View and edit category page', PATH, async (t, app) => {
  try {
    const categoryPage = await app.categoryPage()
    const titleField = categoryPage.getTitleField()
    const slugField = categoryPage.getSlugField()
    const getSubmitButton = categoryPage.getSubmitButton()
    const form = categoryPage.getForm()

    t.equal(fetchMock.called(/categories\/1/), true, 'it calls the category endpoint with category ID')
    t.equal(titleField.props().value, 'My category', 'it renders the category title in the title input')
    t.equal(slugField.props().value, 'my-category', 'it renders the category slug in the slug input')
    t.equal(getSubmitButton.length === 1, true, 'there is a single submit button')
    titleField.instance().value = 'Updated title'
    titleField.simulate('change')
    slugField.instance().value = 'updated-slug'
    slugField.simulate('change')
    // Simulating click event on submit button to submit form is not supported by enzyme, so have to simulate submit event on form
    // https://github.com/airbnb/enzyme/issues/308
    form.simulate('submit')

    const postFetchSpy = fetchMock.calls()[1][1]
    t.equal(postFetchSpy.method, 'POST', 'it calls the category endpoint with POST method')
    t.deepEqual(
      JSON.parse(postFetchSpy.body),
      { 'title': 'Updated title', slug: 'updated-slug' },
      'it calls the category endpoint with the updated body'
    )
    t.end()
  } catch (error) {
    t.fail('Category page integration test failed:', error)
  }
})

test('After', (t) => {
  fetchMock.restore()
  t.pass('Restore category mocks')
  t.end()
})
