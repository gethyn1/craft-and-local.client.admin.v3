import { connect } from 'react-redux'
import { Login } from './login'
import { authenticated } from '../../../state'
import { resolveComponentByMetaState } from '../common'

const mapStateToProps = (state) => ({
  ...state.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (email, password) => dispatch(authenticated.actions.authenticateUser(email, password))
})

const container = connect(mapStateToProps, mapDispatchToProps)(resolveComponentByMetaState(Login))

export {
  container
}
