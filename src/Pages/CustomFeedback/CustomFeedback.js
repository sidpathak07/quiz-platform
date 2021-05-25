import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useParams, useHistory } from "react-router-dom";
import "./CustomFeedback.css";
import { useState, useEffect, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import UserContext from "../../Context/UserContext";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";
import { v4 } from "uuid";

const CustomFeedback = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [responseType, setResponseType] = useState("");
  const confirmQuestion = (e) => {
    let quest = {
      id: v4(),
      question: question,
      responseType: responseType,
    };
    setQuestions([...questions, quest]);
    setQuestion("");
    setResponseType("");
  };

  const deleteQ = (id) => {
    setQuestions(questions.filter((quest) => quest.id !== id));
  };
  return (
    <div className="customfeedback">
      <div className="g1">
        <div className="j1">
          <p className="title">Custom Feedback</p>
          <p className="p1">Add the questions for feedback.</p>
          <button onClick={() => console.log(questions)}>Show Q</button>
        </div>
      </div>
      <div className="element">
        <div className="p2">
          <label className="p4">Question</label>
        </div>
        <div className="p3">
          <input
            type="text"
            className="input1"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
          <select
            id="responsetype"
            className="select"
            onChange={(e) => setResponseType(e.target.value)}
            value={responseType}
          >
            <option className="select1" value="range" selected>
              Slider
            </option>
            <option className="select2" value="text">
              Text
            </option>
            <option className="select3" value="radio">
              Yes/No
            </option>
          </select>
          <button onClick={(e) => confirmQuestion(e)}>Confirm</button>
        </div>
      </div>
      <div>
        {questions.map((question) => {
          return (
            <div className="element">
              <div className="p2">
                <label className="p4">Question</label>
              </div>
              <div className="p3">
                <h3>{question.question}</h3>
                <h5>{question.responseType}</h5>
                <button onClick={() => deleteQ(question.id)}>delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomFeedback;
