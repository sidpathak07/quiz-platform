import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import UserContext from "../../Context/UserContext";
import Loader from "../../Components/Loader/LoadingBar";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizCard = (props) => {
  const { id, title, desc, duration, creator_username } = props;
  const { addQuiz, userDetails } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const test_time = new Date("1970-01-01T" + duration + "Z").getTime();

  const handleClick = async () => {
    setIsLoading(true);
    addQuiz(id, duration, test_time);
    // try {
    //   const config = {
    //     headers: { Authorization: `Bearer ${userDetails.access}` },
    //   };
    //   const { data } = await axios.post(
    //     "/api/check-quiz-assigned",
    //     {
    //       user: userDetails?.user_id,
    //       quiz: id,
    //     },
    //     config
    //   );
    //   if (data.message === "Success") {
    //     toast.warn("You have already attempted this quiz!", {
    //       position: "top-center",
    //       autoClose: 4000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: false,
    //       progress: undefined,
    //     });
    //   } else {
    //     history.push(`/instruction/${id}`);
    //   }
    // } catch (err) {
    //   console.log(err.message);
    // }
    history.push(`/instruction/${id}`);
    setIsLoading(false);
  };

  return (
    <div className="quiz-card">
      {isLoading && (
        <div className="quizcard-loader">
          <Loader />
        </div>
      )}
      <div className="quiz-header">
        <div>
          <div className="quiz-title">
            <div className="quiz-title-heading">
              <BsPencilSquare />
              <h2>{title}</h2>
            </div>
            <p className="quiz-duration-card">
              <IoIosTimer /> : {duration ? duration : "N/A"}
            </p>
          </div>
          <p>{desc}</p>
        </div>
      </div>
      <div className="quiz-creator">
        <p>
          <span>created by:</span> {creator_username}
        </p>
      </div>
      <ToastContainer />
      <div className="quiz-start-button">
        <button onClick={handleClick}>Start test</button>
      </div>
    </div>
  );
};

export default QuizCard;
