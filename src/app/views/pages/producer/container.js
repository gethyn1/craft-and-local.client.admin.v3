import { connect } from 'react-redux'
import { Producer } from './producer'

const mapStateToProps = (state) => ({
  ...state.producer
})

const container = connect(mapStateToProps, null)(Producer)

export {
  container
}
