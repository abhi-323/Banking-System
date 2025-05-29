import { useState } from "react";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  const [wait, setwait] = useState(true);
  const [token] = useSelector((state) => [state.userAuth.token]);

  setTimeout(() => {
    setwait(false);
  }, !token);
  if (wait) {
    return (
      <>
        <h2>loading...</h2>
      </>
    );
  }
  return token !== null ? (
    children
  ) : (
    <div>please login for to perform this action.</div>
  );
};

export default AuthRoute;
