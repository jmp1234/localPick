import { connect } from 'react-redux';
import { selectLocalPicksArray, selectCity, selectLocalPicks } from '../../selectors/localPicksSelectors';
import { localPicksRefresh } from '../../actions';
import { LocalPicksDisplay } from './localPicksDisplay';
import { fetchNotes } from '../../actions';

const mapStateToProps = state => {
  return {
    localPicksArray: selectLocalPicksArray(state),
    localPicks: selectLocalPicks(state),
    city: selectCity(state),
  }
}

const mapDispatchToProps = {localPicksRefresh, fetchNotes}

export const LocalPicksContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalPicksDisplay);
