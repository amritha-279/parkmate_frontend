import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem("auth"); // string
  if (auth === "true") { // compare as string
    return children;
  }
  return <Navigate to={"/"} replace />; // your login route is "/"
};

export default ProtectedRoute;
