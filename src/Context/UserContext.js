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
  const quizId = sessionStorage.getItem("user-current-quiz");
  if (quizId) {
    return JSON.parse(quizId);
  } else {
    return null;
  }
};

export const UserContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState(getUserDetails);
  const [userCurrentQuiz, setUserCurrentQuiz]= useState(getUserQuiz)

  const updateUser = (data) => {
    setUserDetails(data);
    sessionStorage.setItem("user-details", JSON.stringify(data));
  };
  const removeUser = () => {
    setUserDetails(null);
    sessionStorage.removeItem("quiz-data");
    sessionStorage.removeItem("user-details");
    sessionStorage.removeItem("quiz-responses");
  };
  const addQuiz =(id)=>{
    setUserCurrentQuiz(id)
    sessionStorage.setItem("user-current-quiz", JSON.stringify(id));
  }

  return (
    <UserContext.Provider value={{ userDetails, updateUser, removeUser,addQuiz ,userCurrentQuiz}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
