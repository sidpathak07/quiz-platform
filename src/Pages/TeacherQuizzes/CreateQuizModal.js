import { useEffect, useRef, useState } from "react";
import Loader from "../../Components/Loader/LoadingBar";
import axios from "../../axios/axios";
import { IoCloseOutline } from "react-icons/io5";
import "./EditQuizModal.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ScheduleClass = (props) => {
  const { userDetails, fetchAllQuizzes, setShowCreateModal } = props;
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const editQuiz = async () => {
    if (!quizTitle || !quizDesc || !quizDuration || !startdate || !enddate)
      return alert("Please fill all the fields!");
    try {
      const postData = {
        title: quizTitle,
        creator: userDetails.user_id,
        desc: quizDesc,
        duration: quizDuration,
        starttime: startdate + ":00+05:30",
        endtime: enddate + ":00+05:30",
      };
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      setLoading(true);
      await axios.post("/api/create-quiz", postData, config);
      fetchAllQuizzes();
      setShowCreateModal(false);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        setShowCreateModal(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  });

  return (
    <div className="edit-quiz-modal">
      <div className="edit-quiz-modal-card" ref={modalRef}>
        <h1>Create Quiz</h1>
        <button onClick={() => setShowCreateModal(false)} className="close-btn">
          <IoCloseOutline />
        </button>
        <div className="edit-quiz-form">
          <br />
          <label>Name</label>
          <input
            type="text"
            placeholder="Title..."
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
          <br />
          <label>Description</label>
           <CKEditor
            editor={ClassicEditor}
            data={quizDesc}
            onChange={changeQuizDesc}
          />
          <br />
          <label>Duration (format: hh:mm:ss)</label>
          <input
            type="text"
            placeholder="Duration..."
            value={quizDuration}
            onChange={(e) => setQuizDuration(e.target.value)}
          />
          <br />
          <label>Start Date</label>
          <input
            type="datetime-local"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
          />
          <br />
          <label>End Date</label>
          <input
            type="datetime-local"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
          />
          <br />
          <button className="submit-btn" onClick={editQuiz}>
            Submit
          </button>
        </div>
      </div>
      {loading && (
        <div className="quiz--loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ScheduleClass;
