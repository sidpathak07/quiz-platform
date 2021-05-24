import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { useParams, useHistory } from "react-router-dom";
import './CustomFeedback.css';
import { useState, useEffect, useContext } from "react";
import AddIcon from '@material-ui/icons/Add';
import {IconButton} from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';

function CustomFeedback() {
    let [numberOfQuestions,setNumberOfQuestions] = useState([1]);
    const { id } = useParams();

    const addelement = () => {
        setNumberOfQuestions([...numberOfQuestions,1]); 
    }

    const removeElement = () => {
        let allQ = [];
        numberOfQuestions.pop();
        setNumberOfQuestions([...numberOfQuestions]);
    }

    const element = 
        (   <>
            <div className="element">
                <div className="p2">
                    <label className="p4">Question</label>
                </div>
                <div className="p3">
                    <input type="text" className="input1"/>
                    <select id="responsetype" className="select">
                        <option className="select1" value="volvo">Slider</option>
                        <option className="select2" value="saab">Text</option>
                        <option className="select3" value="vw">Yes/No</option>
                    </select>
                </div>
                <div className="df">
                    <div className="plus">
                        <IconButton onClick={addelement}><AddIcon /></IconButton>
                    </div>
                    <div className="plus">
                        <IconButton onClick={removeElement}><RemoveIcon /></IconButton>
                    </div>
                </div>
            </div>
            </>
        );
    
    return (
        <div className="customfeedback">
            <div className="g1">
                <div className="j1">
                    <p className="title">Custom Feedback</p>
                    <p className="p1">Add the questions for feedback.</p>
                </div>
                <div className="j2">
                    <button className="btn1">Submit Feedback Questions</button>
                </div>
            </div>
            
            {numberOfQuestions.map((question,index) => {
                return element;
            })}
        </div>
    )
}

export default CustomFeedback;
