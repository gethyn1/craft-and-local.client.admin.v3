import React, { useEffect } from 'react'
import { Login } from '../../views/pages/login'

// TODO: display error message if unable to validate user
// TODO: display loading message instead of login component while validating user
const ValidateUser = ({ validateUser, shouldValidate, isAuthenticated, children }) => {
  useEffect(() => {
    if (shouldValidate) {
      validateUser()
    }
  }, [validateUser, shouldValidate])

  return (
    <React.Fragment>
      {isAuthenticated ? children : <Login />}
    </React.Fragment>
  )
}

export {
  ValidateUser
}
