import React, { useEffect, useState, useContext } from "react";
import "./Report.css";
import { Chart } from "react-google-charts";
import { useParams } from "react-router";
import axios from "../../axios/axios";
import UserContext from "../../Context/UserContext";
import { useHistory } from "react-router-dom";
function Report() {
  const { username, id } = useParams();
  console.log("USERNAME:", username, "ID:", id);
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useContext(UserContext);
  const history = useHistory();
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330; // IST offset UTC +5:30
  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  // ISTTime now represents the time in IST coordinates
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  var days = ISTTime.getDay();
  var months = ISTTime.getMonth();
  let day;
  let month;
  var ampm = hoursIST >= 12 ? "PM" : "AM";
  if (days === 1) {
    day = "Monday";
  } else if (days === 2) {
    day = "Tuesday";
  }
  if (days === 3) {
    day = "Wednesday";
  }
  if (days === 4) {
    day = "Thursday";
  }
  if (days === 5) {
    day = "Friday";
  }
  if (days === 6) {
    day = "Saturday";
  }
  if (days === 7) {
    day = "Sunday";
  }

  // month
  if (months === 0) {
    month = "January";
  } else if (months === 1) {
    month = "February";
  } else if (months === 2) {
    month = "March";
  } else if (months === 3) {
    month = "April";
  } else if (months === 4) {
    month = "May";
  } else if (months === 5) {
    month = "June";
  } else if (months === 6) {
    month = "July";
  } else if (months === 7) {
    month = "August";
  } else if (months === 8) {
    month = "September";
  } else if (months === 9) {
    month = "October";
  } else if (months === 10) {
    month = "November";
  } else if (months === 11) {
    month = "December";
  }

  const fetchResult = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const postData = {
        user: username,
        quiz: id,
      };
      const { data } = await axios.post(
        `/api/getresult/${username}/${id}`,
        postData,
        config
      );
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <div className="report">
      <p className="head">Result Analysis - Scorecard</p>
      <p className="time">
        {day} , {ISTTime.getDate()} {month} {hoursIST} : {minutesIST} {ampm}
      </p>
      <div className="report-card">
        <div className="nav">
          <p
            className="nav-item scorecard"
            onClick={() =>
              history.push(`/report/${userDetails.username}/${id}`)
            }
          >
            Scorecard
          </p>
          <p
            className="nav-item subject-report"
            onClick={() =>
              history.push(`/report/subjectreport/${username}/${id}`)
            }
          >
            Subject Report
          </p>
           <p
            className="nav-item comparative-report"
            onClick={() => history.push(`/report/comparativereport/${username}/${id}`)}
          >
            Comparative Report
          </p>
        </div>
        <div className="rank">
          <div className="rank-card">
            <p className="rank-des">Rank Obtained:</p>
            <p className="rank-rank">3000 to 4000</p>
          </div>
          <div className="marks-card">
            <p className="rank-des">Marks Obtained:</p>
            <p className="rank-rank">115/300 (+128-13)</p>
          </div>
        </div>
        <div className="txt">
          <p className="score-txt">
            In this test , you have scored 115 marks and a Rank between 3001 and
            4000. The Test paper had a medium difficulty level. Your score in
            the test was Okay. Other metrics of your performance on Difficulty
            level, Subjects and the like are available below.{" "}
          </p>
        </div>
        <div className="accuracy">
          <p className="accuracy-1">
            Accuracy:
            <span style={{ color: "#214786", fontWeight: "600" }}>62%</span>
          </p>
          <p className="attempted">
            Total attempted questions:
            <span style={{ color: "#214786", fontWeight: "700" }}>
              43 out of 60 (Correct: 27, Incorrect: 16)
            </span>
          </p>
        </div>
        <div className="graph">
          <div className="bar-graph">
            <Chart
              width={"600px"}
              height={"300px"}
              style={{paddingRight:"-3vw"}}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["", "Easy", "Medium", "Hard"],
                ["Correct", 24, 11, 35],
                ["Incorrect", 30, 40, 70],
                ["Total", 60, 10, 70],
              ]}
              options={{
                chart: {
                  title: `Accuracy:45%`,
                  subtitle: "Total attempted Questions",
                },
              }}
            />
          </div>
          <div className="pie-chart">
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Hours per Day"],
                ["Correct", 45],
                ["Incorrect/Unattempted", 20],
              ]}
              options={{
                title: "Attempt Summary",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
