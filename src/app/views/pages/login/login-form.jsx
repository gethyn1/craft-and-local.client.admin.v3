import React from 'react'
import { Form, Input, Button, Icon } from 'antd'

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class LoginForm extends React.Component {
  handleChange = (e) => {
    this.props.onFieldUpdate({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.email, values.password)
      }
    })
  }

  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const emailError = isFieldTouched('email') && getFieldError('email')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Email" validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Email is required' }]
          })(
            <Input
              placeholder="Email"
              name="email"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>

        <Form.Item label="Password" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password is required' }]
          })(
            <Input.Password
              placeholder="Password"
              name="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            loading={this.props.isUpdating}
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Login
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
const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm)

export {
  WrappedLoginForm
}
