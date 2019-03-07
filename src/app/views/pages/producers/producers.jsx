import React from 'react'
import { List, Typography } from 'antd'
import { Link } from '../../../components/link'

const { Text } = Typography

const Producer = (producer) => (
  <List.Item>
    <Text>
      {producer.title}<br />
      <Link path={producer.userId}>Edit</Link>
    </Text>
  </List.Item>
)

const Producers = ({ producers }) => {
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
