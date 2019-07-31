import {connect} from 'react-redux';
import {selectUserNotes, selectNonUserNotes} from '../../selectors/notesSelectors';
import {restaurantRefresh} from '../../actions';
import {RestaurantDisplay} from './restaurantDisplay';


const mapDispatchToProps = {restaurantRefresh}

const mapStateToProps = state => {
  return {
    userNotes: selectUserNotes(state),
    nonUserNotes: selectNonUserNotes(state),
  }
}

export const RestaurantContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDisplay)
