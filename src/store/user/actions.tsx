/*--------------------LOGIN--------------------*/
//This example is just for demonstration purposes to show how dispatch types can be reused by creating a thunk
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
//This example is just for demonstration purposes to show how dispatch types can be reused by creating a thunk
export function logOut() {
  return async function(dispatch) {
    dispatch(logOutSuccess());
  };
}

function logOutSuccess() {
  return { type: 'LOGOUT_SUCCESS' };
}

/*--------------------SIGN UP--------------------*/
//No dispatch needed. After sign up success we redirected user to login screen

/*--------------------ADD JOB--------------------*/
//Dispatched directly from component as normally
