import test from 'tape'
import sinon from 'sinon'
import fetchMock from 'fetch-mock'
import { integrationTest } from './page-helpers'
import { history } from '../../app/history'

const PATH = '/categories'

const categories = [{
  _id: '1',
  title: 'My category',
  slug: 'my-category'
}, {
  _id: '2',
  title: 'My other category',
  slug: 'my-other-category'
}, {
  _id: '3',
  title: 'My next category',
  slug: 'my-next-category'
}]

test('Before', (t) => {
  fetchMock.get('http://localhost:5000/authenticate/validate', {})
  fetchMock.get('http://localhost:5000/categories', { data: { categories } })
  sinon.spy(history, 'push')
  t.pass('Setup mock categories responses')
  t.end()
})

integrationTest('View list of categories', PATH, async (t, app) => {
  try {
    const categoriesPage = await app.categoriesPage()
    const categories = categoriesPage.getCategories()
    const category = categories.first()

    category.find('a').simulate('click')

    t.equal(fetchMock.called(/categories/), true, 'it calls the categories endpoint')
    t.equal(categories.length, 3, 'it renders the correct number of categories')
    t.equal(category.text().includes('My category'), true, 'it renders a category title')
    t.equal(history.push.getCall(0).args[0], '/categories/1', 'it calls the category endpoint on category click')
    t.end()
  } catch (error) {
    t.fail('Categories page integration test failed:', error)
  }
})

test('After', (t) => {
  fetchMock.restore()
  history.push.restore()
  t.pass('Restore categories mocks')
  t.end()
})
