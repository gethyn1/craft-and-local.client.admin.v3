import { connect } from 'react-redux'
import { isNil } from 'ramda'
import { Location } from './location'
import { location } from '../../../state'
import { history } from '../../../history'
import { resolveComponentByMetaState, isCreatePage } from '../common'

const mapStateToProps = (state) => ({
  title: isCreatePage(history.location) ? 'Create location' : 'Edit location',
  location: state.location.entity,
  pendingEntityUpdates: state.location.pendingEntityUpdates,
  meta: state.location.meta,
  // TO DO: use a selector to get entities
  categories: state.categories.entities
})

const mapDispatchToProps = (dispatch) => ({
  onFieldUpdate: (field) => dispatch(location.actions.updateField(field)),
  onSubmit: ({ id, fields }) =>
    isNil(id)
      ? dispatch(location.actions.createLocation({ fields }))
      : dispatch(location.actions.saveLocation({ id, fields }))
})

// TODO: simplify resolveComponentByMetaState so it can be used internally in component
//       to avoid app layout flash on load
const container = connect(mapStateToProps, mapDispatchToProps)(resolveComponentByMetaState(Location))

export {
  container
}
