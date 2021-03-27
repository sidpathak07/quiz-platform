import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import QuizPage from "./Pages/QuizPage/QuizPage";
import Quizzes from "./Pages/Quizzes/Quizzes";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import FeedBack from "./Pages/FeedBackPage/FeedBack";
import UserContext from "./Context/UserContext";
import Instruction from "./Pages/InstructionPage/Instruction";

const App = () => {
  const { userDetails, isTestSubmitted } = useContext(UserContext);
  // console.log(isTestSubmitted);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {userDetails ? <Quizzes /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {!userDetails ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/quizpage/:id">
            {userDetails ? (
              isTestSubmitted ? (
                <Redirect to="/feedback" />
              ) : (
                <QuizPage />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/instruction/:id">
            {userDetails ? (
              isTestSubmitted ? (
                <Redirect to="/feedback" />
              ) : (
                <Instruction />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/feedback">
            {userDetails ? <FeedBack /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
