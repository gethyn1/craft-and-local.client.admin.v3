import React from 'react'
import { Checkbox, Row, Col } from 'antd'

const Category = ({ category }) =>
  <Col span={6}><Checkbox value={category.id}>{category.title}</Checkbox></Col>

const Categories = ({ categories, defaultValue, onChange }) => (
  <Checkbox.Group style={{ width: '100%', marginBottom: 18 }} defaultValue={defaultValue} onChange={onChange}>
    <Row>
      {categories.map(category => <Category key={category.id} category={category} />)}
    </Row>
  </Checkbox.Group>
)

export {
  Categories
}
