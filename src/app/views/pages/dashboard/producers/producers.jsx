import React from 'react'
import { List } from 'antd'

const Producers = ({ producers }) => (
  <List
    dataSource={producers}
    renderItem={producer => (<List.Item>{producer.title}</List.Item>)}
  />
)

export {
  Producers
}
