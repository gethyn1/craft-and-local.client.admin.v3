class Categories {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getCategories () {
    return this.updatedScreen().find('[data-testid="categories/category"]')
  }
}

class Category {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getTitleField () {
    return this.updatedScreen().find('input[name="title"]')
  }
}

export {
  Categories,
  Category
}
