import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./auth";

const CheckAuth = ({ children }: any) => {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    // Check if the user is authenticated on initial load
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    } else {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
};

export default CheckAuth;
