import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/quizzes")
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label>
            <p>Username</p>
            <input
              required
              type="text"
              value={username}
              name="username"
              placeholder="Enter username..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="password">
          <label>
            <p>Password</p>

            <input
              required
              type="password"
              value={password}
              name="password"
              placeholder="Enter password..."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
