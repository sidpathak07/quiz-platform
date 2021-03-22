import React, { useState ,useContext ,useEffect} from "react";
import "./FeedBack.css";
import { AiOutlineFileDone } from "react-icons/ai";
import UserContext from "../../Context/UserContext";

const FeedBack = () => {
  const {removeUser} = useContext(UserContext)
  const [submitted, setSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [questionFeedback, setQuestionFeedback] = useState(1);
  const [interfaceFeedback, setInterfaceFeedback] = useState(1);
  const [difficultFeedback, setDifficultFeedback] = useState(1);
  const [student, setStudent] = useState("");
  const [indian, setIndian] = useState("");
  const [intern, setIntern] = useState("");

  const handleSubmit = () => {
    console.log("submitted");
    setSubmitted(true);
  };


  useEffect(()=>{



  })


  return (
    <>
      {submitted ? (
        <div className="submitted-form">
          <AiOutlineFileDone />
          <h1>Thank You for giving the feedback</h1>
        </div>
      ) : (
        <div className="feedback-page">
          <h1 className='quiz-submitted-header'>Your test has been submitted</h1>
          <h1 className='feedback-page-header'>Give Us Some Feedback</h1>
          <div className="feedback-input-sliders">
            <div className="question-feedback">
              <p>
                How was the Questions ? <span> {questionFeedback}/5</span>
              </p>
              <input
                name="question-slider"
                type="range"
                min={1}
                max={5}
                defaultValue={questionFeedback}
                onChange={(e) => setQuestionFeedback(e.target.value)}
              />
            </div>
            <div className="interface-feedback">
              <p>
                How was the user interface ?<span>{interfaceFeedback}/5</span>
              </p>
              <input
                type="range"
                min={1}
                max={5}
                defaultValue={interfaceFeedback}
                onChange={(e) => setInterfaceFeedback(e.target.value)}
              />
            </div>
            <div className="difficulty-feedback">
              <p>
                How was the Question Difficulty ?
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
              <p>Are you a student</p>

              <div>
                <button value="yes" onClick={(e) => setStudent(e.target.value)}>
                  Yes
                </button>
                <button value="no" onClick={(e) => setStudent(e.target.value)}>
                  No
                </button>
              </div>
            </div>
            <div>
              <p>Are you Indian</p>

              <div>
                <button value="yes" onClick={(e) => setIndian(e.target.value)}>
                  Yes
                </button>
                <button value="no" onClick={(e) => setIndian(e.target.value)}>
                  No
                </button>
              </div>
            </div>
            <div>
              <p>Are you a Intern</p>

              <div>
                <button value="yes" onClick={(e) => setIntern(e.target.value)}>
                  Yes
                </button>
                <button value="no" onClick={(e) => setIntern(e.target.value)}>
                  No
                </button>
              </div>
            </div>
          </div>

          <div className="feedback-text">
            <textarea
              placeholder="Any Other Feedback / Suggestion"
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
