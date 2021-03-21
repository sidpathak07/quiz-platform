import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import QuizPage from "./Pages/QuizPage/QuizPage";
import Quizzes from "./Pages/Quizzes/Quizzes";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/quizpage/:id">
            <QuizPage />
          </Route>
          <Route exact path="/my-quiz">
            <Quizzes />
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
