import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import UserContext from "../../Context/UserContext";
import "./NavBar.css";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Avatar,IconButton} from "@material-ui/core";


const NavBar = () => {
  const { removeUser, userDetails } = useContext(UserContext);
  const history = useHistory();
  console.log(userDetails);

  return (
    <div className="navbar-student">
          <div className="service">
            
          </div>
            <div className="navbar-logo">
            <CgNotes
              onClick={() => history.push("/")}
              style={{ cursor: "pointer" ,color:"white"}}
            />
          </div>
           <div className="user-name-nav">
              <p className="user-name-name">Hello, {userDetails.first_name}</p>
              <button onClick={removeUser} className="nav-logout" data-tip="logout">
                <FiLogOut />
              </button>
              <ReactTooltip place="bottom" type="dark" effect="solid" />
        </div>
        </div>
  );
};

export default NavBar;
