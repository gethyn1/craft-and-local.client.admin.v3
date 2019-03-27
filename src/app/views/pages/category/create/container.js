import { connect } from 'react-redux'
import { Create } from './create'
import { category } from '../../../../state'

const mapStateToProps = (state) => ({
  pendingEntityUpdates: state.category.pendingEntityUpdates,
  isCreating: state.category.meta.create.isLoading
})

const mapDispatchToProps = (dispatch) => ({
  onFieldUpdate: (field) => dispatch(category.actions.updateField(field)),
  onSubmit: ({ fields }) => dispatch(category.actions.createCategory({ fields }))
})

const container = connect(mapStateToProps, mapDispatchToProps)(Create)

export {
  container
}
