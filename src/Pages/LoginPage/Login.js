import { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import Error from "../../Components/ErrorComponent/Error";
import axios from '../../axios/axios'
import "./Login.css";
import LoginLoader from "../../Components/LoginLoader/LoginLoader";
import {UserContext} from "../../Context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const{ userDetails, updateUser ,removeUser } = useContext(UserContext)

  const fetchUser = async()=>{
    setLoading(true)
    try{
        await axios.post("/api/auth/login",{
        username: username,
        password: password
      })
      .then(res=> console.log(res))
      // console.log(userDetails)
      setLoading(false)
      
    }
    catch(err){
      console.log(err.message)
    }
   
  }


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
     }
    fetchUser()
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
        {loading ? <div className='login-loader'><LoginLoader/></div> :
          <button onClick={handleSubmit} type="submit">Log in</button>
        }
        
      </form>
    </div>
  );
};

export default Login;
