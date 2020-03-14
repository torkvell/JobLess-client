const initialState = {
  id: null,
  name: null,
  email: null,
  country: null,
  jobless: null,
  token: null,
  jobs: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    // errors are displayed directly in component from apollo mutations/query
    // case 'ERROR':
    //   return { ...state, error: action.payload };
    case 'LOGOUT_SUCCESS':
      return { ...initialState };
    case 'LOGIN_SUCCESS':
      const {
        id,
        name,
        email,
        country,
        jobless,
        token,
        jobs,
      } = action.payload.login;
      return {
        ...state,
        id,
        name,
        email,
        country,
        jobless,
        token,
        jobs,
      };
    case 'JOB_PUBLISHED':
      return { ...state, jobs: [...state.jobs, action.payload] };
    default:
      return state;
  }
};
