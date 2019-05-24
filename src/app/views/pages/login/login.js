import React from 'react'
import { Typography } from 'antd'
import { WrappedLoginForm as LoginForm } from './login-form'

const { Title } = Typography

// TODO: stop page reload on failed login
const Login = (props) => (
  <React.Fragment>
    <Title>Login</Title>
    <LoginForm
      onSubmit={props.onSubmit}
      isLoading={props.authenticate.meta.read.isLoading}
    />
  </React.Fragment>
)

export {
  Login
}
