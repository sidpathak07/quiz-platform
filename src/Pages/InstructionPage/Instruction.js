import React,{useState,useContext} from 'react'
import './Instruction.css'
import {useHistory} from 'react-router-dom'
import Countdown from "react-countdown";
import UserContext from '../../Context/UserContext'


const Instruction = () => {
    const[showbtn,setShowbtn]= useState(false)
    const [time,setTime] = useState(Date.now() + 10000)
    const history = useHistory()
    const{userCurrentQuiz}= useContext(UserContext)

    const onComplete = ()=>{
        setShowbtn(true)
        setTime(Date.now())
    }

    return (
        <div className='instruction-page'>
           <div className='instruction-header'>
            <h1 >Test Instruction</h1>
            <p>Please read the instructions carefully.</p>
            </div>

            <div className='instruction-one'>
            
            <h2>Test Duration :</h2>

            <p>You have 1 hour 30 minutes to complete and submit the test.</p>

            
            </div>


            <div className='instruction-two'>
            
            <h2>Marking Scheme :</h2>

            <p>There are three type of questions. Multiple choice questions,
             Integer type questions and true/false questions. The marks of are 
             written at the end of each question. If you get the answer right you
              get those marks if you get the wrong answer some marks from your already
               gained marks will be deducted. The negative marking scheme is as follows: </p>

               <div className='marking-instruction'>
            <p>For MCQ : 1/4th of the marks of question</p>
            <p>For Integers: 1/4th of the marks of the question</p>
            <p>For True/False: Half of the marks of the question</p>
            </div>

            
            </div>

            <div className='instruction-three'>
            
            <h2>Navigation through questions :</h2>
            <p>You can leave a question, answer a question and even flag a question.
             By flagging a question you mark it to review it later. Flag question feature
              help you differentiate between the problems that you don't want to answer and
               problems that you want to answer but you are not sure how much time they'll take
                so you're leaving them for the end.</p>
            
            
            
            </div>

            <div className='instruction-four'>
            
            <h2>Feedback instruction :</h2>
            <p>There will be a feedback form at the end of the quiz which is mandatory to fill.
             It contains simple questions which will help us know your feedback about the contest.</p>
            
            
            </div>

            <div className='instruction-timer'>
            <p>Your test will start in :</p>
            <Countdown
                className="instruction-countdown"
                date={time}
                onComplete={onComplete}
              />
              {showbtn && <button onClick={() => history.push(`/quizpage/${userCurrentQuiz}`)}>Proceed to Test</button> }
            </div>
           
            
        </div>
    )
}

export default Instruction
