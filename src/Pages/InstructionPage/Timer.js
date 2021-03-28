import { memo } from "react";
import Countdown from "react-countdown";

const Timer = ({ onComplete, duration }) => {
  return (
    <div className="timer">
      <Countdown
        className="instruction-countdown"
        date={Date.now() + duration}
        onComplete={onComplete}
      />
    </div>
  );
};

export default memo(Timer);
