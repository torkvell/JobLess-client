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
    case 'ERROR':
      console.log(`error reducer`);
      return { ...state, error: action.payload };
    case 'LOGOUT_SUCCESS':
      return { ...initialState };
    case 'LOGIN_SUCCESS':
      const { id, name, email, country, jobless, token } = action.payload.login;
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
