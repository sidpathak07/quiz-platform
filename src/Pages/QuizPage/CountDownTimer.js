import { memo } from "react";
import Countdown from "react-countdown";
import { IoIosTimer } from "react-icons/io";

const CountDownTimer = ({ handleTestSubmit }) => {
  // console.log("Countdown re-rendered");
  return (
    <div className="countdown-div">
      <p>
        <IoIosTimer /> Time Left :{" "}
      </p>
      <Countdown
        className="quiz-countdown"
        date={Date.now() + 300000}
        onComplete={handleTestSubmit}
      />
    </div>
  );
};

export default memo(CountDownTimer);
