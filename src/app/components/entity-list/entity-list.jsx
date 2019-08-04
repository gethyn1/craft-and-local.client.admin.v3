import React from 'react'
import { List, Typography, Popconfirm } from 'antd'
import { Link } from '../link'

const { Text } = Typography

const DeleteEntity = ({ onConfirm, id, entityType }) => (
  <Popconfirm
    title={`Are you sure you want to delete this ${entityType}?`}
    onConfirm={onConfirm.bind(null, id)}
    okText="Yes"
    cancelText="Cancel"
  >
    <a href="/delete">Delete</a>
  </Popconfirm>
)

const renderEntity = ({ onConfirm, path, entityType, getDescription }) => (entity) => (
  <List.Item
    data-testid={`entity-list/${entityType}`}
    actions={[
      <Link path={`/${path}/${entity.id}`}>Edit</Link>,
      <DeleteEntity onConfirm={onConfirm} id={entity.id} />
    ]}
  >
    <List.Item.Meta
      title={<Text>{entity.title}</Text>}
      description={getDescription(entity)}
    />

  </List.Item>
)

const EntityList = ({ entities, entityType, onDeleteEntity, path, getDescription }) => (
  <List
    dataSource={entities}
    renderItem={renderEntity({ onConfirm: onDeleteEntity, path, entityType, getDescription })}
  />
)

export {
  EntityList
}
