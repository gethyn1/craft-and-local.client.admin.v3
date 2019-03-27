import React from 'react'
import { Typography } from 'antd'
import { WrappedCategoryForm as CategoryForm } from '../category-form'

const { Title } = Typography

const Create = ({ pendingEntityUpdates, onFieldUpdate, onSubmit, isCreating }) => (
  <React.Fragment>
    <Title>Create a category</Title>
    <CategoryForm
      category={null}
      updatedFields={pendingEntityUpdates}
      onFieldUpdate={onFieldUpdate}
      onSubmit={onSubmit}
      isUpdating={isCreating}
    />
  </React.Fragment>
)

export {
  Create
}
