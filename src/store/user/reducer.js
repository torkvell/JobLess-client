const initialState = {
  id: null,
  name: null,
  email: null,
  country: null,
  jobless: null,
  token: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'USER_SIGNUP':
      return { ...state, accountCreated: true };
    case 'ERROR':
      console.log(`error reducer`);
      return { ...state, error: action.payload };
    case 'USER_LOGOUT':
      return { ...initialState };
    case 'LOGIN_SUCCESS':
      const { id, name, email, country, jobless, token } = action.payload.login;
      console.log(
        'reducer for login output:',
        id,
        name,
        email,
        country,
        jobless,
        token
      );
      return {
        ...state,
        id,
        name,
        email,
        country,
        jobless,
        token,
      };
    default:
      return state;
  }
};
