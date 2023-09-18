import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./auth";
import { auth } from "./firebase";

const CheckAuth = ({ children }: any) => {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const checkAuthentication = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch({ type: "LOGIN", payload: user });
        } else {
          router.push("/login");
        }
      });
    };

    checkAuthentication();
  }, []);

  // if (!state.user) {
  //   // return null; // Render nothing if there's no user (to avoid briefly showing the protected page)
  //   return null;
  // }

  return <>{children}</>;
};

export default CheckAuth;
