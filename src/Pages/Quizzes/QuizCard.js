import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import axios from "../../axios/axios";
import ReactHtmlParser from "react-html-parser";

const QuizCard = (props) => {
  const { id, title, desc, duration, creator_username, instructions } = props;
  const { addQuiz, userDetails } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const test_time = new Date("1970-01-01T" + duration + "Z").getTime();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      addQuiz(id, duration, test_time, instructions);
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const postData = {
        user: userDetails.user_id,
        quiz: id,
      };
      const { data } = await axios.post(
        "/api/check-quiz-assigned",
        postData,
        config
      );
      console.log(data);
      setIsLoading(false);
      history.push(`/instruction/${id}`);
    } catch (err) {
      setIsLoading(false);
      alert("You have already attempted the test!");
      console.log(err.message);
    }
  };

  return (
    <div className="quiz-card">
      {isLoading && (
        <div className="quizcard-loader">
          <Loader />
        </div>
      )}
      <div className="quiz-header">
        <div>
          <div className="quiz-title">
            <div className="quiz-title-heading">
              <BsPencilSquare />
              <h2>{title}</h2>
            </div>
            <p className="quiz-duration-card">
              <IoIosTimer /> : {duration ? duration : "N/A"}
            </p>
          </div>
          <p>{ReactHtmlParser(desc)}</p>
        </div>
      </div>
      <div className="quiz-creator">
        <p>
          <span>created by:</span> {creator_username}
        </p>
      </div>
      <div className="quiz-start-button">
        <button onClick={handleClick}>Start test</button>
      </div>
    </div>
  );
};

export default QuizCard;
