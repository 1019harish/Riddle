
        

import React, { useContext } from 'react';
import riddleContext from '../context/riddles/riddleContext';
import '../css/RiddleItem.css';

const RiddleItem = (props ) => {
    const context = useContext(riddleContext);
    const { deleteRiddle } = context;
    const {riddle} = props
    return (
        <div className='col-md-3'>
            <div className="card">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{riddle.question}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => deleteRiddle(riddle._id)}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiddleItem;
