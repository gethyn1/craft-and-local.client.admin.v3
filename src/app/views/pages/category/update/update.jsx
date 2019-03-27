import React from 'react'
import { Typography } from 'antd'
import { WrappedCategoryForm as CategoryForm } from '../category-form'

const { Title } = Typography

const Update = (props) => (
  <React.Fragment>
    <Title>{props.entity.title}</Title>
    <CategoryForm
      category={props.entity}
      updatedFields={props.pendingEntityUpdates}
      onFieldUpdate={props.onFieldUpdate}
      onSubmit={props.onSubmit}
      isUpdating={props.meta.update.isLoading}
    />
  </React.Fragment>
)

export {
  Update
}
