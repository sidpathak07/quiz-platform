import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useHistory } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import "./TeacherHomePage.css";

const TeacherHomePage = () => {
  const history = useHistory();
  return (
    <div className="teacher-homepage">
      <NavBar />
      <div className="homepage-card">
        <div className="homepage-card-icon">
          <FaEdit />
        </div>
        <button onClick={() => history.push("/allquizzes")}>Manage Quizzes</button>
      </div>
    </div>
  );
};

export default TeacherHomePage;
