import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import axios from "../../axios/axios";

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
    <div style={{ width: "80%", margin: "10px auto", textAlign: "center" }}>
      <input
        type="text"
        value={email}
        placeholder="Enter Email to get excel sheet of result"
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "50%", margin: "10px auto" }}
      />
      <button
        style={{
          margin: "10px auto",
          padding: "5px",
          backgroundColor: "#4fc3f7",
          color: "#ffffff",
          border: "none",
          outline: "none",
        }}
        onClick={generateExcel}
      >
        Generate Result
      </button>
      <p id="response">{responseData}</p>
    </div>
  );
};
export default GenerateExcel;
