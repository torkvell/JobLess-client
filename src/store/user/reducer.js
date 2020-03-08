const initialState = {
  id: false,
  email: false,
  token: null,
  tickets: null,
  events: null,
  error: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "USER_SIGNUP":
      return { ...state, accountCreated: true };
    case "ERROR":
      return { ...state, error: action.payload };
    case "USER_LOGOUT":
      return { ...initialState };
    case "USER_LOGIN":
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        token: action.payload.token
      };
    default:
      return state;
  }
};
