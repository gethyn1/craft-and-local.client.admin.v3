class Locations {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getLocations () {
    return this.updatedScreen().find('[data-testid="locations/location"]')
  }
}

export {
  Locations
}
