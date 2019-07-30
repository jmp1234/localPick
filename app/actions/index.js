import types from './types';


//Login Functions
export const userLogin = (email, password) => ({
  type: types.LOG_IN,
  payload: { email, password },
});

export const loginSuccess = user => ({
  type: types.LOG_IN_SUCCESS,
  payload: user
});

export const loginFailure = errorMessage => ({
  type: types.LOG_IN_ERROR,
  payload: errorMessage
});

//Logout Functions
export const userLogout = () => ({type: types.LOG_OUT})

export const logoutSuccess = () => ({
  type: types.LOG_OUT_SUCCESS,
});

export const logoutFailure = errorMessage => ({
  type: types.LOG_OUT_ERROR,
  payload: errorMessage
});

//Sign Up
export const userSignup = (email, password, firstName, lastName, userName, coords, city) => ({
  type: types.SIGN_UP,
  payload: { email, password, firstName, lastName, userName, coords, city },
});

export const signupSuccess = (user, firstName, lastName, userName, coords, city, email) => ({
  type: types.SIGN_UP_SUCCESS,
  payload: {user, firstName, lastName, userName, coords, city, email}
});

export const signupFailure = errorMessage => ({
  type: types.SIGN_UP_ERROR,
  payload: errorMessage
});

export const setNewUser = (email, password) => ({
  type: types.SET_NEW_USER,
  payload: { email, password },
});


//Fetch Profile

export const fetchUserInfo = userId => ({
  type: types.FETCH_USER_PROFILE,
  payload: userId
});

export const fetchUserSuccess = userObj => ({
  type: types.FETCH_USER_SUCCESS,
  payload: userObj
})

//FETCH USER PICKS
export const fetchUserPicks = restaurants => ({
  type: types.FETCH_USER_PICKS,
  payload: restaurants,
});

export const fetchUserPicksSuccess = restaurants => ({
  type: types.FETCH_USER_PICKS_SUCCESS,
  payload: restaurants
});

export const fetchUserPicksFailure = errorMessage => ({
  type: types.FETCH_USER_PICKS_ERROR,
  payload: errorMessage
});

//Fetch notes
export const fetchNotes = (restaurantObj, restaurantId, userId)  => ({
  type: types.FETCH_NOTES,
  payload: {restaurantObj, restaurantId, userId}
});

export const fetchNotesSuccess = (restaurantObj) => {
  return {
    type: types.FETCH_NOTES_SUCCESS,
    payload: restaurantObj
  }
}

export const restaurantRefresh = () => ({
  type: types.RESTAURANT_REFRESH
})

// RESTAURANT Upload
export const restaurantUpload = (restaurantId, address, name, website, user, notes, photoReference, timestamp, city) => ({
  type: types.RESTAURANT_UPLOAD,
  payload: {restaurantId, address, name, website, user, notes, photoReference, timestamp, city}
});


export const restaurantUploadSuccess = (address, name, website, user, notes, restaurantId, photoReference, timestamp) => ({
  type: types.RESTAURANT_UPLOAD_SUCCESS,
  payload: {address, name, website, user, notes, restaurantId, photoReference, timestamp}
});

export const restaurantUploadFailure = restaurants => ({
  type: types.RESTAURANT_UPLOAD_ERROR,
  payload: restaurants,
});


//upload page

export const moveToNextUploadPage = () => {
  return {
    type: types.UPLOAD_NEXT_PAGE
  }
}

export const moveBackUploadPage = () => ({
  type: types.UPLOAD_MOVE_BACK
})

export const addNotesAtUploadPage = text => ({
  type: types.UPLOAD_ADD_NOTES,
  payload: text
})

//search
export const moveToNextPageSearch = () => ({
  type: types.SEARCH_NEXT_PAGE
})

export const moveBackSearch = () => ({
  type: types.SEARCH_MOVE_BACK
})

export const localPicksRefresh = () => ({
  type: types.LOCAL_PICKS_REFRESH
})

export const fetchLocalPicks = city => ({
  type: types.FETCH_LOCAL_PICKS,
  payload: city
});

export const fetchLocalPicksSuccess = restaurantObj => ({
  type: types.FETCH_LOCAL_PICKS_SUCCESS,
  payload: restaurantObj
});

export const fetchLocalPicksFailure = errorMessage => ({
  type: types.FETCH_LOCAL_PICKS_ERROR,
  payload: errorMessage
});
