import React from 'react'
import { List, Typography } from 'antd'
import { AppLayout } from '../../layouts'
import { Link } from '../../../components/link'

const { Text } = Typography

const Producer = (producer) => (
  <List.Item>
    <Text>
      {producer.title}<br />
      <Link path={`/producers/${producer.userId}`}>Edit</Link>
    </Text>
  </List.Item>
)

const Producers = ({ producers }) => {
  return (
    <AppLayout>
      <List
        dataSource={producers}
        renderItem={Producer}
      />
    </AppLayout>
  )
}

export {
  Producers
}
