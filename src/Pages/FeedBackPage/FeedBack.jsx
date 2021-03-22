import React from 'react'
import './FeedBack.css'

const FeedBack = () => {


    const handleSubmit = ()=>{
        console.log("submitted")
    }
    return (
        <div className='feedback-page'>
            <form onSubmit={handleSubmit}>
            
        
            </form>
        </div>
    )
}

export default FeedBack
