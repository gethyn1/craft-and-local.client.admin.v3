import React from 'react'
import { List, Typography } from 'antd'
import { AppLayout } from '../../layouts'
import { Link } from '../../../components/link'

const { Text } = Typography

const Category = (category) => (
  <List.Item>
    <Text>
      <div data-testid="categories/category">
        <span>{category.title}</span><br />
        <Link path={`/categories/${category._id}`}>Edit</Link>
      </div>
    </Text>
  </List.Item>
)

const Categories = ({ categories }) => (
  <AppLayout>
    <div id="categories">
      <List
        dataSource={categories}
        renderItem={Category}
      />
    </div>
  </AppLayout>
)

export {
  Categories
}
