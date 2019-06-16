import React from 'react'
import { Form, Input, Button } from 'antd'
import { path } from 'ramda'
import { Categories } from './categories'

const { TextArea } = Input

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class ProducerForm extends React.Component {
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
          userId: path(['producer', 'userId'], this.props),
          fields: path(['updatedFields'], this.props)
        })
      }
    })
  }

  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const titleError = isFieldTouched('title') && getFieldError('title')
    const userIdError = isFieldTouched('userId') && getFieldError('userId')

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Title" validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Title is required' }],
            onChange: this.handleChange,
            initialValue: path(['producer', 'title'], this.props)
          })(
            <Input placeholder="Title" name="title" />
          )}
        </Form.Item>

        <Form.Item label="User ID" validateStatus={userIdError ? 'error' : ''} help={userIdError || ''}>
          {getFieldDecorator('userId', {
            rules: [{ required: true, message: 'User ID is required' }],
            onChange: this.handleChange,
            initialValue: path(['producer', 'userId'], this.props)
          })(
            <Input placeholder="User ID" name="userId" />
          )}
        </Form.Item>

        <Form.Item label="Description">
          {getFieldDecorator('description', {
            onChange: this.handleChange,
            initialValue: path(['producer', 'description'], this.props)
          })(
            <TextArea placeholder="Description" name="description" rows={4} />
          )}
        </Form.Item>

        <Categories
          categories={this.props.categories}
          defaultValue={path(['producer', 'categories'], this.props)}
          onChange={this.onCategoryChange}
        />

        <Form.Item label="Instagram">
          {getFieldDecorator('instagramHandle', {
            onChange: this.handleChange,
            initialValue: path(['producer', 'instagramHandle'], this.props)
          })(
            <Input placeholder="Instagram" name="instagramHandle" />
          )}
        </Form.Item>

        <Form.Item label="Twitter">
          {getFieldDecorator('twitterHandle', {
            onChange: this.handleChange,
            initialValue: path(['producer', 'twitterHandle'], this.props)
          })(
            <Input placeholder="Twitter" name="twitterHandle" />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            loading={this.props.isUpdating}
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Save producer
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
const WrappedProducerForm = Form.create({ name: 'producer_form' })(ProducerForm)

export {
  WrappedProducerForm
}
