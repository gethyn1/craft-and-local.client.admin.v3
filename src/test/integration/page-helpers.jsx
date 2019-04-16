import React from 'react'
import test from 'tape'
import { mount } from 'enzyme'
import { Categories, Category } from './page-objects'
import { renderRoute } from '../../client'

const MAX_FLUSHES_TO_WAIT_FOR = 10 // maximum number of callbacks to wait for chain to complete

const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0))

async function successFrom (checkerFunction) {
  let flushCount = 0
  while (!checkerFunction()) {
    await asyncFlush()
    if (flushCount++ > MAX_FLUSHES_TO_WAIT_FOR) {
      throw new Error('Timeout awaiting async code')
    }
  }
}

class Pages {
  constructor (path) {
    const dom = document.createElement('div')
    const screen = renderRoute((Component) => {
      return mount(<Component />, { attachTo: dom })
    })({ pathname: path })

    this.updatedScreen = () => screen.update()
  }

  async categoriesPage () {
    const categories = new Categories(this.updatedScreen())
    await successFrom(() => categories.getCategories().length > 0)
    return categories
  }

  async categoryPage () {
    const category = new Category(this.updatedScreen())
    await successFrom(() => category.getTitleField().length > 0)
    return category
  }
}

function integrationTest (name, path, callback) {
  test(name, (t) => {
    const app = new Pages(path)
    return callback(t, app)
  })
}

export {
  integrationTest
}
