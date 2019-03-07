import { connect } from 'react-redux'
import { Producers } from './producers'

const mapStateToProps = (state) => ({
  producers: state.producers.entities
})

const container = connect(mapStateToProps, null)(Producers)

export {
  container
}
