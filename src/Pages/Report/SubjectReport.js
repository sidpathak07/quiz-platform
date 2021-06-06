import React from "react";
import "./SubjectReport.css";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { Chart } from "react-google-charts";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";

function SubjectReport() {
  const { username, id } = useParams();
  const { userDetails } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState("");
  const [analysis, setAnalysis] = useState({});
  const [subjects, setSubjects] = useState([]);
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
      const { data } = await axios.get(
        `/api/getresult/${username}/${id}`,
        config
      );
      if (data) {
        setIsLoading(false);
      }
      setResponseData(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(Object.keys(subjects[0]));
  useEffect(() => {
    fetchResult();
  }, []);

  const setChartData = () => {
    setIsLoading(true);
    let sub = [];
    const { analysis } = responseData.data;
    setAnalysis(analysis);
    for (const key in analysis) {
      if (key.includes("subject")) {
        let obj = {};
        obj[key] = analysis[key];
        sub.push(obj);
      }
    }
    setSubjects(sub);
    setIsLoading(false);
  };

  useEffect(() => {
    if (responseData) {
      setChartData();
    }
  }, [responseData]);

  const showData = () => {
    console.log("DATA:", responseData);
    console.log("ANALYSIS:", analysis);
    console.log("SUBJECTS:", subjects);
  };

  return (
    <div className="report">
      {!isLoading && (
        <>
          <p className="head">Subject Report</p>
          <p className="time">
            {day} , {ISTTime.getDate()} {month} {hoursIST} : {minutesIST} {ampm}
          </p>
          <div className="report-card">
            <div className="nav">
              <p
                className="nav-item scorecard "
                onClick={() =>
                  history.push(`/report/${userDetails.username}/${id}`)
                }
              >
                Scorecard
              </p>
              <p
                className="nav-item subject-report active"
                onClick={() =>
                  history.push(`/report/subjectreport/${username}/${id}`)
                }
              >
                Subject Report
              </p>
              <p
                className="nav-item comparative-report"
                onClick={() =>
                  history.push(`/report/comparativereport/${username}/${id}`)
                }
              >
                Comparative Report
              </p>
            </div>

            <div className="text">
              {/* <p className="h-2">
                    Marks Obtained :{" "}
                    <span style={{ color: "#214786", fontWeight: "600" }}>
                      33/125 (+40 -7)
                    </span>
                  </p> */}
            </div>
            <div className="subject">
              {subjects.map((subject, index) => {
                for (const key in subject) {
                  return (
                    <>
                      {console.log(key)}
                      <p className="h-1">
                        <span style={{ color: "#214786", fontWeight: "600" }}>
                          {key.slice(9, 20)}
                        </span>
                      </p>
                      <div className="text">
                        <p className="h-2">
                          Marks Obtained :{" "}
                          <span style={{ color: "#214786", fontWeight: "600" }}>
                            {subject[key].correct_questions * 4 -
                              subject[key].incorrect_or_not_attempted * 1}
                          </span>
                        </p>
                      </div>
                      <p className="h-2">
                        Accuracy :
                        <span style={{ color: "#214786", fontWeight: "600" }}>
                          {`${(
                            subject[key].correct_questions /
                            (subject[key].correct_questions +
                              subject[key].incorrect_or_not_attempted)
                          ).toFixed(2)*100}`} %
                        </span>
                      </p>
                      <p className="h-2">
                        Total Attempted Questions :{" "}
                        <span style={{ color: "#214786", fontWeight: "600" }}>
                          {`${
                            subject[key].correct_questions +
                            subject[key].incorrect_or_not_attempted
                          }`}{" "}
                          (Correct:{`${subject[key].correct_questions}`} ,
                          Incorrect:
                          {`${subject[key].incorrect_or_not_attempted}`})
                        </span>
                      </p>
                      <div className="graph">
                        <div className="bar-graph-2">
                          <Chart
                            width={"600px"}
                            height={"300px"}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={[
                              ["", "Attempts"],
                              ["Correct", subject[key].correct_questions],
                              [
                                "Incorrect/Unattempted",
                                subject[key].incorrect_or_not_attempted,
                              ],
                              ["Total", subject[key].total_questions],
                            ]}
                            options={{
                              chart: {
                                title: ``,
                                subtitle: ``,
                              },
                            }}
                          />
                        </div>
                        <div className="pie-chart-2">
                          <Chart
                            width={"475px"}
                            height={"300px"}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                              ["Quiz", "Types of Questions"],
                              ["Correct", subject[key].correct_questions],
                              [
                                "Incorrect/Unattempted",
                                subject[key].incorrect_or_not_attempted,
                              ],
                            ]}
                            options={{
                              title: "Attempt Summary",
                            }}
                          />
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <div className="quizquestion-loader">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default SubjectReport;
