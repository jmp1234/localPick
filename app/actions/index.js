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

// RESTAURANT Upload
export const restaurantUpload =  (restaurantId, address, name, website, user, notes, photoReference) => ({
  type: types.RESTAURANT_UPLOAD,
  payload: {restaurantId, address, name, website, user, notes, photoReference}
});


export const restaurantUploadSuccess = (address, name, website, user, notes, restaurantId, photoReference) => ({
  type: types.RESTAURANT_UPLOAD_SUCCESS,
  payload: {address, name, website, user, notes, restaurantId, photoReference}
});

export const restaurantUploadFailure = restaurants => ({
  type: types.RESTAURANT_UPLOAD_ERROR,
  payload: restaurants,
});

//upload page
// export const moveToNextUploadPage = () => ({
//   type: types.UPLOAD_NEXT_PAGE
// })
export const moveToNextUploadPage = () => {
  return {
    type: types.UPLOAD_NEXT_PAGE
  }
}


export const moveBackUploadPage = () => ({
  type: types.UPLOAD_MOVE_BACK
})
