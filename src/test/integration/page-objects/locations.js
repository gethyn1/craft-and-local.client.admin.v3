class Locations {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getLocations () {
    return this.updatedScreen().find('li[data-testid="entity-list/location"]')
  }
}

export {
  Locations
}
