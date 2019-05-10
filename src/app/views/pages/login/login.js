import React from 'react'
import { Typography } from 'antd'
import { WrappedLoginForm as LoginForm } from './login-form'

const { Title } = Typography

const Login = (props) => (
  <React.Fragment>
    <Title>Login</Title>
    <LoginForm
      onSubmit={props.onSubmit}
      isLoading={props.meta.read.isLoading}
    />
  </React.Fragment>
)

export {
  Login
}
