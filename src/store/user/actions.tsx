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
//No dispatch needed. After sign up success user gets redirected to login screen

/*--------------------ADD JOB--------------------*/
export function jobToGlobalState(job) {
  return async function(dispatch) {
    dispatch(jobPublished(job));
  };
}

function jobPublished(job) {
  return { type: 'JOB_PUBLISHED', payload: job };
}
