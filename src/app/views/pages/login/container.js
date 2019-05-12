import { connect } from 'react-redux'
import { Login } from './login'
import { authenticated } from '../../../state'

const mapStateToProps = (state) => ({
  ...state.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (email, password) => dispatch(authenticated.actions.authenticateUser(email, password))
})

const container = connect(mapStateToProps, mapDispatchToProps)(Login)

export {
  container
}
