import { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
import NavBar from "../../Components/NavBar/NavBar";
import "./Quizzes.css";

const getQuizDatafromSessionStorage = () => {
  const quizData = sessionStorage.getItem("quiz-data");
  if (quizData) {
    return JSON.parse(quizData);
  } else {
    return null;
  }
};

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState(getQuizDatafromSessionStorage);
  const [isLoading, setIsLoading] = useState(true);
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (quizzes) {
        setIsLoading(false);
      }
      try {
        const config = {
          headers: { Authorization: `Bearer ${userDetails.access}` },
        };
        const { data } = await axios.get(
          `/api/get-all-quizzes/${userDetails.user_id}`,
          config
        );
        sessionStorage.setItem("quiz-data", JSON.stringify(data));
        setQuizzes(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchQuizzes();
  }, [userDetails.access, userDetails.user_id]);

  return (
    <div className="Quizzes-Page">
      <NavBar />
      {isLoading ? (
        <div className="quiz-loader">
          <Loader />
        </div>
      ) : (
        <div className="all-Quizzes">
          {quizzes?.map((quiz) => (
            <QuizCard key={quiz.id} {...quiz} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Quizzes;
