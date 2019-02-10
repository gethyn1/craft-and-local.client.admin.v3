import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppLayout } from '../app/views/layouts'
import { Dashboard } from '../app/views/pages/dashboard'
import { store } from '../app/store'

const App = () => (
  <Provider store={store}>
    <AppLayout>
      <Dashboard />
    </AppLayout>
  </Provider>
)

const Root = () => (
  <App />
)

render(<Root />, document.getElementById('root'))
