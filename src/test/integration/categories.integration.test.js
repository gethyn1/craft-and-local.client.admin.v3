import test from 'tape'
import sinon from 'sinon'
import fetchMock from 'fetch-mock'
import { integrationTest } from './page-helpers'
import { history } from '../../app/history'

const PATH = '/categories'

const categories = [{
  id: '1',
  title: 'My category',
  slug: 'my-category'
}, {
  id: '2',
  title: 'My other category',
  slug: 'my-other-category'
}, {
  id: '3',
  title: 'My next category',
  slug: 'my-next-category'
}]

test('Before', (t) => {
  fetchMock.get('http://localhost:5000/authenticate/validate', { data: { isAuthenticated: true } })
  fetchMock.get('http://localhost:5000/categories', { data: categories })
  fetchMock.delete('http://localhost:5000/categories/1', { data: categories[0] })
  sinon.spy(history, 'push')
  t.pass('Setup mock categories responses')
  t.end()
})

integrationTest('View list of categories', PATH, async (t, app) => {
  try {
    const categoriesPage = await app.categoriesPage()
    let categories = categoriesPage.getCategories()
    let category = categories.first()

    /* Edit category */
    category.find('a[href="/categories/1"]').simulate('click')
    t.equal(fetchMock.called(/categories/), true, 'it calls the categories endpoint')
    t.equal(categories.length, 3, 'it renders the correct number of categories')
    t.equal(category.text().includes('My category'), true, 'it renders a category title')
    t.equal(history.push.getCall(0).args[0], '/categories/1', 'it calls the category endpoint on category click')

    /* Delete category */
    category.find('a[href="/delete"]').simulate('click')
    categories = categoriesPage.getCategories()
    category = categories.first()
    category.find('button.ant-btn-primary').first().simulate('click')
    // TO DO: not updating categories after delete
    // categories = categoriesPage.getCategories()
    // t.equal(categories.length, 2, 'deletes category')
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
