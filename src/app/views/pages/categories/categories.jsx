import React from 'react'
import { AppLayout } from '../../layouts'
import { EntityList } from '../../../components/entity-list'

const getCategorySlug = category => `/${category.slug}`

const Categories = ({ categories, deleteCategory }) => (
  <AppLayout>
    <div id="categories">
      <EntityList
        entities={categories}
        onDeleteEntity={deleteCategory}
        entityType="category"
        path="categories"
        getDescription={getCategorySlug}
      />
    </div>
  </AppLayout>
)

export {
  Categories
}
