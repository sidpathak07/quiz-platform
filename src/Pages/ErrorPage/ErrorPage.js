import { useHistory } from "react-router-dom";
import error_img from "../../assets/images/img-4.svg";
import "./ErrorPage.css";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className="error-page">
    <div className='error-clip-path'></div>
      <img src={error_img} alt="404" />
      <p className="error-msg">
        Seems you're lost... This page could not be found.
      </p>
      <button className="error-btn" onClick={() => history.push("/")}>
        Go back to home page
      </button>
    </div>
  );
};

export default ErrorPage;
