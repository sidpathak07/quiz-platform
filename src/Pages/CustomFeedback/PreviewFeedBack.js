import { useState, useContext, useEffect  } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import Error from "../../Components/ErrorComponent/Error";
import axios from "../../axios/axios";
import { AiOutlineFileDone } from "react-icons/ai";
import "../FeedBackPage/FeedBack.css";

const PreviewFeedBack = () => {
  const { userDetails, userCurrentQuiz } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const {id} = useParams();
  const history = useHistory();

  const fetchQuestion = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.get(
        `https://api.progressiveminds.in/api/FeedbackQs/${id}/get`,
        config
      );
      setQuestions(data.question);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  },[id]);
  

  return (
    <>
      <div className="top">
            <h1 className="preview">Preview Feedback</h1>
            <button onClick={() => history.push(`/customfeedback/${id}`)} className="select bn" 
            style={{height:"5vh"}}>Back</button>
      </div>
      
      <div className="feedback-page">
        {questions.map((question, index) => {
          return (
            <div key={question.id}>
              <h3 className="student-feedback-question">{question.question}</h3>
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
                    <div className="rad">
                        <div className="input-radio">
                                <input
                                type="radio"
                                name="resRadio"
                                id={index}
                                value="Yes"
                                className={question.id}
                            />
                            <p className="rad-1 change">Yes</p>
                        </div>
                        
                        <div className="input-radio">
                               <input
                                type="radio"
                                name="resRadio"
                                id={index}
                                value="No"
                                className={question.id}
                                />
                                <p className="rad-1 change">
                                    No
                                 </p>
                        </div>
                        
                    </div>
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
