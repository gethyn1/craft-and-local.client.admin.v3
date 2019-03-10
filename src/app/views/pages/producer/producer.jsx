import React from 'react'
import { Typography, Form, Input, Button } from 'antd'
import { resolveMeta } from '../common'

const { Title } = Typography

const Entity = ({ entity }) => <Title>{entity.title}</Title>

const Producer = resolveMeta({ Component: Entity })

export {
  Producer
}
