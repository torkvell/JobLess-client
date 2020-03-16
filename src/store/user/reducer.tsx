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
    case 'LOGOUT_SUCCESS':
      return { ...initialState };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload.login,
      };
    case 'JOB_PUBLISHED':
      return { ...state, jobs: [...state.jobs, action.payload] };
    default:
      return state;
  }
};
