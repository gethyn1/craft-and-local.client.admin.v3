import React from 'react'
import { Typography } from 'antd'
import { WrappedProducerForm as ProducerForm } from './producer-form'

const { Title } = Typography

const Producer = (props) => (
  <React.Fragment>
    <Title>{props.entity.title}</Title>
    <ProducerForm
      producer={props.entity}
      updatedFields={props.pendingEntityUpdates}
      onFieldUpdate={props.onFieldUpdate}
      onSubmit={props.onSubmit}
      isUpdating={props.meta.update.isLoading}
    />
  </React.Fragment>
)

export {
  Producer
}
