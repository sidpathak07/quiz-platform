import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import UserContext from "../../Context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { removeUser, userDetails } = useContext(UserContext);
  return (
    <div className="nav-bar">
      <div className="logo">logo</div>
      <div className="user-name-nav">
        <p>{`Hello ${userDetails.first_name}`}</p>
        <button onClick={removeUser} className="nav-logout">
          <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
