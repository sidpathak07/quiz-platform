import { useState, useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import Error from "../../Components/ErrorComponent/Error";
import axios from "../../axios/axios";
import { AiOutlineFileDone } from "react-icons/ai";
import "../FeedBackPage/FeedBack.css";
const PreviewFeedBack = () => {
  const { userDetails, userCurrentQuiz } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);

  const fetchQuestion = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.get(
        `https://api.progressiveminds.in/api/FeedbackQs/${userCurrentQuiz.id}/get`,
        config
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchQuestion();

  return (
    <>
      <div className="feedback-page">
        {questions.map((question, index) => {
          return (
            <div key={question.id}>
              <h3>{question.question}</h3>
              {question.responseType === "range" ? (
                <input
                  type="range"
                  name=""
                  id={index}
                  max="10"
                  min="1"
                  className={question.id}
                />
              ) : (
                ""
              )}
              {question.responseType === "text" ? (
                <input type="text" name="" id={index} className={question.id} />
              ) : (
                ""
              )}
              {question.responseType === "radio" ? (
                <div>
                  <input
                    type="radio"
                    name="resRadio"
                    id={index}
                    value="Yes"
                    className={question.id}
                  />
                  Yes
                  <input
                    type="radio"
                    name="resRadio"
                    id={index}
                    value="No"
                    className={question.id}
                  />
                  No
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PreviewFeedBack;
