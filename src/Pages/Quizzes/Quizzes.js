import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/LoadingBar";
import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
import "./Quizzes.css";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get("/api/get-all-quizzes/7");
        setQuizzes(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="Quizzes-Page">
      {isLoading && (
        <div className="quiz-loader">
          <Loader />
        </div>
      )}
      <div className="all-Quizzes">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} {...quiz} />
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
