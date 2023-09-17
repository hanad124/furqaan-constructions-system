import React, { createContext, useReducer } from "react";
import { auth } from "./firebase"; // Import the initialized auth module from your firebase file

// Define the initial state for authentication
interface AuthState {
  user: any; // Update the type with your user object type
  isAuthenticated: boolean;
}

// Define the actions for the reducer
type AuthAction =
  | { type: "LOGIN"; payload: any } // Update the payload type with your user object type
  | { type: "LOGOUT" };

// Create the initial state for authentication
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Create the authentication reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      // Store user data in session storage
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Create the authentication context
export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create the authentication provider component
export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
