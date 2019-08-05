import { connect } from 'react-redux'
import { Locations } from './locations'
import { location } from '../../../state'

const mapStateToProps = (state) => ({
  locations: state.locations.entities
})

const mapDispatchToProps = (dispatch) => ({
  deleteLocation: (id) => dispatch(location.actions.deleteLocation(id))
})

const container = connect(mapStateToProps, mapDispatchToProps)(Locations)

export {
  container
}
