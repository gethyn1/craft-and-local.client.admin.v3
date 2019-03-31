import React from 'react'
import { path } from 'ramda'
import { Form, Input, Button } from 'antd'

const SLUG_MATCH = /^[0-9a-z-]+$/

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class CategoryForm extends React.Component {
  onCategoryChange = (checkedValues) => {
    this.props.onFieldUpdate({
      categories: checkedValues
    })
  }

  handleChange = (e) => {
    this.props.onFieldUpdate({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({
          id: path(['category', '_id'], this.props),
          fields: path(['updatedFields'], this.props)
        })
      }
    })
  }

  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const titleError = isFieldTouched('title') && getFieldError('title')
    const slugError = isFieldTouched('slug') && getFieldError('slug')

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Title" validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Title is required' }],
            onChange: this.handleChange,
            initialValue: path(['category', 'title'], this.props)
          })(
            <Input placeholder="Title" name="title" />
          )}
        </Form.Item>

        <Form.Item label="Slug" validateStatus={slugError ? 'error' : ''} help={slugError || ''}>
          {getFieldDecorator('slug', {
            rules: [
              { required: true, message: 'Slug is required' },
              { pattern: SLUG_MATCH, message: 'Slug can only contain lowercase letters, numbers and dashes' }
            ],
            onChange: this.handleChange,
            initialValue: path(['category', 'slug'], this.props)
          })(
            <Input placeholder="Slug" name="slug" />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            loading={this.props.isUpdating}
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Save category
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

/**
 * TO DO: make better use of Form.create API e.g. implement onFieldsChange()
 * for updating redux store.
 */
const WrappedCategoryForm = Form.create({ name: 'category_form' })(CategoryForm)

export {
  WrappedCategoryForm
}
