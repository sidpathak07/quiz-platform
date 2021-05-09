import { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext";
import Navbar from "../../Components/NavBar/NavBar";
import CreateQuizModal from "./CreateQuizModal";
import Loader from "../../Components/Loader/LoadingBar";
import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
import Carousel from "react-elastic-carousel";
import "./TeacherQuizzes.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 500, itemsToShow: 2 },
  { width: 900, itemsToShow: 3 },
  { width: 1100, itemsToShow: 4 },
];

const TeacherQuizzes = () => {
  const [allquizzes, setAllquizzes] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(null);
  const { userDetails } = useContext(UserContext);

  const fetchAllQuizzes = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.get(
        `/api/get-all-quizzes/${userDetails.user_id}`,
        config
      );
      setAllquizzes(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!allquizzes) {
    return (
      <div className="Loading--div">
        <Navbar />
        <div className="loader">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="Teacher-Quizzes">
      <Navbar />
      <div className="teacher-quizzes-header">
        <h1>Your Quizzes</h1>
        <button onClick={() => setShowCreateModal(!showCreateModal)}>
          Create new Quiz
        </button>
      </div>
      {allquizzes?.length === 0 && (
        <p className="no-quiz-created">You haven't created any quiz yet.</p>
      )}
      <div className="all-Quizzes">
        <Carousel breakPoints={breakPoints}>
          {allquizzes?.map((quiz) => (
            <QuizCard
              key={quiz.id}
              {...quiz}
              userDetails={userDetails}
              fetchAllQuizzes={fetchAllQuizzes}
            />
          ))}
        </Carousel>
      </div>
      {showCreateModal && (
        <CreateQuizModal
          userDetails={userDetails}
          fetchAllQuizzes={fetchAllQuizzes}
          setShowCreateModal={setShowCreateModal}
        />
      )}
    </div>
  );
};

export default TeacherQuizzes;
