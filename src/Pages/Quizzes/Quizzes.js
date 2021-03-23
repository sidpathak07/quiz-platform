import { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
import "./Quizzes.css";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get(
          `/api/get-all-quizzes/${userDetails.user_id}`
        );
        setQuizzes(data[0]);
        console.log(data[0]);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchQuizzes();
  }, [userDetails.user_id]);

  if (isLoading) {
    return (
      <div className="quiz-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="Quizzes-Page">
      <div className="all-Quizzes">
        <QuizCard {...quizzes} />
      </div>
    </div>
  );
};

export default Quizzes;
