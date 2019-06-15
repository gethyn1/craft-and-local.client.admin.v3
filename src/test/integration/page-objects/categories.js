class Categories {
  constructor (screen) {
    this.updatedScreen = () => screen.update()
  }

  getCategories () {
    return this.updatedScreen().find('[data-testid="categories/category"]')
  }
}

export {
  Categories
}
