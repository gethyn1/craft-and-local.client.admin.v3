import { path, none } from 'ramda'

const validatePath = path(['authenticated', 'validate'])

const validateMetaPath = (state) => path(['meta', 'read'], validatePath(state))

const isValidating = (state) => path(['isLoading'], validateMetaPath(state))

const hasValidated = (state) => path(['hasLoaded'], validateMetaPath(state))

const validationHasErrored = (state) => path(['hasErrored'], validateMetaPath(state))

const shouldValidate = (state) => none(Boolean, [isValidating(state), hasValidated(state), validationHasErrored(state)])

export {
  isValidating,
  hasValidated,
  validationHasErrored,
  shouldValidate
}
