import React,{useState} from 'react'
import './FeedBack.css'
import{AiOutlineFileDone} from 'react-icons/ai'

const FeedBack = () => {

    const[submitted,setSubmitted]=useState(false)
    const[questionFeedback,setQuestionFeedback] = useState(1)
    const[interfaceFeedback,setInterfaceFeedback] = useState(1)
    const[difficultFeedback,setDifficultFeedback] = useState(1)
    const[student,setStudent] = useState("")
    const[indian,setIndian] = useState("")
    const[intern,setIntern] = useState("")

    

    const handleSubmit = ()=>{
        console.log("submitted")
        setSubmitted(true)
    }
    return (
        <>
        { submitted ? 
            
            
            <div className='submitted-form'>
            
            
            <AiOutlineFileDone/>
            <h1>Thank You for completing the survey</h1>
            
            
            </div> 
            
            
            
            
            :
    
        <div className='feedback-page'>
           

            <div className='feedback-input-sliders'>
            <div className='question-feedback'>
            <p>How was the Questions ?</p>
            <input type='range' min={1} max={5} step={1} defaultValue={questionFeedback} onChange={e=>setQuestionFeedback(e.target.value)}/>
            
            </div>
            <div className='interface-feedback'>
            <p>How was the user interface ?</p>
            <input type='range' min={1} max={5} step={1} defaultValue={interfaceFeedback} onChange={e=>setInterfaceFeedback(e.target.value)} />
            
            </div>
            <div className='difficulty-feedback'>
            <p>How was the Question Difficulty ?</p>
            <input type='range' min={1} max={5} step={1} defaultValue={difficultFeedback} onChange={e=>setDifficultFeedback(e.target.value)} />
            
            </div>
            
            </div>

            <div className='feedback-yes-no'>
            
            <div>

            <p>Are you a student</p>

            <div>
            <button value="yes" onClick={e=>setStudent(e.target.value)}>Yes</button>
            <button value="no" onClick={e=>setStudent(e.target.value)}>No</button>
            </div>
            
            </div>
            <div>
            <p>Are you Indian</p>

            <div>
            <button value="yes" onClick={e=>setIndian(e.target.value)}>Yes</button>
            <button value="no" onClick={e=>setIndian(e.target.value)}>No</button>
            </div>
            
            
            </div>
            <div>
            <p>Are you a Intern</p>

            <div>
            <button value="yes" onClick={e=>setIntern(e.target.value)}>Yes</button>
            <button value="no" onClick={e=>setIntern(e.target.value)}>No</button>
            </div>
            
            </div>

            
            </div>

            <div className='feedback-text'>
            
            <textarea placeholder="Any Other Feedback/Suggestion"  />
            </div>
            
            <button type='submit' onClick={handleSubmit}>Submit Feedback</button>
        
           
        </div>
    }
        </>
    )
}

export default FeedBack
