import {connect} from 'react-redux';
import {selectLocalPicksArray, selectCity} from '../../selectors/localPicksSelectors';
import {localPicksRefresh} from '../../actions';
import {LocalPicksDisplay} from './localPicksDisplay';

const mapStateToProps = state => {
  return {
    localPicks: selectLocalPicksArray(state),
    city: selectCity(state)
  }
}

const mapDispatchToProps = {localPicksRefresh}

export const LocalPicksContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalPicksDisplay);
