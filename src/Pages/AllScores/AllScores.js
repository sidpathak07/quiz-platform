import React from "react";
import "./AllScores.css";
import { useState, useContext, useEffect } from "react";
import parse from "html-react-parser";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";

const getQuizDetails = () => {
  const quizData = sessionStorage.getItem("quiz-data");
  if (quizData) {
    return JSON.parse(quizData);
  } else {
    return null;
  }
};

function AllScores() {
  // const [details,setDetails] = useState(getQuizDetails);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { userDetails } = useContext(UserContext);
  // console.log(details);

  const fetchReportId = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.get(
        `api/getstudentresult/${userDetails.user_id}`,
        config
      );
      if (data) {
        setIsLoading(false);
      }
      console.log(isLoading);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReportId();
  }, []);

  return (
    <div className="all-scores">
      {isLoading ? (
        <div className="quizquestion-loader">
          <Loader />
        </div>
      ) : (
        <>
          <p className="all-scores-title">All Scores</p>
          <div className="tests">
            <p>Test No.</p>
            <p>Test Title</p>
            {/* <p>Test Date</p> */}
          </div>
          {data.map((test, index) => {
            return (
              <div
                className="tests-card"
                onClick={() => history.push(`/studentreport/${test.id}`)}
              >
                <p>{index + 1}</p>
                <p>{test.quizname}</p>
                {/* <p>{det.starttime.slice(0,10)}</p> */}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default AllScores;
