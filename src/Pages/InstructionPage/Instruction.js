import { useState, useContext, useCallback, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import Timer from "./Timer";
import UserContext from "../../Context/UserContext";
import "./Instruction.css";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";

const Instruction = ({ match }) => {
  const [appData, setappData] = useState({});
  // const [mcqCounter, setmcqCounter] = useState(0);
  // const [intQuesCounter, setIntQuesCounter] = useState(0);
  // const [trueFalseCounter, setTrueFalseCounter] = useState(0);
  const userDetails = sessionStorage.getItem("user-details");
  const usingData = JSON.parse(userDetails);

  const getData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${usingData.access}` },
      };
      const { data } = await axios.get(
        `/api/get-quiz/${match.params.id}`,
        config
      );
      setappData(data);
      // data.quiz_questions.forEach((ques) => {
      //   if (ques.option.length === 0) {
      //     setIntQuesCounter((prevCount) => prevCount + 1);
      //   } else if (
      //     ques.option[0].toLowerCase() === "true" ||
      //     ques.option[0].toLowerCase() === "false"
      //   ) {
      //     setTrueFalseCounter((prevCount) => prevCount + 1);
      //   } else {
      //     setmcqCounter((prevCount) => prevCount + 1);
      //   }
      // });
    } catch (err) {
      console.log(err.message);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(), []);

  const [showbtn, setShowbtn] = useState(false);
  const { userCurrentQuiz } = useContext(UserContext);
  const history = useHistory();

  const hours = userCurrentQuiz?.duration?.split(":")[0].split("")[1];
  const minutes = userCurrentQuiz?.duration?.split(":")[1];

  const onComplete = useCallback(() => {
    setShowbtn(true);
  }, []);

  if (!appData) {
    return (
      <div className="quiz-loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="instruction-page">
      <div className="instruction-container">
        <div className="instruction-header">
          <h1>Test Instruction</h1>
          <p>Please read the instructions carefully.</p>
        </div>
        <div className="instruction-one">
          <p>
            1. Do not <strong>Refresh</strong> the page.
          </p>
          <br />
        </div>
        <div className="instruction-two">
          <p>
            2. There are{" "}
            <strong>{appData.quiz_questions?.length} problems </strong> in the
            test.
          </p>
          <br />
        </div>
        <div className="marking-three">
          {/* <p>
              3. There are three types of questions.{" "}
              <strong>{mcqCounter} Multiple choice questions,</strong>{" "}
              <strong>{intQuesCounter} Integer type questions</strong> and{" "}
              <strong>{trueFalseCounter} True/False questions</strong>. The
              marks of the each question are written at the right hand side of
              your screen. If you get the answer right you get marks
              corresponding to correct answer. If you get the wrong answer some
              marks from your already gained marks will be deducted and those
              are indicated as Negative Marks just below Marks of the question.
            </p> */}
          <p>
            3. You have{" "}
            <strong>
              {hours !== "0" && `${hours} hours and`} {minutes} minutes
            </strong>{" "}
            to complete and submit the test.
          </p>
          <br />
        </div>
        <div className="instruction-four">
          <p>
            4. There are two types of problems. One whose answer must be
            submitted as a non negative integer and other whose answer is one of
            the four options provided just below the problem.
          </p>
          <br />
        </div>
        <div className="instruction-five">
          <p>
            5. For correct response of each problem, 5 marks get added to your
            score and for every incorrect response, 2 marks are deducted from
            your score. Maximum marks one can score is 100.
          </p>
          <br />
        </div>
        <div className="instruction-six">
          <p>
            6. There's also an option to flag a problem. On flagging a problem
            you mark it to review later. This option can be used for problems
            which you would like to review in the last time before submitting
            the test.
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

export default withRouter(Instruction);
