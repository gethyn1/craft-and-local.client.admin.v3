import React from 'react'
import { Form, Input, Button } from 'antd'

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class ProducerForm extends React.Component {
  componentDidMount() {
    this.props.form.validateFields()
  }

  handleChange = (e) => {
    this.props.onFieldUpdate({
      key: e.target.name,
      value: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values', values)
        this.props.onSubmit(this.props.producer.userId, this.props.updatedFields)
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const titleError = isFieldTouched('title') && getFieldError('title')

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input your title!' }],
            onChange: this.handleChange,
            initialValue: this.props.producer.title
          })(
            <Input placeholder="Title" name="title" />
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
const WrappedForm = Form.create({ name: 'producer_form' })(ProducerForm)

export {
  WrappedForm
}