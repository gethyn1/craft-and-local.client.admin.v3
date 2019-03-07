import React from 'react'
import { history } from '../history'

const handleClick = (event) => {
  event.preventDefault()
  history.push(event.currentTarget.pathname, {})
}

const Link = ({ path, children }) => <a onClick={handleClick} href={path}>{children}</a>

export {
  Link
}
