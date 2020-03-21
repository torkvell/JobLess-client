/*--------------------LOGOUT--------------------*/
/*This example is just for demonstration purposes to show how 
dispatch types can be reused across several components by creating a thunk*/
export function logOut() {
  return async function(dispatch) {
    dispatch(logOutSuccess());
  };
}

function logOutSuccess() {
  return { type: 'LOGOUT_SUCCESS' };
}

/*--------------------LOGIN--------------------*/
//Dispatched directly from component as normally

/*--------------------SIGN UP--------------------*/
//No dispatch needed. After sign up success we redirected user to login screen for authentication

/*--------------------ADD JOB--------------------*/
//Dispatched directly from component as normally
