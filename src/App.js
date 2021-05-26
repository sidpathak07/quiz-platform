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

import UserContext from "./Context/UserContext";
import Instruction from "./Pages/InstructionPage/Instruction";
import TeacherQuizzes from "./Pages/TeacherQuizzes/TeacherQuizzes";
import QuizQuestions from "./Pages/QuizQuestions/QuizQuestions";
import QuizEditPage from "./Pages/QuizEditPage/QuizEditPage";
import TeacherHomePage from "./Pages/TeacherHomePage/TeacherHomePage";
import FeedBack from "./Pages/FeedBackPage/FeedBack";
import CustomFeedback from "./Pages/CustomFeedback/CustomFeedback";

const App = () => {
  const { userDetails, isTestSubmitted } = useContext(UserContext);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <TeacherHomePage />
              ) : (
                <Quizzes />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/login">
            {!userDetails ? <Login /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/quizpage/:id">
            {userDetails ? (
              userDetails.role === "Student" ? (
                isTestSubmitted ? (
                  <Redirect to="/feedback" />
                ) : (
                  <QuizPage />
                )
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/instruction/:id">
            {userDetails ? (
              userDetails.role === "Student" ? (
                isTestSubmitted ? (
                  <Redirect to="/feedback" />
                ) : (
                  <Instruction />
                )
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/feedback/:id">
            {userDetails ? (
              userDetails.role === "Student" ? (
                <FeedBack />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/customfeedback/:id">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <CustomFeedback />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/allquizzes">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <TeacherQuizzes />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/quizquestions/:id">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <QuizQuestions />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/quizedit/:id">
            {userDetails ? (
              userDetails.role === "Teacher" ? (
                <QuizEditPage />
              ) : (
                <Redirect to="/404" />
              )
            ) : (
              <Redirect to="/login" />
            )}
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
