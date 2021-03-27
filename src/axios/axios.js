import axios from "axios";

export default axios.create({
  baseURL: "https://quiz-mycrobites.herokuapp.com",
});

// old base url : https://quiz-mycrobites.herokuapp.com
// new base url : http://18.222.104.46
