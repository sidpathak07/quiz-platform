import error_img from "../../assets/images/img-4.svg";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <img src={error_img} alt="404" />
      <p className="error-msg">
        Seems you're lost... This page could not be found.
      </p>
    </div>
  );
};

export default ErrorPage;
