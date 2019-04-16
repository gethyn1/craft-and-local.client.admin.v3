import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { partial } from 'ramda'
import { AppLayout } from '../app/views/layouts'
import { store } from '../app/store'

import { routes } from '../app/routes'
import { router } from '../app/router'

const resolveRoute = partial(router.resolve, [routes])

const App = ({ RouteComponent }) => (
  <Provider store={store}>
    <AppLayout>
      <RouteComponent />
    </AppLayout>
  </Provider>
)

const renderComponent = (Component) =>
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )

const renderRoute = (renderFn = renderComponent) => (location) => {
  const componentToRender = App.bind(null, { RouteComponent: resolveRoute(location) })
  try {
    return renderFn(componentToRender)
  } catch (error) {
    const errorRoot = App.bind(null, { RouteComponent: resolveRoute({ pathname: '/error' }) })
    return renderFn(errorRoot)
  }
}

export {
  renderRoute
}
