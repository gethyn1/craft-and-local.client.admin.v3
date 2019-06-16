import { connect } from 'react-redux'
import { isNil } from 'ramda'
import { Producer } from './producer'
import { producer } from '../../../state'
import { history } from '../../../history'
import { resolveComponentByMetaState, isCreatePage } from '../common'

const mapStateToProps = (state) => ({
  title: isCreatePage(history.location) ? 'Create producer' : 'Edit producer',
  producer: state.producer.entity,
  pendingEntityUpdates: state.producer.pendingEntityUpdates,
  meta: state.producer.meta,
  // TO DO: use a selector to get entities
  categories: state.categories.entities
})

const mapDispatchToProps = (dispatch) => ({
  onFieldUpdate: (field) => dispatch(producer.actions.updateField(field)),
  onSubmit: ({ userId, fields }) =>
    isNil(userId)
      ? dispatch(producer.actions.createProducer({ fields }))
      : dispatch(producer.actions.saveProducer({ userId, fields }))
})

// TODO: simplify resolveComponentByMetaState so it can be used internally in component
//       to avoid app layout flash on load
const container = connect(mapStateToProps, mapDispatchToProps)(resolveComponentByMetaState(Producer))

export {
  container
}
