import React, { useEffect, useState, useContext,  useCallback, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "../../axios/axios";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";

function StartTest({instructions,duration,id}) {
  const { addQuiz, userDetails } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const test_time = new Date("1970-01-01T" + duration + "Z").getTime();

  console.log(instructions);
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
        <div>
                    <div className="view-result">
                      <button className="view-result-button" onClick={handleClick}>Start Test</button>
                    </div>
                    {isLoading && (
                        <div className="quizquestion-loader">
                        <Loader />
                        </div>
                    )}
         </div>
    )
}

export default StartTest;
