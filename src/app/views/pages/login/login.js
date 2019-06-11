import React from 'react'
import { Typography } from 'antd'
import { AppLayout } from '../../layouts'
import { WrappedLoginForm as LoginForm } from './login-form'

const { Title } = Typography

// TODO: stop page reload on failed login
// TODO: new layout for login page
const Login = (props) => (
  <AppLayout>
    <Title>Login</Title>
    <LoginForm
      onSubmit={props.onSubmit}
      isLoading={props.authenticate.meta.read.isLoading}
    />
  </AppLayout>
)

export {
  Login
}
