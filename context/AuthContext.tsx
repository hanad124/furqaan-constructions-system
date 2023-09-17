import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

type User = {
  id: string;
  address: string;
  role: string;
  email: string;
  avatar: string;
  username: string;
  phone: string;
  securityQuestion: string;
  birthdate: string;
  fullName: string;
};

type AuthState = {
  currentUser: User | null;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const userFromLocalStorage = localStorage.getItem("user");
const INITIAL_STATE: AuthState = {
  currentUser: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);

type AuthContextValue = {
  currentUser: User | null;
  dispatch: React.Dispatch<any>; // Adjust the type for the dispatched actions as needed
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  const authContextValue: AuthContextValue = {
    currentUser: state.currentUser,
    dispatch: dispatch,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
