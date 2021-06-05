import { useState, useEffect, useContext, useCallback, useRef } from "react";
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
  const mountedRef = useRef(true);

  const fetchQuizzes = useCallback(async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.get(
        `/api/get-all-quizzes/${userDetails.user_id}`,
        config
      );
      if (!mountedRef.current) return null;
      setQuizzes(data);
      sessionStorage.setItem("quiz-data", JSON.stringify(data));
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }, [mountedRef, userDetails]);

  useEffect(() => {
    fetchQuizzes();
    return function cleanup() {
      mountedRef.current = false;
    };
  }, [fetchQuizzes]);

  return (
    <div className="Quizzes-Page">
      <NavBar />
      {quizzes && <h2 className="quizzes-header">Your Quizzes</h2>}
      {isLoading ? (
        <div className="quizcard-loader">
          <Loader />
        </div>
      ) : (
        <div className="all-Quizzes">
          {quizzes.length < 1 ? (
            <h3 className="no-quizzes">You haven't been assigned any quiz.</h3>
          ) : (
            quizzes?.map((quiz) => {
              if (new Date(quiz.endtime) > new Date()) {
                return <QuizCard key={quiz.id} {...quiz} />;
              } else return false;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Quizzes;
