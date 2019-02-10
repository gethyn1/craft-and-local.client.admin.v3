import React from 'react'
import { render } from 'react-dom'
import { AppLayout } from '../app/views/layouts'
import { Dashboard } from '../app/views/pages/dashboard'

const App = () => (
  <AppLayout>
    <Dashboard />
  </AppLayout>
)

const Root = () => (
  <App />
)

render(<Root />, document.getElementById('root'))
