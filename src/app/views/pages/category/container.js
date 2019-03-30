import { connect } from 'react-redux'
import { isNil } from 'ramda'
import { Category } from './category'
import { history } from '../../../history'
import { category } from '../../../state'
import { resolveComponentByMetaState } from '../common'

const isCreatePage = location => location.pathname.includes('/create')

const mapStateToProps = (state) => ({
  title: isCreatePage(history.location) ? 'Create category' : 'Edit category',
  category: state.category.entity,
  pendingEntityUpdates: state.category.pendingEntityUpdates,
  meta: state.category.meta
})

const mapDispatchToProps = (dispatch) => ({
  onFieldUpdate: (field) => dispatch(category.actions.updateField(field)),
  onSubmit: ({ id, fields }) =>
    isNil(id)
      ? dispatch(category.actions.createCategory({ fields }))
      : dispatch(category.actions.saveCategory({ id, fields }))
})

const container = connect(mapStateToProps, mapDispatchToProps)(resolveComponentByMetaState(Category))

export {
  container
}
