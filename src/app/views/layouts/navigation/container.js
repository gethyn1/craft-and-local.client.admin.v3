import { connect } from 'react-redux'
import { Navigation } from './navigation'
import { authenticated } from '../../../state'

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(authenticated.actions.logoutUser())
})

const container = connect(null, mapDispatchToProps)(Navigation)

export {
  container
}
