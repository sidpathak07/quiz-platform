//new editpage
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "../../axios/axios";
import Loader from "../../Components/Loader/LoadingBar";
import UserContext from "../../Context/UserContext";
import MathJax from "react-mathjax3";
import parse from "react-html-parser";
import { BsFilterRight } from "react-icons/bs";
import "./QuizEditPage.css";

const QuizEditPage = () => {
  //questionbank
  const [questionsInQuiz, setQuestionsInQuiz] = useState([]);
  const [questionBank, setQuestionBank] = useState(null);
  const [filteredQuestionBank, setFilteredQuestionBank] = useState(null);
  //difficulty
  const [difficulty, setDifficulty] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  //skills
  const [skills, setSkills] = useState(null);
  const [skillLevel, setSkillLevel] = useState("");
  //subject
  const [subjects, setSubjects] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopics, setSelectedSubTopics] = useState("");
  //others
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectAllQuestions, setSelectAllQuestions] = useState(false);
  //context
  const { userDetails } = useContext(UserContext);
  //react-router
  const { id } = useParams();
  const history = useHistory();

  //select all questions method
  const addAllQuestions = (e) => {
    if (!selectAllQuestions) {
      let allQ = [];
      questionBank.forEach((question, index) => {
        allQ.push(question.id);
      });
      setSelectedQuestions(allQ);
      setSelectAllQuestions(true);
    } else {
      setSelectedQuestions([]);
      setSelectAllQuestions(false);
    }
    console.log(e.target.checked);
    if (e.target.checked) {
      setSelectedQuestions([]);
      let allQ = [];
      questionBank.forEach((question, index) => {
        allQ.push(question.id);
      });
      setSelectedQuestions(allQ);
      let checkboxes = document.getElementsByClassName("checkboxip");
      let length = checkboxes.length;
      for (let i = 0; i < length; i++) {
        checkboxes[i].checked = e.target.checked;
      }
    } else {
      setSelectedQuestions([]);
      let checkboxes = document.getElementsByClassName("checkboxip");
      let length = checkboxes.length;
      for (let i = 0; i < length; i++) {
        checkboxes[i].checked = e.target.checked;
      }
    }
  };
  // console.log(selectedQuestions);
  // console.log(questionsInQuiz);

  //useEffect hook to set all checkboxes to checked after selecting all questions
  // useEffect(() => {
  //   if (selectAllQuestions) {
  // let checkboxes = document.getElementsByClassName("checkboxip");
  // let length = checkboxes.length;
  // for (let i = 0; i < length; i++) {
  //   checkboxes[i].setAttribute("checked", true);
  // }
  //   } else {
  //     let checkboxes = document.getElementsByClassName("checkboxip");
  //     let length = checkboxes.length;
  //     for (let i = 0; i < length; i++) {
  //       checkboxes[i].removeAttribute("checked");
  //     }
  //   }
  // }, [selectAllQuestions]);
  const handleChange = (qid, e) => {
    // let Questions = [];
    // questionsInQuiz.forEach((question,index) => {
    //   Questions.push(question.id);
    // });
    // !Questions.includes(qid) && setSelectedQuestions([...selectedQuestions,qid]);
    // console.log(selectedQuestions);
    if (selectedQuestions.includes(qid)) {
      setSelectedQuestions(
        selectedQuestions.filter((question) => question !== qid)
      );
    } else {
      setSelectedQuestions([...selectedQuestions, qid]);
    }
  };

  const addQuestions = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      const postData = {
        quiz_id: id,
        quest_id: selectedQuestions,
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/addQuestionToQuiz",
        postData,
        config
      );
      if (data) setLoading(false);
      alert(data.message);
      if (data.message === "added successfully")
        history.push(`/quizQuestions/${id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const filterQuestions = () => {
    if (!skillLevel && !difficultyLevel && !selectedSubject) {
      setFilteredQuestionBank(questionBank);
    } else if (skillLevel.length > 0 && !difficultyLevel && !selectedSubject) {
      setFilteredQuestionBank(
        questionBank.filter((ques) => ques.skill === skillLevel)
      );
    } else if (difficultyLevel.length > 0 && !skillLevel && !selectedSubject) {
      setFilteredQuestionBank(
        questionBank.filter((ques) => ques.dificulty_tag === difficultyLevel)
      );
    } else if (
      skillLevel.length > 0 &&
      difficultyLevel.length > 0 &&
      !selectedSubject
    ) {
      setFilteredQuestionBank(
        questionBank.filter(
          (ques) =>
            ques.dificulty_tag === difficultyLevel && ques.skill === skillLevel
        )
      );
    } else if (
      !skillLevel.length &&
      !difficultyLevel &&
      selectedSubject.length > 0
    ) {
      if (!selectedTopic) {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) => ques.subject_tag === selectedSubject.split("*")[1]
          )
        );
      } else if (selectedTopic.length > 0 && !selectedSubTopics) {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.subject_tag === selectedSubject.split("*")[1] &&
              ques.topic_tag === selectedTopic.split("*")[1]
          )
        );
      } else {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.subject_tag === selectedSubject.split("*")[1] &&
              ques.topic_tag === selectedTopic.split("*")[1] &&
              ques.subtopic_tag === selectedSubTopics
          )
        );
      }
    } else if (
      !skillLevel &&
      difficultyLevel.length > 0 &&
      selectedSubject.length > 0
    ) {
      if (!selectedTopic) {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.dificulty_tag === difficultyLevel &&
              ques.subject_tag === selectedSubject.split("*")[1]
          )
        );
      } else if (selectedTopic.length > 0 && !selectedSubTopics) {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.dificulty_tag === difficultyLevel &&
              ques.subject_tag === selectedSubject.split("*")[1] &&
              ques.topic_tag === selectedTopic.split("*")[1]
          )
        );
      } else {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.dificulty_tag === difficultyLevel &&
              ques.subject_tag === selectedSubject.split("*")[1] &&
              ques.topic_tag === selectedTopic.split("*")[1] &&
              ques.subtopic_tag === selectedSubTopics
          )
        );
      }
    } else if (
      skillLevel.length > 0 &&
      !difficultyLevel &&
      selectedSubject.length > 0
    ) {
      if (!selectedTopic) {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.skill === skillLevel &&
              ques.subject_tag === selectedSubject.split("*")[1]
          )
        );
      } else if (selectedTopic.length > 0 && !selectedSubTopics) {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.skill === skillLevel &&
              ques.subject_tag === selectedSubject.split("*")[1] &&
              ques.topic_tag === selectedTopic.split("*")[1]
          )
        );
      } else {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.skill === skillLevel &&
              ques.subject_tag === selectedSubject.split("*")[1] &&
              ques.topic_tag === selectedTopic.split("*")[1] &&
              ques.subtopic_tag === selectedSubTopics
          )
        );
      }
    } else if (
      skillLevel.length > 0 &&
      difficultyLevel.length > 0 &&
      selectedSubject.length > 0
    ) {
      if (!selectedTopic) {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.dificulty_tag === difficultyLevel &&
              ques.skill === skillLevel &&
              ques.subject_tag === selectedSubject.split("*")[1]
          )
        );
      } else if (selectedTopic.length > 0 && !selectedSubTopics) {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.dificulty_tag === difficultyLevel &&
              ques.skill === skillLevel &&
              ques.subject_tag === selectedSubject.split("*")[1] &&
              ques.topic_tag === selectedTopic.split("*")[1]
          )
        );
      } else {
        setFilteredQuestionBank(
          questionBank.filter(
            (ques) =>
              ques.dificulty_tag === difficultyLevel &&
              ques.skill === skillLevel &&
              ques.subject_tag === selectedSubject.split("*")[1] &&
              ques.topic_tag === selectedTopic.split("*")[1] &&
              ques.subtopic_tag === selectedSubTopics
          )
        );
      }
    } else {
      setFilteredQuestionBank(
        questionBank.filter(
          (ques) =>
            ques.dificulty_tag === difficultyLevel && ques.skill === skillLevel
        )
      );
    }
  };

  const clearFilters = () => {
    setDifficultyLevel("");
    setSkillLevel("");
    setSelectedSubject("");
    setFilteredQuestionBank(questionBank);
  };

  // useEffect(() => {
  //   const getQuestionBank = async () => {
  //     try {
  //       const config = {
  //         headers: { Authorization: `Bearer ${userDetails.access}` },
  //       };
  //       const { data } = await axios.get("/api/getQuestionsFromQB", config);
  //       //questionbank
  //       setQuestionBank(data.questions);
  //       setFilteredQuestionBank(data.questions);
  //       //difficulty
  //       setDifficulty(data.tags.dificulty);
  //       //skills
  //       setSkills(data.tags.skill);
  //       //subjects
  //       setSubjects(data.tags.subject);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  //   getQuestionBank();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const fetchQuestions = async () => {
  //   try {
  //     const config = {
  //       headers: { Authorization: `Bearer ${userDetails.access}` },
  //     };
  //     setLoading(true);
  //     const { data } = await axios.get(`/api/get-quiz/${id}`, config);

  //     setQuestionsInQuiz(data.quiz_questions);
  //     // console.log(data.quiz_questions[0].id);
  //     console.log(data);

  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchQuestions();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  const getQuestionBank = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userDetails.access}` },
      };
      setLoading(true);
      const { data } = await axios.get(`/api/getQuestionsFromQB/${id}`, config);

      setQuestionBank(data.questions);
      // console.log(data);
      // console.log(questionBank);
      setFilteredQuestionBank(data.questions);
      //difficulty
      setDifficulty(data.tags.dificulty);
      //skills
      setSkills(data.tags.skill);
      //subjects
      setSubjects(data.tags.subject);
      // console.log(data);

      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getQuestionBank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!questionBank) {
    return (
      <div className="quiz-questions-loader">
        <Loader />
      </div>
    );
  }

  return (
    <MathJax.Context
      input="tex"
      onLoad={() => {}}
      onError={(MathJax, error) => {
        console.warn(error);
        // console.log("Encountered a MathJax error, re-attempting a typeset!");
        MathJax.Hub.Queue(MathJax.Hub.Typeset());
      }}
      options={{
        messageStyle: "none",
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
          processEscapes: true,
        },
        TeX: {
          extensions: [
            "AMSmath.js",
            "AMSsymbols.js",
            "noErrors.js",
            "noUndefined.js",
          ],
        },
      }}
    >
      <div className="quiz-questions-div">
        <div className="questionbank-header">
          {/* TITLE */}
          <div className="quiz-question-header">
            <h1>Question Bank</h1>
            <div className="quiz-header-buttons">
              <button
                className="enrollment-course-btn"
                onClick={() => history.push(`/quizQuestions/${id}`)}
              >
                Back
              </button>
              <button onClick={() => console.log(selectedQuestions)}>
                Show Selected
              </button>
              <input
                type="checkbox"
                id="selctallq"
                onClick={(e) => addAllQuestions(e)}
              />
              <button
                disabled={selectedQuestions.length === 0}
                onClick={addQuestions}
              >
                Add Questions
              </button>
              <button onClick={() => setShowFilter(!showFilter)}>
                Filter <BsFilterRight />
              </button>
            </div>
          </div>

          {/* FILTER */}
          {showFilter && (
            <div className="filter">
              <div className="filter-selects">
                <h2>Filter</h2>
                <div className="difficulty-level">
                  <label>
                    <p>Difficulty</p>
                    <select
                      value={difficultyLevel}
                      onChange={(e) => setDifficultyLevel(e.target.value)}
                    >
                      <option value="">All</option>
                      {difficulty?.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="skill-level">
                  <label>
                    <p>Skill</p>
                    <select
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value)}
                    >
                      <option value="">All</option>
                      {skills?.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="subject">
                  <label>
                    <p>Subject</p>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="">All</option>
                      {subjects?.map((s, i) => (
                        <option key={i} value={`${i}*${s.name}`}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {selectedSubject !== "" && (
                  <div className="topics">
                    <label>
                      <p>Topics</p>
                      <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                      >
                        <option value="">All</option>
                        {subjects[selectedSubject.split("*")[0]]?.topics?.map(
                          (t, i) => (
                            <option key={i} value={`${i}*${t.name}`}>
                              {t.name}
                            </option>
                          )
                        )}
                      </select>
                    </label>
                  </div>
                )}

                {selectedSubject !== "" && selectedTopic !== "" && (
                  <div className="sub-topic">
                    <label>
                      <p>SubTopics</p>
                      <select
                        value={selectedSubTopics}
                        onChange={(e) => setSelectedSubTopics(e.target.value)}
                      >
                        <option value="">All</option>
                        {subjects[selectedSubject.split("*")[0]]?.topics[
                          selectedTopic.split("*")[0]
                        ]?.subTopics?.map((st, idx) => (
                          <option key={idx} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
              </div>

              <div className="filter-buttons">
                <button onClick={clearFilters}>Clear filters</button>
                <button onClick={filterQuestions}>Apply filters</button>
              </div>
            </div>
          )}
        </div>

        {filteredQuestionBank?.length === 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: 200,
              fontWeight: 600,
              color: "rgba(0,0,0,0.5)",
            }}
          >
            No matched questions
          </p>
        )}

        {/* QUESTION BANK QUESTIONS */}
        {filteredQuestionBank?.map((ques) => (
          <div className="qb-question" key={ques.id}>
            <div className="check-box">
              <input
                type="checkbox"
                className="checkboxip"
                onChange={(e) => handleChange(ques.id)}
              />
            </div>
            <div className="question-content">
              <div>
                <MathJax.Html html={ques.question} />
              </div>
              <div className="question-tags">
                <h4>Tags: </h4>
                {ques?.dificulty_tag && <p>{ques?.dificulty_tag}</p>}
                {ques?.skill && <p>{ques?.skill}</p>}
                {ques?.subject_tag && <p>{ques?.subject_tag}</p>}
                {ques?.topic_tag && <p>{ques?.topic_tag}</p>}
                {ques?.subtopic_tag && <p>{ques?.subtopic_tag}</p>}
              </div>
              <div className="options">
                {Array.isArray(ques.option) &&
                  ques.option?.map((op, idx) => {
                    const ops = ["A", "B", "C", "D"];
                    return (
                      <div className="option" key={idx}>
                        <span>({ops[idx]})</span>&nbsp;{parse(op)}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="marks">
              <p>Correct: {ques.correct_marks} Marks</p>
              <p>Incorrect: -{ques.negative_marks} Marks</p>
            </div>
          </div>
        ))}

        {/* LOADER */}
        {loading && (
          <div className="quizquestion-loader">
            <Loader />
          </div>
        )}
      </div>
    </MathJax.Context>
  );
};

export default QuizEditPage;
