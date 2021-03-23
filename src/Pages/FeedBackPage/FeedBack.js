import React, { useState, useContext, useEffect } from "react";
import "./FeedBack.css";
import { AiOutlineFileDone } from "react-icons/ai";
import UserContext from "../../Context/UserContext";

const FeedBack = () => {
  const { removeUser } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [learnSomething, setLearnSomething] = useState(1);
  const [participating, setParticipating] = useState(1);
  const [difficultFeedback, setDifficultFeedback] = useState(1);
  const [participateAgain, setParticipateAgain] = useState("");
  const [timeSufficient, setTimeSufficient] = useState("");
  const [attendWebinar, setAttendWebinar] = useState("");
  const [language, setLanguage] = useState("");
  const [miniCourse, setMiniCourse] = useState("");
  const [nextContest, setNextContest] = useState("");

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // if (submitted) {
  //   setTimeout(() => {
  //     removeUser();
  //   }, 5000);
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
          <h1 className="quiz-submitted-header">
            Your test has been submitted
          </h1>
          <h1 className="feedback-page-header">Give Us Some Feedback</h1>
          <div className="feedback-input-sliders">
            <div className="learn-feedback">
              <p>
                Do you learn something new ? <span> {learnSomething}/5</span>
              </p>
              <input
                name="question-slider"
                type="range"
                min={1}
                max={5}
                defaultValue={learnSomething}
                onChange={(e) => setLearnSomething(e.target.value)}
              />
            </div>
            <div className="participate-feedback">
              <p>
                To what extent did you like participating in this contest?{" "}
                <span>{participating}/5</span>
              </p>
              <input
                type="range"
                min={1}
                max={5}
                defaultValue={participating}
                onChange={(e) => setParticipating(e.target.value)}
              />
            </div>
            <div className="difficulty-feedback">
              <p>
                How difficult were the problems?
                <span>{difficultFeedback}/5</span>{" "}
              </p>
              <input
                type="range"
                min={1}
                max={5}
                defaultValue={difficultFeedback}
                onChange={(e) => setDifficultFeedback(e.target.value)}
              />
            </div>
          </div>

          <div className="feedback-yes-no">
            <div>
              <p>
                If a contest like this is organised again, will you participate?
              </p>

              <div>
                <button
                  value="yes"
                  onClick={(e) => setParticipateAgain(e.target.value)}
                >
                  Yes
                </button>
                <button
                  value="no"
                  onClick={(e) => setParticipateAgain(e.target.value)}
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <p>Do you think time was sufficient?</p>

              <div>
                <button
                  value="yes"
                  onClick={(e) => setTimeSufficient(e.target.value)}
                >
                  Yes
                </button>
                <button
                  value="no"
                  onClick={(e) => setTimeSufficient(e.target.value)}
                >
                  No
                </button>
              </div>
            </div>
            <div>
              <p>
                If a webinar is organised to discuss the solutions of these
                problems will you attend?
              </p>

              <div>
                <button
                  value="yes"
                  onClick={(e) => setAttendWebinar(e.target.value)}
                >
                  Yes
                </button>
                <button
                  value="no"
                  onClick={(e) => setAttendWebinar(e.target.value)}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <p>In what language will you prefer to attend the webinar</p>

              <div>
                <button
                  value="english"
                  onClick={(e) => setLanguage(e.target.value)}
                >
                  English
                </button>
                <button
                  value="hindi"
                  onClick={(e) => setLanguage(e.target.value)}
                >
                  Hindi
                </button>
              </div>
            </div>

            <div>
              <p>
                Would you like to see a mini course which focuses on training
                middle and high school students about mathematics in real life?
              </p>

              <div>
                <button
                  value="yes"
                  onClick={(e) => setMiniCourse(e.target.value)}
                >
                  Yes
                </button>
                <button
                  value="no"
                  onClick={(e) => setMiniCourse(e.target.value)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="feedback-quiz">
              <p>
                Would you like to see a mini course which focuses on training
                middle and high school students about mathematics in real life?
              </p>

              <div>
                <button
                  value="Puzzle Solving"
                  onClick={(e) => setNextContest(e.target.value)}
                >
                  Puzzle Solving
                </button>
                <button
                  value="Problem solving strategies"
                  onClick={(e) => setNextContest(e.target.value)}
                >
                  Problem solving strategies
                </button>
                <button
                  value="Mental Maths "
                  onClick={(e) => setNextContest(e.target.value)}
                >
                  Mental Maths
                </button>
                <button
                  value="Mathematics to entertain your spirit"
                  onClick={(e) => setNextContest(e.target.value)}
                >
                  Mathematics to entertain your spirit
                </button>
              </div>
            </div>
          </div>

          <div className="feedback-text">
            <p>Do you have any other suggestions for future competition?</p>
            <textarea
              placeholder="Feedback here..."
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>

          <button
            className="feedback-submit"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </div>
      )}
    </>
  );
};

export default FeedBack;
