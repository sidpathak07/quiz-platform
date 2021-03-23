import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { Tooltip } from "@material-ui/core";
import UserContext from "../../Context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { removeUser, userDetails } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Logo</h1>
        </div>
        <div className="user-name-nav">
          <p>Hello, {userDetails.first_name}</p>
          <Tooltip arrow title="Logout">
            <button onClick={removeUser} className="nav-logout">
              <FiLogOut />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
