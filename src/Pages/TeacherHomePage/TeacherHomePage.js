import TeacherNavbar from "../../Components/NavBar/TeacherNavbar";
import { useHistory } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import "./TeacherHomePage.css";

const TeacherHomePage = () => {
  const history = useHistory();
  return (
    <div className="teacher-homepage">
      <TeacherNavbar />
      <div className="homepage-card" onClick={() => history.push("/allquizzes")}>
        <div className="homepage-card-icon">
          <FaEdit />
        </div>
        <button>Manage Quizzes</button>
      </div>
    </div>
  );
};

export default TeacherHomePage;
