import React, { useState, useEffect, useReducer ,useContext} from "react";
import Loader from "../../Components/Loader/LoadingBar";
import Countdown from "react-countdown";
import axios from "../../axios/axios";
import { useParams, useHistory } from "react-router-dom";
import { IoIosTimer } from "react-icons/io";
import { Checkbox } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup, { useRadioGroup } from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import "./QuizPage.css";
import UserContext from "../../Context/UserContext";
const Options = ({ option }) => {
  return (
    <div className="option-component">
      <label>
        <input type="radio" />
        {option}
      </label>
    </div>
  );
};

const QuizPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const [userId, setuserId] = useState();
  const [responses, setResponses] = useState([]);
  const {userDetails} = useContext(UserContext);

  const history = useHistory();

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

  const handleTestSubmit = () => {
    submitTest();
    history.push("/feedback");
  };

  const handleResponse = (e) => {
    const { name } = e.target;

    var response = [...responses];
    response[index] = {
      key: quiz[index].id,
      answer: name,
    };
    setResponses(response);
    console.log(responses);
  };

  const submitTest = async () => {
    const res = {
      quiz: id,
      user: userId,
      response: responses,
    };
    console.log(userId);
    const data = await axios.post("/api/create-response", res);
    console.log(data);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userDetails.access}`},
        };
        const { data } = await axios.get(`/api/get-quiz/${id}`,config );
        setQuiz(data?.quiz_questions);
        setIsLoading(false);
        var arr = [];
        for (var i = 0; i < quiz.length; i++) {
          // dispatch({ type: "add", key: quiz[i].id, value: "" })
          arr.push({ key: quiz[i].id, answer: 0 });
        }
        setResponses(arr);
        setuserId(data?.quiz_details?.creator);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchQuestion();
  }, [id]);

  // console.log(quiz);

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
              style={{ width: ((index + 1) / quiz.length) * 100 + "vw" }}
              className="question-progress"
            ></div>
          </div>

          <div className="question-page-left">
            <div className="quiz-question">
              <h3>{`Question: ${index + 1}`}</h3>
              <div className="question-details">
                <h2>{`${quiz[index]?.question}`}</h2>

                <div className="marks-distribution">
                  <p>{`Correct : ${quiz[index]?.correct_marks} marks`}</p>
                  <p>{`Incorrect : ${quiz[index]?.negative_marks} marks`}</p>
                </div>
              </div>

              <div className="quiz-options">
                {quiz[index]?.option.length > 0 ? (
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      onClick={(e) => handleResponse(e)}
                    >
                      {quiz[index]?.option.map((option) => (
                        <FormControlLabel
                          value={option.option}
                          name={option.key.toString()}
                          control={<Radio />}
                          label={option.option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <textarea placeholder="Type your answer here" />
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
                <button onClick={handleTestSubmit}>Submit test</button>
              )}
              <button
                disabled={index === quiz.length - 1 ? true : false}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>

          <div className="quiz-status">
            <div className="countdown-div">
              <p>
                <IoIosTimer /> Time Left :{" "}
              </p>
              <Countdown
                className="quiz-countdown"
                date={Date.now() + 1000000}
                onComplete={handleTestSubmit}
              />
            </div>

            <div className="quiz-navigation-stats">
              {btnarray.map((button) => {
                return (
                  <button
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
