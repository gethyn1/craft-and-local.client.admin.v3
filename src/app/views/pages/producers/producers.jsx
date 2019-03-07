import React from 'react'
import { List } from 'antd'

const Producer = (producer) => <List.Item>{producer.title}</List.Item>

const Producers = ({ producers = [] } = {}) => {
  return (
    <List
      dataSource={producers}
      renderItem={Producer}
    />
  )
}

export {
  Producers
}
