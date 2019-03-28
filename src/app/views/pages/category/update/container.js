import { connect } from 'react-redux'
import { Update } from './update'
import { category } from '../../../../state'
import { resolveComponentByMetaState } from '../../common'

const mapStateToProps = (state) => ({
  category: state.category.entity,
  pendingEntityUpdates: state.category.pendingEntityUpdates,
  meta: state.category.meta
})

const mapDispatchToProps = (dispatch) => ({
  onFieldUpdate: (field) => dispatch(category.actions.updateField(field)),
  onSubmit: ({ id, fields }) => dispatch(category.actions.saveCategory({ id, fields }))
})

const container = connect(mapStateToProps, mapDispatchToProps)(resolveComponentByMetaState(Update))

export {
  container
}
