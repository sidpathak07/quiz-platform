import React from "react";
import { useHistory } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";

const QuizCard = (props) => {
  const { id, title, desc, duration, creator_username } = props;
  const history = useHistory();

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <div>
          <div className="quiz-title">
             <div className="quiz-title-heading">
             <BsPencilSquare />
             <h2>{title}</h2>
             </div>
            <p>duration : {duration ? duration : "N/A"}</p>
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
        <button onClick={() => history.push(`/quizpage/${id}`)}>
          start test
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
