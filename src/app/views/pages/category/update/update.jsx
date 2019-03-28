import React from 'react'
import { Typography } from 'antd'
import { WrappedCategoryForm as CategoryForm } from '../category-form'

const { Title } = Typography

const Update = ({ category, pendingEntityUpdates, onFieldUpdate, onSubmit, meta }) => (
  <React.Fragment>
    <Title>Edit category</Title>
    <CategoryForm
      category={category}
      updatedFields={pendingEntityUpdates}
      onFieldUpdate={onFieldUpdate}
      onSubmit={onSubmit}
      isUpdating={meta.update.isLoading}
    />
  </React.Fragment>
)

export {
  Update
}
