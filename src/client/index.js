import { partial } from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppLayout } from '../app/views/layouts'
import { store } from '../app/store'

import { routes } from '../app/routes'
import { history } from '../app/history'
import { router } from '../app/router'

const resolveRoute = partial(router.resolve, [routes])

const Root = ({ routeComponent }) => (
  <Provider store={store}>
    <AppLayout>
      {routeComponent()}
    </AppLayout>
  </Provider>
)

const  renderComponent = (component) =>
  ReactDOM.render(
    <Root routeComponent={component} />,
    document.getElementById('root')
  )

const render = (location) => {
  try {
    renderComponent(resolveRoute(location))
  } catch (error) {
    renderComponent(resolveRoute({ pathname: '/error' }))
  }
}

render(location)
history.listen(render)
