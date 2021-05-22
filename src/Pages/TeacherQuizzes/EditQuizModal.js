import { useEffect, useRef, useState } from "react";
import Loader from "../../Components/Loader/LoadingBar";
import axios from "../../axios/axios";
import { IoCloseOutline } from "react-icons/io5";
import "./EditQuizModal.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const getCorrectDateFormat = (d) => {
  return d.split("+")[0];
};

const ScheduleClass = (props) => {
  const {
    id,
    title,
    desc,
    duration,
    starttime,
    endtime,
    instructions,
    userDetails,
    fetchAllQuizzes,
    setEditQuiz,
  } = props;

  const [quizTitle, setQuizTitle] = useState(title);
  const [quizDesc, setQuizDesc] = useState(desc);
  const [quizDuration, setQuizDuration] = useState(duration);
  const [quizInstructions, setQuizInstructions] = useState(instructions);
  const [startdate, setStartdate] = useState(() =>
    getCorrectDateFormat(starttime)
  );
  const [enddate, setEnddate] = useState(() => getCorrectDateFormat(endtime));
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const editQuiz = async () => {
    if (!quizTitle || !quizDesc || !quizDuration || !startdate || !enddate)
      return alert("Please fill all the fields!");
    try {
      const postData = {
        title: quizTitle,
        desc: quizDesc,
        duration: quizDuration,
        //added quiz instruction
        instructions: quizInstructions,
        starttime: startdate + "+05:30",
        endtime: enddate + "+05:30",
      };
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      setLoading(true);
      await axios.patch(`/api/edit-quiz/${id}`, postData, config);
      fetchAllQuizzes();
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
    setEditQuiz(false);
  };

  //changeQuizDesc method handles changes in description using data.getData() method from editor
  const changeQuizDesc = (e, editor) => {
    const data = editor.getData();
    // console.log(data);
    setQuizDesc(data);
  };

  //changeQuizInstruction method handles changes in description using data.getData() method from editor
  const changeQuizInstruction = (e, editor) => {
    const Instructiondata = editor.getData();
    console.log(Instructiondata);
    setQuizInstructions(Instructiondata);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        setEditQuiz(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  });

  return (
    <div className="edit-quiz-modal">
      <div className="edit-quiz-modal-card" ref={modalRef}>
        <h1>Edit Quiz</h1>
        <button onClick={() => setEditQuiz(false)} className="close-btn">
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
          <label>Expire Date</label>
          <input
            type="datetime-local"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
          />
          <br />
          <label>Start Date</label>
          <input
            type="datetime-local"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
          />
          <br />
          <label>Instructions</label>
          <CKEditor
            editor={ClassicEditor}
            data={quizInstructions}
            onChange={changeQuizInstruction}
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
