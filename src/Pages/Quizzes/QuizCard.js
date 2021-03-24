import { useHistory } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import UserContext from "../../Context/UserContext";
import { useContext } from "react";

const QuizCard = (props) => {
  const { id, title, desc, duration, creator_username } = props;
  const history = useHistory();
  const { addQuiz } = useContext(UserContext);

  const handleClick = () => {
    addQuiz(id, duration);
    history.push(`/instruction/${id}`);
  };

  return (
    <div className="quiz-card">
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
          <p>{desc}</p>
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
