import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useParams, useHistory } from "react-router-dom";
import "./CustomFeedback.css";
import { useState, useEffect, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";

function CustomFeedback() {
  let [numberOfQuestions, setNumberOfQuestions] = useState([1]);
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [confirm, setConfirm] = useState(false);

  let question;

  const addelement = () => {
    if (confirm) {
      setNumberOfQuestions([...numberOfQuestions, 1]);
      setConfirm(false);
    } else {
      alert("Please confirm question to add new question");
    }
  };

  const handleInputChange = (e, index) => {
    question = e.target.value;
  };

  const confirmQuestion = (e) => {
    setQuestions([...questions, question]);
    setConfirm(true);
  };

  const showQuestions = () => {
    console.log(questions);
  };
  return (
    <div className="customfeedback">
      <div className="g1">
        <div className="j1">
          <p className="title">Custom Feedback</p>
          <p className="p1">Add the questions for feedback.</p>
        </div>
        <div className="j2">
          <button className="btn1">Submit Feedback Questions</button>
          <button onClick={() => showQuestions()}>Show Questions</button>
        </div>
      </div>

      {numberOfQuestions.map((question, index) => {
        return (
          <div id={index}>
            <div className="element">
              <div className="p2">
                <label className="p4">Question</label>
              </div>
              <div className="p3">
                <input
                  type="text"
                  className="input1"
                  onChange={(e) => handleInputChange(e)}
                  value={questions[index]}
                />
                <select id="responsetype" className="select">
                  <option className="select1" value="volvo">
                    Slider
                  </option>
                  <option className="select2" value="saab">
                    Text
                  </option>
                  <option className="select3" value="vw">
                    Yes/No
                  </option>
                </select>
                <button onClick={confirmQuestion}>Confirm</button>
              </div>
              <div className="df">
                <div className="plus">
                  <IconButton onClick={addelement}>
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CustomFeedback;
