import {moveToNextPageSearch, moveBackSearch} from '../../actions';
import {connect} from 'react-redux';
import {SearchDisplay} from './searchDisplay';


const mapDispatchToProps = {moveToNextPageSearch, moveBackSearch}

const mapStateToProps = state => {
  return {
    currentPage: state.searchReducer.cityInputReducer.page
  }
}

export const SearchContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDisplay);
