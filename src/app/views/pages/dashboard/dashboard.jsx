import React from 'react'
import { history } from '../../../history'

const handleClick = (event) => {
  event.preventDefault()
  history.push(event.currentTarget.pathname, {})
}

const Dashboard = () => {
  return (
    <React.Fragment>
      <p>This is the dashboard <a onClick={handleClick} href="/">Go to homepage</a></p>
    </React.Fragment>
  )
}

export {
  Dashboard
}
