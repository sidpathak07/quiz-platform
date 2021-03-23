import "./ErrorPage.css";
import img from '../../assets/images/img-4.svg'

const ErrorPage = () => {
  return (
    <div className="error-page">
    <img src={img} alt='404'/>
      <p className="error-msg">
        Seems you're lost..
        This page could not be found.
      </p>
    </div>
  );
};

export default ErrorPage;
