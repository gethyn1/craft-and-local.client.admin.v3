import React from 'react'
import { Typography } from 'antd'
import { AppLayout } from '../../layouts'
import { WrappedCategoryForm as CategoryForm } from './category-form'

const { Title } = Typography

const Category = ({ title, category, pendingEntityUpdates, onFieldUpdate, onSubmit, meta }) => (
  <AppLayout>
    <Title>{title}</Title>
    <CategoryForm
      category={category}
      updatedFields={pendingEntityUpdates}
      onFieldUpdate={onFieldUpdate}
      onSubmit={onSubmit}
      isUpdating={meta.update.isLoading || meta.create.isUpdating}
    />
  </AppLayout>
)

export {
  Category
}
