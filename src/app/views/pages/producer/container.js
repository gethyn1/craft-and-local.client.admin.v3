import { connect } from 'react-redux'
import { Producer } from './producer'
import { producer } from '../../../state'

const mapStateToProps = (state) => ({
  ...state.producer
})

const mapDispatchToProps = (dispatch) => ({
  onFieldUpdate: (field) => dispatch(producer.actions.updateField(field)),
  onSubmit: (userId, fields) => dispatch(producer.actions.saveProducer(userId, fields))
})

const container = connect(mapStateToProps, mapDispatchToProps)(Producer)

export {
  container
}
