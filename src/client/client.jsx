import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { partial } from 'ramda'
import { AppLayout } from '../app/views/layouts'
import { store } from '../app/store'
import { ValidateUser } from '../app/components/validate-user'
import { routes } from '../app/routes'
import { router } from '../app/router'

const resolveRoute = partial(router.resolve, [routes])

const App = ({ RouteComponent }) => (
  <Provider store={store}>
    <ValidateUser>
      <AppLayout>
        <RouteComponent />
      </AppLayout>
    </ValidateUser>
  </Provider>
)

const renderComponent = (Component) =>
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )

const renderRoute = (renderFn = renderComponent) => (location) =>
  resolveRoute(location).then((component) => {
    const componentToRender = App.bind(null, { RouteComponent: component })

    try {
      return renderFn(componentToRender)
    } catch (error) {
      const errorRoot = App.bind(null, { RouteComponent: resolveRoute({ pathname: '/error' }) })
      return renderFn(errorRoot)
    }
  }).catch((error) => {
    console.log('Error resolving route:', error)
  })

export {
  renderRoute
}
