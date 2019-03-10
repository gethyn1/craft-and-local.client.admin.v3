import React from 'react'
import { reverse, toPairs, find, head, compose } from 'ramda'
import { Skeleton, Alert } from 'antd'

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
  isFetching: Loading,
  hasErrored: Error,
  hasLoaded: Component
})

const isActive = compose(Boolean, head, reverse)

const getState = compose(head, find(isActive), toPairs)

const resolveMeta = ({ Component }) => (props) => {
  const state = getState(props.meta)
  const Render = metaMap({ Component })[state]

  return <Render {...props} />
}

export {
  resolveMeta
}
