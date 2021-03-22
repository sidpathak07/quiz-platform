import { useState } from "react";
import { useHistory } from "react-router-dom";
import Error from "../../Components/ErrorComponent/Error";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username && !password) {
      return setError({
        username: "Please enter username!",
        password: "Please enter password!",
      });
    } else if (!username) {
      setError({
        username: "Please enter username!",
        password: "",
      });
    } else if (!password) {
      setError({
        username: "",
        password: "Please enter password!",
      });
    } else {
      setError({
        username: "",
        password: "",
      });
      history.push("/my-quiz");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label>
            Username
            <input
              type="text"
              value={username}
              placeholder="Enter username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            {error.username && <Error msg={error.username} />}
          </label>
        </div>
        <div className="password">
          <label>
            Password
            <input
              type="password"
              value={password}
              placeholder="Enter password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <Error msg={error.password} />}
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
