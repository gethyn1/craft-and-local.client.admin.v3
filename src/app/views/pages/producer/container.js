import { connect } from 'react-redux'
import { Producer } from './producer'
import { producer } from '../../../state'
import { resolveComponentByMetaState } from '../common'

const mapStateToProps = (state) => ({
  ...state.producer,
  // TO DO: use a selector to get entities
  categories: state.categories.entities
})

const mapDispatchToProps = (dispatch) => ({
  onFieldUpdate: (field) => dispatch(producer.actions.updateField(field)),
  onSubmit: (userId, fields) => dispatch(producer.actions.saveProducer(userId, fields))
})

// TODO: simplify resolveComponentByMetaState so it can be used internally in component
//       to avoid app layout flash on load
const container = connect(mapStateToProps, mapDispatchToProps)(resolveComponentByMetaState(Producer))

export {
  container
}
