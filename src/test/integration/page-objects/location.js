class Location {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getField (name) {
    return this.updatedScreen().find(`input[name="${name}"]`)
  }

  getTitleField () {
    return this.getField('title')
  }

  getInstagramField () {
    return this.getField('instagramHandle')
  }

  getTwitterField () {
    return this.getField('twitterHandle')
  }

  getDescriptionField () {
    return this.updatedScreen().find('textarea[name="description"]')
  }

  getEmailField () {
    return this.getField('email')
  }

  getWebsiteField () {
    return this.getField('website')
  }

  getTelephoneField () {
    return this.getField('telephone')
  }

  getAliasField () {
    return this.getField('alias')
  }

  getCategoryCheckboxByValue (value) {
    return this.updatedScreen().find(`input[type="checkbox"][value="${value}"]`)
  }

  getSubmitButton () {
    return this.updatedScreen().find('button[type="submit"]')
  }

  getForm () {
    return this.updatedScreen().find('form')
  }
}

export {
  Location
}
