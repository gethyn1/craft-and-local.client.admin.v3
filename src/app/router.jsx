import React from 'react'
import { routes } from './routes'
import { history } from './history'

const NotFound = () => <p>404</p>

class Router extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      path: props.pathname
    }

    this.unlisten = null
    this.handleHistoryUpdate = this.handleHistoryUpdate.bind(this)
  }

  componentDidMount() {
    this.unlisten = history.listen(this.handleHistoryUpdate)
  }

  componentWillUnmount() {
    this.unlisten()
  }

  handleHistoryUpdate(location, action) {
    this.setState({
      path: location.pathname
    })
  }

  render() {
    const route = routes.find(route => route.path === this.state.path)

    if (route) {
      route.action()
    }

    const Component = route ? route.component : NotFound
    return <Component />
  }
}

export {
  Router
}
