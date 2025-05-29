import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const ClerkRoute = ({ children }) => {
  const [token] = useSelector((state) => [state.userAuth.token]);
  const decoded = jwtDecode(token);
  const role = decoded ? decoded.roles : null;
  return role === "CLERK" ? (
    children
  ) : (
    <div>Access denied! This action is limited for Clerk to perform.</div>
  );
};

export default ClerkRoute;
