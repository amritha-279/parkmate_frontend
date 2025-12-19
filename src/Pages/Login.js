import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false); // toggle form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("auth", "true");
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      alert("User already exists!");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    setIsRegister(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h2>{isRegister ? "Register" : "Login"}</h2>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="btnSubmit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="toggleText">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
