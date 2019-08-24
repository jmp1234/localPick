import { moveToNextPageSearch, moveBackSearch, displayIcon } from '../../actions';
import { connect } from 'react-redux';
import { SearchDisplay } from './searchDisplay';


const mapDispatchToProps = {moveToNextPageSearch, moveBackSearch, displayIcon}

const mapStateToProps = state => {
  return {
    currentPage: state.searchReducer.cityInputReducer.page,
    iconDisplay: state.searchReducer.cityInputReducer.hideIcon
  }
}

export const SearchContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDisplay);
