import React from 'react'
import { Typography } from 'antd'
import { resolveMeta } from '../common'
import { WrappedForm } from './producer-form'

const { Title } = Typography

const Entity = ({ entity, transient, onFieldUpdate, onSubmit }) => (
  <React.Fragment>
    <Title>{entity.title}</Title>
    <WrappedForm
      id={entity.userId}
      producer={transient}
      onFieldUpdate={onFieldUpdate}
      onSubmit={onSubmit}
    />
  </React.Fragment>
)

const Producer = resolveMeta({ Component: Entity })

export {
  Producer
}
