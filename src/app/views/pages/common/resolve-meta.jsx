// @flow

import React from 'react'
import { path, pick, last, toPairs, find, head, compose } from 'ramda'
import { Skeleton, Alert } from 'antd'

type Meta = {
  read: {
    isLoading: boolean,
    hasLoaded: boolean,
    hasErrored: boolean
  }
}

const READ_PATH = ['meta', 'read']
const META_PROPS = ['isLoading', 'hasLoaded', 'hasErrored']

const getReadPath = path(READ_PATH)

const pickMetaProps = pick(META_PROPS)

const getActivePair = compose(find(last), toPairs)

const getActiveProp = (meta: Meta) => {
  const activePair = getActivePair(meta)
  return activePair ? head(activePair) : null
}

const getMetaState = compose(getActiveProp, pickMetaProps)

const ErrorAlert = () =>
  <Alert
    message="Error"
    description="Oh no!! There was some kind of error"
    type="error"
    showIcon
  />

const mapComponentToState = ({ Component, Loading, Error }) => ({
  isLoading: Loading,
  hasErrored: Error,
  hasLoaded: Component
})

const resolveComponentByMetaState = (
  Component,
  Loading = Skeleton,
  Error = ErrorAlert
) => (props: Object) => {
  const readMetaProp = getReadPath(props)

  // TO DO: This should use type checking or monad to guard against invalid props or state
  //        without having to explicitly check for these errors
  if (!readMetaProp) {
    throw new Error(`Props must have shape "{ meta: { read: { ${META_PROPS.join(', ')} } }}"`)
  }

  const state = getMetaState(readMetaProp)

  const Resolved = mapComponentToState({ Component, Loading, Error })[state] || Component

  return <Resolved {...props} />
}

export {
  getActiveProp,
  getMetaState,
  resolveComponentByMetaState
}
