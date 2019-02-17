import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppLayout } from '../app/views/layouts'
import { store } from '../app/store'
import { Router } from '../app/router'

const Root = () => (
  <Provider store={store}>
    <AppLayout>
      <Router pathname={location.pathname} />
    </AppLayout>
  </Provider>
)

render(<Root />, document.getElementById('root'))
