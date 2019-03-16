import React from 'react'
import { Typography } from 'antd'
import { resolveMeta } from '../common'
import { WrappedForm } from './producer-form'

const { Title } = Typography

const Entity = ({ entity, pendingEntityUpdates, onFieldUpdate, onSubmit }) => (
  <React.Fragment>
    <Title>{entity.title}</Title>
    <WrappedForm
      producer={entity}
      updatedFields={pendingEntityUpdates}
      onFieldUpdate={onFieldUpdate}
      onSubmit={onSubmit}
    />
  </React.Fragment>
)

const Producer = resolveMeta({ Component: Entity })

export {
  Producer
}
