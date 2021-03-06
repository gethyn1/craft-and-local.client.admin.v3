class Category {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getField (name) {
    return this.updatedScreen().find(`input[name="${name}"]`)
  }

  getTitleField () {
    return this.getField('title')
  }

  getSlugField () {
    return this.getField('slug')
  }

  getSubmitButton () {
    return this.updatedScreen().find('button[type="submit"]')
  }

  getForm () {
    return this.updatedScreen().find('form')
  }
}

export {
  Category
}
