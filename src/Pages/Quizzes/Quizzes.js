import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/LoadingBar";
import QuizCard from "./QuizCard";
import axios from "../../axios/axios";
import "./Quizzes.css";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get("/api/get-all-quizzes/7");
        setQuizzes(data[1]);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchQuizzes();
  }, []);

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
        <QuizCard key={quizzes.id} {...quizzes} />
      </div>
    </div>
  );
};

export default Quizzes;
