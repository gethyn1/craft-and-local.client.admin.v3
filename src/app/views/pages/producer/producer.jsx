import React from 'react'
import { Typography } from 'antd'
import { resolveComponentByMetaState } from '../common'
import { WrappedForm } from './producer-form'

const { Title } = Typography

const Entity = (props) => (
  <React.Fragment>
    <Title>{props.entity.title}</Title>
    <WrappedForm
      producer={props.entity}
      updatedFields={props.pendingEntityUpdates}
      onFieldUpdate={props.onFieldUpdate}
      onSubmit={props.onSubmit}
      isUpdating={props.meta.update.isLoading}
    />
  </React.Fragment>
)

const Producer = resolveComponentByMetaState(Entity)

export {
  Producer
}
