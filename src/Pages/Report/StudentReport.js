import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../Context/UserContext";
import { Chart } from "react-google-charts";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";
//CSS FILES
import "./Report.css";

const StudentReport = () => {
  const { testid } = useParams();
  const { userDetails } = useContext(UserContext);

  //Conditionals
  const [isLoading, setIsLoading] = useState(false);
  const [isScoreCard, setIsScoreCard] = useState(true);
  const [isSubjectReport, setIsSubjectReport] = useState(false);
  const [isComparativeReport, setIsComparativeReport] = useState(false);

  //Data Handling
  const [userData, setUserData] = useState([]);
  const [averageData, setAverageData] = useState([]);
  const [topperData, setTopperData] = useState([]);

  //Methods
  const fetchStudentReport = async () => {
    setIsLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${userDetails.access}` },
    };
    try {
      const { data } = await axios.get(
        `/api/getstudentreport/${testid}`,
        config
      );
      console.log("DATA", data);
      setUserData(data.data);
      setAverageData(data.average);
      setTopperData(data.topper);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const showData = () => {
    console.log("USER:", userData);
    console.log("AVERAGE:", averageData);
    console.log("TOPPER:", topperData);
  };

  //Hooks
  useEffect(() => {
    fetchStudentReport();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="quizquestion-loader">
          <Loader />
        </div>
      ) : (
        <>
          <button onClick={showData}>Show Data</button>
          <div className="report-card">
            <div className="nav">
              <p
                // style={{ backgroundColor: "#ffffff", color: "#214786" }}
                className="nav-item scorecard active"
                onClick={() => {
                  setIsScoreCard(true);
                  setIsSubjectReport(false);
                  setIsComparativeReport(false);
                }}
              >
                Scorecard
              </p>
              <p
                className="nav-item subject-report"
                onClick={() => {
                  setIsSubjectReport(true);
                  setIsScoreCard(false);
                  setIsComparativeReport(false);
                }}
              >
                Subject Report
              </p>
              <p
                className="nav-item comparative-report"
                onClick={() => {
                  setIsComparativeReport(true);
                  setIsScoreCard(false);
                  setIsSubjectReport(false);
                }}
              >
                Comparative Report
              </p>
            </div>
          </div>
          {isScoreCard && (
            <div>
              <p className="head">Result Analysis - Scorecard</p>
              <div className="rank">
                <div className="rank-card">
                  <p className="rank-des">Rank Obtained:</p>
                  <p className="rank-rank">NIL</p>
                </div>
                <div className="marks-card">
                  <p className="rank-des">Marks Obtained:</p>
                  <p className="rank-rank">30</p>
                </div>
                <div className="txt">
                  <p className="score-txt">
                    {`In this test , you have scored 30 marks Other metrics of your performance on Difficulty
               level, Subjects and the like are available below.`}{" "}
                  </p>
                </div>
                <div className="accuracy">
                  <p className="accuracy-1">
                    Accuracy:
                    <span style={{ color: "#214786", fontWeight: "600" }}>{`${(
                      (8 / 30) *
                      100
                    ).toFixed(2)}`}</span>
                  </p>
                  <p className="attempted">
                    Total attempted questions:
                    <span style={{ color: "#214786", fontWeight: "700" }}>
                      {`Total attempted Questions: ${10} of ${30} (Correct:${8} Incorrect:${2})`}
                    </span>
                  </p>
                </div>
                <div className="graph">
                  <div className="bar-graph">
                    <Chart
                      width={"600px"}
                      height={"300px"}
                      chartType="Bar"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ["", "Easy", "Medium", "Hard"],
                        ["Correct", 4, 3, 1],
                        ["Incorrect/Unattempted", 1, 1, 0],
                        ["Total", 10, 10, 10],
                      ]}
                      options={{
                        chart: {
                          title: "",
                          subtitle: "",
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
                        ["Quiz", "Types of Questions"],
                        ["Correct", 8],
                        ["Incorrect", 2],
                        ["unattempted", 20],
                      ]}
                      options={{
                        title: "Attempt Summary",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {isSubjectReport && (
            <div>
              <h3>Subject Report {userData["Quiz Name"]}</h3>
            </div>
          )}
          {isComparativeReport && (
            <div>
              <h3>Comparative Report {userData["Quiz Name"]}</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentReport;
