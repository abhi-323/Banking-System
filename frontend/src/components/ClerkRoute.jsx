import { jwtDecode } from "jwt-decode";

const ClerkRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const role = decoded ? decoded.roles[0] : null;
  return role === "CLERK" ? (
    children
  ) : (
    <div>Access denied! This action is limited for Clerk to perform.</div>
  );
};

export default ClerkRoute;
