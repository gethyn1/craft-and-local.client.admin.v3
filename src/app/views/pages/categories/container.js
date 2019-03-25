import { connect } from 'react-redux'
import { Categories } from './categories'

const mapStateToProps = (state) => ({
  categories: state.categories.entities
})

const container = connect(mapStateToProps, null)(Categories)

export {
  container
}
