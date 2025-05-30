import { useEffect, useState } from "react";

const AuthRoute = ({ children }) => {
  const [wait, setwait] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => {
      setwait(false);
    }, !token);
  }, [token]);

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
