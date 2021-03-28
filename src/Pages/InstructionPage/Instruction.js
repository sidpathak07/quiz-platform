import { useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Timer from "./Timer";
import UserContext from "../../Context/UserContext";
import "./Instruction.css";

const Instruction = () => {
  const [showbtn, setShowbtn] = useState(false);
  const { userCurrentQuiz } = useContext(UserContext);
  const history = useHistory();

  const hours = userCurrentQuiz?.duration?.split(":")[0].split("")[1];
  const minutes = userCurrentQuiz?.duration?.split(":")[1];

  const onComplete = useCallback(() => {
    setShowbtn(true);
  }, []);

  return (
    <div className="instruction-page">
      <div className="instruction-container">
        <div className="instruction-header">
          <h1>Test Instruction</h1>
          <p>Please read the instructions carefully.</p>
        </div>
        <div className="instruction-one">
          <p>
            1. You have {hours !== "0" && `${hours} hours and`} {minutes}{" "}
            minutes to complete and submit the test.
          </p>
          <br />
        </div>
        <div className="instruction-two">
          <p>
            2. There are 14 problems (for middle school student) and 20 problems (for high school/university student) in the test"
          </p>
          <br />
          <div className="marking-three">
            <p>
              3. There are three type of questions. Multiple choice questions ,
              Integer type questions and True/False questions. The marks of the
              each question are written at the right hand side of your screen.
              If you get the answer right you get marks corresponding to correct
              answer. If you get the wrong answer some marks from your already
              gained marks will be deducted and those are indicated as Negetive
              Marks just below Marks of the question.
            </p>
            <br />
          </div>
        </div>
        <div className="instruction-four">
          <p>
            4. The marks and negetive marks for each question depend upon the
            difficulty and type of question.
          </p>
          <br />
        </div>
        <div className="instruction-five">
          <p>
            5. You can leave a question, answer a question and even flag a
            question. By flagging a question you mark it so that you can review
            it later. Flag question feature help you differentiate between the
            problems that you don't want to answer and problems that you want to
            answer but you are not sure how much time they'll take so you're
            leaving them for the end.
          </p>
          <br />
        </div>
        <div className="instruction-six">
          <p>
            6. There will be a feedback form at the end of the quiz which is
            mandatory to fill. It contains simple questions which will help us
            know your feedback about the contest. Kindly fill the form with your
            actual thoughts and not for formality.
          </p>
          <br />
        </div>
        <div className="instruction-timer">
          <p>Your test will start in:</p>
          <Timer onComplete={onComplete} duration={30000} />
          {showbtn && (
            <button
              onClick={() => history.push(`/quizpage/${userCurrentQuiz.id}`)}
            >
              Proceed to Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Instruction;
