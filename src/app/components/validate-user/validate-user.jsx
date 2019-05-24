import React, { useEffect } from 'react'

// TOD: display error message if unable to validate user
const ValidateUser = ({ validateUser, shouldValidate, children }) => {
  useEffect(() => {
    if (shouldValidate) {
      validateUser()
    }
  }, [validateUser, shouldValidate])

  return (
    <React.Fragment>{children}</React.Fragment>
  )
}

export {
  ValidateUser
}
