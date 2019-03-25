import React from 'react'
import { List, Typography } from 'antd'
import { Link } from '../../../components/link'

const { Text } = Typography

const Category = (category) => (
  <List.Item>
    <Text>
      {category.title}<br />
      <Link path={`/categories/${category._id}`}>Edit</Link>
    </Text>
  </List.Item>
)

const Categories = ({ categories }) => {
  return (
    <List
      dataSource={categories}
      renderItem={Category}
    />
  )
}

export {
  Categories
}
