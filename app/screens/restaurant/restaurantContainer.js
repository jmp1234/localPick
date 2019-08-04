import { connect } from 'react-redux';
import { selectUserNotes, selectNonUserNotes, selectNotesReducer } from '../../selectors/notesSelectors';
import { restaurantRefresh } from '../../actions';
import { RestaurantDisplay } from './restaurantDisplay';


const mapDispatchToProps = (dispatch, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
    return {
        restaurantRefresh: () => dispatch(restaurantRefresh(namespace))
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userNotes: selectUserNotes(state, ownProps),
    nonUserNotes: selectNonUserNotes(state, ownProps),
    test: selectNotesReducer(state, ownProps)
  }
}

export const RestaurantContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDisplay)
