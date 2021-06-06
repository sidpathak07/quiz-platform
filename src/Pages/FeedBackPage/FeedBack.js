import { useState, useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import Error from "../../Components/ErrorComponent/Error";
import axios from "../../axios/axios";
import { AiOutlineFileDone } from "react-icons/ai";
import "./FeedBack.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const rating = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "1",
  },
  {
    value: 20,
    label: "2",
  },
  {
    value: 30,
    label: "3",
  },
  {
    value: 40,
    label: "4",
  },
  {
    value: 50,
    label: "5",
  },
  {
    value: 60,
    label: "6",
  },
  {
    value: 70,
    label: "7",
  },
  {
    value: 80,
    label: "8",
  },
  {
    value: 90,
    label: "9",
  },
  {
    value: 100,
    label: "10",
  },
];

const FeedBack = () => {
  const { userDetails, removeUser, userCurrentQuiz } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");
  // console.log(userCurrentQuiz.id);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const postData = {
    user: userDetails.user_id,
    quiz_id: userCurrentQuiz.id,
    answer: answers,
  };

  const handleSubmit = async () => {
    let length = questions.length;
    for (let i = 0; i < length; i++) {
      if (answers[i] === undefined) {
        setError("All fields are mandatory");
        return alert("Fill all fields");
      }
    }
    setLoading(true);
    setError("");
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.post("/api/Feedback/", postData, config);
      setSubmitted(true);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  if (submitted) {
    setTimeout(() => {
      removeUser();
    }, 5000);
  }

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.get(
        `https://api.progressiveminds.in/api/FeedbackQs/${userCurrentQuiz.id}/get`,
        config
      );
      // console.log(data.question);
      setQuestions(data.question);
      let arr = new Array(data.question.length);
      setAnswers(arr);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  //dynamic questions related part
  const handleChange = (e) => {
    // console.log("Q ID:", e.target.className);
    // console.log(e.target.id);
    let arr = answers;
    let obj = {};
    obj[`${e.target.className}`] = e.target.value;
    arr[e.target.id] = obj;
    setAnswers(arr);
  };

  // function valuetext(value) {
  //   return `${value}`;
  // }

  // function valueLabelFormat(value) {
  //   return rating.findIndex((rating) => rating.value === value);
  // }

  return (
    <>
      {submitted ? (
        <div className="submitted-form">
          <AiOutlineFileDone />
          <h1>Thank You for giving the feedback</h1>
        </div>
      ) : (
        <div className="feedback-page">
          {loading && (
            <div className="feedback-loader">
              <Loader />
            </div>
          )}
          {!loading && (
            <>
              <h1 className="quiz-submitted-header">
                Your test has been submitted
              </h1>
              <h1 className="feedback-page-header">Give Us Some Feedback</h1>
              <div className="feedback-input-sliders">
                {/* <button onClick={() => console.log(answers)}>
                  Show Answers
                </button> */}
                {questions.map((question, index) => {
                  return (
                    <div key={question.id} className="whole">
                      <h3 className="student-feedback-question">
                        {question.question}
                      </h3>
                      {question.responseType === "range" ? (
                        <input
                          type="range"
                          name=""
                          id={index}
                          max="10"
                          min="1"
                          className={question.id}
                          onChange={(e) => handleChange(e)}
                        />
                      ) : (
                        ""
                      )}
                      {question.responseType === "text" ? (
                        <input
                          type="text"
                          name=""
                          id={index}
                          className={question.id}
                          onChange={(e) => handleChange(e)}
                        />
                      ) : (
                        ""
                      )}
                      {question.responseType === "radio" ? (
                        <div className="rad">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="resRadio"
                              id={index}
                              value="Yes"
                              className={question.id}
                              onChange={(e) => handleChange(e)}
                            />
                            <p className="rad-1">Yes</p>
                          </div>
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="resRadio"
                              id={index}
                              value="No"
                              className={question.id}
                              onChange={(e) => handleChange(e)}
                            />
                            <p className="rad-1">No</p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
                <button
                  className=""
                  style={{
                    color: "#ffffff",
                    backgroundColor: "rgb(0, 140, 255)",
                    cursor: "pointer",
                    padding: "10px",
                    fontSize: "1.1em",
                    fontWeight: "700",
                  }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit Feedback
                </button>
              </div>
            </>
          )}

          {error && <Error msg={error} />}
        </div>
      )}
    </>
  );
};

export default FeedBack;
