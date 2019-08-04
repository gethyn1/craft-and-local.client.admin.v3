import { connect } from 'react-redux'
import { Categories } from './categories'
import { category } from '../../../state'

const mapStateToProps = (state) => ({
  categories: state.categories.entities
})

const mapDispatchToProps = (dispatch) => ({
  deleteCategory: (id) => dispatch(category.actions.deleteCategory(id))
})

const container = connect(mapStateToProps, mapDispatchToProps)(Categories)

export {
  container
}
