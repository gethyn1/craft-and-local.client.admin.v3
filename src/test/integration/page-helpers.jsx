import React from 'react'
import test from 'tape'
import { mount } from 'enzyme'
import { Locations, Location, Categories, Category, Producers, Producer } from './page-objects'
import { renderRoute } from '../../client'

// TODO: the setup for integration tests and handling of page objects is a bit messy and requires some tidying up

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
    this.path = path
  }

  async initialise () {
    try {
      const dom = document.createElement('div')
      const screen = await renderRoute((Component) => {
        return mount(<Component />, { attachTo: dom })
      })({ pathname: this.path })

      this.updatedScreen = () => screen.update()
    } catch (error) {
      console.log('Error initialising pages:', error)
    }
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

  async producersPage () {
    const producers = new Producers(this.updatedScreen())
    await successFrom(() => producers.getProducers().length > 0)
    return producers
  }

  async producerPage () {
    const producer = new Producer(this.updatedScreen())
    await successFrom(() => producer.getTitleField().length > 0)
    return producer
  }

  async locationsPage () {
    const locations = new Locations(this.updatedScreen())
    await successFrom(() => locations.getLocations().length > 0)
    return locations
  }

  async locationPage () {
    const location = new Location(this.updatedScreen())
    await successFrom(() => location.getTitleField().length > 0)
    return location
  }
}

async function integrationTest (name, path, callback) {
  test(name, async (t) => {
    const app = new Pages(path)
    await app.initialise()
    return callback(t, app)
  })
}

export {
  integrationTest
}
