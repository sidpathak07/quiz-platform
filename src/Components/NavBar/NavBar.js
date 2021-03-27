import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import UserContext from "../../Context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { removeUser, userDetails } = useContext(UserContext);
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <CgNotes />
        </div>
        <div className="user-name-nav">
          <p>Hello, {userDetails.first_name}</p>
          <button onClick={removeUser} className="nav-logout" data-tip="logout">
            <FiLogOut />
          </button>
          <ReactTooltip place="bottom" type="dark" effect="solid" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
