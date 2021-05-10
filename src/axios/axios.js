import axios from "axios";

export default axios.create({
  baseURL: "https://api.progressiveminds.in",
});

// old base url : https://quiz-mycrobites.herokuapp.com
// new base url : https://api.progressiveminds.in
