class Producers {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getProducers () {
    return this.updatedScreen().find('[data-testid="producers/producer"]')
  }
}

export {
  Producers
}
