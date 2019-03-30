import React from 'react'
import { Typography } from 'antd'
import { WrappedCategoryForm as CategoryForm } from './category-form'

const { Title } = Typography

const Category = ({ title, category, pendingEntityUpdates, onFieldUpdate, onSubmit, meta }) => (
  <React.Fragment>
    <Title>{title}</Title>
    <CategoryForm
      category={category}
      updatedFields={pendingEntityUpdates}
      onFieldUpdate={onFieldUpdate}
      onSubmit={onSubmit}
      isUpdating={meta.update.isLoading || meta.create.isUpdating}
    />
  </React.Fragment>
)

export {
  Category
}
