import { createContext, useState, useEffect } from "react";

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

  const addQuiz = (id, duration, test_time) => {
    setUserCurrentQuiz({ id, duration, test_time });
  };

  const timeUpdate = () => {
    setUserCurrentQuiz({
      ...userCurrentQuiz,
      test_time: userCurrentQuiz?.test_time - 1000,
    });
    sessionStorage.setItem(
      "user-current-quiz",
      JSON.stringify(userCurrentQuiz)
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      timeUpdate();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <UserContext.Provider
      value={{
        userDetails,
        updateUser,
        removeUser,
        addQuiz,
        userCurrentQuiz,
        timeUpdate,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
