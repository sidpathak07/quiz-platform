import { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import axios from "../../axios/axios";
import "../FeedBackPage/FeedBack.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const rating = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "1",
  },
  {
    value: 20,
    label: "2",
  },
  {
    value: 30,
    label: "3",
  },
  {
    value: 40,
    label: "4",
  },
  {
    value: 50,
    label: "5",
  },
  {
    value: 60,
    label: "6",
  },
  {
    value: 70,
    label: "7",
  },
  {
    value: 80,
    label: "8",
  },
  {
    value: 90,
    label: "9",
  },
  {
    value: 100,
    label: "10",
  },
];

const PreviewFeedBack = () => {
  const { userDetails } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const fetchQuestion = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.get(
        `https://api.progressiveminds.in/api/FeedbackQs/${id}/get`,
        config
      );
      setQuestions(data.question);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  function valuetext(value) {
    return `${value}`;
  }

  function valueLabelFormat(value) {
    return rating.findIndex((rating) => rating.value === value);
  }

  return (
    <>
      <div className="top">
        <h1 className="preview">Preview Feedback</h1>
        <button
          onClick={() => history.push(`/customfeedback/${id}`)}
          className="select bn"
          style={{ height: "5vh" }}
        >
          Back
        </button>
      </div>

      <div className="feedback-page">
        {questions.map((question, index) => {
          return (
            <div key={question.id}>
              <h3 className="student-feedback-question">{question.question}</h3>
              {question.responseType === "range" ? (
                <div className={classes.root}>
                  <Slider
                    defaultValue={0}
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    valueLabelDisplay="auto"
                    marks={rating}
                    className={question.id}
                    name=""
                    id={index}
                  />
                </div>
              ) : (
                //    <input
                //    type="range"
                //    name=""
                //    id={index}
                //    max="10"
                //    min="1"
                //    className={question.id}
                //  />

                ""
              )}
              {question.responseType === "text" ? (
                <input type="text" name="" id={index} className={question.id} />
              ) : (
                ""
              )}
              {question.responseType === "radio" ? (
                <div>
                  <div className="rad">
                    <div className="input-radio">
                      <input
                        type="radio"
                        name="resRadio"
                        id={index}
                        value="Yes"
                        className={question.id}
                      />
                      <p className="rad-1 change">Yes</p>
                    </div>

                    <div className="input-radio">
                      <input
                        type="radio"
                        name="resRadio"
                        id={index}
                        value="No"
                        className={question.id}
                      />
                      <p className="rad-1 change">No</p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PreviewFeedBack;
