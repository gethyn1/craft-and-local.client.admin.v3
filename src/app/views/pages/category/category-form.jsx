import React from 'react'
import { Form, Input, Button } from 'antd'

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class CategoryForm extends React.Component {
  componentDidMount() {
    this.props.form.validateFields()
  }

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
        this.props.onSubmit(this.props.category._id, this.props.updatedFields)
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const titleError = isFieldTouched('title') && getFieldError('title')
    const slugError = isFieldTouched('slug') && getFieldError('slug')

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Title" validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Title is required' }],
            onChange: this.handleChange,
            initialValue: this.props.category.title
          })(
            <Input placeholder="Title" name="title" />
          )}
        </Form.Item>

        <Form.Item label="Slug" validateStatus={slugError ? 'error' : ''} help={slugError || ''}>
          {getFieldDecorator('slug', {
            rules: [{ required: true, message: 'Slug is required' }],
            onChange: this.handleChange,
            initialValue: this.props.category.slug
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
const WrappedCategoryForm = Form.create({ name: 'producer_form' })(CategoryForm)

export {
  WrappedCategoryForm
}
