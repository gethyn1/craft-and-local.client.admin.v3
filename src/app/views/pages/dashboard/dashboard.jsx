import React from 'react'
import { Link } from '../../../components/link'

const handleClick = (event) => {
  event.preventDefault()
  history.push(event.currentTarget.pathname, {})
}

const Dashboard = () => {
  return (
    <React.Fragment>
      <p>This is the dashboard <Link path="/">Go to homepage</Link></p>
    </React.Fragment>
  )
}

export {
  Dashboard
}
