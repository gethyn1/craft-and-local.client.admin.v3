import { connect } from 'react-redux'
import { Navigation } from './navigation'
import { authenticated } from '../../../state'

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticated.authenticate.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(authenticated.actions.logoutUser())
})

const container = connect(mapStateToProps, mapDispatchToProps)(Navigation)

export {
  container
}
