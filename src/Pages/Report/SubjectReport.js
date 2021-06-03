import React from "react";
import "./SubjectReport.css";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { Chart } from "react-google-charts";
import axios from "../../axios/axios";

function SubjectReport() {
  const { username, id } = useParams();
  const { userDetails } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  let [content, setContent] = useState(1);
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
      <p className="head">Subject Report</p>
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
        <div className="subject">
          <div className="text">
            <p className="h-1">
              <span style={{ color: "#214786", fontWeight: "600" }}>
                Mathematics
              </span>
            </p>
            <p className="h-2">
              Marks Obtained :{" "}
              <span style={{ color: "#214786", fontWeight: "600" }}>
                33/125 (+40 -7)
              </span>
            </p>
            <p className="h-2">
              Accuracy :{" "}
              <span style={{ color: "#214786", fontWeight: "600" }}>53%</span>
            </p>
            <p className="h-2">
              Total Attempted Questions :{" "}
              <span style={{ color: "#214786", fontWeight: "600" }}>
                15 out of 25 (Correct:8 , Incorrect:7)
              </span>
            </p>
          </div>
            <div className="graph">
            <div className="bar-graph-2">
              <Chart
                width={"675px"}
                height={"300px"}
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
            <div className="pie-chart-2">
              <Chart
                width={"400px"}
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
    </div>
  );
}

export default SubjectReport;
