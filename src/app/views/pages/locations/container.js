import { connect } from 'react-redux'
import { Locations } from './locations'

const mapStateToProps = (state) => ({
  locations: state.locations.entities
})

const container = connect(mapStateToProps, null)(Locations)

export {
  container
}
