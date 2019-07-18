import types from './types';


export const userLogout = () => ({type: types.LOG_OUT})

export const userLogin = (email, password) => ({
  type: types.LOG_IN,
  payload: { email, password },
});

export const loginSuccess = user => ({
  type: types.LOG_IN_SUCCESS,
  payload: user
});
