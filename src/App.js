import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import QuizPage from "./Pages/QuizPage/QuizPage";
import Quizzes from "./Pages/Quizzes/Quizzes";


function App() {
  const props = {creator:1,id: 'd3664bf4-5fcc-4991-b777-80e2703b6435'}
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
          <Route exact path="/quizzes">
            <Quizzes />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
