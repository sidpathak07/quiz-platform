import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import UserContext from "../../Context/UserContext";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizCard = (props) => {
  const { id, title, desc, duration, creator_username } = props;
  const history = useHistory();
  const { addQuiz, userDetails } = useContext(UserContext);

  const handleClick = async () => {
    addQuiz(id, duration);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const { data } = await axios.post(
        "/api/check-quiz-assigned",
        {
          user: userDetails?.user_id,
          quiz: id,
        },
        config
      );
      console.log(data);
      if (data.message !== "Success") {
        toast.warn("You have already attempted this quiz!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          progress: undefined,
        });
      } else {
        history.push(`/instruction/${id}`);
      }
    } catch (err) {
      console.log(err.message);
    }
    // history.push(`/instruction/${id}`);
  };

  return (
    <div className="quiz-card">
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <ToastContainer />
      <div className="quiz-start-button">
        <button onClick={handleClick}>Start test</button>
      </div>
    </div>
  );
};

export default QuizCard;
