type Action = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

type State = {
  currentUser: any;
};

const AuthReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;