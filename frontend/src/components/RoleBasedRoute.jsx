const RoleBasedRoute = ({ children }) => {
  const [wait, setwait] = useState(true);
  const token = "";
  setTimeout(() => {
    setwait(false);
  }, !token);
  if (wait) {
    return;
    <>
      <h2>loading...</h2>
    </>;
  }
  return children;
};
