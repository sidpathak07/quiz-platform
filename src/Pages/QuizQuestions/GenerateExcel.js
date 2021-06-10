import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import axios from "../../axios/axios";
import './GenerateExcel.css';

const GenerateExcel = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { userDetails } = useContext(UserContext);
  const [responseData, setResponseData] = useState("");
  const generateExcel = async () => {
    setLoading(true);
    try {
      const postData = {
        quizid: id,
        email_send: email,
      };
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/requestExcelForResult",
        postData,
        config
      );
      console.log(data);
      setResponseData(data);
      setEmail("");
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="generate-result-1">
      <p className="generate-result-head">Generate Result</p>
      <div className="generate-result">
          <input
            type="email"
            value={email}
            placeholder="Enter your E-mail to get excel sheet of result."
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={generateExcel} className="generate-result-btn">Generate Result</button>
      </div>
      <p id="response">{responseData}</p>
    </div>
  );
};
export default GenerateExcel;
