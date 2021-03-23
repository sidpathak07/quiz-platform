import { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
import NavBar from "../../Components/NavBar/NavBar";
import "./Quizzes.css";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userDetails.access}` },
        };

        const { data } = await axios.get(
          `/api/get-all-quizzes/${userDetails.user_id}`,
          config
        );
        setQuizzes(data[0]);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchQuizzes();
  }, [userDetails.access, userDetails.user_id]);

  if (isLoading) {
    return (
      <div className="quiz-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="Quizzes-Page">
      <NavBar />
      <div className="all-Quizzes">
        <QuizCard {...quizzes} />
      </div>
    </div>
  );
};

export default Quizzes;
