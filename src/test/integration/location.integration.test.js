import test from 'tape'
import fetchMock from 'fetch-mock'
import { integrationTest } from './page-helpers'

const PATH = '/locations/1'

const location = {
  id: '1',
  categories: ['1'],
  instagramHandle: 'iamoninstagram',
  twitterHandle: 'iamontwitter',
  title: 'Location one',
  description: 'A short description'
}

const categories = [{
  id: '1',
  title: 'My category',
  slug: 'my-category'
}, {
  id: '2',
  title: 'My other category',
  slug: 'my-other-category'
}]

test('Before', (t) => {
  fetchMock.get('http://localhost:5000/authenticate/validate', { data: { isAuthenticated: true } })
  fetchMock.get('http://localhost:5000/categories', { data: categories })
  fetchMock.get(`http://localhost:5000${PATH}`, { data: location })
  fetchMock.post(`http://localhost:5000${PATH}`, { data: location })
  t.pass('Setup mock location responses')
  t.end()
})

integrationTest('View and edit location page', PATH, async (t, app) => {
  try {
    const locationPage = await app.locationPage()
    const titleField = locationPage.getTitleField()
    const instagramField = locationPage.getInstagramField()
    const twitterField = locationPage.getTwitterField()
    const descriptionField = locationPage.getDescriptionField()
    const categoryOneCheckbox = locationPage.getCategoryCheckboxByValue('1')
    const categoryTwoCheckbox = locationPage.getCategoryCheckboxByValue('2')
    const getSubmitButton = locationPage.getSubmitButton()
    const form = locationPage.getForm()

    t.equal(fetchMock.called(/locations\/1/), true, 'it calls the location endpoint with ID')
    t.equal(titleField.props().value, 'Location one', 'it renders the location title in the title input')
    t.equal(instagramField.props().value, 'iamoninstagram', 'it renders the instagram handle in the instagram input')
    t.equal(twitterField.props().value, 'iamontwitter', 'it renders the twitter handle in the twitter input')
    t.equal(descriptionField.props().value, 'A short description', 'it renders the location description in the description field')
    t.equal(categoryOneCheckbox.props().checked, true, 'The correct category is selected')
    t.equal(categoryTwoCheckbox.props().checked, false, 'The correct category is not selected')
    t.equal(getSubmitButton.length === 1, true, 'there is a single submit button')
    titleField.instance().value = 'Updated title'
    titleField.simulate('change')
    instagramField.instance().value = 'updatedinstagram'
    instagramField.simulate('change')
    twitterField.instance().value = 'updatedtwitter'
    twitterField.simulate('change')
    descriptionField.instance().value = 'Updated description'
    descriptionField.simulate('change')
    categoryTwoCheckbox.instance().checked = true
    categoryTwoCheckbox.simulate('change')
    // Simulating click event on submit button to submit form is not supported by enzyme, so have to simulate submit event on form
    // https://github.com/airbnb/enzyme/issues/308
    form.simulate('submit')

    // POST to location endpoint is the 3rd request assuming authentication has been performed in a previous test
    const postFetchSpy = fetchMock.calls()[2][1]
    t.equal(postFetchSpy.method, 'POST', 'it calls the location endpoint with POST method')
    t.deepEqual(
      JSON.parse(postFetchSpy.body),
      {
        'title': 'Updated title',
        instagramHandle: 'updatedinstagram',
        twitterHandle: 'updatedtwitter',
        description: 'Updated description',
        categories: ['1', '2']
      },
      'it calls the location endpoint with the updated body'
    )
    t.end()
  } catch (error) {
    t.fail('Location page integration test failed:', error)
  }
})

test('After', (t) => {
  fetchMock.restore()
  t.pass('Restore location mocks')
  t.end()
})
