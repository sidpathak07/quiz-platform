import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import CountDownTimer from "./CountDownTimer";
import axios from "../../axios/axios";
import { FiAlertTriangle } from "react-icons/fi";
import { IoFlag } from "react-icons/io5";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import MathJax from "react-mathjax3";
import parse from "html-react-parser";
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
  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [responses, setResponses] = useState(getResponses);
  const { userDetails, userCurrentQuiz, timeUpdate, submitTest, addQuiz } =
    useContext(UserContext);
  const { id } = useParams();
  const history = useHistory();
  const mountedRef = useRef(true);
  const { id: quizid, duration: quizDuration, test_time } = userCurrentQuiz;

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
    const { value, name } = e.target;
    let ans = "";
    if (name) {
      ans = name;
    } else {
      ans = value;
    }
    const newResponses = responses.map((ques) => {
      if (ques.key === quiz[index].id) {
        if (ques.answer === value) {
          return { ...ques, answer: "", selectetedAnswer: "" };
        }
        return { ...ques, answer: value, selectetedAnswer: ans };
      } else return ques;
    });
    setResponses(newResponses);
    sessionStorage.setItem("quiz-responses", JSON.stringify(newResponses));
  };

  const handleFlagQuestion = () => {
    const newResponses = responses.map((ques) => {
      if (ques.key === quiz[index].id) return { ...ques, flag: !ques.flag };
      else return ques;
    });
    setResponses(newResponses);
    sessionStorage.setItem("quiz-responses", JSON.stringify(newResponses));
  };

  const testSubmit = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const res = {
        quiz: id,
        user: userDetails?.user_id,
        response: responses.map((res) => ({
          key: res.key,
          answer: res.selectetedAnswer,
        })),
      };
      await axios.post("/api/create-response", res, config);
      submitTest();
      setTimeout(() => history.push("/login"), 5000);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  const handleTestSubmit = (e) => {
    e.preventDefault();
    testSubmit();
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userDetails.access}` },
        };
        const { data } = await axios.get(`/api/get-quiz/${id}`, config);
        if (!mountedRef.current) return null;
        setQuiz(data?.quiz_questions);
        timeUpdate();
        setResponses(
          data?.quiz_questions.map((quiz) => ({
            key: quiz.id,
            answer: "",
            flag: false,
            selectetedAnswer: "",
          }))
        );
        setIsLoading(false);
        sessionStorage.setItem("quiz-responses", JSON.stringify(responses));
      } catch (err) {
        console.log(err.message);
        history.push("/404");
      }
    };
    fetchQuestion();
    return function cleanup() {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      timeUpdate();
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    addQuiz(quizid, quizDuration, test_time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='quiz-loader'>
          <Loader />
        </div>
      ) : (
        <MathJax.Context
          input='tex'
          onLoad={() => {}}
          onError={(MathJax, error) => {
            console.warn(error);
            // console.log(
            //   "Encountered a MathJax error, re-attempting a typeset!"
            // );
            MathJax.Hub.Queue(MathJax.Hub.Typeset());
          }}
          options={{
            messageStyle: "none",
            extensions: ["tex2jax.js"],
            jax: ["input/TeX", "output/HTML-CSS"],
            tex2jax: {
              inlineMath: [
                ["$", "$"],
                ["\\(", "\\)"],
              ],
              displayMath: [
                ["$$", "$$"],
                ["\\[", "\\]"],
              ],
              processEscapes: true,
            },
            TeX: {
              extensions: [
                "AMSmath.js",
                "AMSsymbols.js",
                "noErrors.js",
                "noUndefined.js",
              ],
            },
          }}
        >
          <div className='quiz-page'>
            <div className='question-progress-bar'>
              <div
                style={{ width: ((index + 1) / quiz.length) * 100 + "%" }}
                className='question-progress'
              ></div>
            </div>
            <div className='question-page-left'>
              <div className='quiz-question'>
                <h3>Question: {index + 1}</h3>
                <div className='question-details'>
                  <h2>
                    <MathJax.Html html={quiz[index]?.question} />
                  </h2>
                  <div className='marks-distribution'>
                    <p>Correct: {quiz[index]?.correct_marks} marks</p>
                    <p>
                      Incorrect:{" "}
                      {quiz[index]?.negative_marks === 0
                        ? quiz[index]?.negative_marks
                        : `-${quiz[index]?.negative_marks}`}{" "}
                      marks
                    </p>
                    <p className='flag-question' onClick={handleFlagQuestion}>
                      <IoFlag />
                      {responses[index]?.flag
                        ? "Unflag Question"
                        : "Flag Question"}
                    </p>
                  </div>
                </div>

                <div className='quiz-options'>
                  {quiz[index]?.option?.length > 0 ? (
                    <FormControl component='fieldset'>
                      <RadioGroup
                        aria-label='gender'
                        value={responses[index]?.answer}
                      >
                        {quiz[index]?.option?.map((option, idx) => (
                          <FormControlLabel
                            key={idx}
                            value={option}
                            name={idx + 1}
                            control={<Radio onClick={handleResponse} />}
                            label={parse(option)}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <textarea
                      placeholder='Type your answer here...'
                      value={responses[index]?.answer}
                      onChange={handleResponse}
                    />
                  )}
                </div>
              </div>
              <div className='navigation-btn'>
                <button
                  disabled={index === 0 ? true : false}
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                {index === quiz.length - 1 && (
                  <button onClick={() => setShowSubmit(true)}>
                    Submit test
                  </button>
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
              <div className='submit-confirm'>
                <div className='submit-popup'>
                  <div className='submit-pop-text'>
                    <p>
                      <FiAlertTriangle /> Are you sure you want to submit?
                    </p>
                    <p>Once you submit, All your responses will be recorded</p>
                  </div>

                  <div className='confirm-button'>
                    <button onClick={() => setShowSubmit(false)}>
                      Back to Test
                    </button>
                    <button onClick={handleTestSubmit} type='submit'>
                      Proceed and Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className='quiz-status'>
              <CountDownTimer
                testSubmit={testSubmit}
                duration={userCurrentQuiz?.test_time}
              />
              <div className='quiz-navigation-stats'>
                {btnarray.map((button, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={(e) => {
                        setIndex(e.target.value - 1);
                      }}
                      value={button + 1}
                      className={
                        responses[idx]?.answer ? "checked-answer" : undefined
                      }
                      style={{ backgroundColor: responses[idx]?.flag && "red" }}
                    >
                      {button + 1}
                    </button>
                  );
                })}
              </div>
              <div className='choice-sign'>
                <div className='attempted-sign'>
                  <button
                    disabled={true}
                    style={{ opacity: 1, cursor: "default" }}
                  />
                  <p>Attempted</p>
                </div>
                <div className='flagged-sign'>
                  <button
                    disabled={true}
                    style={{ opacity: 1, cursor: "default" }}
                  />
                  <p>Flagged Question</p>
                </div>
                <div className='unattempted-sign'>
                  <button
                    disabled={true}
                    style={{ opacity: 1, cursor: "default" }}
                  />
                  <p>Not Attempted</p>
                </div>
              </div>
            </div>
          </div>
        </MathJax.Context>
      )}
    </>
  );
};

export default QuizPage;
