import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./auth";

const CheckAuth = ({ children }: any) => {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const checkAuthentication = () => {
      // Check if the user is authenticated on initial load
      const user = sessionStorage.getItem("user");
      if (user) {
        dispatch({ type: "LOGIN", payload: JSON.parse(user) });
      } else {
        router.push("/login");
      }
    };

    checkAuthentication();
  }, []);

  if (!state.user) {
    // return null; // Render nothing if there's no user (to avoid briefly showing the protected page)
  }

  return <>{children}</>;
};

export default CheckAuth;
