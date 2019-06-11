import { connect } from 'react-redux'
import { ValidateUser } from './validate-user'
import { authenticated } from '../../state'

const { shouldValidate } = authenticated.selectors

const mapStateToProps = (state) => ({
  shouldValidate: shouldValidate(state),
  isAuthenticated: state.authenticated.authenticate.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  validateUser: () => dispatch(authenticated.actions.validateUser())
})

const container = connect(mapStateToProps, mapDispatchToProps)(ValidateUser)

export {
  container
}
