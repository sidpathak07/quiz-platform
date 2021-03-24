import { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import CountDownTimer from "./CountDownTimer";
import axios from "../../axios/axios";
import { FiAlertTriangle } from "react-icons/fi";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "./QuizPage.css";

const getResponses = () => {
  const responses = sessionStorage.getItem("quiz-responses");
  if (responses) {
    return JSON.parse(responses);
  } else {
    return null;
  }
};

const QuizPage = () => {
  const [quiz, setQuiz] = useState(getResponses);
  const [index, setIndex] = useState(0);
  const [userId, setuserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [responses, setResponses] = useState([]);

  const { userDetails } = useContext(UserContext);
  const { id } = useParams();
  const history = useHistory();

  console.log("rendered again");

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(0);
    }
  };

  const handleNext = () => {
    if (index < quiz?.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(quiz?.length - 1);
    }
  };

  const btnarray = [];
  for (var i = 0; i < quiz?.length; i++) {
    btnarray.push(i);
  }

  const handleResponse = (e) => {
    const { value } = e.target;
    const newResponses = responses.map((ques) => {
      console.log(quiz[id]);
      if (ques.id === quiz[id]) return { ...ques, answer: value };
      else return ques;
    });
    setResponses(newResponses);
    sessionStorage.setItem("quiz-responses", JSON.stringify(newResponses));
  };

  const handleTestSubmit = useCallback(() => {
    const submitTest = async () => {
      const res = {
        quiz: id,
        user: userId,
        response: responses,
      };
      const data = await axios.post("/api/create-response", res);
      console.log(data);
    };
    submitTest();
    history.push("/feedback");
  }, [history, id, responses, userId]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userDetails.access}` },
        };
        const { data } = await axios.get(`/api/get-quiz/${id}`, config);
        setQuiz(data?.quiz_questions);
        setuserId(data?.quiz_details?.creator);
        setResponses(
          data?.quiz_questions.map((quiz) => ({ key: quiz.id, answer: "" }))
        );
        sessionStorage.setItem("quiz-responses", JSON.stringify(responses));
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        history.push("/404");
      }
    };
    fetchQuestion();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="quiz-loader">
          <Loader />
        </div>
      ) : (
        <div className="quiz-page">
          <div className="question-progress-bar">
            <div
              style={{ width: ((index + 1) / quiz.length) * 100 + "%" }}
              className="question-progress"
            ></div>
          </div>

          <div className="question-page-left">
            <div className="quiz-question">
              <h3>Question: {index + 1}</h3>
              <div className="question-details">
                <p>{quiz[index]?.question}</p>
                <div className="marks-distribution">
                  <p>Correct : {quiz[index]?.correct_marks} marks</p>
                  <p>Incorrect : {quiz[index]?.negative_marks} marks</p>
                </div>
              </div>

              <div className="quiz-options">
                {quiz[index]?.option.length > 0 ? (
                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" onClick={handleResponse}>
                      {quiz[index]?.option.map((option, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={option.option}
                          name={option.key.toString()}
                          control={<Radio />}
                          label={option.option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <textarea
                    placeholder="Type your answer here"
                    onChange={handleResponse}
                  />
                )}
              </div>
            </div>

            <div className="navigation-btn">
              <button
                disabled={index === 0 ? true : false}
                onClick={handlePrevious}
              >
                Previous
              </button>
              {index === quiz.length - 1 && (
                <button onClick={() => setShowSubmit(true)}>Submit test</button>
              )}
              <button
                disabled={index === quiz.length - 1 ? true : false}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>

          {showSubmit && (
            <div className="submit-confirm">
              <div className="submit-popup">
                <div className="submit-pop-text">
                  <p>
                    <FiAlertTriangle /> Are you sure you want to submit ?
                  </p>
                  <p>Once you submit , All your responses will be recorded</p>
                </div>

                <div className="confirm-button">
                  <button onClick={() => setShowSubmit(false)}>
                    Back to Test
                  </button>
                  <button onClick={handleTestSubmit}>Proceed and Submit</button>
                </div>
              </div>
            </div>
          )}

          <div className="quiz-status">
            <CountDownTimer handleTestSubmit={handleTestSubmit} />

            <div className="quiz-navigation-stats">
              {btnarray.map((button, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={(e) => {
                      setIndex(e.target.value - 1);
                    }}
                    value={button + 1}
                  >
                    {button + 1}
                  </button>
                );
              })}
            </div>

            <div className="choice-sign">
              <div className="attempted-sign">
                <button disabled={true} />
                <p>Attempted</p>
              </div>
              <div className="unattempted-sign">
                <button disabled={true} />
                <p>Not Attempted</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizPage;
