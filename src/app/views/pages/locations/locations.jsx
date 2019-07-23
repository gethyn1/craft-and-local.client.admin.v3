import React from 'react'
import { List, Typography } from 'antd'
import { AppLayout } from '../../layouts'
import { Link } from '../../../components/link'

const { Text } = Typography

const Location = (location) => (
  <List.Item>
    <Text>
      <div data-testid="locations/location">
        {location.title}<br />
        <Link path={`/locations/${location.id}`}>Edit</Link>
      </div>
    </Text>
  </List.Item>
)

const Locations = ({ locations }) => {
  return (
    <AppLayout>
      <List
        dataSource={locations}
        renderItem={Location}
      />
    </AppLayout>
  )
}

export {
  Locations
}
