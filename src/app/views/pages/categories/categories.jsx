import React from 'react'
import { List, Typography, Popconfirm } from 'antd'
import { AppLayout } from '../../layouts'
import { Link } from '../../../components/link'

const { Text } = Typography

const DeleteCategory = ({ onConfirm, id }) => (
  <Popconfirm
    title="Are you sure you want to delete this category?"
    onConfirm={onConfirm.bind(null, id)}
    okText="Yes"
    cancelText="Cancel"
  >
    <a href="/delete">Delete</a>
  </Popconfirm>
)

const renderCategory = ({ onConfirm }) => (category) => (
  <List.Item
    data-testid="categories/category"
    actions={[
      <Link path={`/categories/${category.id}`}>Edit</Link>,
      <DeleteCategory onConfirm={onConfirm} id={category.id} />
    ]}
  >
    <List.Item.Meta
      title={<Text>{category.title}</Text>}
      description={`/${category.slug}`}
    />

  </List.Item>
)

const Categories = ({ categories, deleteCategory }) => (
  <AppLayout>
    <div id="categories">
      <List
        dataSource={categories}
        renderItem={renderCategory({ onConfirm: deleteCategory })}
      />
    </div>
  </AppLayout>
)

export {
  Categories
}
