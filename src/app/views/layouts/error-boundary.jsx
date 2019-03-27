import React from 'react'
import { Alert } from 'antd'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log('Error:', error, 'INFO:', info)
  }

  render() {
    if (this.state.hasError) {
      return <Alert
        message="Error"
        description="There was some sort of error!!"
        type="error"
        showIcon
      />
    }

    return this.props.children
  }
}

export {
  ErrorBoundary
}