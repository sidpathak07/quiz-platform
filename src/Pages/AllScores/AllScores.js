import React from 'react';
import './AllScores.css';
import { useState, useContext } from "react";
import parse from "html-react-parser";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";

const getQuizDetails = () => {
    const quizData = sessionStorage.getItem("quiz-data");
    if (quizData) {
      return JSON.parse(quizData);
    } else {
      return null;
    }
  };

function AllScores() {
    const [details,setDetails] = useState(getQuizDetails);
    const history = useHistory();
    const {userDetails} = useContext(UserContext);
    console.log(details);
    const tests = [
        {
            number:"(1)",
            title:"JEE MAINS MOCK TEST-1",
            date:"10/06/2021"
        },
        {
            number:"(2)",
            title:"JEE MAINS MOCK TEST-2",
            date:"12/06/2021"
        },
        {
            number:"(3)",
            title:"JEE MAINS MOCK TEST-3",
            date:"14/06/2021"
        },
        {
            number:"(4)",
            title:"JEE MAINS MOCK TEST-4",
            date:"16/06/2021"
        },
        {
            number:"(5)",
            title:"JEE MAINS MOCK TEST-5",
            date:"18/06/2021"
        },
        {
            number:"(6)",
            title:"JEE MAINS MOCK TEST-6",
            date:"20/06/2021"
        },
        {
            number:"(7)",
            title:"JEE MAINS MOCK TEST-7",
            date:"22/06/2021"
        },
        {
            number:"(8)",
            title:"JEE MAINS MOCK TEST-8",
            date:"24/06/2021"
        },

    ]
    return (
        <div className="all-scores">
            <p className="all-scores-title">All Scores</p>
            <div className="tests">
                <p>Test No.</p>
                <p>Test Title</p>
                <p>Test Date</p>
            </div>
            {
                details.map((detail,index) => {
                    return (
                        <div className="tests-card" onClick={() => history.push(`/report/${userDetails.username}/${detail.id}`)}>
                            <p>{index + 1}</p>
                            <p>{detail.title}</p>
                            <p>{detail.starttime.slice(0,10)}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllScores;
