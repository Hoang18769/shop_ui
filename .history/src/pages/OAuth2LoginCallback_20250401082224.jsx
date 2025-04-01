import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function OAuth2LoginCallback() {
  const [query, setQuery] = useSearchParams();

  if (query?.get("status") === "success") {
    let token = query?.get("token");
    if (token) {
      let decodedToken = jwtDecode(token);
      toast.success("Login via OAuth2 success!");
      if (decodedToken.scope === "ADMIN") {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      toast.error("Something went wrong, please try login again!");
      return <Navigate to="/login" />;
    }
  } else if (query?.get("status") === "fail") {
    toast.error("Login via OAuth2 failed!");
    return <Navigate to="/account/login" />;
  } else return <div>Processing...</div>;
}
