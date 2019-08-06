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
export const fetchNotes = (restaurantObj, restaurantId, link, namespace)  => ({
  type: types.FETCH_NOTES,
  payload: {restaurantObj, restaurantId, link, namespace}
});

export const fetchNotesSuccess = (namespace, restaurantObj) => {
  return {
    type: types[`${namespace}/FETCH_NOTES_SUCCESS`],
    payload: restaurantObj
  }
}

export const restaurantRefresh = (namespace) => {
  return {
    type: types[`${namespace}/RESTAURANT_REFRESH`],
  }
}

// RESTAURANT Upload
export const restaurantUpload = (restaurantId, address, name, website, user,
  notes, photoReference, timestamp, city, notesId,
  userName, avatar) => ({
  type: types.RESTAURANT_UPLOAD,
  payload: {restaurantId, address, name, website, user, notes,
    photoReference, timestamp, city, notesId, userName, avatar}
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

//non-user profile

export const fetchProfile = (userId, namespace, navigation) => ({
  type: types.FETCH_PROFILE,
  payload: {userId, namespace, navigation}
})

export const fetchProfileSuccess = (profileObj, namespace) => ({
  type: types[`${namespace}/FETCH_PROFILE_SUCCESS`],
  payload: profileObj
})

export const goBackFromProfile = (namespace) => ({
  type: types[`${namespace}/PROFILE_GO_BACK`]
})

export const clearProfiles = (namespace) => ({
  type: types[`${namespace}/CLEAR_PROFILES`]
})

//edit profile

export const findNewAvatar = (userId, imageId) => ({
  type: types.FIND_NEW_AVATAR,
  payload: {userId, imageId}
})

export const findNewAvatarSuccess = (url) => ({
  type: types.FIND_NEW_AVATAR_SUCCESS,
  payload: {url}
})

export const editProfile = (link, userId, firstname, lastname, username) => ({
  type: types.EDIT_PROFILE,
  payload: {link, userId, firstname, lastname, username}
})


export const cancelEdit = () => ({
  type: types.CANCEL_EDIT
})

export const editFirstname = (text) => ({
  type: types.EDIT_FIRSTNAME,
  payload: {text}
})

export const editLastname = (text) => ({
  type: types.EDIT_LASTNAME,
  payload: {text}
})

export const editUsername = (text) => ({
  type: types.EDIT_USERNAME,
  payload: {text}
})
