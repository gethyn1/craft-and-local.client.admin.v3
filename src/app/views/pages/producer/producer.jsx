import React from 'react'
import { Typography } from 'antd'
import { AppLayout } from '../../layouts'
import { WrappedProducerForm as ProducerForm } from './producer-form'

const { Title } = Typography

const Producer = (props) => (
  <AppLayout>
    <Title>{props.entity.title}</Title>
    <ProducerForm
      producer={props.entity}
      updatedFields={props.pendingEntityUpdates}
      onFieldUpdate={props.onFieldUpdate}
      onSubmit={props.onSubmit}
      isUpdating={props.meta.update.isLoading}
      categories={props.categories}
    />
  </AppLayout>
)

export {
  Producer
}
