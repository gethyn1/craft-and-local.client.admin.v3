import test from 'tape'
import fetchMock from 'fetch-mock'
import { integrationTest } from './page-helpers'

const PATH = '/locations/1'

const location = {
  id: '1',
  categories: ['1'],
  instagramHandle: 'mamaslittlebakery',
  twitterHandle: 'mamaslittlebakery',
  title: 'Mama’s Little Bakery',
  description: 'A great little bakery',
  email: 'mama@mamaslittlebakery.com',
  website: 'www.mamaslittlebakery.com',
  telephone: 'xxx-xxx-xxx-xxx',
  alias: 'downtown'
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
    const emailField = locationPage.getEmailField()
    const websiteField = locationPage.getWebsiteField()
    const telephoneField = locationPage.getTelephoneField()
    const aliasField = locationPage.getAliasField()
    const categoryOneCheckbox = locationPage.getCategoryCheckboxByValue('1')
    const categoryTwoCheckbox = locationPage.getCategoryCheckboxByValue('2')
    const getSubmitButton = locationPage.getSubmitButton()
    const form = locationPage.getForm()

    t.equal(fetchMock.called(/locations\/1/), true, 'it calls the location endpoint with ID')
    t.equal(titleField.props().value, 'Mama’s Little Bakery', 'it renders the location title in the title input')
    t.equal(instagramField.props().value, 'mamaslittlebakery', 'it renders the instagram handle in the instagram input')
    t.equal(twitterField.props().value, 'mamaslittlebakery', 'it renders the twitter handle in the twitter input')
    t.equal(descriptionField.props().value, 'A great little bakery', 'it renders the location description in the description field')
    t.equal(emailField.props().value, 'mama@mamaslittlebakery.com', 'it renders the email in the email input')
    t.equal(websiteField.props().value, 'www.mamaslittlebakery.com', 'it renders the website in the website input')
    t.equal(telephoneField.props().value, 'xxx-xxx-xxx-xxx', 'it renders the telephone in the telephone input')
    t.equal(aliasField.props().value, 'downtown', 'it renders the alias in the alias input')
    t.equal(categoryOneCheckbox.props().checked, true, 'The correct category is selected')
    t.equal(categoryTwoCheckbox.props().checked, false, 'The correct category is not selected')
    t.equal(getSubmitButton.length === 1, true, 'there is a single submit button')
    titleField.instance().value = 'Mama’s Big Bakery'
    titleField.simulate('change')
    instagramField.instance().value = 'mamasbigbakery'
    instagramField.simulate('change')
    twitterField.instance().value = 'mamasbigbakery'
    twitterField.simulate('change')
    descriptionField.instance().value = 'The bakery that just got bigger'
    descriptionField.simulate('change')
    emailField.instance().value = 'papa@mamaslittlebakery.com'
    emailField.simulate('change')
    websiteField.instance().value = 'http://mamaslittlebakery.com'
    websiteField.simulate('change')
    telephoneField.instance().value = 'yyyy-yyyy-yyyy'
    telephoneField.simulate('change')
    aliasField.instance().value = 'uptown'
    aliasField.simulate('change')
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
        'title': 'Mama’s Big Bakery',
        instagramHandle: 'mamasbigbakery',
        twitterHandle: 'mamasbigbakery',
        description: 'The bakery that just got bigger',
        email: 'papa@mamaslittlebakery.com',
        website: 'http://mamaslittlebakery.com',
        telephone: 'yyyy-yyyy-yyyy',
        alias: 'uptown',
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
