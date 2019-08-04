class Categories {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getCategories () {
    return this.updatedScreen().find('li[data-testid="categories/category"]')
  }
}

export {
  Categories
}
