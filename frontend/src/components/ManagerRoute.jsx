import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const ManagerRoute = ({ children }) => {
  const [token] = useSelector((state) => [state.userAuth.token]);
  const decoded = jwtDecode(token);
  const role = decoded ? decoded.roles : null;
  return role === "MANAGER" ? (
    children
  ) : (
    <div>Access denied! This action is limited for Manager to perform.</div>
  );
};

export default ManagerRoute;
