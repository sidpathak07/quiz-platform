import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import UserContext from "../../Context/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { removeUser, userDetails } = useContext(UserContext);
  const history = useHistory();

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <CgNotes
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          />
        </div>
        {userDetails.role === "Student" && (
          <div className="user-name-nav scores ">
            <p
              className="viewall"
              onClick={() => history.push(`/allscores/${userDetails.username}`)}
            >
              View All Scores
            </p>
          </div>
        )}
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
