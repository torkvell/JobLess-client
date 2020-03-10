/*--------------------LOGIN--------------------*/

export function loginThunk(data) {
  return function(dispatch) {
    if (data) return dispatch(loginSuccess(data));
  };
}

function loginSuccess(data) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: data,
  };
}

/*--------------------LOGOUT--------------------*/

export function logOut() {
  return async function(dispatch) {
    dispatch(logOutSuccess());
  };
}

function logOutSuccess() {
  return { type: 'LOGOUT_SUCCESS' };
}

/*--------------------SIGN UP--------------------*/
//This is done on the RegisterScreen with Apollo mutation component
