import React from 'react'
import { path, pick, last, toPairs, find, head, compose } from 'ramda'
import { Skeleton, Alert } from 'antd'

const READ_PATH = ['meta', 'read']

const ErrorAlert = () =>
  <Alert
    message="Error"
    description="Oh no!! There was some kind of error"
    type="error"
    showIcon
  />

const metaMap = ({
  Loading = Skeleton,
  Error = ErrorAlert,
  Component
}) => ({
  isLoading: Loading,
  hasErrored: Error,
  hasLoaded: Component
})

const pickMetaProps = pick(['isLoading', 'hasErrored', 'hasLoaded'])

const isActive = compose(Boolean, last)

const getState = compose(head, find(isActive), toPairs, pickMetaProps, path(READ_PATH))

const resolveMeta = ({ Component }) => (props) => {
  const state = getState(props)
  const Render = metaMap({ Component })[state]

  return <Render {...props} />
}

export {
  resolveMeta
}
