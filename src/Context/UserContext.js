import { createContext, useState } from "react";

const UserContext = createContext();

const getUserDetails = () => {
  const user = sessionStorage.getItem("user-details");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

const getUserQuiz = () => {
  const quiz = sessionStorage.getItem("user-current-quiz");
  if (quiz) {
    return JSON.parse(quiz);
  } else {
    return null;
  }
};

export const UserContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState(getUserDetails);
  const [userCurrentQuiz, setUserCurrentQuiz] = useState(getUserQuiz);

  const updateUser = (data) => {
    setUserDetails(data);
    sessionStorage.setItem("user-details", JSON.stringify(data));
  };

  const removeUser = () => {
    setUserDetails(null);
    setUserCurrentQuiz(null);
    sessionStorage.clear();
  };

  const addQuiz = (id, duration , test_time) => {
    setUserCurrentQuiz({ id, duration,test_time });
    sessionStorage.setItem(
      "user-current-quiz",
      JSON.stringify({ id, duration,test_time })
    );
  };

  return (
    <UserContext.Provider
      value={{ userDetails, updateUser, removeUser, addQuiz, userCurrentQuiz }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
