import { jwtDecode } from "jwt-decode";

const ManagerRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const role = decoded ? decoded.roles : null;
  return role === "MANAGER" ? (
    children
  ) : (
    <div>Access denied! This action is limited for Manager to perform.</div>
  );
};

export default ManagerRoute;
