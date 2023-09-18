import React, { createContext, useEffect, useReducer } from "react";
import { auth, db } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

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
  logout: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  logout: () => null,
});

// Create the authentication provider component
export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const unsub = onSnapshot(
          collection(db, "customers"),
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
              dispatch({ type: "LOGIN", payload: doc.data() });
            });
            // setData(list);
          },
          (error) => {
            console.log("CUSTOM ERROR:", error);
          }
        );

        return () => {
          unsub();
        };
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
