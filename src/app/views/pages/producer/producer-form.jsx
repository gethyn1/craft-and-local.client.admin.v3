import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

const { TextArea } = Input
const CheckboxGroup = Checkbox.Group

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class ProducerForm extends React.Component {
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
        this.props.onSubmit(this.props.producer.userId, this.props.updatedFields)
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const titleError = isFieldTouched('title') && getFieldError('title')
    const userIdError = isFieldTouched('userId') && getFieldError('userId')

    // TO DO: refactor to seperate component and use Grid to align
    const categories = this.props.categories.map(category => ({ label: category.title, value: category._id }))
    const selectedCategories = this.props.producer.categories

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Title" validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Title is required' }],
            onChange: this.handleChange,
            initialValue: this.props.producer.title
          })(
            <Input placeholder="Title" name="title" />
          )}
        </Form.Item>

        <Form.Item label="User ID" validateStatus={userIdError ? 'error' : ''} help={userIdError || ''}>
          {getFieldDecorator('userId', {
            rules: [{ required: true, message: 'User ID is required' }],
            onChange: this.handleChange,
            initialValue: this.props.producer.userId
          })(
            <Input placeholder="Title" name="userId" />
            )}
        </Form.Item>

        <Form.Item label="Description">
          {getFieldDecorator('description', {
            onChange: this.handleChange,
            initialValue: this.props.producer.description
          })(
            <TextArea placeholder="Description" name="description" rows={4} />
            )}
        </Form.Item>

        <CheckboxGroup options={categories} defaultValue={selectedCategories} onChange={this.onCategoryChange} />

        <Form.Item label="Instagram">
          {getFieldDecorator('instagramHandle', {
            onChange: this.handleChange,
            initialValue: this.props.producer.instagramHandle
          })(
            <Input placeholder="Instagram" name="instagramHandle" />
          )}
        </Form.Item>

        <Form.Item label="Twitter">
          {getFieldDecorator('twitterHandle', {
            onChange: this.handleChange,
            initialValue: this.props.producer.twitterHandle
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