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
export const userSignup = (email, password) => ({
  type: types.SIGN_UP,
  payload: { email, password },
});

export const signupSuccess = user => ({
  type: types.SIGN_UP_SUCCESS,
  payload: user
});

export const signupFailure = errorMessage => ({
  type: types.SIGN_UP_ERROR,
  payload: errorMessage
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
